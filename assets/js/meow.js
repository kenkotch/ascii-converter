$(document).ready(function() {

    let meow = new Audio('assets/sound/meow.mp3')
    $(meow).bind(() =>  {
      meow.currentTime = 0
      meow.play()
    })

  $('.meow').click(() => {
    event.preventDefault()
    meow.play()
    delayPage()
  })
  var timeoutID;
  function delayPage() {
    timeoutID = window.setTimeout(goToPage, 2000);
  }
  function goToPage() {
    location.href=('index.html')
  }
})
