$(function() {
  // filestack key
  var client = filestack.init('AHP1HMkJhTJWHb1boecTAz');

  // upload image button
  $('button').click(function(event) {
    event.preventDefault()
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
          response = response.slice(53, -14)
          response = response.replace(/12px/, '10%')
          console.log(response);
          $('#newImage').append(response)
        }
      })

      // [{"filename":"Shahada_Deshiya.jpg","handle":"xq7jrczoRlmiqbYfA8bK","mimetype":"image/jpeg","originalPath":"http://ken.uno/images/Shahada_Deshiya.jpg","size":6131189,"source":"url","url":"https://cdn.filestackcontent.com/xq7jrczoRlmiqbYfA8bK"}]

    })
  })
})
