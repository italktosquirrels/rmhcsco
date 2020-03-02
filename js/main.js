var partone = '696438925',
		parttwo = '1677ed0',
		partthree = '278987d379b64ee2bb895bafede9d185',
		partowner = 696438925,
		mobileButton 			= $("button.burger"),
		searchButton 			= $("button.search-button"),
		filterNewsBox			= $("select.news-select"),
		filterDivNewsBox	= $("div.news-select"),
		//mobSearchBox 	= $("div.searchFormBlock"),
		//mobileToggle	= $("ul.firstMenu li span"),
		searchBox 				= $("div.searchFormBlock"),
		mobileHeader			= $("header"),
		//imageHTML 		= '<p class="imageHolder center"><img src="img/logo-mike-super-footer.svg" title="Mike Super - Magic &amp; Illusion" alt="Mike Super - Magic &amp; Illusion"><img></p>',
		scrolly						= $("ul.scrollerTime"),
		homeScroll				= $("ul.introInformation");

var didScroll;
var lastScrollTop = 0;
var delta 				= 5;
var navbarHeight 	= $('header').outerHeight();

var myHomeNewsSwiper;
var myScrollySwiper;
var myHomeInfoSwiper;


/**
* Function that tracks a click on an outbound link in Google Analytics.
* This function takes a valid URL string as an argument, and uses that
* URL string as the event label.
*/
var trackOutboundLink = function(url) {
	ga('send','event', 'Outbound Links', 'Link', ''+ url +'');
}
  /**
 * Function that tracks a click on an inbound link in Google Analytics.
 * This function takes a valid URL string as an argument, and uses that
 * URL string as the event label.
 */
var trackInternalLink = function(url,title) {
	ga('send', 'event', 'Internal Link', ''+ title +'', ''+ url +'', {'hitCallback':
	  function () {
	  document.location = url;
	  }
	});
}
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}


function backDrop() {
	var 	topper = $("header").outerHeight(true);//91,
			overlay = $('<div id="overlay" style="top: ' + topper +  'px; height: ' + $(document).height() + 'px; display: block;"> </div>');
	
	if ($("#overlay").length == 0) {
		// slide down the subnav...
		//toggleSlider();
		overlay.fadeIn(200,function() {
			$(this).css({
							opacity: 0, 
							background: '#000'
						}).animate({
							opacity:.90
						})
			}).appendTo(document.body).on('click',function() {
				if ( $(mobileButton).hasClass("active") ) {
					toggleMenu($(mobileButton));
				}
				if ( $(searchButton).hasClass("active") ) {
					//console.log('search');
					searchClose(searchBox);
				}
				
		});
	}	
}

// close overlay
function overlayClose() {
	$("#overlay").fadeOut(200,function() {
		$("#overlay").remove();
	});
}

/* HAMBURGER CLICK */
$(mobileButton).click( function(e) {
	e.preventDefault();
	toggleMenu($(mobileButton));
});
function toggleMenu(elem) {
	backDrop();
	$("body").css({"overflow":"hidden",'position':'fixed'});
	$("header").css({"overflow-y":"scroll","height":"100%"});
	if ( $(elem).hasClass("active") ) {
		overlayClose();
		$("body").removeAttr('style');
		$("header").removeAttr('style');
		//cleanUpHeader();	
	}
	$(elem).toggleClass("active");
	//var $this = $(this);
	//toggleMenu();
	
	var screenSize 	= viewport().width;
	if ( screenSize < 960 ) {
		$("nav").animate({
				height: "toggle",
				opacity: "toggle"
			}, 700);
	}
}


