var products = [
	{id : 9, name : "Pen", cost : 70, units : 10, category : 1},
	{id : 8, name : "Hen", cost : 30, units : 60, category : 2},
	{id : 5, name : "Ten", cost : 20, units : 30, category : 1},
	{id : 7, name : "Den", cost : 50, units : 80, category : 2},
	{id : 2, name : "Zen", cost : 80, units : 40, category : 1},
	{id : 4, name : "Ken", cost : 60, units : 90, category : 2}
];

function displayGroup(groupName, fn){
	console.group(groupName);
	fn();
	console.groupEnd();
};

displayGroup("Default products list", function(){
	console.table(products);
});


/*
1. Sort
2. Filter
3. Min
4. Max
5. Sum
6. Average
7. Any
8. All
9. GroupBy
*/

displayGroup("Sort", function(){
	
	displayGroup("Default Sort [By id]", function(){
		function sort(list){
			for(var i=0;i < list.length-1;i++)
				for(var j = i+1;j < list.length;j++){
					var left = list[i],
						right = list[j];
					if (left.id > right.id){
						list[i] = list[j];
						list[j] = left;
					}
				}
		};
		sort(products);
		console.table(products);
	});
	displayGroup("Sort [By attrName]", function(){
		function sort(list,attrName){
			for(var i=0;i < list.length-1;i++)
				for(var j = i+1;j < list.length;j++){
					var left = list[i],
						right = list[j];
					if (left[attrName] > right[attrName]){
						list[i] = list[j];
						list[j] = left;
					}
				}
		};
		displayGroup("[By cost]", function(){
			sort(products, "cost");
			console.table(products);
		});
		displayGroup("[By units]", function(){
			sort(products, "units");
			console.table(products);
		});
	});
	displayGroup("Sort [By comparerFn]", function(){
		function sort(list,comparerFn){
			for(var i=0;i < list.length-1;i++)
				for(var j = i+1;j < list.length;j++){
					var left = list[i],
						right = list[j];
					if (comparerFn(left, right) > 0){
						list[i] = list[j];
						list[j] = left;
					}
				}
		};
		displayGroup("[By value = cost * units]", function(){
			function productComparerByValue(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			}
			sort(products, productComparerByValue);
			console.table(products);
		});
		
	});

});

displayGroup("Filter", function(){
	
	displayGroup("[By costly products]", function(){
		function filterCostlyProducts(list){
			var result = [];
			for(var i=0;i<list.length;i++)
				if (list[i].cost > 50)
					result.push(list[i]);
			return result;
		}

		var costlyProducts = filterCostlyProducts(products);
		console.table(costlyProducts);
	});

	displayGroup("[Using predicate]", function(){
		function filter(list, predicate){
			var result = [];
			for(var i=0;i<list.length;i++)
				if (predicate(list[i]) === true)
					result.push(list[i]);
			return result;
		}
		displayGroup("Costly products - cost > 50", function(){
			var costlyProductsPredicate = function(item){
				return item.cost > 50;
			};
			var costlyProducts = filter(products, costlyProductsPredicate);
			console.table(costlyProducts);	
		})

		displayGroup("Affordable products - cost <= 50", function(){
			var affordableProductsPredicate = function(item){
				return item.cost <= 50;
			};
			var affordableProducts = filter(products, affordableProductsPredicate);
			console.table(affordableProducts);	
		})

		var inversePredicate = function(predicate){
			return function(item){
				return !predicate(item);
			}
		};

		displayGroup("Affordable products - !costly products", function(){
			var costlyProductsPredicate = function(item){
				return item.cost > 50;
			};

			var inversePredicate = function(predicate){
				return function(item){
					return !predicate(item);
				}
			};
			var affordableProductsPredicate = inversePredicate(costlyProductsPredicate);

			var affordableProducts = filter(products, affordableProductsPredicate);
			console.table(affordableProducts);	
		})


		displayGroup("Products by category - category = 1", function(){
			var category1ProductPredicate = function(item){
				return item.category === 1;
			};
			var category1Products = filter(products, category1ProductPredicate);
			console.table(category1Products);	
		})

		displayGroup("Composing Predicates - And [category = 1 & cost > 50]", function(){
			var category1ProductPredicate = function(item){
				return item.category === 1;
			};
			var costlyProductsPredicate = function(item){
				return item.cost > 50;
			};
			var andPredicate = function(p1, p2){
				return function(item){
					return p1(item) && p2(item);
				}
			};
			var category1CostlyProductPredicate = andPredicate(category1ProductPredicate, costlyProductsPredicate)
			var category1CostlyProducts = filter(products, category1CostlyProductPredicate);
			console.table(category1CostlyProducts);	
		})
	});
	
});