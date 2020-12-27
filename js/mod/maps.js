//mod -> single-image

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	
	UxCBMod.module = $('.bm-builder > .module');
	UxCBMod.googleMaps = UxCBMod.module.find('.module-map-canvas'); 

	//GoogleMap initialize
	UxCBMod.fnMapInit = function(gm){
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(gm.l, gm.r);
		var dismouse = gm.dismouse == 't' ? true : false;
		var markers = [];
		var map_type;
		//var draggable_touch = themePB.isMobile == true ? 'false' : 'true';
		switch(gm.view){
			case 'map': map_type = google.maps.MapTypeId.ROADMAP; break;
			case 'satellite': map_type = google.maps.MapTypeId.SATELLITE; break;
			case 'map_terrain': map_type = google.maps.MapTypeId.TERRAIN; break;
		}
		 
		var mapOptions = {
			zoom: gm.zoom,
			center: latlng,
			mapTypeId: map_type,
			scrollwheel: dismouse,
			draggable: true,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}

		 
		var google_map = new google.maps.Map(gm.element, mapOptions);
		
		if(gm.pin == 't'){
			if(gm.pin_custom != ''){
				var image = {
					url: gm.pin_custom
				};
				
				var marker = new google.maps.Marker({
					position: latlng,
					map: google_map,
					icon: image
				});
			}else{
				var marker = new google.maps.Marker({
					position: latlng,
					map: google_map
				});
			}
		}
		
		if(gm.style == 't' && eval(gm.style_code)){
			var styledMap = new google.maps.StyledMapType(eval(gm.style_code), {name: "Styled Map"});
			 
			google_map.mapTypes.set('map_style', styledMap);
			google_map.setMapTypeId('map_style');
		}
	}
	
	//single image embed
	UxCBMod.fnModuleCallGoogleMaps = function(ele){

		ele.each(function(index, element) {
			var googlemap = [];
					
			googlemap.item = $(this);
			googlemap.element = element;
			googlemap.l = Number(googlemap.item.data('l'));
			googlemap.r = Number(googlemap.item.data('r'));
			googlemap.zoom = Number(googlemap.item.data('zoom'));
			googlemap.pin = googlemap.item.data('pin');
			googlemap.pin_custom = googlemap.item.data('pin-custom');
			googlemap.view = googlemap.item.data('view');
			googlemap.dismouse = googlemap.item.data('dismouse');
			googlemap.style = googlemap.item.data('style');
			googlemap.style_code = googlemap.item.next('.module-map-style-code').val();
			
			UxCBMod.fnMapInit(googlemap);
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
		 
		UxCBMod.googleMaps = UxCBMod.module.find('.module-map-canvas');
		 
		
		//Call single image svg
		if(UxCBMod.googleMaps.length) {
			UxCBMod.fnModuleCallGoogleMaps(UxCBMod.googleMaps);
		}
	};
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['maps'] = UxCBMod;
		}
		
		
	});
	
	//win load
	UxCBMod.win.on('load',function(){
		UxCBMod.fnInit();
	});
	
})(jQuery);