/* SEARCH BUTTON ACTION */
$(searchButton).click( function(e) {
	e.preventDefault();
	var screenSize 	= viewport().width;
	if ( searchBox.is(":visible") ) {
		searchClose(searchBox);
		if ( screenSize < 960 ) {
			$("body").removeAttr('style');
		}
	}
	else {
		searchOpen(searchBox);
		if ( screenSize < 960 ) {
			$("body").css({"overflow":"hidden",'position':'fixed'});
		}
	}   
	$(searchButton).toggleClass("active");
});
/* OPEN SEARCH BOX */
function searchOpen(elemBox) {
	//$(elemBox).animate({width: 'toggle'});
   	$(elemBox).fadeIn();
	var screenSize 	= viewport().width;
	if ( screenSize < 960 ) {
		if ( !$(elemBox).find("p.imageHolder").length ) {
			$(imageHTML).prependTo(elemBox);
		}
		backDrop();
	}
}
/* CLOSE SEARCH BOX */
function searchClose(elemBox) {
	$(elemBox).fadeOut();
	if ( $(elemBox).find("p.imageHolder").length ) {
		$(elemBox).find("p.imageHolder").remove();
	}
	//$(elemBox).animate({width: 'toggle'});
	overlayClose();
    elemBox.find('input.search').val('');
}
function recalcSticky(sizeMe) {
	if ( $(".stickyBlock").length != 0 ) {
		// NEED HEIGHT OF HEADER TO OFFSET STICKEY
		var stickeyOffset = $("header").outerHeight();
		console.log(stickeyOffset);
		sizeMe >= 768 ? $(".stickyBlock").stick_in_parent({offset_top:stickeyOffset}) : $(".stickyBlock").trigger("sticky_kit:detach");
	}
}
// FILTER NEWS REMOVE WIDE CLASS
function removeFilterNews(elem,twinElem) {
	if ( $(elem).hasClass("wide") ) {
		$(elem).removeClass("wide");
		$(elem).next("div").removeClass("wide");
	}
}
// FILTER NEWS ADD WIDE CLASS
function resetFilterNews(elem,twinElem) {
	if ( !$(elem).hasClass("wide") ) {
		$(elem).addClass("wide");
		$(elem).next("div").addClass("wide");
	}
}

function readNiceScroll(elem) {
    $(elem).niceScroll({
        cursorcolor:"#9c9c9c",
        cursorborder:"1px solid #9c9c9c",
		emulatetouch: false,
		preventmultitouchscrolling: true,
		cursorborderradius: 0, 
		cursorwidth:"15px", 
        autohidemode: false
    });
}

function enableHomeIntroScroll() {
	var homeScrollSettings = {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 28,
		breakpoints: {
			768: {
				slidesPerView: 2
			}
		},
		pagination: {
			el: '.lihomeInfoPagination',
			clickable: true,
			renderBullet: function (index, className) {
				currentIndex = ( index + 1);
				//return '<li class="' + className + '"><span>' + currentIndex + '</span></li>';
				return '<span class="' + className + '">' + currentIndex + '</span>';
			}
		}




	}
	$(homeScroll).each(function( index ) {
		swiperHomeContainer	= '<div id="InfoBlock' + index + '" class="swiper-container infoScrollContainer"><div class="homeInfoPaginationPrevNext"><ul class="swiper-pagination familyPagination"><li class="lihomeInfoPagination"></li></ul></div></div>';
		$(this).find("li").each(function( innerIndex ) {
			$(this).addClass("swiper-slide");
		});

		$(this).addClass("swiper-wrapper");
		$(swiperHomeContainer).insertBefore($(this));
		$(this).prependTo("#InfoBlock"+ index );

		//enableScrolly();
	});

	myHomeInfoSwiper = new Swiper('.infoScrollContainer', homeScrollSettings);

}




function enableScrolly() {
	var scrollySettings = {
		loop: false,
		slidesPerView: 'auto',
		centeredSlides: true,
		freeMode: true
	}
	if ( !$("div.scrollyContainer").length ) {
		$(scrolly).each(function( index ) {
			swiperContainer	= '<div id="blockage' + index + '" class="swiper-container scrollyContainer"></div>';
			$(this).find("li").each(function( innerIndex ) {
				$(this).addClass("swiper-slide");
			});

			$(this).addClass("swiper-wrapper");
			$(swiperContainer).insertBefore($(this));
			$(this).prependTo("#blockage"+ index );

			//enableScrolly();
		});
	
		myScrollySwiper = new Swiper('.scrollyContainer', scrollySettings);
		myScrollySwiper.slideTo($('ul.secondaryNav li.focus').index(), 1000, false);
	

	}

}

