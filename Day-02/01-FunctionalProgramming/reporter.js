(function(){
   if (typeof window.report !== "function"){
      var reportControlStyle = {
        position : "fixed",
        bottom : "0px",
        right : "0px",
        zIndex : "1000",
        border : "2px solid black",
        backgroundColor : "#FFF",
        borderRadius : "3px"
      };
   		var $reportConsole = $("<div>").css(reportControlStyle);
      var $reportContainer = $("<div>");
   		$("<div>")
        .css({
          cursor : "pointer",
          color : "red"
        })
        .html("Hide")
        .click(function(){
            $reportContainer.toggle(400);
            $(this).html( $(this).html() === "Hide" ? "Show" : "Hide" )
          })
        .appendTo($reportConsole);
        $reportConsole.append($reportContainer);
        $("<input type='text'>")
          .keyup(function(e){
            if (e.keyChar === 13){
              console.log("Enter key pressed");
            }
          })
    	window.report = function report(msg){
    		$("<div>").html(msg).appendTo($reportContainer);
    	}   
      $(function(){
        $reportConsole.appendTo(document.body);
      })
   }
})()