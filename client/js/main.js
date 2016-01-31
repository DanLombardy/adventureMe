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
		  }

		  //remove this page and load next stuff
		  console.log("change to next page");
      console.log(data);
		  var t='<div id="selectionMenu"><div id="leftPanel"></div></div><div id="holder"><h2>Below are a list of locations that match your budget.<br/>Click to customize the activities you can do!</h2></div>';
		  $('#container').html(t);

		  //load the page elements

		  entryform(document.getElementById('leftPanel'), "sidePanel");
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
				var displayStr = "#"+this.id+"_display";
				console.log("you clicked "+this.id, displayStr);

/*
				This
				IS WHERE THERE DATA FROM THEIR
				FUCNTIONS ON THE DEAL WILL GO AS A STRING
*/
				$(displayStr).append("<p>Qui  gochujang labore magna semiotics schlitz.  Mlkshk artisan narwhal, sint  vinyl labore biodiesel small batch aliquip exercitation aute.  Pork belly craft beer freegan synth bushwick.  Helvetica veniam typewriter dreamcatcher, swag tacos labore meh kogi deserunt  brunch umami ad.  Disrupt post-ironic bitters excepteur  beard blue bottle, pabst nulla  distillery mustache enim delectus everyday carry.  XOXO deserunt  blue bottle, waistcoat dolore fixie PBR&amp;B master cleanse ullamco squid.  Yr ex readymade ullamco keffiyeh, voluptate  quis tilde chartreuse flannel man bun sed hammock.</p>");

				$(displayStr).append("<button onclick='purchase(\""+this.id+"\")'>Check Details</button>")
			});
			setDates();
		});

 });//on potential adventures

function purchase(city){
/*
	***
	THIS IS WHERE I HANDLE THE PURCHASE SCREEN

	****
*/
// 	socket.emit("purchase",city);

var htm = '<div id="selectionMenu"><div id="leftPanel"></div></div><div id="holder"><div id="header"><div><img src="imgs/luggage.png"/></div><div>from Seattle to ';
htm+=city+'</div></div></div>';
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
	if(returnt=="")
		returnt=today;

    $( "#leaving" ).datepicker();
    $( "#leaving" ).datepicker("setDate", leavet);
    $( "#returning" ).datepicker();
    $( "#returning" ).datepicker("setDate", returnt);

}