function disableScrolly() {
	// smoke styles & Classes
	$(scrolly).each(function( index ) {
		$(this).find("li").each(function( innerIndex ) {
			$(this).removeClass("swiper-slide").removeAttr('style');
		});
		$(this).removeClass("swiper-wrapper").removeAttr('style');
		$(this).insertBefore("#blockage"+ index );
		$("#blockage"+ index ).remove();
	});
	//myScrollySwiper.destroy(true, true);
}



// BEGIN PHOTOTOUR // * * * * * * * * * * * * * * * * * * * * *
function loadPhotoTour(intPage) {
	//////////// begin of ajax..
	$.post("/ajax/form/tour/",
	{ 
		feeder: 3,
		CurrentPage: intPage
	},
		function(data){
			
			var valueArray = data.split("|");
			for(var i=0; i<valueArray.length; i++){
				var filterHTML = valueArray[0];
				var filterPage = valueArray[1];
			}
			var theNewsContainer 				= $("#photoContainer"),
				theNewsContainerChildsLi 		= $("#photoContainer div figure"),
				theNewsContainerChildsLiHide 	= $("#photoContainer div figure.hide"),
				theNewsContainerChildsLiCnt 	= $(theNewsContainerChildsLi).length;
			
			if ( $(theNewsContainerChildsLiCnt).length != 0 ) {
				if (intPage == 1 ) {
					theNewsContainer.slideUp( "slow", function() {
						$(theNewsContainer).html('');
						$(theNewsContainer).slideDown();
						reloadPhotoTour(filterHTML,filterPage,0,theNewsContainer);
					});
				}
				else {
					reloadPhotoTour(filterHTML,filterPage,1,theNewsContainer);
				}
			}
			else {
				reloadPhotoTour(filterHTML,filterPage,0,theNewsContainer);	
			}
		}
	);
	////////////////////////end of ajax
}
function reloadPhotoTour(strHTML,strPaging,intAppendReload,holdingContainer) {
	//console.log(strHTML);
	//console.log(strPaging);
	//console.log(intAppendReload);
	//console.log(holdingContainer);
	
	if (intAppendReload == 1 ) {
		$(holdingContainer).find("p.loader").fadeOut();
		$(holdingContainer).find("div").append(strHTML);
		
		if ( $(holdingContainer).find("p.thePaginator").length != 0 ) {
			$(holdingContainer).find("p.thePaginator").fadeOut();
			$(holdingContainer).find("p.thePaginator").remove();
			$(holdingContainer).append(strPaging);
		}
	}
	else {
		$(holdingContainer).find("p.loader").fadeOut();
		$(holdingContainer).append(strHTML);
		$(holdingContainer).append(strPaging);
	}
	
	$(holdingContainer).find("figure.hide").each(function(i) {
		$(this).delay((i++) * 250).fadeTo(1000, 1, function(){
			$(this).removeClass("hide");
		});
	});
	
	// CHECK TO SEE IF PAGINATOR IS LISTED.
	if ( $(holdingContainer).find("p.thePaginator a").length != 0 ) {
		$(holdingContainer).find("p.thePaginator a").on('click',function(e) {
			e.preventDefault();
			$(holdingContainer).find("p.loader").insertBefore("p.thePaginator").fadeIn();
			var intPageID 	= $(holdingContainer).find("p.thePaginator a").attr("data-id");
			loadPhotoTour(intPageID);
		});
	}
}

// END PHOTO TOUR // * * * * * * * * * * * * * * * * * * * * *

