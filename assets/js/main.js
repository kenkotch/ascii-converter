$(function() {

  // filestack key
  // const client = filestack.init('AHP1HMkJhTJWHb1boecTAz')
  const client = filestack.init('ArAAhzleXSl2R9mqrKM21z')

  const DEFAULT_COLOR = 'white'
  let currentColor = DEFAULT_COLOR
  const DEFAULT_FONT_COLOR = 'f-black'
  let fontColorChoice = DEFAULT_FONT_COLOR

  // make ascii color text default
  let color = 'c:true'
  let reversed = 'r:true'

  //default font-weight
  let fWeight = 'bold'

  // upload image button
  $('.uploadBtn').click((event) => {
    event.preventDefault()
    // clear previous image
    $('#newImage').empty()
    $('#wrapper').removeClass('toggled')
    // create object
    client.pick({
      accept: 'image/*',
      maxFiles: 5,
      imageMax: [1024, 1024],
      maxFiles: 1,
      minFiles: 1
    }).then(function(result) {

      //url of uploaded image
      let myURL = result.filesUploaded[0].url
      // make ascii art!
      $.ajax({
        url: `https://process.filestackapi.com/AHP1HMkJhTJWHb1boecTAz/ascii=${color},${reversed}/${myURL}`,
        type: "get",
        success: function(response) {
          // remove html, head, body from returned html. remove pre styles, remove last 2 <br>
          response = response.slice(53, -14).replace(/ style="font-family: Consolas, monaco, monospace; font-size: 12px; color: #000000"/, '').replace(/(<br>){2}/g, '')
          $('#newImage').append(response).show()
          $("pre").addClass(currentColor[1] || DEFAULT_COLOR)
          $("pre").addClass(fontColorChoice[1] || DEFAULT_FONT_COLOR)
          $('pre').addClass(fWeight)
          $('.saveBtn').show()
        }
      })
    })
  })

  // background color dropdown menu
  $('.bgColor').click(() => {
    const BASEBGCLASSES = "red orange yellow green blue indigo violet black white rainbow"
    currentColor = event.target.classList
    let bgBtn = $(".bgColorBtn")
    bgBtn.removeClass(BASEBGCLASSES)
    bgBtn.addClass(currentColor[1])
    $("pre").removeClass(BASEBGCLASSES)
    $("pre").addClass(currentColor[1])
  })

  // font color dropdown menu
  $('.fontColor').click(() => {
    const BASEFONTCLASSES = "f-red f-orange f-yellow f-green f-blue f-indigo f-violet f-black f-white"
    fontColorChoice = event.target.classList
    monoMenuColor = $(".monoMenu")
    monoMenuColor.removeClass(BASEFONTCLASSES)
    monoMenuColor.addClass(fontColorChoice[1])
    $("pre").removeClass(BASEFONTCLASSES)
    $("pre").addClass(fontColorChoice[1])
  })

  // initally hide monoMenu
  $('.monoMenu').hide()
  // ascii color/bw
  $('.toggle').click(() => {
    event.preventDefault()
    if ($('.toggle').hasClass('off')) {
      // turn off mono menu; turn on color menu
      $('.monoMenu').hide()
      $('.colorMenu').show()
      color = 'c:true'
    } else {
      // turn off color menu; turn on mono menu
      $('.colorMenu').hide()
      $('.monoMenu').show()
      color = 'c:false'
    }
  })

  // color mode: reversed or normal
  $('#reversed').click((event) => {
    reversed = 'r:true'
  })
  $('#normal').click((event) => {
    reversed = 'r:false'
  })

  // bold or regular font-weight
  $('#bold').click((event) => {
    $('pre').addClass('bold')
    console.log($('pre'));
    fWeight = 'bold'
  })
  $('#regular').click((event) => {
    $('pre').removeClass('bold')
    fWeight = ''
  })

  // save image as jpg
  $('.saveBtn').click((event) => {
    $('pre').attr('id', 'pre')
    let pre = document.getElementById('pre')
    pre = pre.innerHTML
    html2canvas(document.getElementById('pre'),{
      onrendered: function(canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
        a.download = 'asciiArt.png';
        a.click();
      }
    })
  })

    // hide save button
    $('.saveBtn').hide()

  // big red button
  $('#menu-toggle').hide()

  $('.btnCenter').click(() => {
    $('.btnCenter').hide()
    $('.txtCenter').hide()
    $('#menu-toggle').show()
  })

  //tooltips
  $('[data-toggle="tooltip"]').tooltip()
})
