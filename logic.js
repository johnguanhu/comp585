demandbool=false;
function newDemand(){
	demandbool=true;
	demandPopup=game.add.sprite(w/2,h/2,'Speech');
	demandPopup.events.onInputDown.add(function(){
		demandPopup.destroy();
	}
}

function demandMaker(){
	demandTable[happiness][money].call();
}

function clientInteract(){
	if (demandbool){
		demandbool=false;
		demandMaker();
	}
	else{
		clientDialog[Math.floor(Math.random()*10)]
	}
}