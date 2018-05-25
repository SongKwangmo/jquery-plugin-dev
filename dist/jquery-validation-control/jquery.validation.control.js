/**********************************************************************/
/***************       jQuery Validation Control        ***************/
/**********************************************************************/
/* jQuery Validation Plugin - v1.17.0 Needed */
/* https://jqueryvalidation.org */

//TODO:
//set 메소드를 공통 default 값으로만 저장하는 것이 아닌, 개별 폼에 저장하여 별도의 옵션을 소유하도록 변경 필요.

;(function($,window,document,undefined){ // 플러그인 코드 작성 부분 	

	var pluginName = "valiControl",
		defaults = {
			errorPlacement: function (error, element){
				var errObj = $("<div class='validate-msg'></div>");
				errObj.html(error);
				element.after(errObj);
				console.log(error);
			},
			invalidHandler: function(event, validator) {
				// 'this' refers to the form
				var errors = validator.numberOfInvalids();
				if (errors) {
					var message = errors == 1
					/*
					? 'You missed 1 field. It has been highlighted'
					: 'You missed ' + errors + ' fields. They have been highlighted';
					*/
					? '1개의 필드가 잘못 작성되었습니다. 하이라이트 된 항목을 올바르게 작성해주세요.'
					: errors + '개의 필드가 잘못 작성되었습니다. 하이라이트 된 항목을 올바르게 작성해주세요.';

					if($(this).find(".err-msg").length == 0){
						$(this).append("<div class='err-msg'></div>");
					}
					$(this).find(".err-msg").addClass("is-active");	
					$(this).find(".err-msg").html(message);
					console.log("error!");

					console.log(errors);
				}
			},
			rules: {
				userpass: {
					required: true,
					minlength: 8,
					maxlength: 16,
				},
				userEmail: {email: true},
				userRegisNumber : { //주민등록번호
					resident_registration_number: true
				},
			},
			messages: {
			},
			methods: {
				resident_registration_number: { //주민등록번호 method
					option : {
						selector : "userRegisNumber",
						required : true,
					},
					msg: "올바른 주민등록번호 형식이 아닙니다.",
					action: function(value, element){
						var sum = 0;
						value = value.replace(/-|\s/g,"");
						// value = value.replace(/[^0-9]/g,'');

						if(value.trim() != "" && value != undefined){
							if (this.optional(element) || value.match(/\d{2}[0-1]\d{1}[0-3]\d{1}\d{7}/)) {
								if (value.substr(6, 1) >= 5 && value.substr(6, 1) <= 8) { //외국인
									if (Number(value.substr(7, 2)) % 2 != 0) return false;
									for (var i = 0; i < 12; i++) {
										sum += Number(value.substr(i, 1)) * ((i % 8) + 2);
									}
									if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(value.substr(12, 1)))
										return true;
									return false;
				 
								} else { //내국인
									for (var i = 0; i < 12; i++) {
										sum += Number(value.substr(i, 1)) * ((i % 8) + 2);
									}
									if (((11 - (sum % 11)) % 10) == Number(value.substr(12, 1)))
										return true;
									return false;
								}
							} else {
								return false;
							}
						}else{
							return true;
						}						
					}
				},


				business_registration_number: { //사업자번호 method
					msg : "올바른 사업자등록번호 형식이 아닙니다.",
					action : function(value, element){
						// console.log(element);
						var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
						var tmpBizID, i, chkSum=0, c2, remander; 
						value = value.replace(/-|\s/gi,''); 
						// value = value.replace(/[^0-9]/g,'');

						for (i=0; i<=7; i++) chkSum += checkID[i] * value.charAt(i); 
						c2 = "0" + (checkID[8] * value.charAt(8)); 
						c2 = c2.substring(c2.length - 2, c2.length); 
						chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
						remander = (10 - (chkSum % 10)) % 10 ; 

						if (Math.floor(value.charAt(9)) == remander) {
							return true ;
						} else {
							return false; 
						}						
					}
				},
			},
			
		};

	$[pluginName] = {

		set: function(options){
			this.setOpt = $.extend({},defaults,options);
			for(key in this.setOpt){
				if(typeof this.setOpt[key] == "object" && options != undefined){
					this.setOpt[key] = $.extend({},defaults[key],options[key]);
				}
			}

			if(this.setOpt.methods){
				var mobj = this.setOpt.methods;
				for(key in mobj){
					$.validator.addMethod(key, mobj[key].action, mobj[key].msg);
				}
			}
			console.log(this.setOpt);
			console.log("jQuery Validation Setting Complete!");
		},
		default: function(element,options){
			if(typeof $["validator"] == "function"){
				$el = $(element);
				var opts = $[pluginName].setOpt;
				$el[pluginName].option = $.extend({},opts,options);
				for(key in $el[pluginName].option){
					if(typeof $el[pluginName].option[key] == "object" && options != undefined){
						$el[pluginName].option[key] = $.extend({},opts[key],options[key]);
					}
				}

				console.log(element);
				console.log($el[pluginName].option);
				$el.validate($el[pluginName].option);
			}else{
				console.warn("이 플러그인은 jQuery Validation Plugin - v1.17.0을 필요로 합니다.");	
				console.warn("'https://jqueryvalidation.org'을 참조하세요!");	
			}
		}
	}

	$.fn[pluginName] = function(options){
		/*
		if(!$[pluginName].setOpt){
			$[pluginName].set();			
		}
		*/
		return this.each(function(idx){
			console.group(pluginName);

			$.valiControl.default(this,options);

			console.groupEnd();
		});
	}

	$.valiControl.set();

})(jQuery,window,document);