//mod -> global

UxCBModModuleIsotope = [];

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	UxCBMod.body = $('body');
	
	UxCBMod.itemQueue = [];
	UxCBMod.itemDelay = 150;
	UxCBMod.queueTimer;
	
	//condition
	//Migrated modules-global.js
	UxCBMod.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || UxCBMod.win.width() < 769){
			return true; 
		}else{
			return false;
		}
	}
	
	UxCBMod.fnParseQuery = function(query){
		var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
		var obj = {};
		while(reg.exec(query)){
			obj[RegExp.$1] = RegExp.$2;
		}
		return obj;
	}
	
	//List Item Queue
	UxCBMod.fnListItemQueue = function() {
		if (UxCBMod.queueTimer) return  
		UxCBMod.queueTimer = window.setInterval(function () {
			if (UxCBMod.itemQueue.length) {
				var moudleHasAnimation = $(UxCBMod.itemQueue).parents('.moudle_has_animation');
				
				if(moudleHasAnimation.length){
					var animationScroll = moudleHasAnimation.find('.animation-scroll-ux');
					UxCBMod.fnModuleAnimationScroll(animationScroll, moudleHasAnimation);
				}else{
					$(UxCBMod.itemQueue.shift()).addClass('grid-show');
				}
				
				UxCBMod.fnListItemQueue();
			}
			else {
				window.clearInterval(UxCBMod.queueTimer);
				UxCBMod.queueTimer = null;
			}
		}, UxCBMod.itemDelay);
	}
	
	//module animation scroll
	UxCBMod.fnModuleAnimationScroll = function(animationScroll, animationWrap){
		if(animationScroll.length){
			animationScroll.each(function(index){
				var animationItem = [];
				
				animationItem.item = $(this);
				animationItem.classB = animationItem.item.data('animationend');
				
				animationItem.item.waypoint(function(direction){
					if (direction === 'down') {
						//animationWrap.css({'opacity': 1});
						animationItem.item.css('transform', null);
						setInterval(function(){
							//animationItem.item.css({'opacity': 1});
							if(!animationItem.item.hasClass(animationItem.classB)){
								animationItem.item.addClass(animationItem.classB);
							}
							setTimeout(function(){
								animationItem.item.removeClass('animation-default-ux').removeClass('animation-scroll-ux');
							}, 1500);
						}, index * 150);
					}	
					}, {
						offset: '80%'
				}); 
			});
		}
	}
	
	//module parent row .bm-row
	UxCBMod.fnModuleParentRow = function(){
		var moduleParents = $('.bm-builder');
		var moduleParentRows = moduleParents.find('.bm-row'); 
		var moduleParentRowsHeight = 0;
		var moduleParentsColor = $('body');
		
		if(moduleParentRows.length){
			moduleParentRows.each(function(index, element) {
                var thisSection = $(this); 
                var sectionBackcolor = thisSection.data('backcolor');
                var sectionFrontcolor = thisSection.data('frontcolor');
                var sectionLogocolor = thisSection.data('logocolor');
                var sectionGotoTop = thisSection.data('goto-top'); 
                var sectionGotoTopSpacing = Number(thisSection.data('goto-top-spacing')); 
				var sectionOffestTop = thisSection.offset().top;
				var sectionTop = 0;
				var sectionPosition = 0.5;
				
				if(thisSection.find('.background-video video').length){
					thisSection.find('.background-video video').each(function(vi, ve) {
                        ve.load();
                    });
				}
				
				setTimeout(function(){
					thisSection.waypoint({
						handler: function(direction){
							if(direction == 'down'){
								moduleParentsColor.get(0).style.setProperty('--univer-bgcolor',sectionBackcolor);
								UxCBMod.body.get(0).style.setProperty('--fontcolor-univer',sectionFrontcolor);
								if (!UxCBMod.body.hasClass('bm-enable-univer')) {
									UxCBMod.body.addClass('bm-enable-univer');
								}
								if (sectionFrontcolor == 'null' || sectionFrontcolor == '') {} else {
									if (!UxCBMod.body.hasClass('bm-enable-univer-textcolor')) {
										UxCBMod.body.addClass('bm-enable-univer-textcolor');
									}
								}
								if (sectionLogocolor == 'default-logo-univer') {
									if (!UxCBMod.body.hasClass('default-logo-univer')) {
										UxCBMod.body.addClass('default-logo-univer');
										if (UxCBMod.body.hasClass('alt-logo-univer')) {
											UxCBMod.body.removeClass('alt-logo-univer');
										}
									}
								}
								if (sectionLogocolor == 'alt-logo-univer') {
									if (!UxCBMod.body.hasClass('alt-logo-univer')) {
										UxCBMod.body.addClass('alt-logo-univer');
										if (UxCBMod.body.hasClass('default-logo-univer')) {
											UxCBMod.body.removeClass('default-logo-univer');
										}
									}
								}
								
								if(!thisSection.is('[data-module]')){
									moduleParentsColor.get(0).style.setProperty('--univer-bgcolor','transparent');
									$('.bm-univer-color').remove();
									if (UxCBMod.body.hasClass('bm-enable-univer')) {
										UxCBMod.body.removeClass('bm-enable-univer');
									}
									if (UxCBMod.body.hasClass('bm-enable-univer-textcolor')) {
										UxCBMod.body.removeClass('bm-enable-univer-textcolor');
									}
									if (UxCBMod.body.hasClass('default-logo-univer')) {
										UxCBMod.body.removeClass('default-logo-univer');
									}
									if (UxCBMod.body.hasClass('alt-logo-univer')) {
										UxCBMod.body.removeClass('alt-logo-univer');
									}
								}
								
								thisSection.prev().removeAttr('style'); 

							} else if(direction == 'up'){
								if(!thisSection.prev().is('[data-module]') && !thisSection.prev()){
									moduleParentsColor.get(0).style.setProperty('--univer-bgcolor','transparent');
									if (UxCBMod.body.hasClass('bm-enable-univer')) {
										UxCBMod.body.removeClass('bm-enable-univer');
									}
									if (UxCBMod.body.hasClass('bm-enable-univer-textcolor')) {
										UxCBMod.body.removeClass('bm-enable-univer-textcolor');
									}
									if (UxCBMod.body.hasClass('default-logo-univer')) {
										UxCBMod.body.removeClass('default-logo-univer');
									}
									if (UxCBMod.body.hasClass('alt-logo-univer')) {
										UxCBMod.body.removeClass('alt-logo-univer');
									}
								}
							}
						},
						offset: function(){
							var height = Waypoint.viewportHeight() * sectionPosition;
							return height;
						}
					});
					
					thisSection.waypoint({
						handler: function(direction){
							if(direction == 'down'){
								if(!thisSection.next().is('[data-module]') && !thisSection.next()){
									moduleParentsColor.get(0).style.setProperty('--univer-bgcolor','transparent');
									if (UxCBMod.body.hasClass('bm-enable-univer')) {
										UxCBMod.body.removeClass('bm-enable-univer');
									}
									if (UxCBMod.body.hasClass('bm-enable-univer-textcolor')) {
										UxCBMod.body.removeClass('bm-enable-univer-textcolor');
									}
									if (UxCBMod.body.hasClass('default-logo-univer')) {
										UxCBMod.body.removeClass('default-logo-univer');
									}
									if (UxCBMod.body.hasClass('alt-logo-univer')) {
										UxCBMod.body.removeClass('alt-logo-univer');
									}
								}
							}else if(direction == 'up'){
								moduleParentsColor.get(0).style.setProperty('--univer-bgcolor',sectionBackcolor);
								UxCBMod.body.get(0).style.setProperty('--fontcolor-univer',sectionFrontcolor);
								if (!UxCBMod.body.hasClass('bm-enable-univer')) {
									UxCBMod.body.addClass('bm-enable-univer');
								}
								if (sectionFrontcolor == 'null' || sectionFrontcolor == '') {} else {
									if (!UxCBMod.body.hasClass('bm-enable-univer-textcolor')) {
										UxCBMod.body.addClass('bm-enable-univer-textcolor');
									}else{
										UxCBMod.body.removeClass('bm-enable-univer-textcolor');
									}
								}
								if (sectionLogocolor == 'default-logo-univer') {
									if (!UxCBMod.body.hasClass('default-logo-univer')) {
										UxCBMod.body.addClass('default-logo-univer');
										if (UxCBMod.body.hasClass('alt-logo-univer')) {
											UxCBMod.body.removeClass('alt-logo-univer');
										}
									}
								}
								if (sectionLogocolor == 'alt-logo-univer') {
									if (!UxCBMod.body.hasClass('alt-logo-univer')) {
										UxCBMod.body.addClass('alt-logo-univer');
										if (UxCBMod.body.hasClass('default-logo-univer')) {
											UxCBMod.body.removeClass('default-logo-univer');
										}
									}
								}
								if(!thisSection.is('[data-module]')){
									moduleParentsColor.get(0).style.setProperty('--univer-bgcolor','transparent');
									if (UxCBMod.body.hasClass('bm-enable-univer')) {
										UxCBMod.body.removeClass('bm-enable-univer');
									}
									if (UxCBMod.body.hasClass('bm-enable-univer-textcolor')) {
										UxCBMod.body.removeClass('bm-enable-univer-textcolor');
									}
									if (UxCBMod.body.hasClass('default-logo-univer')) {
										UxCBMod.body.removeClass('default-logo-univer');
									}
									if (UxCBMod.body.hasClass('alt-logo-univer')) {
										UxCBMod.body.removeClass('alt-logo-univer');
									}
								}
							}
						},
						offset: function(){
							var height = Waypoint.viewportHeight() - (thisSection.height() + (Waypoint.viewportHeight() * (40 / 100)));
							return height;
						}
					});
					
					thisSection.waypoint({
						handler: function(direction){
							if(direction == 'down'){
								if(sectionGotoTop == 'on'){
									$('html,body').animate({scrollTop: thisSection.offset().top - sectionGotoTopSpacing }, 600);
								}
							}
						},
						offset: '90%'
					});
				},100);
            });
		}
	}
	
	//module filter
	UxCBMod.fnModuleFilters = function(module){
		var filters = module.find('.filters [data-filter]');
		var moduleParents = module.find('.container-masonry');
		var moduleMasonryList = moduleParents.find('.masonry-list');
		var moduleUnique = moduleMasonryList.data('unique');
		
		if(filters.length){
			filters.each(function(){
				var filter = $(this);
				
				filter.on('click', function(){
					var filterValue = $(this).attr('data-filter');
					var postID = $(this).attr('data-postid');
					var postCount = Number($(this).find('.filter-num').text());
					var postFound = 0;
					var postNumber = 0;
					var post__not_in = [];
					var catID = 0;
					
					if(moduleParents.hasClass('container-masonry')){
						postFound = Number(moduleParents.attr('data-found'));
						postNumber = Number(moduleParents.attr('data-number'));
					}
					
					if(moduleMasonryList.hasClass('infiniti-scroll')){
						moduleMasonryList.addClass('infiniti-scrolling');
					}
					
					var moduleIsotope = UxCBModModuleIsotope[moduleUnique];
					if(moduleIsotope){
						moduleIsotope.isotope({ filter: filterValue }); 
						module.find('.filters').find('li').removeClass('active');
						$(this).parent().addClass('active');
						
						if(filterValue != '*'){
							catID = $(this).attr('data-catid');
							postFound = postCount;
						}
						
						moduleMasonryList.find('section').each(function(){
							var section_postid = $(this).attr('data-postid');
							
							if(filterValue == '*'){
								post__not_in.push(section_postid);
							}else{
								if($(this).is(filterValue)){
									post__not_in.push(section_postid);
									UxCBMod.itemQueue.push($(this).find('.grid-item-inside'));
									//UxCBMod.fnListItemQueue();
								}
							}
						});
						
						var isotopeLoadMore = moduleParents.find('.page_twitter');
						if(post__not_in.length >= postFound){
							isotopeLoadMore.hide();
						}else{
							isotopeLoadMore.show();
						}
						
						if((post__not_in.length < postNumber) && (filterValue != '*')){
							var thisPostNumber = postNumber - post__not_in.length;
							
							$.post(ajaxurl, {
								'action': 'ux_cb_module_grid_container',
								'catID': catID,
								'postID': postID,
								'post__not_in': post__not_in,
								'postNumber': thisPostNumber,
								'moduleUnique': moduleUnique
							}).done(function(result){
								var content = $(result);
								moduleIsotope.isotope('insert', content);
								if(moduleMasonryList.hasClass('masonry-grid')) {
									UxCBMod.fnIsotopeListResize(moduleParents);
									moduleIsotope.isotope('layout');
								}
								
								if(moduleMasonryList.hasClass('infiniti-scroll')){
									moduleMasonryList.removeClass('infiniti-scrolling');
								}else{
									var thisPostCount = moduleMasonryList.find('section' +filterValue).length;
									if(thisPostCount >= postFound){
										isotopeLoadMore.hide();
									}else{
										isotopeLoadMore.show();
									}
								}
								
								setTimeout(function() {
									//$(window).lazyLoadXT(); 
									new LazyLoad();
									if(content.find('.grid-item-inside').length){
										content.find('.grid-item-inside').each(function(){
											UxCBMod.itemQueue.push($(this).find('.grid-item-inside'));
											//UxCBMod.fnListItemQueue();
										});
									}
									if(content.find('.grid-item-mask-link').length) {
										content.find('.grid-item-mask-link').removeAttr('title');
									}
								}, 10);
							});
						}else{
							moduleMasonryList.removeClass('infiniti-scrolling');
						}
					}
					
					
					
					return false;
				});
				
			});
		}
	}
	
	//module loadmore
	UxCBMod.fnModuleLoadmore = function(module){
		var loadMore = module.find('.page_twitter');
		var loadMoreClick = loadMore.find('> a');
		var moduleParents = module.find('.container-masonry');
		var moduleMasonryList = moduleParents.find('.masonry-list');
		var moduleUnique = loadMore.data('unique');
		var moduleID = loadMore.attr('data-moduleid');
		
		loadMoreClick.on('click',function(){
			var thisMoreClick = $(this);
			var postID = $(this).attr('data-postid');
			var pagedMAX = Number($(this).attr('data-max'));
			var paged = Number($(this).attr('data-paged'));
			var pageText = loadMore.attr('data-pagetext');
			var pageLoadingText = loadMore.attr('data-loadingtext');
			var postFound = 0;
			var catID = 0;
			var post__not_in = [];
			var filters = module.find('.filters');
			var moduleIsotope = UxCBModModuleIsotope[moduleUnique];
			var ajaxAction = 'ux_cb_module_grid_container';
			
			if(moduleParents.hasClass('container-masonry')){
				postFound = Number(moduleParents.attr('data-found'));
			}
			
			if(moduleID == 'masonry-grid'){
				ajaxAction = 'ux_cb_module_masonry_grid_container';
				postFound = Number(thisMoreClick.attr('data-found'));
			}
			
			moduleMasonryList.find('section').each(function(){
				var section_postid = $(this).attr('data-postid');
				
				if(filters.length){
					var filterActive = filters.find('li.active');
					var filterValue = filterActive.find('> a').attr('data-filter');
					var postCount = Number(filterActive.find('.filter-num').text());
					
					if(filterValue == '*'){
						post__not_in.push(section_postid);
					}else{
						catID = filterActive.find('> a').attr('data-catid');
						if($(this).is(filterValue)){
							post__not_in.push(section_postid);
						}
					}
				}else{
					post__not_in.push(section_postid);
				}
			});
			
			loadMoreClick.text(pageLoadingText);
			
			if(!moduleMasonryList.hasClass('loading-more')){
				moduleMasonryList.addClass('loading-more');
				$.post(ajaxurl, {
					'action': ajaxAction,
					'catID': catID,
					'postID': postID,
					'post__not_in': post__not_in,
					'moduleUnique': moduleUnique,
					'paged-s': paged
				}).done(function(result){
					var content = $(result);
					var thisPostCount = moduleMasonryList.find('section[data-postid]').length;
					
					if(moduleID == 'masonry-grid'){
						loadMore.prev().append(content);
						if(UxCBModGlobal['masonry-grid']){
							UxCBModGlobal['masonry-grid'].fnGridStackResize(loadMore.prev());
						}
						thisPostCount = module.find('.grid-stack-item[data-postid]').length;
					}else{
						moduleIsotope.isotope('insert', content);
						if(moduleMasonryList.hasClass('masonry-grid')) {
							UxCBMod.fnIsotopeListResize(moduleParents);
							moduleIsotope.isotope('layout');
						}
						thisPostCount = moduleMasonryList.find('section[data-postid]').length;
					}
					
					loadMoreClick.text(pageText);
					moduleMasonryList.removeClass('loading-more');
					
					thisMoreClick.attr('data-paged', paged + 1);
					
					if(filters.length){
						var filterActive = filters.find('li.active');
						var filterValue = filterActive.find('> a').attr('data-filter');
						var postCount = Number(filterActive.find('.filter-num').text());
						if(filterValue != '*'){
							thisPostCount = moduleIsotope.find('section' +filterValue+ '[data-postid]').length;
							postFound = postCount;
						}else{
							postFound = postCount;
						}
					}
					
					if(thisPostCount >= postFound){
						loadMore.hide();
					}else{
						loadMore.show();
					}
					
					setTimeout(function() {
						//$(window).lazyLoadXT(); 
						new LazyLoad();
						if(content.find('.grid-item-inside').length){
							content.find('.grid-item-inside').each(function(){
								UxCBMod.itemQueue.push($(this));
								//UxCBMod.fnListItemQueue();
							});
						}
						if(content.find('.grid-item-mask-link').length) {
							content.find('.grid-item-mask-link').removeAttr('title');
						}
					}, 10);
				});
			}
			
			return false;
		});
	}
	
	//module infiniti scroll
	UxCBMod.fnModuleInfinitiScroll = function(module){
		var moduleParents = module.find('.container-masonry');
		var moduleMasonryList = moduleParents.find('.masonry-list');
		var moduleUnique = moduleMasonryList.data('unique');
		
		var waypoints = moduleMasonryList.find('section:last').waypoint({
			handler: function(direction){
				var postID = moduleMasonryList.attr('data-postid');
				var postFound = 0;
				var catID = 0;
				var post__not_in = [];
				var filters = module.find('.filters');
				var moduleIsotope = UxCBModModuleIsotope[moduleUnique];
			
				if(moduleParents.hasClass('container-masonry')){
					postFound = Number(moduleParents.attr('data-found'));
				}
		
				moduleMasonryList.find('section').each(function(){
					var section_postid = $(this).attr('data-postid');
					
					if(filters.length){
						var filterActive = filters.find('li.active');
						var filterValue = filterActive.find('> a').attr('data-filter');
						var postCount = Number(filterActive.find('.filter-num').text());
						
						if(filterValue == '*'){
							post__not_in.push(section_postid);
						}else{
							catID = filterActive.find('> a').attr('data-catid');
							if($(this).is(filterValue)){
								post__not_in.push(section_postid);
							}
						}
					}else{
						post__not_in.push(section_postid);
					}
				});
				
				if(!moduleMasonryList.hasClass('infiniti-scrolling')){
					moduleMasonryList.addClass('infiniti-scrolling'); 
					
					$.post(ajaxurl, {
						'action': 'ux_cb_module_grid_container',
						'catID': catID,
						'postID': postID,
						'post__not_in': post__not_in,
						'moduleUnique': moduleUnique
					}).done(function(result){ 
						var content = $(result); 
						moduleIsotope.isotope('insert', content); 
						if(moduleMasonryList.hasClass('masonry-grid')) {
							UxCBMod.fnIsotopeListResize(moduleParents);
							moduleIsotope.isotope('layout'); 
						}
						
						var thisPostCount = moduleMasonryList.find('section[data-postid]').length;
						if(filters.length){
							var filterActive = filters.find('li.active');
							var filterValue = filterActive.find('> a').attr('data-filter');
							var postCount = Number(filterActive.find('.filter-num').text());
							if(filterValue != '*'){
								thisPostCount = moduleIsotope.find('section' +filterValue+ '[data-postid]').length;
								postFound = postCount;
							}
						}
						
						if(thisPostCount < postFound){
							moduleMasonryList.removeClass('infiniti-scrolling');
						}
						
						UxCBMod.fnModuleInfinitiScroll(module);
						
						setTimeout(function() {
							//$(window).lazyLoadXT();
							new LazyLoad();
							if(content.find('.grid-item-mask-link').length) {
								content.find('.grid-item-mask-link').removeAttr('title');
							}
						}, 100);
					});
				}
			},
			offset: 'bottom-in-view'
		});
	}
	
	//Isotope List Resize
	UxCBMod.fnIsotopeListResize = function(_this_wrap){
		var winWidth   = window.innerWidth,
			ListWidth  = _this_wrap.find('.masonry-list').width(),
			GridSpacer = _this_wrap.data('spacer'),
			columnNumb = _this_wrap.data('col'),
			GridWith   = Math.floor(ListWidth / columnNumb),
			GridRatio  = _this_wrap.data('ratio'),
			GridText   = _this_wrap.data('text');  

		if (winWidth >= 768) { 

			_this_wrap.find('.masonry-list').find('.grid-item').each(function () { 
				$('.grid-item').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * GridRatio - GridSpacer + GridText + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * GridRatio - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				);
			});

		} else {
			
			GridWith = Math.floor(ListWidth / 1);

			_this_wrap.find('.masonry-list').find('.grid-item.grid-item-small').each(function () { 
				$('.grid-item').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * GridRatio - GridSpacer + GridText + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * GridRatio - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				);
			});	
		}
	}
	
	//UxCBMod init
	UxCBMod.fnInit = function(){
		//call lazyload
		(function () {
			var myLazyLoad = new LazyLoad({
			    elements_selector: ".lazy"
			});
		}());
		
		UxCBMod.module = $('.bm-builder > .module');
		UxCBMod.photoSwipe = $('.lightbox-photoswipe');
		UxCBMod.moduleHasAnimation = $('.module.moudle_has_animation');
		
		//Call Lightbox 
		if(UxCBMod.photoSwipe.length){
			UxCBInitPhotoSwipeFromDOM('.lightbox-photoswipe');
		}
		
		//module animation scroll
		if(UxCBMod.moduleHasAnimation.length){
			UxCBMod.moduleHasAnimation.imagesLoaded(function(){
				UxCBMod.moduleHasAnimation.each(function(){
					var animationScroll = $(this).find('.animation-scroll-ux');
					
					UxCBMod.fnModuleAnimationScroll(animationScroll, $(this));
				});
			});
		}
		
		//page module init
		if(UxCBMod.module.length){
			var containerModuleWidthSum = 0;
			UxCBMod.module.each(function(index){
				var module = $(this);
				var moduleParent = module.parent('.bm-builder');
				var moduleWidth = module.width();
				var moduleCol = Number(module.attr('data-module-col'));
				var moduleOffsetNumber = 0;
				
				var moduleOffset = module.attr('class').match(/col-offset-[1-9][0-9]?/);
				if(moduleOffset){
					switch(moduleOffset[0]){
						case 'col-offset-1': moduleOffsetNumber = 1; break;
						case 'col-offset-2': moduleOffsetNumber = 2; break;
						case 'col-offset-3': moduleOffsetNumber = 3; break;
						case 'col-offset-4': moduleOffsetNumber = 4; break;
						case 'col-offset-5': moduleOffsetNumber = 5; break;
						case 'col-offset-6': moduleOffsetNumber = 6; break;
						case 'col-offset-7': moduleOffsetNumber = 7; break;
						case 'col-offset-8': moduleOffsetNumber = 8; break;
						case 'col-offset-9': moduleOffsetNumber = 9; break;
						case 'col-offset-10': moduleOffsetNumber = 10; break;
						case 'col-offset-11': moduleOffsetNumber = 11; break;
					}
				}
				
				module.attr('data-index', index);
				containerModuleWidthSum = containerModuleWidthSum + moduleCol + moduleOffsetNumber;
				
				if(containerModuleWidthSum > 12 || index == 0 || moduleCol == 0){
					module.addClass('ux-first-mod-row');
					var row = $('<div class="bm-row" data-index="' +index+ '" data-frontcolor="" data-backcolor="" data-logocolor=""></div>');
					moduleParent.append(row);
				}
				
				if(containerModuleWidthSum > 12){
					containerModuleWidthSum = 0 + moduleCol + moduleOffsetNumber;
				}
				
				if(moduleCol == 0){
					containerModuleWidthSum = 12;
				}
				
				if(module.hasClass('col-0')){
					var containerWidth = UxCBMod.body.outerWidth();
					var containerMargin = (containerWidth - moduleWidth) / 2;

					$(window).trigger('resize'); 
				}
				
				if(UxCBMod.body.hasClass('page') || UxCBMod.body.hasClass('single') || UxCBMod.body.hasClass('blog')){
					if(module.find('.filters').length){
						UxCBMod.fnModuleFilters(module);
					}
					if(module.find('.page_twitter').length){
						UxCBMod.fnModuleLoadmore(module);
					}
					if(module.find('.infiniti-scroll').length){
						setTimeout(function(){
							UxCBMod.fnModuleInfinitiScroll(module);
						},20);
						
					}
				}
			});
			
			UxCBMod.module.each(function(index){
				var module = $(this);
				var moduleChangeColor = module.data('change-color');
				var moduleForegroundColor = module.data('frontcolor');
				var moduleBackgroundColor = module.data('backcolor');
				var moduleLogoColor = module.data('logocolor');
				var moduleGotoTop = module.data('goto-top');
                var moduleGotoTopSpacing = Number(module.data('goto-top-spacing')); 
				var moduleParent = module.parent('.bm-builder');
				var moduleParentRows = moduleParent.find('.bm-row');
				var moduleGroupSameHeight = module.data('groupsameheight');
				if(!moduleForegroundColor){
					moduleForegroundColor = '';
				}
				if(!moduleBackgroundColor){
					moduleBackgroundColor = 'transparent';
				}
				
				moduleParentRows.each(function(){
					var row = $(this);
					var rowIndex = Number(row.data('index'));
					var rowNextIndex = Number(row.next().data('index'));
					
					if(!rowNextIndex){
						if(index >= rowIndex){
							row.append(module);
							if(moduleChangeColor == 'on'){
								if(row.attr('data-frontcolor') == ''){
									row.attr('data-frontcolor', moduleForegroundColor);
									row.attr('data-backcolor', moduleBackgroundColor);
									row.attr('data-logocolor', moduleLogoColor);
									row.attr('data-module', index);
								}
							}

							if(moduleGotoTop == 'on'){
								row.attr('data-goto-top', moduleGotoTop);
								row.attr('data-goto-top-spacing', moduleGotoTopSpacing);
							}

							if(moduleGroupSameHeight == 'on'){
								row.attr('data-groupsameheight', moduleGroupSameHeight);
							}
						}
					}else{
						if(index >= rowIndex && index < rowNextIndex){
							row.append(module);
							if(moduleChangeColor == 'on'){
								if(row.attr('data-frontcolor') == ''){
									row.attr('data-frontcolor', moduleForegroundColor);
									row.attr('data-backcolor', moduleBackgroundColor);
									row.attr('data-logocolor', moduleLogoColor);
									row.attr('data-module', index);
								}
							}
							
							if(moduleGotoTop == 'on'){
								row.attr('data-goto-top', moduleGotoTop);
								row.attr('data-goto-top-spacing', moduleGotoTopSpacing);
							}

							if(moduleGroupSameHeight == 'on'){
								row.attr('data-groupsameheight', moduleGroupSameHeight);
							}
						}
					}
				});
				moduleParentRows.removeAttr('data-index');
			});
			
			if(UxCBMod.module.find('.grid-item-inside').length) {
				UxCBMod.module.find('.grid-item-inside').waypoint(function (direction) {
					UxCBMod.itemQueue.push(this.element);
					//UxCBMod.fnListItemQueue();
				}, {
					offset: '100%'
				});
				UxCBMod.module.find('.grid-item-inside').each(function(index, element) {
					if($(this).parent().offset().top < UxCBMod.winScrollTop + UxCBMod.winHeight){
						UxCBMod.itemQueue.push($(this).find('.grid-item-inside'));
						//UxCBMod.fnListItemQueue();
					} 
				
				});
			}
			
			UxCBMod.fnModuleParentRow();
		}
	}
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['global'] = UxCBMod;
		}
	});
	
	//win load
	UxCBMod.win.on('load',function(){
		UxCBMod.fnInit();
	});
	
})(jQuery);

