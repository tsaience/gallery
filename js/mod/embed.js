//mod -> grid -> source -> post
//mod -> embed

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	
	//Click to play Youtube/Vimoe with cover for Embed & Grid 
	UxCBMod.fnModuleVideoCover = function(arrayVideo){
		arrayVideo.each(function(){
			var videoFace = [];
			videoFace.item = $(this);
			videoFace.playBtn = videoFace.item.find('.video-play-btn');
			videoFace.videoIframe = videoFace.item.find('iframe');
			videoFace.playBtn.on('click',function(){ 
				videoFace.item.find('.embed-video-cover').css('display','none');
				var src = videoFace.videoIframe.attr('data-src').replace('autoplay=0', 'autoplay=1&muted=1');
				videoFace.videoIframe.attr('src', src); 
				return false;
			});
		});
	}
	
	//call player play
	UxCBMod.fnAudioPlay = function(el){
		el.on('click', function(){
			var thisID = $(this).attr("id");
			if($(this).hasClass('pause')){
				$('.audiobutton').removeClass('play').addClass('pause');
				$(this).removeClass('pause').addClass('play');
				UxCBMod.jplayer.jPlayer("setMedia", {
					mp3: $(this).attr("rel")
				});
				UxCBMod.jplayer.jPlayer("play");
				UxCBMod.jplayer.bind($.jPlayer.event.ended, function(event) {
					$('#'+thisID).removeClass('play').addClass('pause');
				});
			}else if($(this).hasClass('play')){
				$(this).removeClass('play').addClass('pause');
				UxCBMod.jplayer.jPlayer("stop");
			}
		});
	}
	
	//audio player function
	UxCBMod.fnJplayerCall = function(items){
		if(UxCBMod.jplayer.length){
			UxCBMod.jplayer.jPlayer({
				ready: function(){
					$(this).jPlayer("setMedia", {
						mp3:""
					});
				},
				swfPath: JS_PATH,
				supplied: "mp3",
				wmode: "window"
			});
			
			items.each(function(){
                UxCBMod.fnAudioPlay($(this));
            });
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
	
	//UxCBMod init
	UxCBMod.fnInit = function(){
		UxCBMod.module = $('.bm-builder > .module');
		if(!UxCBMod.module.length){
			if($('.bm-builder > .bm-row').length){
				UxCBMod.module = $('.bm-builder > .bm-row > .module');
			}
		}
		
		UxCBMod.jplayer = $('#jquery_jplayer');
		UxCBMod.videoFace = UxCBMod.module.find('.embed-wrap-has-cover');
		
		//Call Youtube/Vimoe with cover for Embed & Grid 
		if(UxCBMod.videoFace.length) {
			UxCBMod.fnModuleVideoCover(UxCBMod.videoFace);
		}
	};
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['embed'] = UxCBMod;
		}
		
		UxCBMod.fnInit();
		
	}).ajaxSuccess(function( event, xhr, settings ) {
		var data = UxCBMod.fnParseQuery(decodeURIComponent(settings.data));
		
		if(data['action'] == 'ux_cb_module_grid_container'){
			var content = xhr.responseText,
				moduleUnique = data['moduleUnique'];
			
			$.each($(content), function(index, item){
				var item = $(item),
					itemPostID = item.attr('data-postid'),
					targetItem = $('.module-id-' +moduleUnique+ ' section.grid-item[data-postid="' +itemPostID+ '"]');
				
				if(targetItem.length){
					var videoFace = targetItem.find('.embed-wrap-has-cover');
					if(videoFace.length) {
						UxCBMod.fnModuleVideoCover(videoFace);
					}
					
					var audioButton = targetItem.find('.audiobutton');
					if(audioButton.length) {
						UxCBMod.fnJplayerCall(audioButton);
					}
				}
			});
		}
	});
	
	
})(jQuery);