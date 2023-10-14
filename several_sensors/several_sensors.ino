#include <OneWire.h>
#include <DallasTemperature.h>
#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include <Wire.h>

//access to time
#include "time.h"

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "composteraiot"
#define WIFI_PASSWORD "12345678"

// Insert Firebase project API Key
#define API_KEY "AIzaSyDnl24NbqO7SrC6Pm3YodR-8gt4usuyeyI"

// Insert Authorized Email and Corresponding Password
#define USER_EMAIL "smontoyah99@gmail.com"
#define USER_PASSWORD "Tokamak@1950"

// Insert RTDB URLefine the RTDB URL
#define DATABASE_URL "https://tempr0-8baa3-default-rtdb.firebaseio.com"
//********************************Sensores***************************************
// Pin del bus OneWire
const int sensorPin1 = 14;
const int sensorPin2 = 13;
const int sensorPin3 = 5;
const int sensorPin4 = 23;
const int sensorPin5 = 19;
const int sensorPin6 = 18;

// Instancia del objeto OneWire
OneWire myWire1(sensorPin1);
OneWire myWire2(sensorPin2);
OneWire myWire3(sensorPin3);
OneWire myWire4(sensorPin4);
OneWire myWire5(sensorPin5);
OneWire myWire6(sensorPin6);

// Instancia del objeto DallasTemperature
DallasTemperature sensors1(&myWire1);
DallasTemperature sensors2(&myWire2);
DallasTemperature sensors3(&myWire3);
DallasTemperature sensors4(&myWire4);
DallasTemperature sensors5(&myWire5);
DallasTemperature sensors6(&myWire6);
//******************************************************************************

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Variable to save USER UID
String uid;

// Variables to save database paths
String databasePath;

String temp1Path;
String temp2Path;
String temp3Path;
String temp4Path;
String temp5Path;
String temp6Path;

String timePath;

float temperature1;
float temperature2;
float temperature3;
float temperature4;
float temperature5;
float temperature6;

float contador =1.0;
unsigned long timestamp;

FirebaseJson sensors_json;

// Timer variables (send new readings every three minutes)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 3600;

//NTP server:
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = -18000; //defines the offset in seconds between your time zone and GMT
const int daylightOffset_sec = 0; //defines the offset in seconds for daylight saving time

// Initialize WiFi
void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();

  //Configure real time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

}

void setup(){
  Serial.begin(115200);
  sensors1.begin();   //Se inicia el sensor 1
  sensors2.begin();   //Se inicia el sensor 2
  sensors3.begin();   //Se inicia el sensor 3
  sensors4.begin();   //Se inicia el sensor 4
  sensors5.begin();   //Se inicia el sensor 5
  sensors6.begin();   //Se inicia el sensor 6
  
  initWiFi();
  

  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  // Print user UID
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  // Update database path
  databasePath = "/COMPOST/sensors";

  // Update database path for sensor readings
  temp1Path = databasePath + "/temperature1"; 
  temp2Path = databasePath + "/temperature2";
  temp3Path = databasePath + "/temperature3";
  temp4Path = databasePath + "/temperature4";
  temp5Path = databasePath + "/temperature5";
  temp6Path = databasePath + "/temperature6";
  timePath = databasePath + "/timestamp";
}

void loop(){
  // Send new readings to database
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    

    if(contador>20){contador = 1.0;}
      contador=contador+1;
    //temperature = contador*0.1;
    

    sensors1.requestTemperatures();  // Solicitar las temperaturas a los sensores
    float temperature1 = sensors1.getTempCByIndex(0);

    sensors2.requestTemperatures();
    float temperature2 = sensors2.getTempCByIndex(0);

    sensors3.requestTemperatures();
    float temperature3 = sensors3.getTempCByIndex(0);

    sensors4.requestTemperatures();
    float temperature4 = sensors4.getTempCByIndex(0);

    sensors5.requestTemperatures();
    float temperature5 = sensors5.getTempCByIndex(0);

    sensors6.requestTemperatures();
    float temperature6 = sensors6.getTempCByIndex(0);
    

    read_time();
    
    // Send readings to database:
    sensors_json.set("/temperature1", String(temperature1));
    sensors_json.set("/temperature2", String(temperature2));
    sensors_json.set("/temperature3", String(temperature3));
    sensors_json.set("/temperature4", String(temperature4));
    sensors_json.set("/temperature5", String(temperature5));
    sensors_json.set("/temperature6", String(temperature6));

    //Add JSON to database
    if (Firebase.RTDB.pushJSON(&fbdo, databasePath,&sensors_json)){
      Serial.println("Wrote JSON to"+fbdo.dataPath());
    }else {
      Serial.println("ERROR WRITING JSON"+fbdo.errorReason());
    }
  }
}

void read_time(){
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    sensors_json.set("/timestamp", String(0));
    return;
  }
  //Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
  time(&now);
  timestamp=now;
  sensors_json.set("/timestamp", String(timestamp));
}
