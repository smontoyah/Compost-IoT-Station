
    // Database paths
var sensorsPath = 'COMPOST/sensors';

    // Database references
const databaseSensors =database.ref(sensorsPath)


    /////////////Functions

    // convert epochtime to JavaScripte Date object
function epochToJsDate(epochTime){
  return new Date(epochTime*1000);
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime){
  var epochDate = new Date(epochToJsDate(epochTime));
  var dateTime = epochDate.getFullYear() + "/" +
    ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" +
    ("00" + epochDate.getDate()).slice(-2) + " " +
    ("00" + epochDate.getHours()).slice(-2) + ":" +
    ("00" + epochDate.getMinutes()).slice(-2) + ":" +
    ("00" + epochDate.getSeconds()).slice(-2);

  return dateTime;
}


//Function to add data to plot
function plotValues(chart, timestamp, value){
  var x = epochToJsDate(timestamp).getTime(); //Use this when we have the x as a timestamp.
  //var x = Number (value);
  var y = Number (value);
  if(chart.series[0].data.length > 40) {
    chart.series[0].addPoint([x, y], true, true, true);
  } else {
    chart.series[0].addPoint([x, y], true, false, true);
  }
}

//Asynchronous call back to add data to plot
databaseSensors.orderByKey().limitToLast(10).on('child_added', snapshot =>{
  var jsonData = snapshot.toJSON();
  //Update variables
  var XtoPlot = jsonData.timestamp;
  var temperature1 = jsonData.temperature1;
  var temperature2 = jsonData.temperature2;
  var temperature3 = jsonData.temperature3;
  var temperature4 = jsonData.temperature4;
  var temperature5 = jsonData.temperature5;
  var temperature6 = jsonData.temperature6;
  
  // Plot the values on the charts
  plotValues(chartT1, XtoPlot, temperature1);
  plotValues(chartT2, XtoPlot, temperature2);
  plotValues(chartT3, XtoPlot, temperature3);
  plotValues(chartT4, XtoPlot, temperature4);
  plotValues(chartT5, XtoPlot, temperature5);
  plotValues(chartT6, XtoPlot, temperature6);
 
});
