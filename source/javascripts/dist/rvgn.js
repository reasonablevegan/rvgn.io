$(document).on("ready",function(){

	// SVG / PNG
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function () {
	    return $(this).attr('src').replace('.svg', '.png');
	  });
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

    // Footnotes
    var footnotes = [];
    var idx = 0;
    var host_regex = new RegExp(location.host);

    $('.post .entry-content a').each(function() {

        var el = $(this);

        if (el.html() != "*") {

            if (!host_regex.test(el.attr('href')) && el.attr('href').charAt(0) != '/') {
                // Make an 'external' link
                el.addClass('external-link');
            }

            el.attr("target","_blank");

            return;
        }            

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

        var content = "<p>"+footnote.title+"</p><p>";

        if (footnote.href != "none") {
            content += "<a href='"+footnote.href+"' target='_blank'><i class='fa fa-link'></i> " + footnote.href + "</a></p>" 
        }

        el.tooltipster({
            position: "bottom",
            theme:    "tooltipster-shadow",
            content:  $(content),
            interactive: true
        });

        footnotes.push(footnote);
    });

    if (footnotes.length) {

        var footnotes_el   = $('<ol id="footnotes"></ol>');
        var article_footer = $('article.post footer');

        for (var i = 0; i < footnotes.length; i++) {
            footnotes_el.append("<li id='footnote-"+footnotes[i].idx+"'><a href='#"+footnotes[i].id+"'><i class='fa fa-caret-up'></i></a> " + footnotes[i].title + ".");
            
            if (footnotes[i].href != "none"){
                 footnotes_el.append(" <a href='"+footnotes[i].href+"'>"+footnotes[i].href+"</a></li>");
            }
        }

        // Make sure to expand all referenced when a footnote
        // link is clicked
        $('a.footnote').click(function(){

            var href = $(this).attr("href")

            showFootnotes(function(){
                location.href = href;
            });
            
            return true;
        });

        function showFootnotes(callback) {

            var main_control = $('a.accordion-control', article_footer);

            if (main_control.data("visible") === true) {

                if (typeof callback == "function")
                    callback();

                return;
            }

            $("p.accordion-tooltip").fadeOut("fast",function(){                    
                    main_control.html("hide");
                    main_control.data("visible",true);
                    footnotes_el.slideDown("fast", typeof callback == "function" ? callback : null); 
                });
        }

        function hideFootnotes() {

            var main_control = $('a.accordion-control', article_footer);

            footnotes_el.slideUp("fast", function(){
                    $("p.accordion-tooltip").fadeIn("fast");
                    main_control.html("show");
                    main_control.data("visible",false);
                });
        }

        function toogleFootnotes() {

            var main_control = $('a.accordion-control', article_footer);

            if (main_control.data("visible") === false) {
                showFootnotes();
            } else {
                hideFootnotes(); 
            }
        }

        article_footer.append("<h4>References</h4>").append(footnotes_el);

        if (footnotes.length > 5) {

            footnotes_el.hide();

            $("h4",article_footer).append("<a href='' class='accordion-control toggle-references' data-visible='false'>show</a>")
                                  .after("<p class='accordion-tooltip'>"+footnotes.length+" references hidden. <a href='' class='toggle-references'>Show all references</a>.</p>");

            article_footer.addClass("accordion");

            $("a.toggle-references", article_footer).click(function(){
                toogleFootnotes();
                return false;
            });
        }        
    }

    // Image figures
    $('.post .entry-content .figure').each(function(idx) {

        var el = $(this);
        ++idx;

        el.wrap('<p class="figure"></p>');

        var cta = "";

        if (el.prop("tagName") == "IMG") {
            cta = "<a class='button expand show-for-small-only' target='_blank' href='"+el.attr("src")+"'>View this in a new tab</a>";
        } 
        else if (el.prop("tagName") == "TABLE") {
            cta = " [<a target='_blank' class='external-link' href='"+el.data("source")+"'>source</a>]";
        }

        el.after("<div><em>Figure "+idx+" "+": "+el.attr("title")+"</em>"+cta+"</div>");

    });

    // Lists
    $('.post .entry-content ul').each(function(){

        var list = $(this);

        list.addClass("fa-ul");

        $('li',list).prepend('<i class="fa-li fa fa-caret-right"></i>');
    });

    // Social share links
    $('a.social-share').click(function(e){
     
        e.preventDefault();
        window.open($(this).attr('href'), 
                    'twitterwindow', 
                    'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+($(window).width()/2 - 275) +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

        return
     
    });
});
