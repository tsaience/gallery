//mod -> text

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	
	//module text effect
	UxCBMod.fnModuleTextMaskMod = function(){
		UxCBMod.textMaskMod.each(function() {
			var module = $(this).parent().parent();
			var blendWrap = $(this).find('.background-blend');
			var effectMod = $(this).data('effect');
			var video = module.find('.background-video');
			
			switch(effectMod){
				case 'standard-to-mask':
					module.waypoint({
						handler: function(direction){
							if(direction == 'down'){
								blendWrap.addClass('enable-mask').removeClass('disable-mask');
								if(!video.length){
									blendWrap.addClass('enable-mask');
								}
							}else if(direction == 'up'){
								blendWrap.removeClass('enable-mask').addClass('disable-mask');
							}
						},
						offset: '-10px'
					});
				break;
				
				case 'mask-to-standard':
					module.waypoint({
						handler: function(direction){
							if(direction == 'down'){
								blendWrap.removeClass('enable-mask').addClass('disable-mask');
							}else if(direction == 'up'){
								blendWrap.removeClass('disable-mask');
								if(!video.length){
									blendWrap.addClass('enable-mask');
								}
							}
						},
						offset: '-10px'
					});
				break;
			}
		});
	}
	
	//Text module backgroud image clip
	UxCBMod.fnTextBgimgClip = function(textBgimgClip){
		textBgimgClip.each(function(){
			var textclip = $(this);
			var textclipDeepest = textclip.children(),
				textclipNext = textclipDeepest;
			while (textclipNext.length) {
			    textclipDeepest = textclipNext;
			    textclipNext = textclipNext.children();
			}
			if(!textclipNext.is('br')){
				if(!textclipDeepest.hasClass('text-clip-style')) {
					textclipDeepest.addClass('text-clip-style');
				}
			}
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
		
		UxCBMod.textMaskMod = UxCBMod.module.find('[data-effect]');
		UxCBMod.textBgimgClip = UxCBMod.module.find('.bm-text-bgimg-mask');
		
		if(UxCBMod.textMaskMod.length){
			UxCBMod.fnModuleTextMaskMod();
		}
		
		//text module background image clip
		if(UxCBMod.textBgimgClip.length){
			UxCBMod.fnTextBgimgClip(UxCBMod.textBgimgClip);
		}
	};
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['text'] = UxCBMod;
		}
	});
	
	//win load
	UxCBMod.win.on('load',function(){
		UxCBMod.fnInit();
	});
	
	
})(jQuery);