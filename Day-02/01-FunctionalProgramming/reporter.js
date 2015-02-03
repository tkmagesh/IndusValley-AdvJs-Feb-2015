(function(){
   if (typeof window.report !== "function"){
   		var reportConsole = document.createElement("div");

   		var showHide = document.createElement("div");
   		showHide.style.cursor = "pointer";
   		showHide.style.color = "red";
   		showHide.innerHTML = "show";
   		reportConsole.appendChild(showHide);


   		var flag = -1;
   		showHide.addEventListener("click", function(){
   			flag *= -1;
   			if (flag === 1){
   				reportContainer.style.display = "none";
   				showHide.innerHTML = "show";
   			} else {
   				reportContainer.style.display = "block";
   				showHide.innerHTML = "hide";
   			}
   		});
   		reportConsole.style.position = "absolute";
   		reportConsole.style.bottom = "0px";
   		reportConsole.style.right = "0px";
   		//reportConsole.style.height = "300px";
   		//reportConsole.style.width = "300px";
   		reportConsole.style.zIndex = "1000";
   		reportConsole.style.border = "2px solid black";
   		reportConsole.style.backgroundColor = "#FFF";
   		reportConsole.style.borderRadius = "3px";

   		var reportContainer = document.createElement("div");
   		reportConsole.appendChild(reportContainer);

    	window.report = function(msg){
    		displayMessage(msg);
    	};
    	function displayMessage(msg){
    		var msgContainer = document.createElement("div");
    		msgContainer.innerHTML = msg;
    		reportContainer.appendChild(msgContainer);
    	}   
    	window.addEventListener("DOMContentLoaded", function(){
    		document.body.appendChild(reportConsole);
    	});
   }

})()