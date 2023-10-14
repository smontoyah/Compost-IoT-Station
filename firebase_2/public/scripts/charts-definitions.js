// Create the charts when the web page loads
window.addEventListener('load', onload);

function onload(event){
  chartT1 = createTemperatureChart1();
  chartT2 = createTemperatureChart2();
  chartT3 = createTemperatureChart3();
  chartT4 = createTemperatureChart4();
  chartT5 = createTemperatureChart5();
  chartT6 = createTemperatureChart6();
  
}

/////////////////////////////////////////////// Create Temperature Chart
function createTemperatureChart1() {
    var chart = new Highcharts.Chart({
      chart:{ 
        renderTo:'chart-temperature1',
        type: 'spline' 
      },
      series: [
        {
          name: 'Temperatura'
        }
      ],
      title: { 
        text: 'Temperatura de cama 1'
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        },
        series: { 
          color: '#A62639' 
        }
      },
      xAxis: {
        title:{
          text: 'Tiempo (GMT)'
        },
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Temperatura Grados Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }



  function createTemperatureChart2() {
    var chart = new Highcharts.Chart({
      chart:{ 
        renderTo:'chart-temperature2',
        type: 'spline' 
      },
      series: [
        {
          name: 'Temperatura'
        }
      ],
      title: { 
        text: 'Temperatura de cama 2'
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        }
      },
      xAxis: {
        title:{
          text: 'Tiempo (GMT)'
        },
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Temperatura Grados Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }


  function createTemperatureChart3() {
    var chart = new Highcharts.Chart({
      chart:{ 
        renderTo:'chart-temperature3',
        type: 'spline' 
      },
      series: [
        {
          name: 'Temperatura'
        }
      ],
      title: { 
        text: 'Temperatura de cama 3'
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        }
      },
      xAxis: {
        title:{
          text: 'Tiempo (GMT)'
        },
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Temperatura Grados Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }


  function createTemperatureChart4() {
    var chart = new Highcharts.Chart({
      chart:{ 
        renderTo:'chart-temperature4',
        type: 'spline' 
      },
      series: [
        {
          name: 'Temperatura'
        }
      ],
      title: { 
        text: 'Temperatura de cama 4'
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        }
      },
      xAxis: {
        title:{
          text: 'Tiempo (GMT)'
        },
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Temperatura Grados Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }


  function createTemperatureChart5() {
    var chart = new Highcharts.Chart({
      chart:{ 
        renderTo:'chart-temperature5',
        type: 'spline' 
      },
      series: [
        {
          name: 'Temperatura'
        }
      ],
      title: { 
        text: 'Temperatura de cama 5'
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        }
      },
      xAxis: {
        title:{
          text: 'Tiempo (GMT)'
        },
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Temperatura Grados Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }


  function createTemperatureChart6() {
    var chart = new Highcharts.Chart({
      chart:{ 
        renderTo:'chart-temperature6',
        type: 'spline' 
      },
      series: [
        {
          name: 'Temperatura'
        }
      ],
      title: { 
        text: 'Temperatura de cama 6'
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        }
      },
      xAxis: {
        title:{
          text: 'Tiempo (GMT)'
        },
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Temperatura Grados Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }