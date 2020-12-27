// Single project gallery on left&right 
(function($){

	"use strict";
	var themeData                    = [];
	themeData.win                    = $(window);
	themeData.body                   = $('body');
	themeData.contentWrap            = $('#content_wrap');
	themeData.listLayout             = $('.list-layout');
	themeData.singleGalleryFilled    = $('.single-gallery-wrap-inn[data-style="filled"]');
	themeData.lightboxPhotoSwipe     = $('.lightbox-photoswipe');

	var switchWidth = 767;
	
	themeData.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || themeData.win.width() < switchWidth){
			return true; 
		}else{
			return false;
		}
	}

	//List Layout Height
	themeData.fnListLayoutHeight = function(){
		
		themeData.listLayout.find('.list-layout-col2, .list-layout-col3, .list-layout-col4').each(function(){
			var layoutGetmin = [];
			var changeColWidthSum = 0;
			var base = 1;
			var lastWidthSum = 0;
			var colItems = $(this).find('.list-layout-item');
			var colWidth = $(this).width();
			var colCount = colItems.length;
			var colGap = Number(themeData.listLayout.data('gap'));

			colItems.each(function(){
				
				var thisWidth = $(this).width();
				
                layoutGetmin.push(Number($(this).find('img').attr('height')));
				if(colWidth != thisWidth){
					colWidth = colWidth - colGap;
				}
            }); 
			
			var itemHeight = Math.min.apply(null,layoutGetmin);
			colItems.each(function(index){
				var imgWidth = parseFloat(Number($(this).find('img').attr('width')));
				var imgHeight = parseFloat(Number($(this).find('img').attr('height')));
				var imgBase = itemHeight / imgHeight;
				
				imgWidth = imgWidth * imgBase;
				imgHeight = itemHeight;
				
				changeColWidthSum = changeColWidthSum + imgWidth;
			});
			
			base = colWidth / changeColWidthSum;
			
			colItems.each(function(){
				var imgWidth = parseFloat(Number($(this).find('img').attr('width')));
				var imgHeight = parseFloat(Number($(this).find('img').attr('height')));
				var imgBase = itemHeight / imgHeight;
				var thisWidth = $(this).width();
				
				imgWidth = (imgWidth * imgBase) * base; 
				imgHeight = itemHeight * base;
				
				if(colWidth != thisWidth){
					$(this).css('width', 'auto');
					
					$(this).find('.lightbox-item').css({
						'width': imgWidth,
						'height': imgHeight,
						'overflow': 'hidden'
					});
					
					$(this).find('img').css({
						'width': '100%',
						'height': 'auto'
					});

					$(this).find('.list-layout-inside-caption').css({'width': imgWidth});
					
					lastWidthSum = lastWidthSum + imgWidth;
					if(Math.round(lastWidthSum) > colWidth){
						$(this).find('.lightbox-item').width(imgWidth - (lastWidthSum - colWidth));
					}else if(Math.round(lastWidthSum) == colWidth){
						$(this).find('.lightbox-item').css({
							'width': imgWidth - 0.5
						});
					}
				}else{
					$(this).find('.lightbox-item').css({
						'width': 'auto',
						'height': 'auto',
						'overflow': 'hidden'
					});
					$(this).find('.list-layout-inside-caption').css({'width': 'auto'});
				}
			});
		});
	}

	//Single Gallery Filled
	themeData.fnSingleGalleryFilled = function(){
		var singleCol2TextWrap = $('.single-col2-text-wrap');
		var singleCol2GalleryWrap = $('.single-col2-gallery-wrap');
		var singleCol2GalleryWrapLeft = singleCol2GalleryWrap.css('padding-left');
		var singleCol2GalleryWrapRight = singleCol2GalleryWrap.css('padding-right');
		var singleGalleryWrapInn = $('.single-gallery-wrap-inn');
		var singleArticle = themeData.contentWrap.find('> article');
		var singleArticleLeft = singleArticle.offset().left;
		var singleArticleRight = singleArticle.offset().left;
		if(singleArticle.hasClass('container')){
		} else {
			singleCol2GalleryWrapLeft = '0px';
			singleCol2GalleryWrapRight = '0px';
			singleArticleLeft = singleArticle.css('padding-left').replace('px', '');
			singleArticleRight = singleArticle.css('padding-right').replace('px', '');
		}
		
		if(singleCol2TextWrap.is('.pull-right')){
			singleGalleryWrapInn.css('margin-left', '0px').animate({ opacity : 1 },300);
			var singleGalleryLeft = Number(singleArticleLeft) + Number(singleCol2GalleryWrapLeft.replace('px', ''));
			singleGalleryWrapInn.css({
				'margin-left': '-' + singleGalleryLeft + 'px'
			});
		}else{
			singleGalleryWrapInn.animate({ opacity : 1 },300);
			var singleGalleryRight = Number(singleArticleRight) + Number(singleCol2GalleryWrapRight.replace('px', ''));
			singleGalleryWrapInn.css({
				'margin-right': '-' + singleGalleryRight + 'px'
			});
			
		}
		themeData.fnListLayoutHeight();
	}

	themeData.win.on('load', function(){
		//Call Gallery list layout
		if(themeData.listLayout.length && !themeData.singleGalleryFilled.length) {
			themeData.fnListLayoutHeight();
			themeData.win.bind('resize', themeData.fnListLayoutHeight);
		}

		//Call Gallery 2col filled layout
		if(themeData.singleGalleryFilled.length) {
			themeData.fnSingleGalleryFilled();
			themeData.win.on('resize', _.debounce(function(e){ 
				themeData.fnSingleGalleryFilled();
			}, 120));
		}

		//Call Lightbox 
		if(themeData.lightboxPhotoSwipe.length && themeData.body.hasClass('single-ux-portfolio')){
		//	fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
		}
	});

})(jQuery);

//Lightbox
function fnInitPhotoSwipeFromDOM(gallerySelector){
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
				item.title = linkEl.attr('title'); 
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
				if(e.target.target == '_blank') {
					window.open(e.target.href, '_blank');
				}else{
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
			
			getPageURLForShare: function( shareButtonData ) {
				return items[index].src || '';
			},

			shareButtons: shareButtons,
			
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