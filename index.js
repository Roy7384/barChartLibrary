$(document).ready(function () {
  // all custom jQuery will go here
  const elementA = '#targetElmA' // pass the element for inserting chart by using the class name

  // sample data set for demo 1
  const data = {
    label1: 40,
    label2: 30,
    label3: 44,
    label4: 25,
    label5: 40,
    label6: 38
  }

  // get values in the options input boxes at a specfic time
  function updateOptions () {
    const newOptions = {
      title: $("input[value='chart title']").val(),
      titleFontSize: $("input[value='1.5rem']").val(),
      titleColor: $("input[value='slategray']").val(),
      yAxisTickUnit: $("input[value='5']").val(),
      yAxisLabelFontSize: $("input[value='0.8rem']").val(),
      yAxisLabelFontColor: $("input[value='darkslateblue']").val(),
      valuePositionInBar: $("input[value='center']").val(), // top, center or bottom
      barSpacing: $("input[value='1rem']").val(),
      barColor: $("input[value='gold']").val(),
      xAxisLabelFontSize: $("input[value='1rem']").val(),
      xAxisLabelFontColor: $("input[value='darkslateblue']").val()
    }
    return newOptions
  }

  // 'generate' button updates the chart to adjustments of options
  $('#demo1').click(function () {
    const options = updateOptions() // update options to whatever user put in the input boxes

    $(elementA).empty() // empty the target element of previous chart

    drawBarChart(data, options, elementA) // run the main function
  })

  // code for the actual function and sub functions
  // main function
  function drawBarChart (data, options, element) {
    const targetPosition = $(element) // get the element object of where chart will be
    // style the element
    targetPosition.css({
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'stretch',
      padding: '1rem',
      'margin-top': '2rem',
      'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    })

    // find the max value from data for generating x and y axis
    const ticksUnit = options.yAxisTickUnit
    const maxVal = findMaxVal(data) + Number(ticksUnit)
    const ticksCount = Math.ceil(findMaxVal(data) / ticksUnit)

    console.log(maxVal)

    // add chart title
    insertTitle(options, targetPosition)

    // insert a div container with id chart to hold all chart elements
    targetPosition.append("<div id='chart'></div>")
    $('#chart').css({
      display: 'flex',
      'padding-bottom': '2em',
      gap: 0
    })

    // generate the y axis
    generateY('#chart', options, ticksCount, ticksUnit)

    // generate the x axis
    generateX('#chart', options)

    generateBarAndLabel(data, options, ticksCount, ticksUnit)
  }

  // function to find the max value from the object data
  // in the case of stacked bar charts, find the maximum sum of all values in one bar
  function findMaxVal (data) {
    const valueArr = []
    for (const key in data) {
      if (typeof data[key] === 'object') {
        let barSum = 0
        for (let i = 0; i < data[key].length; i = i + 2) {
          barSum += data[key][i]
        }
        valueArr.push(barSum)
      } else {
        valueArr.push(data[key])
      }
    }
    return Math.max(...valueArr)
  }

  // function to insert chart title
  function insertTitle (option, elem) {
    elem.prepend('<p id=\'title\'>chart title</p>')
    $('#title').css({
      'margin-bottom': '0.6rem',
      display: 'flex',
      'justify-content': 'center',
      'font-size': option.titleFontSize,
      color: option.titleColor
    })
  }

  // function to generate entire y axis
  function generateY (id, option, ticksCount, ticksUnit) {
    // generate yLabels
    $(id).append("<div class='yLabels'></div>")
    $('.yLabels').css({
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'space-evenly'
    })
    // generate yAxis
    $(id).append("<div id='yAxis'></div>")
    $('#yAxis').css({
      display: 'flex',
      'flex-direction': 'column',
      width: '2px',
      height: '500px',
      'background-color': option.yAxisLabelFontColor,
      'justify-content': 'space-evenly'
    })
    // add yLabel text and yAxis ticks
    for (let i = 0; i < ticksCount; i++) {
      $('.yLabels').prepend(`<div class='yLabel'>${ticksUnit * (i + 1)}</div>`)
      $('#yAxis').prepend("<div class='ticks'></div>")
    }
    // style ticks
    $('.ticks').css({
      height: '2px',
      width: '10px',
      'background-color': option.yAxisLabelFontColor
    })
    // style label text
    $('.yLabel').css({
      'font-size': option.yAxisLabelFontSize,
      color: option.yAxisLabelFontColor
    })
  }

  // function to generate x axis
  function generateX (id, option) {
    $(id).append("<div id='graphContainer'></div>")
    $('#graphContainer').css({
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'flex-end',
      'flex-grow': '1'
    })
    $('#graphContainer').append('<div id=xAxis></div>')
    $('#xAxis').css({
      height: '2px',
      'background-color': option.xAxisLabelFontColor
    })
  }
})
