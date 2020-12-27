//mod -> single-image

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	
	UxCBMod.module = $('.bm-builder > .module');
	UxCBMod.singleImageEmbed = UxCBMod.module.find('.single-image-embed');
	UxCBMod.singleImageScroll  = UxCBMod.module.find('[data-scrolling]');
	
	//single image embed
	UxCBMod.fnModuleSingleImageEmbed = function(embeds){
		embeds.each(function(){
			var embed = $(this);
			var embedSrc = embed.attr('datasrc');
			var svgColor = embed.attr('data-color');
			var svgColorMouseover = embed.attr('data-color-mouseover');
			var svgColorFill = embed.attr('data-color-fill');
			var svgColorMouseoverFill = embed.attr('data-color-mouseover-fill');
			var svgWidth = embed.attr('data-width');
			
			$.get(embedSrc, 'html').done(function(result){
				var svg = $(result).find('svg');
				
				svg.find('path').css('stroke', svgColor).css('fill', svgColorFill);
				svg.find('rect').css('stroke', svgColor).css('fill', svgColorFill);
				svg.find('circle').css('stroke', svgColor).css('fill', svgColorFill);
				svg.find('ellipse').css('stroke', svgColor).css('fill', svgColorFill);
				svg.find('line').css('stroke', svgColor).css('fill', svgColorFill);
				svg.find('polyline').css('stroke', svgColor).css('fill', svgColorFill);
				svg.find('polygon').css('stroke', svgColor).css('fill', svgColorFill);
				svg.hover(function(){
					svg.find('path').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
					svg.find('rect').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
					svg.find('circle').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
					svg.find('ellipse').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
					svg.find('line').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
					svg.find('polyline').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
					svg.find('polygon').css('stroke', svgColorMouseover).css('fill', svgColorMouseoverFill);
				}, function(){
					svg.find('path').css('stroke', svgColor).css('fill', svgColorFill);
					svg.find('rect').css('stroke', svgColor).css('fill', svgColorFill);
					svg.find('circle').css('stroke', svgColor).css('fill', svgColorFill);
					svg.find('ellipse').css('stroke', svgColor).css('fill', svgColorFill);
					svg.find('line').css('stroke', svgColor).css('fill', svgColorFill);
					svg.find('polyline').css('stroke', svgColor).css('fill', svgColorFill);
					svg.find('polygon').css('stroke', svgColor).css('fill', svgColorFill);
				});
				
				if(Number(svgWidth)){
					svg.width(svgWidth).height('auto');
				}
				embed.after(svg);
				embed.remove();
			});
			
		});
	}
	
	//module single image scrolling
	UxCBMod.fnModuleSingleImageScroll = function(scrollWrap){
		scrollWrap.on('click', function(){
			var scrolling = $(this).data('scrolling');
			var scrollTop = 0;
			var winScrollTop = UxCBMod.win.scrollTop();
			var winHeight = UxCBMod.win.height();
			var docHeight = UxCBMod.doc.height();
			
			switch(scrolling){
				case 'scroll-top':
					if(winScrollTop >= winHeight){
						scrollTop = winScrollTop - winHeight;
					}
				break;
				case 'scroll-down':
					scrollTop = winScrollTop + winHeight;
				
				break;
				case 'bottom-of-page':
					if(docHeight >= winHeight){
						scrollTop = docHeight - winHeight;
					}
				break;
			}
			
			$('html,body').animate({scrollTop: scrollTop }, 600);

			return false;
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
		
		UxCBMod.singleImageScroll  = UxCBMod.module.find('[data-scrolling]');
		UxCBMod.singleImageEmbed = UxCBMod.module.find('.single-image-embed');
		
		if(UxCBMod.singleImageScroll.length){
			UxCBMod.singleImageScroll.each(function(){
				UxCBMod.fnModuleSingleImageScroll($(this));
			});
		}
		
		//Call single image svg
		if(UxCBMod.singleImageEmbed.length) {
			UxCBMod.fnModuleSingleImageEmbed(UxCBMod.singleImageEmbed);
		}
	};
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['single-image'] = UxCBMod;
		}
		
		
	});
	
	//win load
	UxCBMod.win.on('load',function(){
		UxCBMod.fnInit();
	});
	
})(jQuery);