function UxCBInitPhotoSwipeFromDOM(gallerySelector){
    var parseThumbnailElements = function(el){
		var thumbElements = jQuery(el).find('[data-lightbox=\"true\"]'),
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			type,
			item;

		for(var i = 0; i < numNodes; i++){

			figureEl = thumbElements[i]; // <figure> element

			// include only element nodes 
			if(figureEl.nodeType !== 1){
				continue;
			}

			//linkEl = figureEl.children[0]; // <a> element
			linkEl = jQuery(figureEl).find('.lightbox-item');

			size = linkEl.attr('data-size').split('x');
			type = linkEl.attr('data-type');

			// create slide object
			if(type == 'video'){
				item = {
					html: linkEl.find('> div').html()
				}
			}else{
				item = {
					src: linkEl.attr('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
			}

			if(figureEl.children.length > 0){
				// <figcaption> content
				item.title = linkEl.attr('data-title') ? linkEl.attr('data-title') : linkEl.attr('title'); 
			}

			if(linkEl.find('img').length > 0){
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.find('img').attr('src');
			} 

			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn){
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function(e){
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function(el){
			if(el.tagName){
				return (el.hasAttribute('data-lightbox') && el.getAttribute('data-lightbox') === 'true'); 
			}
		});

		if(!clickedListItem){
			if(e.target.nodeName == 'A'){
				if(e.target.target == '_blank'){
					window.open(e.target.href,'_blank');
				} else{
					return window.location.href = e.target.href;
				}
				
			}
			return;
		}

		// find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute
		var clickedGallery = jQuery(clickedListItem).parents('.lightbox-photoswipe'),
			childNodes = clickedGallery.find('[data-lightbox=\"true\"]'),
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++){
			if(childNodes[i].nodeType !== 1){ 
				continue; 
			}

			if(childNodes[i] === clickedListItem){
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}
		
		if(index >= 0){
			// open PhotoSwipe if valid index found
			openPhotoSwipe(index, clickedGallery[0]);
		}
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function(){
		var hash = window.location.hash.substring(1),
		params = {};

		if(hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if(!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');  
			if(pair.length < 2) {
				continue;
			}           
			params[pair[0]] = pair[1];
		}

		if(params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		if(!params.hasOwnProperty('pid')) {
			return params;
		}
		params.pid = parseInt(params.pid, 10);
		return params;
	};

	var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL){
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,
			items,
			shareButtons = [
				{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
				{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
				{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+ '?url={{url}}&media={{image_url}}&description={{text}}'},
				{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
			];

		items = parseThumbnailElements(galleryElement);
		if(typeof photoSwipeLocalize!=="undefined"){
			shareButtons = photoSwipeLocalize;
		}

		// define options (if needed)
		options = {
			index: index,

			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			showHideOpacity:true,

			getThumbBoundsFn: function(index) {
				// See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect(); 

				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			},
			
			addCaptionHTMLFn: function(item, captionEl, isFake) {
				if(!item.title) {
					captionEl.children[0].innerText = '';
					return false;
				}
				captionEl.children[0].innerHTML = item.title;
				return true;
			},
			
			getImageURLForShare: function( shareButtonData ) { 
				return items[index].src || '';
			},

			shareButtons: shareButtons,
			
			getPageURLForShare: function( shareButtonData ) {
				return items[index].src || '';
			},
			
			getTextForShare: function( shareButtonData ) {
				return items[index].title || '';
			},
			
			// Parse output of share links
			parseShareButtonOut: function(shareButtonData, shareButtonOut) { 
				return shareButtonOut;
			}
		};
        
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        var radios = document.getElementsByName('gallery-style');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                if(radios[i].id == 'radio-all-controls') {

                } else if(radios[i].id == 'radio-minimal-black') {
                    options.mainClass = 'pswp--minimal--dark';
                    options.barsSize = {top:0,bottom:0};
                    options.captionEl = false;
                    options.fullscreenEl = false;
                    options.shareEl = false;
                    options.bgOpacity = 0.85;
                    options.tapToClose = true;
                    options.tapToToggleControls = false;
                }
                break;
            }
        }

		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
		gallery.listen('beforeChange', function() {
	      var currItem = jQuery(gallery.currItem.container);
	      jQuery('.videoWrapper iframe').removeClass('active');
	      var currItemIframe = currItem.find('.videoWrapper iframe').addClass('active');
	      jQuery('.videoWrapper iframe').each(function() {
	        if (!jQuery(this).hasClass('active')) {
	          jQuery(this).attr('src', jQuery(this).attr('src'));
	        }
	      });
	    });

	    gallery.listen('close', function() {
			isFilterClick = true;
	      jQuery('.videoWrapper iframe').each(function() {
	        jQuery(this).attr('src', jQuery(this).attr('src'));
	      });
	    }); 
	};

	// loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll(gallerySelector);
	
	for(var i = 0, l = galleryElements.length; i < l; i++){
		galleryElements[i].setAttribute('data-pswp-uid', i+1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if(hashData.pid > 0 && hashData.gid > 0) {
		openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true, true );
	}
}