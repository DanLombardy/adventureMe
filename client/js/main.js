var socket = io.connect('http://localhost:3000/');
var spendt = "";
var leavet = "";
var returnt = "";
var personst = "";
var departcity="";
var airportData = "";

socket.on('potentialAdventures', function(data){
		var potentialAdventures = data;

		  console.log("received emit");



		  if(!data){
			  //handle a failure
			  return null;
		  }
		  
		 
		 
		 
		  var t='<div id="selectionMenu"><div id="leftPanel"></div></div><div id="holder"><h2>Below are a list of locations that match your budget.<br/>Click to customize the activities you can do!</h2></div>';
		   $('#container').html(t);

		  //load the page elements

		  entryform(document.getElementById('leftPanel'), "sidePanel");
		  
		   data.deals.forEach(handleDeals);
/*
		  var cities = ["NewYork","Seattle","Chicago","LosAngeles","Atlanta","Orlando","DallasFortWorth","Denver","Miami","Newark","SanFrancisco","Houston","Beijing","Dubai","Tokyo","London","HongKong","Bangkok","Shanghai","Paris","Guangzhou","Singapore","Istanbul","Seoul","Frankfurt","Amsterdam","Delhi","SaoPaulo","Johannesburg","Cairo","Moscow","Sydney","Prague","Rome"];

			for(var i=0; i<cities.length;i++){
				var str = '<div id="'+cities[i]+'" class="cityViewer">';
				str+='<div class="watermark"><img src="imgs/adventureMe_white.png"/></div>';
				str+='<div class="cityLabel"><span class="cityTag">'+cities[i]+'</span></div>';
				str+='<div class="topImage"><img src="imgs/'+cities[i]+'/cover.jpeg" /></div>';
				str+='<div class="animation"><img src="imgs/'+cities[i]+'/animation.gif"/></div>';
				str+='</div>';
				str+="<div id='"+cities[i]+"_display' class='dealsBlurb'></div>";
				$('#holder').append(str);
			}
*/
		$(function() {
		   	$('.cityViewer').mouseover(function() {

			  var elem = document.getElementById(this.id).getElementsByClassName("topImage");

			  $(elem[0]).css("visibility","hidden");
			});

			$('.cityViewer').mouseout(function() {

			  var elem = document.getElementById(this.id).getElementsByClassName("topImage");
					  $(elem[0]).css("visibility","visible");
			});

			$('.cityViewer').click(function() {
				console.log("you clicked "+this.id);
				var displayStr = "#"+this.id+"_display.dealsBlurb";
				console.log("you clicked "+this.id, displayStr);
				$(" .dealsBlurb").css("visibility","hidden");

				$(displayStr).css("visibility","visible");

			});
			setDates();
		});

 });//on potential adventures

var cityArr=[];
function handleDeals(element, index, array) {
	console.log("city name "+airport_names[element[0].destinationTLA]);

	var cityName = airport_names[element[0].destinationTLA];
	
	if($.inArray(cityName, cityArr)<0){
		cityArr.push(cityName);
		var str = '<div id="'+cityName+'" class="cityViewer">';
		str+='<div class="watermark"><img src="imgs/adventureMe_white.png"/></div>';
		str+='<div class="cityLabel"><span class="cityTag">'+cityName+'</span></div>';
		str+='<div class="topImage"><img src="imgs/'+cityName+'/cover.jpeg" /></div>';
		str+='<div class="animation"><img src="imgs/'+cityName+'/animation.gif"/></div>';
		str+='</div>';
		str+="<div id='"+cityName+"_display' class='dealsBlurb'>The Total Costs: "+element[0].totalPackagePrice+"<br/>Total Savings:"+element[0].totalPackageSavings;
		str+="<br/><button onclick='purchase(";
		str+='"'+cityName+'",'+element[0].totalPackagePrice+")'>Check Details</button> </div>";
		$('#holder').append(str);
	  console.log("a received ",element,element[0].destinationTLA,str);
	}
	
}
function purchase(cityT,costT){
/*
	***
	THIS IS WHERE I HANDLE THE PURCHASE SCREEN

	****
*/
	socket.emit("eventRequest",{city:cityT, cost:costT});

var htm = '<div id="selectionMenu"><div id="leftPanel"></div></div><div id="holder"><div id="header"><div><img src="imgs/luggage.png"/></div><div>from Seattle to ';
htm+=cityT+'</div></div></div>';
$('#container').html(htm);
entryform(document.getElementById('leftPanel'), "sidePanel");
setDates();

}

$(function() {


	//load airport data
	$.getScript( "airportdata.json", function( data, textStatus, jqxhr ) {
	  airportData = JSON.parse(data);
// 	  console.log(airportData);

	var t= '<select id="departureCity">';
	  for(port in airportData){
		  var loc = airportData[port].City+", "+airportData[port].Country;

		  t+='<option value="'+airportData[port].IATA+'">'+loc+'</option>';

	  }

	  t+= '</select>';

	   airportData= t;

	  //then after loading add the damn form

	  entryform(document.getElementById('entryForm'), "frontpage");
	  setDates();
	});

});

function setDates(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	}

	if(mm<10) {
	    mm='0'+mm
	}

	today = mm+'/'+dd+'/'+yyyy;
	if(leavet=="")
		leavet = today;


    $( "#leaving" ).datepicker();
    $( "#leaving" ).datepicker("setDate", leavet);


}
