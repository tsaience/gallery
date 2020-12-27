//mod -> contact-form

(function($){

    "use strict";
	
	var UxCBMod = [];
	
	//window
	UxCBMod.win = $(window);
	UxCBMod.doc = $(document);
	
	//fn contact form
	UxCBMod.fnContactForm = function(){
		UxCBMod.contactform.each(function(){
			
			var form = $(this),
				formMessage = form.find('input[type=\"hidden\"].info-tip').data('message'),
				formSending = form.find('input[type=\"hidden\"].info-tip').data('sending'),
				privacyPolicy = form.find('input[name=\"idi_privacy_policy\"]'),
				formSubmit = form.find('input[type=\"submit\"]');
			
				if(privacyPolicy.length){
					privacyPolicy.change(function(){
						if($(this).is(':checked')){
							formSubmit.removeAttr('disabled');
						}else{
							formSubmit.attr('disabled','disabled');
						}
					});
				}
				
				form.submit(function() {
					var hasError = false;
					
					form.find('.requiredField').each(function(){
						if($.trim($(this).val()) == '' || $.trim($(this).val()) == 'Name*' || $.trim($(this).val()) == 'Email*' || $.trim($(this).val()) == 'Required' || $.trim($(this).val()) == 'Invalid email'){
						
							$(this).attr("value", "Required");
							hasError = true;
							
						}else if($(this).hasClass('email')){
							var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
							
							if(!emailReg.test($.trim($(this).val()))){
								$(this).attr("value", "Invalid email");
								hasError = true;
							}
						
						}

					});

					//After verification, print some infos. 
					if(!hasError){	
						if(form.hasClass('single-feild')){
							form.find('.idi_send').val(formSending).attr('disabled','disabled');
						}else{	
							form.find('.idi_send').fadeOut('normal', function(){
								form.append('<p class="sending">' + formSending + '</p>');
							});
						}
						var formInput = form.serialize();
						
						$.post(form.attr('action'), formInput, function(){
							form.slideUp("fast", function() {
								if(form.hasClass('single-feild')){
									form.before('<p class="success" style=" text-align:center">' + formMessage + '</p>');
								}else{
									form.before('<p class="success">' + formMessage + '</p>');
									form.find('.sending').fadeOut();
								}
							});
						});
					}
					
					return false;
				});
				
		});//End each
	}
	
	//UxCBMod init
	UxCBMod.fnInit = function(){
		UxCBMod.module = $('.bm-builder > .module');
		if(!UxCBMod.module.length){
			if($('.bm-builder > .bm-row').length){
				UxCBMod.module = $('.bm-builder > .bm-row > .module');
			}
		}
		
		UxCBMod.contactform = UxCBMod.module.find('.contact_form');
		
		//Contact Form
		if(UxCBMod.contactform.length) {
			UxCBMod.fnContactForm();
		}
		
	};
	
	//document ready
	UxCBMod.doc.ready(function(){
		if(UxCBModGlobal){
			UxCBModGlobal['contact-form'] = UxCBMod;
		}
		
		UxCBMod.fnInit();
	});
	
	
})(jQuery);