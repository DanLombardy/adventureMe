var entryform = function(elem, type){
	var spacer = '';
	if(type=='sidePanel')
		spacer="<br/>";
	var t = '<input type="number" placeholder="Spend"/>'+spacer;
	t+='<input type="text" id="leaving" placeholder="Leaving">'+spacer;
	t+='<input type="text" id="returning" placeholder="Returning">'+spacer;
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
				
			  
			 t+=' <option value="12+">12 or more persons</option></select>'+spacer+'<button>Find Adventures</button>';
			 
			 $(elem).append(t);

}