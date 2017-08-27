$(function() {
  // filestack key
  var client = filestack.init('AHP1HMkJhTJWHb1boecTAz');

  // upload image button
  $('.uploadBtn').click(function(event) {
    event.preventDefault()
    // clear previous image
    $('#newImage').empty()

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
      let color = 'colored:true,reverse:true'
      // make ascii art!
      $.ajax({
        url: 'https://process.filestackapi.com/AHP1HMkJhTJWHb1boecTAz/ascii=' + color + '/' + myURL,
        type: "get",
        success: function(response) {
          // remove html, head, body from returned html. remove pre styles, remove last 2 <br>
          response = response.slice(53, -14).replace(/ style="font-family: Consolas, monaco, monospace; font-size: 12px; color: #000000"/, '').replace(/(<br>){2}/g, '')
          console.log(color);
          $('#newImage').append(response).show()
        }
      })
      // [{"filename":"Shahada_Deshiya.jpg","handle":"xq7jrczoRlmiqbYfA8bK","mimetype":"image/jpeg","originalPath":"http://ken.uno/images/Shahada_Deshiya.jpg","size":6131189,"source":"url","url":"https://cdn.filestackcontent.com/xq7jrczoRlmiqbYfA8bK"}]
    })
  })

  // background-color class add/subtract
  $('.dropdown-menu').click(function() {
    currentColor = event.target.classList
    console.log(currentColor[1])
    let bgBtn = $(".bgColorBtn")
    console.log(bgBtn)
    bgBtn.removeClass("red orange yellow green blue indigo violet black white rainbow")
    bgBtn.addClass(currentColor[1])
    $("pre").removeClass("red orange yellow green blue indigo violet black white rainbow")
    $("pre").addClass(currentColor[1])
  })

  // ascii color/bw switch
  $("[name='colorToggle']").bootstrapSwitch()






})





// not working! want to remove picker logos
// $('div.fsp-modal').parent().removeClass("fsp-picker__footer fsp-picker__footer--visible")
// $('.fsp-icon--filestack').remove()
// $('fsp-picker__footer--').replace(/visible/g, 'hidden')
