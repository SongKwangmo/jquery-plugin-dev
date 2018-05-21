/**********************************************************************/
/***************       jQuery Validation Control        ***************/
/**********************************************************************/
/* jQuery Validation Plugin - v1.17.0 Needed */
/* https://jqueryvalidation.org */


;(function($,window,document,undefined){ // 플러그인 코드 작성 부분 	

	var pluginName = "valiControl",
		defaults = {
			errorPlacement: function (error, element){
				element.after(error);
			},
			rules: {
			}
		};	
	
	$[pluginName] = function(element,options){
		if(typeof $["validator"] == "function"){
			this.option = $.extend({},defaults,options);
			//return this.option;
			$(element).validate(this.option);
		}else{
			console.warn("이 플러그인은 jQuery Validation Plugin - v1.17.0을 필요로 합니다.");	
			console.warn("'https://jqueryvalidation.org'을 참조하세요!");	
		}
	}

	$.fn[pluginName] = function(options){
		return this.each(function(idx){
			console.group(pluginName);

			$.valiControl(this,options);

			console.groupEnd();
		});
	}

})(jQuery,window,document);