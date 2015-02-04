require(['SalaryCalculator', 'SalaryCalculatorView', 'jquery'], function(SalaryCalculator, SalaryCalculatorView, $){
	var calculator = new SalaryCalculator();

	var view1 = new SalaryCalculatorView(calculator);
	view1.init();


	var view2 = new SalaryCalculatorView(calculator);
	view2.init();


	$(function(){
		console.log("document ready");
		view1.render();
		view1.$root.appendTo(document.body);	
		view2.render();
		view2.$root.appendTo(document.body);	
	});
});
