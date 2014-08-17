$(document).on("ready",function(){

	// SVG / PNG
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function () {
	    return $(this).attr('src').replace('.svg', '.png');
	  });
	}

    // Footnotes
    var footnotes = [];

    $('.entry-content a').each(function(idx) {

        var el = $(this);

        if (el.html() != "*") 
            return;

        // Index is zero-based; make human readable.
        ++idx;

        var footnote = {
            idx:   idx,
            href:  el.attr("href"),
            id:    "reference-"+idx,
            title: el.attr("title")
        };

        // Update the element
        el.addClass("footnote");
        el.attr("id", footnote.id);
        el.attr("href","#footnote-"+idx);
        el.html("[" + idx + "]");

        el.tooltipster({
            position: "bottom",
            theme:    "tooltipster-shadow",
            content:  $("<p>"+footnote.title+"</p><p><a href='"+footnote.href+"' target='_blank'><i class='fa fa-link'></i> " + footnote.href + "</a></p>"),
            interactive: true
        });

        footnotes.push(footnote);
    });

    if (footnotes.length) {
        var footnotes_el = $('<ol id="footnotes"></ol>');

        for (var i = 0; i < footnotes.length; i++) {
            footnotes_el.append("<li id='footnote-"+footnotes[i].idx+"'><a href='#"+footnotes[i].id+"'><i class='fa fa-caret-up'></i></a> " + footnotes[i].title + ". <a href='"+footnotes[i].href+"'>"+footnotes[i].href+"</a></li>");
        }

        $('article.post footer').append("<h4>References</h4>").append(footnotes_el);
    }

    // Blurring
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

    // Social share links
    $('a.social-share').click(function(e){
     
        e.preventDefault();
        window.open($(this).attr('href'), 
                    'twitterwindow', 
                    'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+($(window).width()/2 - 275) +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

        return
     
    });
});
