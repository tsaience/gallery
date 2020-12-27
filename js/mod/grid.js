//mod -> grid
//mod -> masonry-grid

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	UxCBMod.body= $('body');
	
	UxCBMod.module = $('.bm-builder > .module');
	UxCBMod.isotope = UxCBMod.module.find('.container-masonry');
	UxCBMod.gridMaskLink = UxCBMod.module.find('.grid-item-mask-link');
	//UxCBMod.gridHovertap = UxCBMod.module.find('.bm-touch-tab');
	UxCBMod.gridactiveTitLink = UxCBMod.module.find('.grid-active-titlelink');
	UxCBMod.pageLoading = $('.page-loading');
	
	UxCBMod.moduleIsotope = [];
	
	//fn isotope
	UxCBMod.fnIsotope = function(isotopeWrap){
		isotopeWrap.each(function(){
			var _list_wrap = $(this),
				_list = _list_wrap.find('.masonry-list'),
				_listUnique = _list.data('unique');
				
			if(!_list.hasClass('masonry-auto')) {

				UxCBModModuleIsotope[_listUnique] =  _list.isotope({
					itemSelector: '.grid-item',
					layoutMode: 'fitRows',
					percentPosition: true,
					stagger: 40,
					hiddenStyle: {
					  opacity: 0
					},
					visibleStyle: {
					  opacity: 1
					}
				});

			} else { 
				UxCBModModuleIsotope[_listUnique] = _list.isotope({ 
					itemSelector: '.grid-item',
					layoutMode: 'packery',
					stagger: 40,
					hiddenStyle: {
					  opacity: 0
					},
					visibleStyle: {
					  opacity: 1
					}
				}); 
			}
			
		});
	}
	
	// when lightbox, click title to post/portfolio item 
	UxCBMod.fnGridClickTitleOpenItem = function(item){
		item.each(function(){
			var _this = $(this),
			_this_a   = _this.find('.grid-item-tit-a'),
			_this_url = _this_a.attr('href');
			_this_a.on('click', function(){
				if(_this_a.attr('target') === '_blank') {
					window.open(_this_url, '_blank');
				}else{ 
					setTimeout(function(){
						window.location.href = _this_url;
					}, 40); 
				}
				return false;
			});	
		});
	}
	
	//Hover effect of Grid and MasonryGrid for touch screen
	UxCBMod.fnGridHoverOnTouch = function(item){
		item.each(function(){
			var _this = $(this),
			_this_a   = _this.find('.grid-item-mask-link'),
			_this_c   = _this.find('.sea-grid-item-con'),
			_this_url = _this_a.attr('href');
			if(!_this_a.hasClass('lightbox-item')){
				if(_this.find('.grid-item-inside').hasClass('bm-touch-tab')) {
					_this.on('touchstart', _.debounce(function(e){
						if(!_this_c.hasClass('bm-hover')){
							_this_c.addClass('bm-hover');
							_this.siblings().find('.sea-grid-item-con').removeClass('bm-hover');
						}
						e.stopPropagation();
					},60));
				
					if(!_this_c.hasClass('ux-ajax-page-transition-link')){
						_this.on('click', function(e){
							if(_this_c.hasClass('bm-hover')){
								_this_c.removeClass('bm-hover');
								if(_this_a.attr('target') === '_blank') {
									setTimeout(function(){
										window.open(_this_url, '_blank');
									}, 320); 
								}else{
									if(UxCBMod.pageLoading.length){ 
										setTimeout(function(){
											UxCBMod.pageLoading.addClass('visible');
										}, 100);
									}
									UxCBMod.body.addClass('ux-start-hide');
									UxCBMod.body.find('#wrap').animate({opacity: 0}, 300);
									UxCBMod.body.find('#wrap-outer').css('height', 'auto');
									setTimeout(function(){
										window.location.href = _this_url;
									}, 320); 
								}
							}
							return false;
						});
					}

				}
			}
		});
	}
	
	//document ready
	UxCBMod.doc.ready(function(){ });
	
	//UxCBMod init
	UxCBMod.fnInit = function(){
		UxCBMod.module = $('.bm-builder > .module');
		if(!UxCBMod.module.length){
			if($('.bm-builder > .bm-row').length){
				UxCBMod.module = $('.bm-builder > .bm-row > .module');
			}
		}
		
		UxCBMod.isotope = UxCBMod.module.find('.container-masonry');
		UxCBMod.gridMaskLink = UxCBMod.module.find('.grid-item-mask-link');
		UxCBMod.gridHovertap = UxCBMod.module.find('.bm-touch-tab');
		UxCBMod.gridactiveTitLink = UxCBMod.module.find('.grid-active-titlelink');
		
		//call isotope (portfolio)
		if(UxCBMod.isotope.length){
			UxCBMod.fnIsotope(UxCBMod.isotope);
		}
		
		//remove title of tag a
		if(UxCBMod.gridMaskLink.length) {
			UxCBMod.gridMaskLink.removeAttr('title');
		}
		
		//Call Hover effect of Grid and MasonryGrid for touch screen 
		UxCBMod.seaGridItem = UxCBMod.module.find('.sea-grid-item');
		if(Modernizr.touchevents && UxCBMod.seaGridItem.hasClass('grid-item')){ 
 			UxCBMod.fnGridHoverOnTouch(UxCBMod.seaGridItem);
 	 	}

		//call
		if(UxCBMod.gridactiveTitLink.length) {
			//UxCBMod.fnGridClickTitleOpenItem(UxCBMod.gridactiveTitLink);
		}
	}
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['grid'] = UxCBMod;
		}
	});
	
	//win load
	UxCBMod.win.on('load', function(a,b,c){
		UxCBMod.fnInit();
		
	});
	
	
	
})(jQuery);