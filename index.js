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
  function updateOptions (cl) {
    const newOptions = {
      title: $(`input.${cl}[value='chart title']`).val(),
      titleFontSize: $(`input.${cl}[value='1.5rem']`).val(),
      titleColor: $(`input.${cl}[value='slategray']`).val(),
      yAxisTickUnit: $(`input.${cl}[value='5']`).val(),
      yAxisLabelFontSize: $(`input.${cl}[value='0.8rem']`).val(),
      yAxisLabelFontColor: $(`input.${cl}[value='darkslateblue']`).val(),
      valuePositionInBar: $(`input.${cl}[value='center']`).val(), // top, center or bottom
      barSpacing: $(`input.${cl}[value='1rem']`).val(),
      barColor: $(`input.${cl}[value='gold']`).val(),
      xAxisLabelFontSize: $(`input.${cl}[value='0.9rem']`).val(),
      xAxisLabelFontColor: $(`input.${cl}[value='blue']`).val()
    }
    return newOptions
  }

  // sample data set for demo 2
  const dataStack = {
    label1: [40, 'seagreen', 24, 'lightgreen', 5, 'peachpuff'],
    label2: [30, 'olivedrab', 18, 'gold'],
    label3: [44, 'darkseagreen'],
    label4: [25, 'darkviolet'],
    label5: [40, 'brown', 25, 'teal'],
    label6: [38, 'pink']
  }

  // container element for demo2 chart
  const elementB = '#targetElmB'

  // 'generate' button updates the chart to adjustments of options
  $('#demo1').click(function () {
    const options = updateOptions('demo1') // update options to whatever user put in the input boxes

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
    const ticksCount = Math.ceil(findMaxVal(data) / ticksUnit)

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
    elem.prepend(`<p id=\'title\'>${option.title}</p>`)
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

  // function to add bars and labels
  function generateBarAndLabel (data, option, ticksCount, ticksUnit) {
    $('#graphContainer').prepend('<div id=barContainer></div>') // insert one more container just for bars
    $('#barContainer').css({
      display: 'flex',
      padding: '0 1.5rem',
      height: '498px',
      'align-items': 'flex-end',
      gap: option.barSpacing,
      'font-size': option.xAxisLabelFontSize,
      'margin-bottom': '-1.5em'
    })

    // draw bars according to whether single value or multiple value
    let i = 1
    for (const key in data) {
      // draw stacked bars
      if (typeof data[key] === 'object') {
        $('#barContainer').append(`<div class='bars' id='bar${i}'></div>`)
        for (let j = 0; j < data[key].length; j += 2) {
          $(`#bar${i}`).append(`<div class='value' id='bar${i}subValue${j}'>${data[key][j]}</div>`)
          $(`#bar${i}subValue${j}`).css({
            'background-color': data[key][j + 1],
            height: `${(500 - (500 / (ticksCount + 1))) * data[key][j] / ticksCount / ticksUnit}px`
          })
        }
        $(`#bar${i}`).append(`<div class='label'>${key}</div>`)
        i += 1
      } else {
        // single value bars
        $('#barContainer').append(`<div class='bars' id='bar${i}'></div>`)
        $(`#bar${i}`).append(`<div class='value' id='value${i}'>${data[key]}</div>`)
        $(`#bar${i}`).append(`<div class='label'>${key}</div>`)
        $(`#value${i}`).css({
          'background-color': option.barColor,
          height: `${(500 - (500 / (ticksCount + 1))) * data[key] / ticksCount / ticksUnit}px`
        })
        i += 1
      }
    }
    // style label and bars
    $('.label').css({
      display: 'flex',
      'font-size': option.xAxisLabelFontSize,
      height: '1.5em',
      'align-items': 'center',
      'justify-content': 'center',
      color: option.xAxisLabelFontColor
    })

    $('.value').css({
      display: 'flex',
      'justify-content': 'center',
      color: option.xAxisLabelFontColor
    })

    $('.bars').css({
      'flex-grow': '1'
    })

    // options for value text inside bar
    switch (option.valuePositionInBar) {
      case 'top':
        $('.value').css('align-items', 'flex-start')
        break
      case 'center':
        $('.value').css('align-items', 'center')
        break
      case 'bottom':
        $('.value').css('align-items', 'flex-end')
        break
    }

    // make bars pop up from x axis
    $('.value').hide()
    $('.value').slideDown(1000)
  }
})
