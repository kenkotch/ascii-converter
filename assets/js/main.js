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
      // make ascii art!
      $.ajax({
        url: 'https://process.filestackapi.com/AHP1HMkJhTJWHb1boecTAz/ascii=colored:true,background:black,reverse:true/' + myURL,
        type: "get",
        success: function(response) {
          // remove html, head, body from returned html. remove font
          response = response.slice(53, -14).replace(/font-size: 12px;/, '')
          console.log(response);
          $('#newImage').append(response).show()
            .attr('#red', 'newID')
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
    $("div.newImage").removeClass("red orange yellow green blue indigo violet black white rainbow")
    $("div.newImage").addClass(currentColor[1])
  })
})

// })
