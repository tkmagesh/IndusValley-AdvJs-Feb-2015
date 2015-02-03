var products = [
	{id : 9, name : "Pen", cost : 70, units : 10, category : 1},
	{id : 8, name : "Hen", cost : 30, units : 60, category : 2},
	{id : 5, name : "Ten", cost : 20, units : 30, category : 3},
	{id : 7, name : "Den", cost : 50, units : 80, category : 3},
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

displayGroup("Any", function(){
	function any(list, predicate){
		for(var i=0;i<list.length;i++)
			if (predicate(list[i])) return true;
		return false;
	}
	var costlyProductPredicate = function(item){
		return item.cost > 50;
	}
	console.log("Are there any costly products [> 50] ?", any(products, costlyProductPredicate))
})


displayGroup("All", function(){
	function all(list, predicate){
		for(var i=0;i<list.length;i++)
			if (!predicate(list[i])) return false;
		return true;
	}
	var costlyProductPredicate = function(item){
		return item.cost > 50;
	}
	console.log("Are all the products costly [> 50] ?", all(products, costlyProductPredicate))
});

displayGroup("GroupBy", function(){
	function groupBy(list, keySelector){
		var result = {};
		for(var i=0;i<list.length;i++){
			var key = keySelector(list[i]);
			if (typeof result[key] === "undefined")
				result[key] = [];
			result[key].push(list[i]);
		}
		return result;
	};
	displayGroup("Products By Category", function(){
		var categoryKeySelector = function(product){ return product.category; }
		var productsByCategory = groupBy(products,categoryKeySelector);
		for(var key in productsByCategory){
			displayGroup("Key - " + key, function(){
				console.table(productsByCategory[key]);
			});
		}

	});

	displayGroup("Products By Cost", function(){
		var costKeySelector = function(product){ return product.cost > 50 ? "costly" : "affordable" }
		var productsByCost = groupBy(products,costKeySelector);
		for(var key in productsByCost){
			displayGroup("Key - " + key, function(){
				console.table(productsByCost[key]);
			});
		}

	});
	
});

function memoize(fn, keySelector){
	var cache = {};
	return function(){
		var key = keySelector.apply(this,arguments);
		if (typeof cache[key] === "undefined")
			cache[key] = fn.apply(this, arguments);
		return cache[key];
	}
}
function add(x,y){
	console.log("processing add for ", x , " and ", y);
	return x + y;
};
var stringifyArgs = function(){
	return window.JSON.stringify(arguments);
}
var cachedAdd = memoize(add, stringifyArgs);
console.log(cachedAdd(10,20)); //=> returns 30 and prints "processing add for 10 and 20"
console.log(cachedAdd(10,20)); //=> returns 30 