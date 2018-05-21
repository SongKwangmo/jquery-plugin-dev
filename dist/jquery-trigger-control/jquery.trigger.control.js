/*
;(function($,window,document,undefined){ // 플러그인 코드 작성 부분 
	
	var pluginName = 'triggerSet',
		defaults = {
			option1 : "aaaa",
			option2 : "bbb",
		};

	function Plugin(element,options){
		this.element = element;
		this.option = $.extend({},defaults,options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function(){
		//초기화 로직 작성
	}

	$.fn[pluginName] = function(option){
		return this.each(function(){
			if (!$.data(this, 'plugin_' + pluginName)) { 
				$.data(this, 'plugin_' + pluginName, new Plugin( this, option ));
			}

			//plugin functional code Start!
			console.log(this.option);
		});
	}
	
})(jQuery,window,document);	
*/

;(function($,window,document,undefined){ // 플러그인 코드 작성 부분 

	var pluginName = "triggerControl",
		defaults = {
			option1: "111",
			option2: "222",
		};

	$[pluginName] = function(options){
		this.option = $.extend({},defaults,options);

		return this.option;
	}

	$.fn[pluginName] = function(options){
		return this.each(function(idx){
			$(this).text($[pluginName](options)["option" + (idx+1)]);
		});
	}

})(jQuery,window,document);