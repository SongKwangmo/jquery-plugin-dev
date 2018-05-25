;(function($,window,document,undefined){ // 플러그인 코드 작성 부분 

	var pluginName = "exPlugin",
		defaults = {
			option1: "111",
			option2: "222",
		};
	
	$[pluginName] = {		

		test: function(){
			alert(111);
		}
	}

	/*
	$[pluginName] = {
		method1: function(options){
			this.option = $.extend({},defaults,options);

			return this.option;
			//console.log(this.option);
		},
		method2: function(options){
			this.option = $.extend({},defaults,options);

			return this.option;
		},
	}
	*/

	//$[pluginName] = function(){$[pluginName].method1();}

	$.fn[pluginName] = function(options){
		return this.each(function(idx){
			console.log(this);
		});
	}

})(jQuery,window,document);