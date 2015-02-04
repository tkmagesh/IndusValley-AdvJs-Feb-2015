define([], function(){
	function SalaryCalculator(){
		/*this.basic = 0;
		this.hra =0;
		this.da = 0;
		this.tax = 0;
		this.salary = 0;
		this.onSalaryChange = undefined;*/
		var _data = {
			basic : 0,
			hra : 0,
			da : 0,
			tax :0,
			salary : 0,
			canCalculate : false
		};

		this.get = function(attrName){
			return _data[attrName];
		};

		this.set = function(attrName, value){
			_data[attrName] = value;
			//trigger change notifications
			triggerChange.call(this, attrName);
			if (attrName != "canCalculate")
				applyCanCalculate.call(this);
		};

		function applyCanCalculate(){
			var canCalculate = (this.get('basic') > 0) && (this.get('hra') > 0) && (this.get('da') > 0);
			this.set("canCalculate", canCalculate);
		}

		var _eventSubscriptions = {};

		this.addSubscriber = function(attrName, subscriptionFn){
			_eventSubscriptions[attrName] = _eventSubscriptions[attrName] || [];
			_eventSubscriptions[attrName].push(subscriptionFn);
		};

		function triggerChange(attrName){
			var subscriptionFns = _eventSubscriptions[attrName] || [];
			for(var i=0;i<subscriptionFns.length;i++){
				var subscriptionFn = subscriptionFns[i];
				subscriptionFn.call(this);
			}
		}
	}
	SalaryCalculator.prototype.calculate = function(){
		var gross = this.get('basic') + this.get('hra') + this.get('da');
		this.set('salary', gross * ((100-this.get('tax'))/100));
		
	};
	return SalaryCalculator;
});
