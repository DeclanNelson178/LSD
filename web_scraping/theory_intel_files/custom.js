/**

	FOR CLIENT-SPECIFIC CUSTOM FUNCTIONS AND CONFIGURATIONS

	Available variables:
		bubbleTheme: Changes color scheme of bubbles.
			- Type: string
			- Default: "light"
			- Options: "light", "dark"
		overflowTabs.enabled: Turn on or off the behavior of collapsing overflow tabs to a "more" button
			- Type: boolean
			- Default: false
			- Options: true, false
		overflowTabs.label: Set the label of the overflowed tabs button
			- Type: string
			- Default: "More"
		overflowTabs.label_solo: Set the label of the overflowed tabs button
			when it is the only tab visible (e.g.: all others are collapsed)
			- Type: string
			- Default: "Page sections"
		anchorOffset: A value to offset anchor clicks to due to sticky header
			- Type: Int
			- Default: 0
*/

//detect if we're on a touch device
if(("ontouchstart" in document.documentElement)) {document.documentElement.className += " touch";}
//detect no js
(function(H){H.className = H.className.replace(/\bno-js\b/,'js')})(document.documentElement);

overflowTabs.enabled = false;

$(document).ready(function(){

	//Show menu when focused
	$('.accessible li a').focus(function() {$('.accessible').addClass('show');});
	$('.accessible li a').blur(function() {$('.accessible').removeClass('show');});

	//Universal scroll function
	$(window).scroll(function() {
		var scrollTrigger = 300;
		var scrollTop = $(window).scrollTop();
		if(scrollTop > scrollTrigger) {
			backToTop(true);
		} else {
			backToTop(false);
		}
	});

	//Back To Top button
	var backToTop = function (show) {
		if (show) {
			$("#totop").addClass("show");
		} else {
			$("#totop").removeClass("show");
		}
	};
	$('#totop').click(function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 250);
	});

	//data-toggle support - use to toggle elements with button/a tag
	$("[data-toggle]").click(function() {
		dataToggle(this);
	});

	//Check width stuff
	var querywidth = 768 - (window.innerWidth - $('body').width());
	function checkWidth() {
		if ($(window).width() < querywidth) {
			flipAria($("#sidebar-toggle"),$("#sidebar"),false);
			flipAria($("#hamburger"),$("#navigation"),false);
			bubblewidth = '100%';
		} else {
			$('#sidebar').show();
			$("#navigation").show();
			flipAria($("#sidebar-toggle"),$("#sidebar"),true);
			flipAria($("#hamburger"),$("#navigation"),true);
			bubblewidth = '450';
		}
	};

	//Check width helpers
	if(typeof checkWidth === "function") {
		var $window = $(window);
		var windowWidth = $window.width();
		window.addEventListener("resize", function() {
			if($window.width() != windowWidth) {
				checkWidth();
				windowWidth = $window.width();
			}
		});
		//Execute on load
		checkWidth();
	}


	//header nav dropdowns
	$('#navigation li a').mouseenter(function(){
		if ($(window).width() >= querywidth) {
			$('#navigation li.isparent').removeClass('opened');
			$(this).parents('li.isparent').addClass('opened');
		}
	});
	$('#navigation').mouseleave(function(){
		if ($(window).width() >= querywidth) {
			$('#navigation li').removeClass('opened');
		}
	});
	$('#navigation li a').focusin(function(){
		if ($(window).width() >= querywidth) {
			$('#navigation li.isparent').removeClass('opened');
			$(this).parents('li.isparent').addClass('opened');
		}
	});
	$('body').focusin(function(e){
		if ($(window).width() >= querywidth) {
			if(!$(e.target).parents("li").is('#navigation li')) {
				$('#navigation li.isparent').removeClass('opened');
			}
		}
	});

	$("#cat-search-toggle").click(function(){
		if( $("body").hasClass("search-open")) {
			$("body").removeClass("search-open");
		}else{
			$("body").addClass("search-open");
		}

	});
	$("#cat-search-close").click(function(e){
		event.preventDefault();
		$("#cat-search-toggle").click();
	});
	$("#cat-search #cat-search-form::before").click(function(e){
		event.preventDefault();
		$("#cat-search-toggle").click();
	});

	function keyPress (e) {
	    if(e.key === "Escape") {
	        if( $("body").hasClass("search-open")){
				$("#cat-search-toggle").click();
			}
	    }
	}



	//fix anchors being behind sticky header
	/* $(".page_content a").click(function(e) {
      if(/^#/.test($(this).attr("href")) === true) {
			e.preventDefault();
         if(!$(this).attr("nav-id") || !$(this).attr("nav-id").length) {
				var target = $(this).attr("href");
            if(target.length && target !== "#") {
					if($(target).offset) {
	      			$("html,body").animate({
	      				scrollTop: $(target).offset().top - anchorOffset
	      			}, 250);
					} else {
						//a name attr
						target = $("a[name='"+target.replace("#","")+"']");
						$("html,body").animate({
	      				scrollTop: $(target).offset().top - anchorOffset
	      			}, 250);
					}
      		}
         }
      }
	}); */


});

//for toggle navigation (navmaster.getTOC istoggle:true)
function toggleNav(e) {
   $(e).parent().next("ul.nav").slideToggle("fast");
	flipAria($(e),$(window).scrollTop());
   $(e).toggleClass("open");
}
