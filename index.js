$(document).ready(function () {
  // all custom jQuery will go here
  const element = '#targetElmA' // pass the element for inserting chart by using the class name

  // sample data set for demo 1
  const data = {
    label1: 40,
    label2: 30,
    label3: 44,
    label4: 25,
    label5: 40,
    label6: 38
  }

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

  $('#demo1').click(function () {
    alert('Generating')
    const options = updateOptions()
    console.log(options)
  })
})
