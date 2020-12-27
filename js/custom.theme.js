// ART HTML JavaScript codes
(function($){

  "use strict"; 
	
	var themeData                = [];
	
	//window
	themeData.win                = $(window);
	themeData.winHeight          = window.innerHeight;
	themeData.winScrollTop       = themeData.win.scrollTop();
	themeData.winHash            = window.location.hash.replace('#', '');
	
	//document
	themeData.doc                = $(document);

	//ID A~Z
	themeData.backTop            = $('#back-top');
	themeData.headerWrap         = $('#header');
	themeData.footerWrap         = $('#footer');
	themeData.MenuPanel			 = $('#menu-panel');
	themeData.MenuOverTrigger    = $('#navi-trigger');
	themeData.MenuPanel2		 = $('#menu-panel2');
	themeData.MenuOverTrigger2   = themeData.MenuPanel2.find('.navi-trigger');
	themeData.jplayer            = $('#jquery_jplayer');
	themeData.headerNavi         = $('#navi-header');
	themeData.scrollWidthGet	 = $('#get-scroll-width');	
	themeData.searchOpen         = $('.search-top-btn-class');
	themeData.commentform        = $('#commentform');
	themeData.wrapOuter			 = $('#wrap-outer');

	//tag
	themeData.body               = $('body');
	
	//tag class 
	themeData.uxResponsive       = $('body.responsive-ux');
	themeData.wrapAll 			 = $('.wrap-all');
	themeData.pageLoading        = $('.page-loading');
	themeData.menupanelMenu      = $('.menu-panel .menu');
	themeData.naviWrap           = $('.navi-wrap');
	themeData.pagenumsDefault    = $('.pagenums-default');
	themeData.headerIcon    	 = $('.portfolio-icon');
	themeData.fullscreenWrap	 = $('.fullscreen-wrap');
	themeData.cookieconsentSet	 = $('.sea-cookieconsent-btn[data-type="cookie-bar"]');
	

	var switchWidth 			 = 767;

	//condition
	themeData.isResponsive = function(){
		if(themeData.uxResponsive.length){
			return true;
		}else{
			return false;
		} 
	}

	function art_get_browser(){
	    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	    if(/trident/i.test(M[1])){
	        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
	        return {name:'IE',version:(tem[1]||'')};
	        }   
	    if(M[1]==='Chrome'){
	        tem=ua.match(/\bOPR\/(\d+)/)
	        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
	        }   
	    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	    return {
	      name: M[0],
	      version: M[1]
	    };
	}

	function sea_getOS() {
		var userAgent = window.navigator.userAgent,
		  platform = window.navigator.platform,
		  macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		  iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		  os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			if(window.navigator.maxTouchPoints > 1){
				os = 'iOS';
			}else{
				os = 'MacOS';
			}
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'iOS';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'Windows';
		} else if (/Android/.test(userAgent)) {
			os = 'Android';
		} else if (!os && /Linux/.test(platform)) {
			os = 'Linux';
		}

		return os;
	}

	var art_browser = art_get_browser();
	var art_os = sea_getOS();

	themeData.body.addClass(art_browser.name + art_browser.version + ' ' + art_os);
	

	//Function 

	//Search show
	themeData.fnSerchShow = function(){

		var 
		_menuPanel = $('.menu-panel'),
		_search_btn = themeData.searchOpen.find('.fa-search'),
		_search_form = _search_btn.siblings('form'),
		_panel_bottom_right = $('.menu-panel-bottom-right'),
		_panel_wpml = $('.wpml-translation');

		_search_btn.on('click',function(){

			if(_menuPanel.hasClass('search_top_form_shown')){
				_menuPanel.removeClass('search_top_form_shown');
				_menuPanel.find('.search_top_form_text').blur(); 
				_panel_wpml.css('display','block');
			} else {
				_menuPanel.addClass('search_top_form_shown');
				_menuPanel.find('.search_top_form_text').focus(); 
				_panel_wpml.css('display','none');
			}
			return false;
			 
		});

	}

	//Responsive Mobile Menu function
	themeData.fnResponsiveMenu = function(){ 
		themeData.fnUxmobileClass();

		if($('#woocomerce-cart-side').length) {
			$('#woocomerce-cart-side .ux-woocomerce-cart-a').animate({opacity:1}, 400).css('display', 'inline-block');
		}

		themeData.win.on('resize', _.debounce(function(e){
			themeData.fnUxmobileClass();
		}, 120));

		themeData.MenuOverTrigger.on('click', function(){
			//window.dispatchEvent(new Event('resize'));
			var _carousel = $('.owl-carousel'),
			_carouselAuto = _carousel.data('auto');
			if(themeData.body.is('.show_mobile_menu')){
				setTimeout(function() {
					themeData.body.removeClass('show_mobile_menu');
					
					if(!themeData.body.hasClass('hide_mobile_menu')) {
						themeData.body.addClass('hide_mobile_menu');
					}

					themeData.fnSubmenuResetMenupanel();
					
					themeData.win.scrollTop(themeData.winScrollTop);
					if(_carousel.length && _carouselAuto){
						_carousel.trigger('play.owl.autoplay');
					}
				},10);

			} else {

				setTimeout(function() {
					
					if(themeData.body.hasClass('show_popup')){
						themeData.body.removeClass('show_popup');
						if(!themeData.body.hasClass('hide_popup')){
							themeData.body.addClass('hide_popup');
						}
					}

					themeData.body.addClass('show_mobile_menu');

					if(themeData.body.hasClass('navi-side-menu')) {
						if(themeData.backTop.hasClass('backtop-shown')){
							themeData.backTop.removeClass('backtop-shown');
						}
					}

					themeData.wrapAll.scrollTop(0);
					if(_carousel.length && _carouselAuto){
						_carousel.trigger('stop.owl.autoplay');
					}
					
				},10); 
				
				setTimeout(function() {	
					if(themeData.body.hasClass('hide_mobile_menu')) {
						themeData.body.removeClass('hide_mobile_menu');
					}

				},100); 
			}
			return false;
        });

		if(themeData.body.hasClass('navi-top-menu') || themeData.body.hasClass('navi-side-menu')) {

			themeData.MenuOverTrigger2.on('click', function(){
				 themeData.fnCloseMenupanel2();
				return false;
	        });

			$('#hide-menupanel-mask').on('click', function(){ 
				themeData.fnCloseMenupanel2();
				return false;
			});
		}

		if(themeData.menupanelMenu.length) {
			themeData.fnSubMenu($('.menu-panel .menu'));
		}
	
    }

    //Close Menu Panel
    themeData.fnCloseMenupanel2 = function(){
    	setTimeout(function() {
	    	if(themeData.body.hasClass('show_mobile_menu')) {
				themeData.body.removeClass('show_mobile_menu');
			}
			if(!themeData.body.hasClass('hide_menu')) {
				themeData.body.addClass('hide_menu');
			}
			themeData.fnSubmenuResetMenupanel();
			if(themeData.MenuPanel2.hasClass('search_top_form_shown')){
				themeData.MenuPanel2.removeClass('search_top_form_shown');
			}
		},10);
		if(themeData.body.hasClass('navi-side-menu')) {
			setTimeout(function() {
				window.dispatchEvent(new Event('resize'));
				
			},10); 
		}
		setTimeout(function() {
			if(themeData.body.hasClass('hide_menu')) {
				themeData.body.removeClass('hide_menu');
			}
		},900);

	}
    
    //Reset Submenu on menupanel
    themeData.fnSubmenuResetMenupanel = function(){
    	if (themeData.naviWrap.find('ul').hasClass('show-submenu')){
			themeData.naviWrap.find('ul').removeClass('show-submenu'); 
		}
		if (themeData.naviWrap.find('li').hasClass('show-submenu-active')){
			themeData.naviWrap.find('li').removeClass('show-submenu-active');
		}
    }

    //Add or remove classname ux-mobile 
    themeData.fnUxmobileClass = function(){
    	if(themeData.win.width() > switchWidth) {
			themeData.body.removeClass('ux-mobile');
			if(themeData.body.hasClass('menu-icon-horizon-menu')) {
				if(!themeData.body.hasClass('navi-show-icon')) {
					themeData.body.addClass('navi-show-icon');
				}
			}
		} else {
			themeData.body.addClass('ux-mobile');
			if(themeData.body.hasClass('menu-icon-horizon-menu')) {
				if(themeData.body.hasClass('navi-show-icon')) {
					themeData.body.removeClass('navi-show-icon');
				}
			}
		}
    }
	
	//audio player function
	themeData.fnJplayerCall = function(){
		if(themeData.jplayer.length){
			themeData.jplayer.jPlayer({
				ready: function(){
					$(this).jPlayer("setMedia", {
						mp3:""
					});
				},
				swfPath: JS_PATH,
				supplied: "mp3",
				wmode: "window"
			});
			
			$('.audiobutton').each(function(){
                themeData.fnAudioPlay($(this));
            });
		}
	}
	
	//call player play
	themeData.fnAudioPlay = function(el){
		el.on('click', function(){
			var thisID = $(this).attr("id");
			if($(this).hasClass('pause')){
				$('.audiobutton').removeClass('play').addClass('pause');
				$(this).removeClass('pause').addClass('play');
				themeData.jplayer.jPlayer("setMedia", {
					mp3: $(this).attr("rel")
				});
				themeData.jplayer.jPlayer("play");
				themeData.jplayer.bind($.jPlayer.event.ended, function(event) {
					$('#'+thisID).removeClass('play').addClass('pause');
				});
			}else if($(this).hasClass('play')){
				$(this).removeClass('play').addClass('pause');
				themeData.jplayer.jPlayer("stop");
			}
		});
	}

	//Sub Menu
	themeData.fnSetMenuLevel = function(index, el){
		if(el){
			el.each(function(i){
				$(this).addClass('level-' +index);
				if($(this).hasClass('menu-item-has-children')){
					themeData.fnSetMenuLevel(index + 1, $(this).find('> .sub-menu > li'));
				}
			});
		}
	}

	themeData.fnSubMenu = function(menu) {
		themeData.NaviWrapMobile = menu;
		themeData.fnSetMenuLevel(1, themeData.NaviWrapMobile.find('> li'));
		
		themeData.NaviWrapMobile.find('li').each(function(index){
			var _this = $(this),
			    _this_link = _this.find('> a');
			
			if(_this.hasClass('menu-item-has-children')){

				_this.find('> .sub-menu').prepend('<li class="menu-item-back"><a href="#" class="menu-item-back-a menu-arrow"><span class="menu-arrow-in"></span></a></li>');
				_this_link.append('<span class="submenu-icon"></span>');
				
				_this_link.on('click', function(){
					var _thislink_parent_li = _this_link.parent('.menu-item');
					if (!_thislink_parent_li.parent('ul').hasClass('show-submenu')){
						_thislink_parent_li.parent('ul').addClass('show-submenu');
					}else{
						_thislink_parent_li.parent('ul').removeClass('show-submenu');
					}
					if (!_thislink_parent_li.hasClass('show-submenu-active')){
						_thislink_parent_li.addClass('show-submenu-active');
					}else{
						_thislink_parent_li.removeClass('show-submenu-active');
					} 
					return false;
				});
				
				_this.find('> .sub-menu > .menu-item-back > a').on('click', function(){
					var sub_menu = $(this).parent().parent();
					var parent_item = sub_menu.parent();
					var parent_item_link = parent_item.find('> a');
					//if(parent_item.not('.level-1')){  
						if (parent_item.parent('ul').hasClass('show-submenu')){
							parent_item.parent('ul').removeClass('show-submenu');
						}
						if (parent_item.hasClass('show-submenu-active')){
							parent_item.removeClass('show-submenu-active');
						}
					//} 
						
					return false;
				});

			} else {

				_this_link.on('click', function(){

					if(!Modernizr.touchevents){
						if($(this).attr('href')=='#') {}else{
							if($(this).attr('target') !='_blank') {
								if(!$(this).parent().hasClass('current-menu-anchor') && !$(this).parent().hasClass('menu-item-has-children')){
									themeData.fnPageLoadingEvent($(this));
									return false;
								}
							}
						}
					} else {
						if($(this).attr('href')=='#') {}else{
							if($(this).attr('target') !='_blank') {
								if(!$(this).parent().hasClass('current-menu-anchor') && !$(this).parent().hasClass('menu-item-has-children')){ 
									themeData.fnPageLoadingEvent($(this));
									return false;
								}
							}
						}
					}
					
				});
			}
			
		});
    	
    };

    themeData.fnHeaderSubMenuOffScreen = function() {
    	themeData.headerNavi.find("li").on('mouseenter mouseleave', function (e) {
    		var _menu_item = $(this);
	        if ($('ul', this).length) {
	            var elm = $('ul:first', this);
	            var off = elm.offset();
	            var l = off.left;
	            var w = elm.width(); 
	            var docW = themeData.win.width();

	            var isEntirelyVisible = (l + w <= docW); 
	            if (!isEntirelyVisible) {
	                _menu_item.addClass('sub-menu-edge');
	            } else {
	                _menu_item.removeClass('sub-menu-edge');
	            }
	        }
	    });
    };

  // Main Scrolled Animation
	themeData.fnMainAnima = function(){
    	
    	if(themeData.backTop.length) {
    		themeData.win.bind('scroll', _.throttle(function() {
	    		if( themeData.win.scrollTop() >= (themeData.doc.height() - themeData.win.height() -  100) || themeData.win.scrollTop() > themeData.win.height() ) { 
	    			setTimeout(function(){
		    			if( !themeData.backTop.hasClass('backtop-shown') ) {
						 	themeData.backTop.addClass('backtop-shown');
						}
					},10);
		    	}
		    	if( themeData.win.scrollTop() < themeData.win.height() ) {
		    		if( themeData.backTop.hasClass('backtop-shown') ) {
					 	themeData.backTop.removeClass('backtop-shown');
					}
		    	}
	    	},300));
    	}
    }
	
	//Portfolio list
	themeData.fnHeaderIconClick = function(){

		themeData.headerIcon.on('click', function(){
			var _back_btn = $(this);
			 
			if(themeData.body.hasClass('show_popup')){

				setTimeout(function(){
					themeData.body.removeClass('show_popup'); 
					if(!themeData.body.hasClass('show_popup')){
						themeData.body.addClass('hide_popup')
					}
					themeData.win.scrollTop(themeData.winScrollTop); 
				},10);

				
			} else {

				themeData.body.addClass('show_popup');
				if(themeData.body.hasClass('show_popup')){
					themeData.body.removeClass('hide_popup')
				}
				if(themeData.body.hasClass('show_mobile_menu')) {
					themeData.body.removeClass('show_mobile_menu');
				}
				themeData.wrapAll.scrollTop(0); 
			}

			return false;
		});
	};

	//page loading event
	themeData.fnPageLoadingEvent = function(el){
		var _url = el.attr('href');
		if(_url){
			if(themeData.pageLoading.length){ 
				setTimeout(function(){
					themeData.pageLoading.addClass('visible');
				}, 100);
			}
			themeData.body.addClass('ux-start-hide');
			//themeData.body.find('#wrap').animate({opacity: 0}, 300);
			themeData.wrapOuter.css('height', 'auto');
			setTimeout(function(){
				window.location.href = _url;
			}, 400);
			
		}
	}

	// Header sticky 
	themeData.header_sticky = function(){ 

		var lastScrollTop = 0;

		themeData.win.bind('scroll', _.throttle(function() {
			var st = $(this).scrollTop(), 
			setPosi = themeData.headerWrap.data('scroll') ? themeData.headerWrap.data('scroll') : 50;
			
			if(themeData.body.hasClass('header-sticky')) {
				if(st > setPosi) {
					if(!themeData.body.hasClass('header-scrolled')){
						themeData.body.addClass('header-scrolled');
					}
				} else {
					if(themeData.body.hasClass('header-scrolled')){
						themeData.body.removeClass('header-scrolled');
					}
				}
			} else if ( themeData.body.hasClass('header-sticky-back') ) {
				if (st > lastScrollTop){
					//scroll down
					setTimeout(function(){
						if(themeData.body.hasClass('header-scrolled')){
							themeData.body.removeClass('header-scrolled');
						}
					}, 100);
					if(!themeData.body.hasClass('header-scrolling') && st > 100 ){
						themeData.body.addClass('header-scrolling');
					}
				} else {
					//scroll up
					if( st > 10 ){
						if(!themeData.body.hasClass('header-scrolled')){
							themeData.body.addClass('header-scrolled');
						}
					} else {
						if(themeData.body.hasClass('header-scrolled')){
							themeData.body.removeClass('header-scrolled');
						}
					}
					if(themeData.body.hasClass('header-scrolling')){
						themeData.body.removeClass('header-scrolling');
					}

				}
				lastScrollTop = st;

			} else if(themeData.body.hasClass('header-sticky-none')) {
				
				if(themeData.headerWrap.hasClass('ux-header-hide')) {
					if(st > setPosi) {
						setTimeout(function(){
							if(!themeData.body.hasClass('header-scrolled')){
								themeData.body.addClass('header-scrolled');
							}
						},10);
						
					} else {
						setTimeout(function(){
							if(themeData.body.hasClass('header-scrolled')){
								themeData.body.removeClass('header-scrolled');
							}
						},10);
					}
				}
			}
		},300));
	}

	themeData.headerJustifed = function() {
		var _logo 					= $('.navi-logo'),
				_headerMenu 		= $('#navi-header .menu'),
				_headerMenu1st		= _headerMenu.children('li:first-child'),
				_cart_icon			= $('#woocomerce-cart-side'),
				_menu_icon			= $('.navi-trigger-out'),
				_header_icon		= $('.header-portfolio-icon');

		if(themeData.win.width() > switchWidth) {
			if (_logo.length && _headerMenu1st.length) {
				_logo.insertBefore(_headerMenu1st);
			} 
			if(_header_icon.length) {
				_headerMenu.append(_header_icon);
			} else {
				if(_cart_icon.length) {
					_headerMenu.append(_cart_icon);
				}
			} 

		} else {

			_logo.insertBefore($('.head-meta'));
			if(_header_icon.length && _menu_icon.length) {
				_menu_icon.before(_header_icon);
			}
		}
			
		setTimeout(function(){
			if(!themeData.headerWrap.hasClass('ux-justified-menu-shown')) {
				themeData.headerWrap.addClass('ux-justified-menu-shown');
			}
		},100);
	}

	// Get-scroll-bar-width 
	themeData.get_scrollbar_width = function(){
		var scrollBarWidth = themeData.scrollWidthGet.width();
		themeData.body.get(0).style.setProperty('--get-scroll-width',+scrollBarWidth+'px');
	}
	// Get header footer height
	themeData.get_header_footer_size = function(){
		if(themeData.headerWrap.length){
			var headerHeight = themeData.headerWrap.height();
			themeData.body.get(0).style.setProperty('--header-height',+headerHeight+'px');
		}
		if(themeData.footerWrap.length){
			var footerHeight = themeData.footerWrap.height();
			themeData.body.get(0).style.setProperty('--footer-height',+footerHeight+'px');
		}
	}
	//Get win height
	themeData.get_win_height = function(){ 
        themeData.body.get(0).style.setProperty('--get-win-height',+themeData.winHeight+'px');
	}

	// password Protect Form Placehoder
	themeData.passwordProtectPlacehoder = function(){
		$("form.post-password-form :input[type=password]").each(function(index, elem) {
		    var eId = $(elem).attr("id");
		    var label = null;
		    if (eId && (label = $(elem).parents("form").find("label[for="+eId+"]")).length == 1) {
		        $(elem).attr("placeholder", $(label).text());
		    }
		 });
	}

	//Document ready
	themeData.doc.ready(function(){

		//Call password Protect Form Placehoder
		if ($('.post-password-form').length) {
			themeData.passwordProtectPlacehoder();
		}

		themeData.body.removeClass('preload');
		
		themeData.body.removeClass('ux-start-hide');

		//CALL Get-scroll-bar-width
		if(themeData.scrollWidthGet.length) {
			themeData.get_scrollbar_width(); 
		}
		
		// Call header footer height
		if(themeData.headerWrap.length || themeData.footerWrap.length){
			themeData.get_header_footer_size();
		}

		//call get win height
		themeData.get_win_height();
		
		//Resize Win to run again
		themeData.win.on('resize', _.debounce(function(e){
			
			if(themeData.scrollWidthGet.length) {
				themeData.get_scrollbar_width();
			}
			if(themeData.headerWrap.length || themeData.footerWrap.length){
				themeData.get_header_footer_size();
			}
			//call get win height
			themeData.get_win_height();

		}, 120));

		//Justified menu
		if($('.navi-justified').length) {
			themeData.headerJustifed();
			$(window).bind('resize', themeData.headerJustifed);
		}

		//call menu
		themeData.win.find('img').imagesLoaded(function(){ 
			themeData.fnResponsiveMenu();
		}); 

		//Pagenumber re-layout
		if(themeData.pagenumsDefault.length) {
			themeData.pagenumsDefault.each(function(){
				var _this = $(this);
				if(_this.find('.prev').length && _this.find('.next').length){
					_this.find('.next').after(_this.find('.prev'));
				}
			});
		}
		
		//Call audio player
		if($('.audiobutton').length) {
			themeData.fnJplayerCall();
		}

		//call portfolio list
		if(themeData.headerIcon.length){
			themeData.fnHeaderIconClick();
		}

		//Page Loading
		if(themeData.pageLoading.length) {

			//Logo
			$('.logo-a,.carousel-des-wrap-tit-a').on('click', function(){ 
				themeData.fnPageLoadingEvent($(this));
				return false;
			});

			//Menu, WPML 
			$('.menu-item:not(.menu-item-has-children) > a, .wpml-language-flags a').on('click', function(){
				if(this.href.indexOf('#') != -1){}else{
					if($(this).attr('target') !='_blank') {
						if(themeData.body.hasClass('show_mobile_menu')) {
							themeData.body.removeClass('show_mobile_menu')
						}
						themeData.fnPageLoadingEvent($(this));
						return false;
					}
				}
			});
			
			//blog, post 
			$('.grid-item-mask-link:not(.lightbox-item), a.ux-hover-wrap-a, .grid-item-tit-a, .title-wrap a, .page-numbers,.archive-item a,.arrow-item,.article-meta-unit a,.blog-unit-more-a,.article-cate-a,.archive-more-a').on('click', function(){
				if(this.href.indexOf('#') != -1){}else{
					if($(this).attr('target') != '_blank') {
						themeData.fnPageLoadingEvent($(this));
						return false;
					}
				}
			});
		
			//sidebar widget
			$('.widget_archive a, .widget_recent_entries a, .widget_search a, .widget_pages a, .widget_nav_menu a, .widget_tag_cloud a, .widget_calendar a, .widget_text a, .widget_meta a, .widget_categories a, .widget_recent_comments a, .widget_tag_cloud a').on('click', function(){
				if( $(this).attr('target') !='_blank') {
					themeData.fnPageLoadingEvent($(this));
					return false;
				}
			});
		}
		
	});
	
	//win load
	themeData.win.on('load', function(){

		if(themeData.winHash){
			if(themeData.winHash.search('&')==-1){
				themeData.winHashTarget = $('#' + themeData.winHash);

				if(themeData.winHashTarget.length && themeData.winHash){
					themeData.win.find('img').imagesLoaded(function(){
						$("html, body").animate({scrollTop:themeData.winHashTarget.offset().top}, 300);
					});
				}
			}
		}
		
		if(themeData.cookieconsentSet.length){
			themeData.cookieconsentSet.on('click', function(){
				var cookieConsentBar = $(this).parents('.sea-cookie-consent'),
					cookieConsentBarVal = $(this).attr('data-cookie');
				$.post(ajaxurl, {
					'action': 'arttheme_interface_ajax_cookie_consent_bar',
					'cookieConsentBar': cookieConsentBarVal
				}).done(function(result){
					if(result == 'ok'){
						cookieConsentBar.addClass('cookieconsent-hide');
					}
				});
				return false;
			});
		}
		
		if(themeData.commentform.length){
			var privacyPolicy = themeData.commentform.find('input[name=\"idi_privacy_policy\"]'),
				formSubmit = themeData.commentform.find('input[type=\"submit\"]');
			
			if(themeData.commentform.find('.privacy-policy').length) {
				formSubmit.attr('disabled', 'disabled');
			}
			
			privacyPolicy.change(function(){
				if($(this).is(':checked')){
					formSubmit.removeAttr('disabled');
				}else{
					formSubmit.attr('disabled','disabled');
				}
			});
		}

		//call lazyload
		(function () {
			var myLazyLoad = new LazyLoad({
			    elements_selector: ".lazy"
			});
		}());

		setTimeout(function(){
			themeData.pageLoading.removeClass('visible'); 
		},10);

		// Back top 
		if(themeData.backTop.length){
			themeData.backTop.on({'touchstart click': function(){ 
				$('html, body').animate({scrollTop:0}, 1200);
			}});
		}

		//Call Search
		if(themeData.searchOpen.length){
			themeData.fnSerchShow();
		} 
		
		// Run Scroll Animation
		themeData.fnMainAnima(); 

		// Call header sticky
		if(themeData.headerWrap.length) {
			themeData.header_sticky();
			 
			themeData.win.on('resize', _.debounce(function(e){
				if(themeData.win.width() < 601 ) {
					themeData.header_sticky();
				}
			}, 120));
		}

		// Call sub menu off screen
		if (themeData.headerNavi.length) {
			themeData.fnHeaderSubMenuOffScreen();
		}

		themeData.win.bind('scroll', _.throttle(function() {
			//Record current scrollbar position
			if ( themeData.body.hasClass('show_mobile_menu') || themeData.body.hasClass('show_popup') ) {}else{
	    		themeData.winScrollTop = themeData.win.scrollTop();
	    	}
	    },300));

	});

	window.onpageshow = function(event) {
	    if (event.persisted) {
	        //window.location.reload()
	        if (themeData.body.hasClass('ux-start-hide')) {
	        	themeData.body.removeClass('ux-start-hide');
	        } 
	        if (themeData.pageLoading.length) {
	        	if (themeData.pageLoading.hasClass('visible')) {
	        		themeData.pageLoading.removeClass('visible');
	        	}
	        }
	        $('#wrap').css('opacity','1');
	    }
	};

	
})(jQuery); 