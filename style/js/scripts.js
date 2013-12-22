jQuery(window).load(function() {
	jQuery('.flexslider').flexslider({
		directionNav: false
	});	
});

jQuery.fn.exists = function(){ return this.length>0; }

jQuery(document).ready(function($) {

	// Main navigation
	$('ul.sf-menu').superfish({ 
	    delay:       1000,                            
	    animation:   {opacity:'show',height:'show'},  
	    speed:       'fast',                                                  
	    dropShadows: false                            
	}); 
	
	// Responsive Menu
    // Create the dropdown base
    $("<select class='alt-nav' />").appendTo("#nav");

    // Create default option "Go to..."
    $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Go to..."
    }).appendTo("#navigation select");

    // Populate dropdown with menu items
    $("#navigation a").each(function() {
     var el = $(this);
     $("<option />", {
         "value"   : el.attr("href"),
         "text"    : el.text()
     }).appendTo("nav select");
    });

    $(".alt-nav").change(function() {
      window.location = $(this).find("option:selected").val();
    });
       
    // Tour dates widget
	if ($('.widget .tour-dates li').exists()) {
		$('.widget .tour-dates li').equalHeights();
	}
	
	// Tracklisting
	if ($('.track-listen').exists()) {
		$('.track-listen').click(function(){
			var target 		= $(this).siblings('.track-audio');
			var siblings	= $(this).parents('.track').siblings().children('.track-audio');
			siblings.slideUp('fast');
			target.slideToggle('fast');
			return false;
		});
	}
	
	// Tracklisting check subtitles
	if ($('.track').exists()) {
		$('.track').each(function(){
			var main_head = $(this).find('.main-head');
			if (main_head.length == 0) 
				$(this).addClass('track-single');
		});
	}
	
	// Lightbox
		$("a[data-rel^='prettyPhoto']").prettyPhoto();
		$("a[data-rel^='prettyPhoto']").each(function() {
			$(this).attr("rel", $(this).data("rel"));
		});
	
    // Content videos
    if ($('.post').exists()) {
	    $('.post').fitVids();
	}
	
	// Centered Play icon (Videos)
	if ($('.latest-video').exists()) {
		$('.latest-video').each(function() {
			var lv_s = $(this).find('a span');
			var lv_w = $(this).width();
			var lv_h = $(this).height();
			lv_s.css('left',(lv_w/2)-26);
			lv_s.css('top',(lv_h/2)-46);
		})
	}
	   
});

// Making the jWPlayer call a bit more generic
function setupjw(playerID,track) {
	jwplayer(playerID).setup({
		autostart: false,
		file: track,
		flashplayer: "jwplayer/player.swf",
		width: "100%",
		height:"65",
		events: {
			onPlay: function(event) {
				var isiPad = navigator.userAgent.match(/iPad/i) != null; //fixing a nasty, really nasty bug on iPad.				
				var now_playing = this.id;
				$('.jw').each(function(){
				if (isiPad) {
					var other_player = $(this).find('div').attr('id');
				}
				else {
					var other_player = $(this).find('div').attr('id').slice(0,-8);
				}	
					if (other_player != now_playing) {
						jwplayer(other_player).stop();
					}
				})
			}
        }
	});
}

// Hyphenator
Hyphenator.run();