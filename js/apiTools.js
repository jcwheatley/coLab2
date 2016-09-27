$(document).ready(function() {
	$("#cityfield").keyup(function() {
		//Attempted to convert the below to local format
		$(function() {
			$("#cityfield").autocomplete({
				source: function (request, response) {
		 			$.getJSON(http://gd.geobytes.com/AutoCompleteCity?callback=?&sort=size&q="+request.term,
						function (data) {
			 				response(data);
						}
					);
				},
				minLength: 3,
				select: function (event, ui) {
		 			var selectedObj = ui.item;
		 			$("#cityfield").val(selectedObj.value);
					getcitydetails(selectedObj.value);
		 			return false;
				},
				open: function () {
					$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
				},
				close: function () {
		 			$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
				}
	 			$("#cityfield").autocomplete("option", "delay", 100);
			});
		});
		//$.getJSON(url,function(data) {
	  	//	var everything;
	  	//	everything = "<ul>";
	  	//	$.each(data, function(i,item) {
	  	//		everything += "<li> "+data[i].city;
		//		console.log(data);
		//		console.log(data[i].city);
		//		console.log(data[i]['city']);
		//		console.log(data['city']);
	  	//	});
	  	//	everything += "</ul>";
	  	//	$("#txtHint").html(everything);
		//});
	});

	$("#button").click(function(e) {
		var url = "http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+$("#cityfield").val();
		$.getJSON(url,function(data) {
			console.log("Got "+data);
			var everything;
			everything = "<ul>";
			var geobytescode = data['geobytesinternet'];
	   		var geobytescountry = data['geobytescountry'];
            		var geobytesregion = data['geobytesregion'];
		console.log(geobytesregion);
            		var geobytescity = data['geobytescity'];
		console.log(geobytescity);
            		var geobyteslatitude = data['geobyteslatitude'];
            		var geobyteslongitude = data['geobyteslongitude'];
            		var geobytesnationalitysingular = data['geobytesnationalitysingular'];
			everything = "<ul>";
			everything += "<li>Country Code: "+geobytescode;
			everything += "<li>Country Name: "+geobytescountry;
			everything += "<li>Region: "+geobytesregion;
			everything += "<li>City: "+geobytescity;
			everything += "<li>Latitude: "+geobyteslatitude;
			everything += "<li>Longitude: "+geobyteslongitude;
			everything += "<li>Nationality: "+geobytesnationalitysingular;
			everything += "</ul>";
			$("locInfo").html(everything);
            	});
  		e.preventDefault();
	});

	$("#button").click(function(e){
  		var value = $("#cityfield").val();
		var myurl= "https://api.wunderground.com/api/1865577c5eaa328c/geolookup/conditions/q/UT/";
 		 myurl += value;
 		 myurl += ".json";
 		 $.ajax({
 		   url : myurl,
 		   dataType : "json",
 		   success : function(parsed_json) {
		     var location = parsed_json['location']['city'];
 		     var temp_string = parsed_json['current_observation']['temperature_string'];
 		     var current_weather = parsed_json['current_observation']['weather'];
 		     everything = "<ul>";
		     everything += "<li>Location: "+location;
 		     everything += "<li>Temperature: "+temp_string;
 		     everything += "<li>Weather: "+current_weather;
 		     everything += "</ul>";
 		     $("#weather").html(everything);
 		   }
 		 });
  		e.preventDefault();
	});
	
});