// stores the contensts of starred.json
var starred = {};
// stores the target file
var targetFile = {};

$(document).ready(function() {
	var refresh = function() {
		var $output = $("#output");
	
		// clear anything we had
		$output.empty();
		
		for(var entry in starred.items) {
			var item = starred.items[entry];
			var contentHtml = 
				item.content !== undefined ? item.content.content :
				item.summary !== undefined ? item.summary.content :
				"<p>ERROR: " + entry + "</p>";
			var href =
				item.canonical !== undefined ? item.canonical[0].href :
				item.alternate !== undefined ? item.alternate[0].href :
				"http://www.error.com/" + entry;
				
			$output.append("<h3>" + item.title + "</h3>");
			$output.append("<div>" + contentHtml + "<a class='source' href='" + href + "'>Source</a></div>");
		}
		
		$output.accordion({
			heightStyle: "content"
		});
	};
	
	$("#inputFile").on("change", function(evtOnChange) {
		targetFile = evtOnChange.target.files[0];
		
		var reader = new FileReader();
		// TODO: monitor for errors
		reader.onload = function(evtOnLoad) {
			starred = JSON.parse(evtOnLoad.target.result);
			refresh();
		};
		reader.readAsText(targetFile);
	});
	
	$(document).keydown(function(evtKeyDown) {
		var moveActive = function(dir) {
			var $output = $("#output");
			$output.accordion("option", "active", $output.accordion("option", "active") + dir);
		};
	
		switch(evtKeyDown.which) {
			case 74:
				moveActive(+1);
				break;
			case 75:
				moveActive(-1);
				break;
		};
	});
});