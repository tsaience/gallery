//mod -> post navi
//mod -> slider

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	UxCBMod.body = $('body');
	
	//bm tab slider
	UxCBMod.fnBMTabSlider = function(sliderWrap){
		sliderWrap.each(function(){
			var slider = $(this),
				moduleInside = slider.parents('.module-inside'),
				defaultLogo = 'default-logo',
				defaultMenu = 'default-menu',
				firstLogo = slider.find('.bm-tab-slider-trigger-item:first-child').find('.bm-tab-slider-trigger-tilte').data('logocolor'),
				firstMenu = slider.find('.bm-tab-slider-trigger-item:first-child').find('.bm-tab-slider-trigger-tilte').data('menucolor');
				
			var currentModuleInsideClass = '';
			var sliderSpacing = slider.offset().top;

			if(UxCBMod.body.hasClass('alt-logo')) {
				defaultLogo = 'alt-logo';
			}

			if($('.non_bg_header').length && $('.page_from_top').length) {
				if(defaultLogo != firstLogo && sliderSpacing < 80) {
					defaultLogo = firstLogo;
					UxCBMod.body.removeClass(defaultLogo).addClass(firstLogo);
				}
				if(defaultMenu != firstMenu && sliderSpacing < 80) {
					defaultMenu = firstMenu;
					UxCBMod.body.removeClass(defaultMenu).addClass(firstMenu);
				}
			}
			
			if(Modernizr.touchevents){

				slider.find('.bm-tab-slider-trigger-tilte').on('touchstart', function(e) {
					var titleItem = $(this),
						itemID    = titleItem.data('id'),
						logoColor = titleItem.data('logocolor'),
						menuColor = titleItem.data('menucolor'); 
	
					if($('.non_bg_header').length && $('.page_from_top').length) {

						if(defaultLogo != logoColor && sliderSpacing < 80) {
							UxCBMod.body.removeClass(defaultLogo).addClass(logoColor);
							defaultLogo = logoColor;
						}
					 
						if(defaultMenu != menuColor && sliderSpacing < 80) {
							UxCBMod.body.removeClass(defaultMenu).addClass(menuColor);
							defaultMenu = menuColor;
						}

						if(UxCBMod.body.hasClass('default-logo-menu-mobile')) {
						 		UxCBMod.body.removeClass('default-logo-menu-mobile');
					 	}
					 	if(UxCBMod.body.hasClass('alt-logo-menu-mobile')) {
					 		UxCBMod.body.removeClass('alt-logo-menu-mobile');
					 	}
					}
	
					if( !titleItem.parents('.bm-tab-slider-trigger').siblings('.bm-tab-slider-img').find('#'+itemID).hasClass('bm-active') ) {
						titleItem.parents('.bm-tab-slider-trigger').siblings('.bm-tab-slider-img').find('#'+itemID).addClass('bm-active');
						titleItem.parents('.bm-tab-slider-trigger').siblings('.bm-tab-slider-img').find('#'+itemID).siblings('.bm-tab-slider-img-item').removeClass('bm-active');
					}
	
					if(!titleItem.hasClass('bm-active')) {
						titleItem.addClass('bm-active');
						titleItem.parent('.bm-tab-slider-trigger-item').siblings().find('.bm-tab-slider-trigger-tilte').removeClass('bm-active');
						e.preventDefault();
						return false;
					}
					
				});
	
			} else {

				slider.find('.bm-tab-slider-trigger-tilte').hover(function(){
					var titleItem = $(this),
						itemID    = titleItem.data('id'),
						logoColor = titleItem.data('logocolor'),
						menuColor = titleItem.data('menucolor'); 
					if($('.non_bg_header').length && $('.page_from_top').length) {
						if(defaultLogo != logoColor && sliderSpacing < 80) {
							UxCBMod.body.removeClass(defaultLogo).addClass(logoColor);
							defaultLogo = logoColor;
						}
					}
					if($('.non_bg_header').length && $('.page_from_top').length) {
						if(defaultMenu != menuColor && sliderSpacing < 80) {
							UxCBMod.body.removeClass(defaultMenu).addClass(menuColor);
							defaultMenu = menuColor;
						}
					}
	
					if(!titleItem.hasClass('bm-active')) {
						titleItem.addClass('bm-active');
						titleItem.parent('.bm-tab-slider-trigger-item').siblings().find('.bm-tab-slider-trigger-tilte').removeClass('bm-active');
					}
	
					if( !titleItem.parents('.bm-tab-slider-trigger').siblings('.bm-tab-slider-img').find('#'+itemID).hasClass('bm-active') ) {
						titleItem.parents('.bm-tab-slider-trigger').siblings('.bm-tab-slider-img').find('#'+itemID).addClass('bm-active');
						titleItem.parents('.bm-tab-slider-trigger').siblings('.bm-tab-slider-img').find('#'+itemID).siblings('.bm-tab-slider-img-item').removeClass('bm-active');
					}
					
					moduleInside.removeClass(currentModuleInsideClass);
					currentModuleInsideClass = itemID;
					moduleInside.addClass(itemID);
	
				},function(){
					return false;
				});
	
			}
		});
	}
	
	//carousel
	UxCBMod.fnCarousel = function(carouselWrap){
		carouselWrap.each(function(){
			var carousel = $(this),
			carouselParent     = carousel.parent('.slider-mod-wrap'),
			carouselMargin     = carousel.data('margin'),
			carouselMarginMobil= carousel.data('marginmobile'),
			carouselCenter     = carousel.data('center'),
			carouselItem       = carousel.data('item'),
			carouselMobileItem = carousel.data('mobileitem'),
			carouselAutoW      = carousel.data('autowidth'),
			carouselSlideby    = carousel.data('slideby'),
			carouselAuto       = carousel.data('auto'),
			carousePlayTimeout = carousel.data('autoplaytimeout'),
			carouselShowdot    = carousel.data('showdot'),
			carouselShownav    = carousel.data('nav'),
			carouselAnimateIn  = carousel.data('animatein'),
			carouselAnimateOut = carousel.data('animateout'),
			carouselLoop	   = carousel.data('loop'),
			carouselLazyLoad   = carousel.data('lazy'),
			carouselTransiSpeed= carousel.data('transition'),
			carouselMouseDrag  = carousel.data('mousedrag');

			var currentModuleInsideClass = '';
			
			setTimeout(function(){
				carousel.owlCarousel({
					margin          : carouselMargin,
					loop            : carouselLoop,
					autoWidth       : carouselAutoW,
					center          : carouselCenter,
					animateIn       : carouselAnimateIn,
					animateOut      : carouselAnimateOut,
					slideSpeed      : carouselTransiSpeed,
					mouseDrag       : carouselMouseDrag,
					paginationSpeed : 400,
					items           : carouselItem,
					autoplay        : carouselAuto,
					responsiveClass : true,
					navText         : ["",""],
					slideBy         : carouselSlideby,
					dots            : carouselShowdot, 
					nav             : carouselShownav,
					autoplayTimeout : carousePlayTimeout,
					smartSpeed		: carouselTransiSpeed,
					lazyLoad: carouselLazyLoad,
					responsive: {
						0:{
							items: carouselMobileItem,
							margin: carouselMarginMobil
						}, 
						481:{
							items: carouselItem,
							margin: carouselMarginMobil
						}, 
						769:{
							items: carouselItem,
							margin: carouselMargin
						}
					}
				});
				
				if(carouselParent.find('#slider-arrow-left').length) {
					carouselParent.find('#slider-arrow-left').on('touchstart click', function() {
						carousel.trigger('prev.owl.carousel', [carouselTransiSpeed]);
						return false;
					});
				}
				
				if(carouselParent.find('#slider-arrow-right').length) {
					carouselParent.find('#slider-arrow-right').on('touchstart click', function() {
						carousel.trigger('next.owl.carousel', [carouselTransiSpeed]);
						return false;
					});
				}

				var _default_logo = 'default-logo'; 
				if(UxCBMod.body.hasClass('alt-logo')) {
					_default_logo = 'alt-logo';
				}
				var _default_menu = 'default-menu'; 
				if(UxCBMod.body.hasClass('alt-menu')) {
					_default_menu = 'alt-menu';
				}
				var real_default_logo = _default_logo,
					real_default_menu = _default_menu;

				//Reset autoplaytimeout
				carousel.on('changed.owl.carousel', function(e) {
					if(carouselAuto){
			        	carousel.trigger('stop.owl.autoplay');
			        	carousel.trigger('play.owl.autoplay');
			        } 
			    });

				//Press keybord to navigation
				$(document).on('keydown', function( event ) {
				    if(event.keyCode == 37) {
				        carousel.trigger('prev.owl');
				        carousel.trigger('stop.owl.autoplay');
				    }
				    if(event.keyCode == 39) {
				        carousel.trigger('next.owl');
				        carousel.trigger('stop.owl.autoplay');
				    }
				});
				
				carousel.on('changed.owl.carousel', function(event){

					var currentItem = event.item.index + 1;
					var currentItemPost = carousel.find('.owl-item:nth-child('+currentItem+')').find('section');
					var currentItemPostClass = carousel.find('.owl-item:nth-child('+currentItem+')').find('section').data('id');
					var moduleInside = carousel.parents('.module-inside');
					var currentItemLogoColor = currentItemPost.attr('data-logocolor');
					var currentItemMenuColor = currentItemPost.attr('data-menucolor');
					
					moduleInside.removeClass(currentModuleInsideClass);
					currentModuleInsideClass = currentItemPostClass;
					moduleInside.addClass(currentItemPostClass);

					//set logo color
					if($('.non_bg_header').length && $('.page_from_top').length && carousel.parents('.slider-style1').length) {
						var carouselParentTopSpacing = carouselParent.offset().top;
 						if(carouselParentTopSpacing < 80){
 							if(!UxCBMod.body.hasClass('header-scrolled')) {
								if(_default_logo != currentItemLogoColor) {
							  		UxCBMod.body.removeClass(_default_logo).addClass(currentItemLogoColor);
							 		_default_logo = currentItemLogoColor;
							 	}
							 	if(_default_menu != currentItemMenuColor) {
							  		UxCBMod.body.removeClass(_default_menu).addClass(currentItemMenuColor);
							 		_default_menu = currentItemMenuColor;
							 	}
							 	if(UxCBMod.body.hasClass('default-logo-menu-mobile')) {
							 		UxCBMod.body.removeClass('default-logo-menu-mobile');
							 	}
							 	if(UxCBMod.body.hasClass('alt-logo-menu-mobile')) {
							 		UxCBMod.body.removeClass('alt-logo-menu-mobile');
							 	}
							 } else {
							 	if(real_default_logo != _default_logo) {
							 		UxCBMod.body.removeClass(_default_logo).addClass(real_default_logo);
							 	}
							 }
						 }
						 
					}
				});

			},10)

		});
	}
	
	//UxCBMod init
	UxCBMod.fnInit = function(){
		UxCBMod.module = $('.bm-builder > .module');
		
		if(!UxCBMod.module.length){
			if($('.bm-builder > .bm-row').length){
				UxCBMod.module = $('.bm-builder > .bm-row > .module');
			}
		}
		
		UxCBMod.bmTabSlider = UxCBMod.module.find('.bm-tab-slider');
		UxCBMod.carousel = UxCBMod.module.find('.owl-carousel');
		
		//carousel
		if(UxCBMod.carousel.length){
			UxCBMod.fnCarousel(UxCBMod.carousel);
		}
		
		//bm tab slider
		if(UxCBMod.bmTabSlider.length){
			UxCBMod.fnBMTabSlider(UxCBMod.bmTabSlider);
		}
		
		//module slider arrow
		if($('.module .arrow-is-svg').length){
			$('.module .arrow-is-svg').each(function() {
				var image = $(this);
                var imageSrc = image.attr('src');
				
				$.get(imageSrc, 'html').done(function(result){
					var svg = $(result).find('svg');
					
					image.after(svg);
					image.remove();
				});
            });
		}
	};
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['slider'] = UxCBMod;
		}	
	});
	
	//win load
	UxCBMod.win.on('load',function(){
		UxCBMod.fnInit();
	});
	
	
})(jQuery);