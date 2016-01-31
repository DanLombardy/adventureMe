
module.exports = function(currency, amt){

	if(currency === 'USD'){
		return amt;
	}
	else if(currency === 'EUR'){
		return (amt*0.923280).toFixed(2);
	}
	else if(currency === 'THB'){
		return (amt*35.6845).toFixed(2);
	}
	else if(currency === 'GBP'){
		return (amt*0.702223).toFixed(2);
	}
	else if(currency === 'INR'){
		return (amt*67.89).toFixed(2);
	}
	else if(currency === 'AUD'){
		return (amt*1.41137).toFixed(2);
	}
	else if(currency === 'CNY'){
		return (amt*6.577).toFixed(2);
	}
	else if(currency === 'SGD'){
		return (amt*1.42390).toFixed(2);
	}
	else if(currency === 'KRW'){
		return (amt*1208.7).toFixed(2);
	}
	else if(currency === 'HKD'){
		return (amt*7.7819).toFixed(2);
	}
	else if(currency === 'BRL'){
		return (amt*3.9991).toFixed(2);
	}
	else if(currency === 'JPY'){
		return (amt*121.173).toFixed(2);
	}
	else if(currency === 'AED'){
		return (amt*3.67275).toFixed(2);
	}
	else if(currency === 'EGP'){
		return (amt*7.8301).toFixed(2);
	}
	else if(currency === 'ZAR'){
		return (amt*15.8887).toFixed(2);
	}
	else {
		return amt;
	}
};


