var entryform = function(elem, type){
	var t = '<form>';
	var spacer = '';
	if(type=='sidePanel'){
		spacer="<br/>";
		t+='<br/><br/><img src="imgs/adventureMe_white.png"/><br/><br/><br/><br/>';
	}

	t+='<input id="spend" type="number" ';

	if(spendt!=''){
		t+='value="'+spendt+'"';
	}

	t+='placeholder="Spend" required/>'+spacer;
	t+=airportData;
	t+='<input type="text" id="leaving" placeholder="Leaving" required>'+spacer;

	t+='<select id="returning">';
	for(var n=2; n<=7;n++){

				t+='<option value="'+n+'">'+n+'</option>';
	}
	t+="</select>"+spacer;

	t+='<select id="numPeople">';

					for(var i=1; i<12;i++){
						t+='<option value="'+i+'">'+i;
						if(i>1)
							t+=" persons";
						else
							t+=" person";
						t+='</option>';

						$('#numPeople').append(t);
					}


			 t+=' <option value="12+">12 or more persons</option></select>'+spacer+'<input type="button" onclick="verifySearch()" value="Find Adventures"/></form>';

			 $(elem).append(t);

	if(departcity!=""){
		console.log("leaving from "+departcity);
		$("#departureCity select").val(departcity);
		$('#departureCity option[value='+departcity+']').attr('selected','selected');
	}

	if(personst!=""){
		$("#numPeople select").val(personst);
		$('#numPeople option[value='+personst+']').attr('selected','selected');
	}
	$(document).keypress(function(e) {
    if(e.which == 13) {
       verifySearch();
    }
});

}

function verifySearch(){
	cityArr=[];
	var htt = '<div id="advertisement"><div id="adholder">While we find you the best adventures for your budget, please enjoy this message from our sponsor<br/><iframe width="560" height="315" src="https://www.youtube.com/embed/HCQFoa1X_-g?autoplay=1&controls=0" frameborder="0" allowfullscreen></iframe></div></div>';

	$('#container').append(htt);
	spendt = $('#spend').val();
	leavet = $('#leaving').val();
	 returnt = $('#returning').val();
	 personst = $('#numPeople').val();
	 departcity = $('#departureCity').val();

	 var new_leave = new Date(leavet);

	var dd = new_leave.getDate();
	var mm = new_leave.getMonth()+1; //January is 0!
	var yyyy = new_leave.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	}

	if(mm<10) {
	    mm='0'+mm
	}

	var leaveFormatted = yyyy+"-"+mm+"-"+dd;
	
	var data = {spend: spendt, leave:leaveFormatted, return:returnt,IATA:departcity,  persons:personst};

	console.log(data)
	 socket.emit('formData', data);
	return false;
}
