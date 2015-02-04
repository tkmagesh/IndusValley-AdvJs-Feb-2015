define(['jquery', 'text!calculatorTemplate.html'], function($, templateHTML){
	function SalaryCalculatorView(calculator){
		var $root = this.$root = $("<div></div>");

		this.init = function(){
			//Model changes
			calculator.addSubscriber("salary", function(){
				$("#divResult", $root).html(this.get('salary'));
			});
			calculator.addSubscriber("basic", function(){
				$("#txtBasic", $root).val(this.get('basic'));
			});
			calculator.addSubscriber("hra", function(){
				$("#txtHra", $root).val(this.get('hra'));
			});
			calculator.addSubscriber("da", function(){
				$("#txtDa", $root).val(this.get('da'));
			});
			calculator.addSubscriber("tax", function(){
				$("#rangeTax", $root).val(this.get('tax'));
				$("#spanTax", $root).text(this.get('tax') + '%');
			});

			calculator.addSubscriber("canCalculate", function(){
				$("#btnCalculate").attr("disabled", !this.get("canCalculate"));
			});			

			//UI Events
			$root.on("change", "#txtBasic", function(){
				calculator.set('basic', parseInt(this.value,10));
			});
			$root.on("change", "#txtHra", function(){
				calculator.set('hra', parseInt(this.value,10));
			});
			$root.on("change", "#txtDa", function(){
				calculator.set('da', parseInt(this.value,10));
			});
			$root.on("change", "#rangeTax", function(){
				calculator.set('tax', parseInt(this.value,10));
			});

			$root.on("click", "#btnCalculate", function(){
				calculator.calculate();
			});

		};

		this.render = function(){
			$root.html(templateHTML);
		}
	}
	return SalaryCalculatorView;
})
