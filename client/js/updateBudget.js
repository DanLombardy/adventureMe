var UpdateBudget = {

	init: function(elem, budget, spent){
		console.log('updateBudget.constructor');
		this.budgetElem = elem;
		this.totalBudget = budget;
		this.amountSpent = 0;
		if(spent){
			this.amountSpent = spent;
		}
	},
	changeBudget: function(spent){
		console.log('updateBudget.changeBudget');
		this.amountSpent += spent;
		this.render();
	},
	render: function(){
		console.log('updateBudget.render');
		var newDiv = '<div class="budgetDiv">' + '<span class="spent">' + this.amountSpent + '</span> /' + '<span class="budget">' + this.totalBudget + '</span>' + '</div>';  
		$(this.budgetElem).html(newDiv);
		if(this.amountSpent <= this.totalBudget){
			$('.spent').removeClass('red animateChange');
			$('.spent').addClass('green');
		}
		else {
			$('.spent').removeClass('green animateChange');
			$('.spent').addClass('red');
		}
	}

};

