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