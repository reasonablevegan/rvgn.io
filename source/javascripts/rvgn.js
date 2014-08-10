$(document).on("ready",function(){
	// SVG / PNG
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function () {
	    return $(this).attr('src').replace('.svg', '.png');
	  });
	}

  // Blurring concerns
  var BLUR_RADIUS = 100;

  var canvas = document.getElementById("heroCanvas");

  if (canvas) {
    var canvasContext = canvas.getContext('2d');
    
    var image = new Image();
    image.src = $('[data-blurimage]')[0].src;
    
    var drawBlur = function() {
      var w = canvas.width;
      var h = canvas.height;
      canvasContext.drawImage(image, 0, 0, w, h);
      stackBlurCanvasRGBA('heroCanvas', 0, 0, w, h, BLUR_RADIUS);
      $(canvas).addClass('fade-in');
    };
    
    image.onload = function() {
      drawBlur();
    }
  }
});
