 var socket = io.connect('http://localhost:3000/');
var spendt = "";
var leavet = "";
var returnt = "";
var personst = "";

  socket.on('potentialAdventures', function(data){
		var potentialAdventures = data;
		  
		  if(!data){
			  //handle a failure
		  }
		  
		  //remove this page and load next stuff
		  console.log("change to next page");
		  var t='<div id="selectionMenu"><div id="leftPanel"></div></div><div id="holder"><h2>Below are a list of locations that match your budget.<br/>Click to customize the activities you can do!</h2></div>';
		  $('#container').html(t);
		  
		  //load the page elements 
				
		  entryform(document.getElementById('leftPanel'), "sidePanel");
		  var cities = ["NewYork","Seattle","Chicago","LosAngeles","Atlanta","Orlando","DallasFortWorth","Denver","Miami","Newark","SanFrancisco","Houston","Beijing","Dubai","Tokyo","London","HongKong","Bangkok","Shanghai","Paris","Guangzhou","Singapore","Istanbul","Seoul","Frankfurt","Amsterdam","Delhi","SaoPaulo","Johannesburg","Cairo","Moscow","Sydney","Prague","Rome"];
						
			for(var i=0; i<cities.length;i++){
				var str = '<div id="'+cities[i]+'Viewer" class="cityViewer">';
				str+='<div class="watermark"><img src="imgs/adventureMe_white.png"/></div>';
				str+='<div class="cityLabel"><span class="cityTag">'+cities[i]+'</span></div>';
				str+='<div class="topImage"><img src="imgs/'+cities[i]+'/cover.jpeg" /></div>';
				str+='<div class="animation"><img src="imgs/'+cities[i]+'/animation.gif"/></div>';
				str+='</div>';
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
			setDates();
		});
		  
 });//on potential adventures

$(function() {
	setDates();
     
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