// BEGIN NEWS AND EVENTS // * * * * * * * * * * * * * * * * * * * * *
function loadNews(intPage, intCat) {
	//////////// begin of ajax..
	$.post("/ajax/form/news/",
	{ 
		feeder: 3,
		CurrentPage: intPage,
		category: intCat
	},
		function(data){
			
			var valueArray = data.split("|");
			for(var i=0; i<valueArray.length; i++){
				var filterHTML = valueArray[0];
				var filterPage = valueArray[1];
			}
			var theNewsContainer 				= $("#newsContainer"),
				theNewsContainerChildsLi 		= $("#newsContainer ul li"),
				theNewsContainerChildsLiHide 	= $("#newsContainer ul li.hide"),
				theNewsContainerChildsLiCnt 	= $(theNewsContainerChildsLi).length;
			
			if ( $(theNewsContainerChildsLiCnt).length != 0 ) {
				if (intPage == 1 ) {
					theNewsContainer.slideUp( "slow", function() {
						$(theNewsContainer).html('');
						$(theNewsContainer).slideDown();
						reloadNews(filterHTML,filterPage,0,intCat,theNewsContainer);
					});
				}
				else {
					reloadNews(filterHTML,filterPage,1,intCat,theNewsContainer);
				}
			}
			else {
				reloadNews(filterHTML,filterPage,0,intCat,theNewsContainer);	
			}
		}
	);
	////////////////////////end of ajax
}
function reloadNews(strHTML,strPaging,intAppendReload,intCat,holdingContainer) {
	//console.log(strHTML);
	//console.log(strPaging);
	//console.log(intAppendReload);
	//console.log(holdingContainer);
	
	if (intAppendReload == 1 ) {
		$(holdingContainer).find("p.loader").fadeOut();
		$(holdingContainer).find("ul").append(strHTML);
		
		if ( $(holdingContainer).find("p.thePaginator").length != 0 ) {
			$(holdingContainer).find("p.thePaginator").fadeOut();
			$(holdingContainer).find("p.thePaginator").remove();
			$(holdingContainer).append(strPaging);
		}
	}
	else {
		$(holdingContainer).find("p.loader").fadeOut();
		$(holdingContainer).append(strHTML);
		$(holdingContainer).append(strPaging);
	}
	
	$(holdingContainer).find("li.hide").each(function(i) {
		$(this).delay((i++) * 250).fadeTo(1000, 1, function(){
			$(this).removeClass("hide");
		});
	});
	
	// CHECK TO SEE IF PAGINATOR IS LISTED.
	if ( $(holdingContainer).find("p.thePaginator a").length != 0 ) {
		$(holdingContainer).find("p.thePaginator a").on('click',function(e) {
			e.preventDefault();
			$(holdingContainer).find("p.loader").insertBefore("p.thePaginator").fadeIn();
			var intPageID 	= $(holdingContainer).find("p.thePaginator a").attr("data-id");
			loadNews(intPageID,intCat);
		});
	}
}

// END NEWS AND EVENTS // * * * * * * * * * * * * * * * * * * * * *

