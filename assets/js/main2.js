$(function() {

  $('.saveBtn').click(() => {
    html2canvas(document.body, {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      }
    })
  })


})
