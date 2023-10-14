# IoT Compost Temperature Monitoring System

This project is an IoT-based temperature monitoring system for compost using an ESP32 microcontroller, Firebase Realtime Database, and a web platform. It allows you to monitor the temperature of a compost pile in real-time and log the data for analysis. The system consists of multiple DS18B20 temperature sensors connected to the ESP32, which periodically read temperature data and send it to a Firebase Realtime Database. You can access and visualize the data through a web platform.

## Prerequisites

- ESP32 microcontroller
- DS18B20 temperature sensors (up to 6 sensors)
- Wi-Fi network for connecting the ESP32 to the internet
- Firebase account with a project created
- Arduino IDE installed with the necessary libraries
- NTP server access for time synchronization

## Hardware Setup

1. Connect the DS18B20 temperature sensors to the ESP32 using the OneWire library. The sensors should be connected to the appropriate GPIO pins as follows:
    - Sensor 1: GPIO 14
    - Sensor 2: GPIO 13
    - Sensor 3: GPIO 5
    - Sensor 4: GPIO 23
    - Sensor 5: GPIO 19
    - Sensor 6: GPIO 18
2. Ensure that the sensors are correctly wired and powered.

## Software Setup

1. Install the required libraries in the Arduino IDE:
   - [OneWire](https://github.com/PaulStoffregen/OneWire)
   - [DallasTemperature](https://github.com/milesburton/Arduino-Temperature-Control-Library)
   - [Firebase Arduino](https://github.com/FirebaseExtended/firebase-arduino)
2. Configure the following parameters in the Arduino sketch:
   - Replace `WIFI_SSID` and `WIFI_PASSWORD` with your Wi-Fi network credentials.
   - Replace `API_KEY` with your Firebase project's API key.
   - Replace `USER_EMAIL` and `USER_PASSWORD` with the authorized user's email and password.
   - Set `DATABASE_URL` to your Firebase Realtime Database URL.
3. Update the pin connections if necessary.
4. Upload the code to your ESP32.

## Usage

1. Power on the ESP32 and let it connect to your Wi-Fi network.
2. The ESP32 will periodically read temperature data from the DS18B20 sensors and send it to the Firebase Realtime Database.
3. Access the temperature data through your Firebase project's Realtime Database.
4. Visualize and interact with the data using a web platform or Firebase tools.
5. The system synchronizes time with an NTP server for accurate timestamping.
6. Customize the system to suit your specific needs.

## License

This project is open-source and available under the [MIT License](LICENSE). You are free to use and modify it as needed. Please refer to the license file for more details.