// BEGIN FAMILIES // * * * * * * * * * * * * * * * * * * * * *
function loadFamilies(intPage) {
	//////////// begin of ajax..
	$.post("/ajax/form/families/",
	{ 
		feeder: 3,
		CurrentPage: intPage
	},
		function(data){
			
			var valueArray = data.split("|");
			for(var i=0; i<valueArray.length; i++){
				var filterHTML = valueArray[0];
				var filterPage = valueArray[1];
			}
			var theNewsContainer 				= $("#familyContainer"),
				theNewsContainerChildsLi 		= $("#familyContainer ul li"),
				theNewsContainerChildsLiHide 	= $("#familyContainer ul li.hide"),
				theNewsContainerChildsLiCnt 	= $(theNewsContainerChildsLi).length;
			
			if ( $(theNewsContainerChildsLiCnt).length != 0 ) {
				if (intPage == 1 ) {
					theNewsContainer.slideUp( "slow", function() {
						$(theNewsContainer).html('');
						$(theNewsContainer).slideDown();
						reloadFamilies(filterHTML,filterPage,0,theNewsContainer);
					});
				}
				else {
					reloadFamilies(filterHTML,filterPage,1,theNewsContainer);
				}
			}
			else {
				reloadFamilies(filterHTML,filterPage,0,theNewsContainer);	
			}
		}
	);
	////////////////////////end of ajax
}
function reloadFamilies(strHTML,strPaging,intAppendReload,holdingContainer) {
	//console.log(strHTML);
	//console.log(strPaging);
	//console.log(intAppendReload);
	//console.log(holdingContainer);
	
	if (intAppendReload == 1 ) {
		$(holdingContainer).find("p.loader").fadeOut();
		$(holdingContainer).find("ul").append(strHTML);
		
		if ( $(holdingContainer).find("p.thePaginator").length != 0 ) {
			$(holdingContainer).find("p.thePaginator").fadeOut();
			$(holdingContainer).find("p.thePaginator").remove();
			$(holdingContainer).append(strPaging);
		}
	}
	else {
		$(holdingContainer).find("p.loader").fadeOut();
		$(holdingContainer).append(strHTML);
		$(holdingContainer).append(strPaging);
	}
	
	$(holdingContainer).find("li.hide").each(function(i) {
		$(this).delay((i++) * 250).fadeTo(1000, 1, function(){
			$(this).removeClass("hide");
		});
	});
	
	// CHECK TO SEE IF PAGINATOR IS LISTED.
	if ( $(holdingContainer).find("p.thePaginator a").length != 0 ) {
		$(holdingContainer).find("p.thePaginator a").on('click',function(e) {
			e.preventDefault();
			$(holdingContainer).find("p.loader").insertBefore("p.thePaginator").fadeIn();
			var intPageID 	= $(holdingContainer).find("p.thePaginator a").attr("data-id");
			loadFamilies(intPageID);
		});
	}
}
// END FAMILIES // * * * * * * * * * * * * * * * * * * * * *

function playVideoVersion(sizeMe,vidBlock) {
	var videoBlock 			= $("video.headVideo"),
		videoBlockSource	= $("video.headVideo source"),
		videoMobVersion 	= $(vidBlock).attr("data-vidmobile"),
		videoMobClass			= "mobileMode",		
		videoDeskVersion	= $(vidBlock).attr("data-vid"),
		videoDeskClass		= "deskMode",
		runVideo					= false;	

	if ( sizeMe <= 640 && $(videoBlock).hasClass(videoDeskClass) ) {
		newSrc 		= videoMobVersion;
		newClass 	= videoMobClass;
		runVideo 	= true;
		$(videoBlock).removeClass(videoDeskClass);
	}
	if ( sizeMe > 640 && $(videoBlock).hasClass(videoMobClass) ) {
		newSrc 		= videoDeskVersion;
		newClass 	= videoDeskClass;
		runVideo 	= true;
		$(videoBlock).removeClass(videoMobClass);
	}

	if (runVideo) {
		$(videoBlockSource).remove(); // smoke the source
		video = $(videoBlock).append('<source src="'+ newSrc + '" type="video/mp4">'); // append the new source
		$(videoBlock).addClass(newClass); // add class
		video[0].load(); // load it.
		video[0].play(); // play it.
	}
}


function resetTopNav() {
	if ( $("header nav ul.topper li.mobile").length ) {
		$("header nav ul.topper li.mobile" ).prependTo("ul.topNav");
	}
}
function moveTopNav() {
	if ( $("ul.topNav li.mobile").length ) {
		$("ul.topNav li.mobile" ).appendTo("header nav ul.topper");
	}
}
function removeNavBlock() {
	if ( $("header nav").length ) {
		$("header nav").removeAttr("style");
		$("div.miningMenu").removeAttr("style");
		if ( $(mobileButton).hasClass("active") ) {
			toggleMenu($(mobileButton));
		}
	}
}

/* header */
function checkHeaderVisible(sizeMe,PositionMe) {
	if ( sizeMe < 768 ) {
		//var heightSection = $("section#page").height() - $('section#page header').height();
		var heightSection = $('header').height() ;
		// remove fixed from header and allow scrolling to happen,  when closed add back in fixed..
		
		if ( $("button.burger").hasClass("active") ) {
			//var offsetter = $("header").offset();
			//var w = $(window);	
			$("button.burger").parents("header").css("position","relative");
			//.css("top",w.scrollTop())
			//offsetter.top-
			
		}
	
		if ( PositionMe > heightSection && !$("button.burger").hasClass("active") ) {
			$('header').fadeOut();
		} else {
			$('header').fadeIn();
		}
	}
	else {
		$('header').fadeIn();
	}
}



$( document ).ready(function() {
    var screenSize 	= viewport().width,
				resizeTimer			= null,
				yAxis						= $(this).scrollTop(),
				searchBox 			= $("div.searchFormBlock"),
				totalWidth 			= 0,
				bigVideo				= $("video.headVideo"),
				btnMealsHeal		= $("a.calendarSponsor"),
				mealsHealForm		= $("div.mealsHealForm");
		//tourBack	= $("p.tourBack"),
		//frontNews	= $("div.homepagenews-container"),
		//linkGMap	= $("a.engageMap"),
		//filterOps	= $( "ul.tourFilter li.colFilter");
	// check header
	checkHeaderVisible(screenSize,yAxis);
	
	if ( $(scrolly).length ) {
		// add up LI widths
		$(scrolly).find("li").each(function( innerIndex ) {
			totalWidth += parseInt($(this).outerWidth(true), 10);
		});
		//console.log(totalWidth);
		if ( screenSize < totalWidth ) {
			
			/*$(scrolly).each(function( index ) {
				swiperContainer	= '<div id="blockage' + index + '" class="swiper-container scrollyContainer"></div>';
				$(this).find("li").each(function( innerIndex ) {
					$(this).addClass("swiper-slide");
				});

				$(this).addClass("swiper-wrapper");
				$(swiperContainer).insertBefore($(this));
				$(this).prependTo("#blockage"+ index );*/

				enableScrolly();
			/*});*/
		}
	}

	// ENGAGE MEALS THAT HEAL FORM
	$(btnMealsHeal).click( function(e) {
		e.preventDefault();
		$(mealsHealForm).slideToggle();
		$( "textarea" ).autogrow();
	});	


	// HOME PAGE SCROLLER FOR TOP BLOCK
	if ( $(homeScroll).length ) {
		if ( screenSize < 960 ) {
			enableHomeIntroScroll();
		}
	}


	// MOVE TOP NAV
	if ( screenSize < 960 ) {
		moveTopNav();
	}
	if ( screenSize >= 600 ) {
		removeFilterNews(filterNewsBox,filterDivNewsBox);
	}


	// MOBILE CHEVRON CLICK 
	$("ul.topper li a i").click( function(e) {
		e.preventDefault();
		$(this).toggleClass("open");
		//if ( $(this).hasClass("open") ) {
			$(this).parent().next("div").slideToggle();
		//}
	});

	if ( $(bigVideo).length ) {
		playVideoVersion(screenSize,bigVideo);
	}

	/* FAQ TOGGLE */
	$("h4.faqQuestion").click( function(e) {
		e.preventDefault();
		$(this).find("span").toggleClass("clicked");
		$(this).next("div").slideToggle();
	});	

	// TOOLTIP ADDING FOCUS CLASS	
	$("img.tooltip").click( function(e) {
		$(this).toggleClass("focus");
	}); 

	// CALCULATE STICKY
    recalcSticky(screenSize);
		
	/* FOOTER NEWSLETTER */
	$("#formNewsletter").submit(function(e) {
		e.preventDefault();

		var frmFullName         = $("#newsletterFullName"),
			frmEmailAddy        = $("#newsletterEmail"),
			frmFullNameVal      = $("#newsletterFullName").val(),
			frmEmailAddyVal     = $("#newsletterEmail").val(),
			frmResponse         = $("div.response"),
			frmResponseHTML     = '',
			frmError            = 0;
		// clear out message (resubmission)
		$("div.response, #formNewsletter input, #formNewsletter label").removeClass('error');
		$(frmResponse).html('');
		
		// make sure fullname is not blank
		if (!$.trim(frmFullNameVal).length) { // zero-length string AFTER a trim
			$(frmFullName).addClass('error');
			frmError    = 1;
			frmResponseHTML += '<li>Please fill in your name</li>';
		}
		// make sure email addy is not blank
		if (!$.trim(frmEmailAddyVal).length) { // zero-length string AFTER a trim
			$(frmEmailAddy).addClass('error');
			frmError    = 1;
			frmResponseHTML += '<li>Please fill in a valid email address</li>';
		}
		// validate email address
		if ( !validateEmail(frmEmailAddyVal) ) {
			$(frmEmailAddy).addClass('error');
			frmError    = 1;
			frmResponseHTML += '<li>Please fill in a valid email address</li>';
		}
		
		if ( frmError == 0 ) {  // form seems good to go, let's work with what we got.
			// i like control over serialize.
			// find which group is selected.
			var frmData = {
				frmCategory: 1,
				psdFullName: frmFullNameVal,
				psdEmailAddress: frmEmailAddyVal
			}
			$.ajax({
				type: "POST",
				url: '/ajax/form/',
				data: frmData,
				success: function(data) {
					var valueArray = data.split("|"),
						responseStatus = valueArray[0],
						responseMessage = valueArray[1];
					
						//success message maybe...
						$(frmResponse).html(responseMessage);
						if (responseStatus == 0) {
							$(frmResponse).addClass('error');
						}
						if (responseStatus == 1) {
							$("#formNewsletter").slideUp( 500, function() {
								$(this).html('');
							});
							
							// send to Google.
							if (typeof ga === 'function') {
								ga('send', {
									hitType: 'event',
									eventCategory: 'Form',
									eventAction: 'Submit',
									eventLabel: 'Newsletter Form'
									});
								//ga('send', 'event', 'Form','Submit','Newsletter Form');
							}

						}
				}
			});
		}
		else { // stop the press, show them some errors.
			$(frmResponse).addClass('error');
			$(frmResponse).html('<p>Please review the following errors.</p><ol>' + frmResponseHTML + '</ol>');
		}
	});

	// scrolly action
	$(document).scroll(function () {
		var yAxis 		= $(this).scrollTop();
		var screenSize 	= viewport().width;
		checkHeaderVisible(screenSize,yAxis);
	});


	$(window).resize(function() {

		var screenSize 	= viewport().width,
			totalWidth = 0,
			//resizeTimer 	= null,			
			yAxis		= $(this).scrollTop();
		clearTimeout(resizeTimer);

		resizeTimer= setTimeout(function() {

			// REMOVE NEWS FILTER
			if ( screenSize >= 600 ) {
				removeFilterNews(filterNewsBox,filterDivNewsBox);
			}
			// ADD NEWS FILTER
			if ( screenSize < 600 ) {
				resetFilterNews(filterNewsBox,filterDivNewsBox);
			}

			// mobile header
			checkHeaderVisible(screenSize,yAxis);

			// RESET TOP NAV
			if ( screenSize >= 960 ) {
				resetTopNav();
				removeNavBlock();				
			}
			// MOVE  TOP NAV
			if ( screenSize < 960 ) {
				moveTopNav();				
			}


			// video
			if ( $(bigVideo).length ) {
				playVideoVersion(screenSize,bigVideo);
			}

			if ( $(scrolly).length ) {

				$(scrolly).find("li").each(function( innerIndex ) {
					totalWidth += parseInt($(this).outerWidth(true), 10);
				});
				
				if ( screenSize < totalWidth ) {	
					enableScrolly();
				}
				if ( screenSize > totalWidth ) {
					disableScrolly();
				}
			}

		}, 200);


	});
	// end resize

		
		
});
// end document ready		