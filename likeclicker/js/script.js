//VARIABLES
var likes = 0;
var followers = 0;
var fans = 0;
var paparazzis = 0;
var stalkers = 0;
var lunatics = 0;
var bots = 0;
var lpc = 1;
var lps = 0;
var followerLPS = 1;
var FansLPS = 2;
var paparazzisLPS = 4;
var stalkersLPS = 8;
var lunaticsLPS = 16;
var botLPS = 32;
var hypeFollowersPurchased = 0;
var hypeFansPurchased = 0;
var hypePaparazzisPurchased = 0;
var hypeStalkersPurchased = 0;
var hypeLunaticsPurchased = 0;
var doubleBotsPurchased = 0;
/*var doubleClickPurchased = 0;*/
var autoSaveEnabled = 1;
var darkThemeEnabled = 0;
/*var musicsEnabled = 1;*/
var followerCost = 10;
var FansCost = 100;
var paparazzisCost = 500;
var stalkersCost = 1000;
var lunaticsCost = 5000;
var botCost = 10000;
var nf = new Intl.NumberFormat(undefined, {style:'decimal'});
var addClickCost;

document.getElementById('botLPS').innerHTML = botLPS;
document.getElementById('followers').innerHTML = nf.format(followers);
document.getElementById('followerCost').innerHTML = nf.format(followerCost);
document.getElementById('hypeFollowersCost').innerHTML = nf.format(hypeFollowersCost);
document.getElementById('fans').innerHTML = nf.format(fans);
document.getElementById('FansCost').innerHTML = nf.format(FansCost);
document.getElementById('hypeFansCost').innerHTML = nf.format(hypeFansCost);
document.getElementById('paparazzis').innerHTML = nf.format(paparazzis);
document.getElementById('paparazzisCost').innerHTML = nf.format(paparazzisCost);
document.getElementById('hypePaparazzisCost').innerHTML = nf.format(hypePaparazzisCost);
document.getElementById('stalkers').innerHTML = nf.format(stalkers);
document.getElementById('stalkersCost').innerHTML = nf.format(stalkersCost);
document.getElementById('hypeStalkersCost').innerHTML = nf.format(hypeStalkersCost);
document.getElementById('lunatics').innerHTML = nf.format(lunatics);
document.getElementById('lunaticsCost').innerHTML = nf.format(lunaticsCost);
document.getElementById('hypeLunaticsCost').innerHTML = nf.format(hypeLunaticsCost);
document.getElementById('bots').innerHTML = nf.format(bots);
document.getElementById('botCost').innerHTML = nf.format(botCost);
document.getElementById('doubleBotsCost').innerHTML = nf.format(doubleBotsCost);
//document.getElementById('lpc').innerHTML = "LPC: " + nf.format(lpc);
document.getElementById('lpc').innerHTML = nf.format(lpc);
document.getElementById('addClickCost').innerHTML = nextCostAddClick;
/*document.getElementById('doubleClickCost').innerHTML = nf.format(doubleClickCost);*/

function checkDarkTheme() {
	if (darkThemeEnabled == 0) {
		disableDarkTheme();
	} else if (darkThemeEnabled == 1) {
		enableDarkTheme();
	}
}

function clickDarkTheme() {
	if (darkThemeEnabled == 1) {
		darkThemeEnabled = 0;
		disableDarkTheme();
	} else if (darkThemeEnabled == 0) {
		darkThemeEnabled = 1;
		enableDarkTheme();
	}
}

//BUG CORRECTION OF THE ENTER KEY
window.addEventListener("keydown", keyDown);

function keyDown(event) {
	if (window.event.keyCode == 13) 
	{
		event.returnValue=false; 
		event.cancel = true;
	}
}

if (autoSaveEnabled == 0) {
	var saveenabledcheckbox = document.getElementById("saveenabled");
	saveenabledcheckbox.style.display="none";
	saveenabledcheckbox.style.visibility="hidden";
	
	var savedisabledcheckbox = document.getElementById("savedisabled");
	savedisabledcheckbox.style.display="block";
	savedisabledcheckbox.style.visibility="initial";
} else if (autoSaveEnabled == 1) {
	var saveenabledcheckbox = document.getElementById("saveenabled");
	saveenabledcheckbox.style.display="block";
	saveenabledcheckbox.style.visibility="initial";
	
	var savedisabledcheckbox = document.getElementById("savedisabled");
	savedisabledcheckbox.style.display="none";
	savedisabledcheckbox.style.visibility="hidden";
}

/*if (musicsEnabled == 0) {
	var musicsenabledcheckbox = document.getElementById("musicsenabled");
	musicsenabledcheckbox.style.display="none";
	musicsenabledcheckbox.style.visibility="hidden";
	
	var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
	musicsdisabledcheckbox.style.display="block";
	musicsdisabledcheckbox.style.visibility="initial";
} else if (musicsEnabled == 1) {
	var musicsenabledcheckbox = document.getElementById("musicsenabled");
	musicsenabledcheckbox.style.display="block";
	musicsenabledcheckbox.style.visibility="initial";
	
	var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
	musicsdisabledcheckbox.style.display="none";
	musicsdisabledcheckbox.style.visibility="hidden";
}*/

//REMOVE X2 UPGRADES
removehypeFollowers();
removehypeFans();
removehypePaparazzis();
removeHypeStalkers();
removeHypeLunatics();
removeDoubleBots();
/*removeDoubleClick();*/

//INITIAL COST OF ITEMS
var hypeFollowersCost = 500;
	document.getElementById('hypeFollowersCost').innerHTML = nf.format(hypeFollowersCost);
var hypeFansCost = 1000;
	document.getElementById('hypeFansCost').innerHTML = nf.format(hypeFansCost);
var hypePaparazzisCost = 6000;
	document.getElementById('hypePaparazzisCost').innerHTML = nf.format(hypePaparazzisCost);
var hypeStalkersCost = 12000;
	document.getElementById('hypeStalkersCost').innerHTML = nf.format(hypeStalkersCost);
var hypeLunaticsCost = 25000;
	document.getElementById('hypeLunaticsCost').innerHTML = nf.format(hypeLunaticsCost);
var doubleBotsCost = 50000;
	document.getElementById('doubleBotsCost').innerHTML = nf.format(doubleBotsCost);
var addClickCost = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));
/*var doubleClickCost = 45000;
	document.getElementById('doubleClickCost').innerHTML = nf.format(doubleClickCost);*/

//RESET THE GAME
function resetGame() {
	removehypeFollowers();
	removehypeFans();
	removehypePaparazzis();
	removeHypeStalkers();
	removeHypeLunatics();
	removeDoubleBots();
	document.getElementById("newupgradeicon").style.display = "none";
	document.getElementById("newupgradeicon").style.visibility = "hidden";
	document.getElementById("newupgradeicon2").style.display = "none";
	document.getElementById("newupgradeicon2").style.visibility="hidden";
	
	localStorage.clear();
	loadGame();
}

/*function resetGame(){
	removehypeFollowers();
	removehypeFans();
	removehypePaparazzis();
	removeHypeStalkers();
	removeHypeLunatics();
	removeDoubleBots();
	/*removeDoubleClick();
    likes = 0;
	lps = 0;
	followers = 0;
	fans = 0;
	paparazzis = 0;
	stalkers = 0;
	lunatics = 0;
	bots = 0;
	lpc = 1;
	followerCost = 10;
	hypeFollowersCost = 500;
	FansCost = 100;
	hypeFansCost = 1000;
	paparazzisCost = 500;
	hypePaparazzisCost = 6000;
	stalkersCost = 1000;
	hypeStalkersCost = 12000;
	lunaticsCost = 5000;
	hypeLunaticsCost = 25000;
	botCost = 10000;
	doubleBotsCost = 50000;
	addClickCost = 1000;
	/*doubleClickCost = 45000;
	updateLikes();
	updateLPS();
	updateLPC();
	followerLPS = 1;
	document.getElementById('followerLPS').innerHTML = followerLPS;
	hypeFansLPS = 2;
	document.getElementById('FansLPS').innerHTML = FansLPS;
	paparazzisLPS = 4;
	document.getElementById('paparazzisLPS').innerHTML = paparazzisLPS;
	stalkersLPS = 8;
	document.getElementById('stalkersLPS').innerHTML = stalkersLPS;
	lunaticsLPS = 16;
	document.getElementById('lunaticsLPS').innerHTML = lunaticsLPS;
	botLPS = 32;
	document.getElementById('botLPS').innerHTML = botLPS;
	document.getElementById('followers').innerHTML = nf.format(followers);
	document.getElementById('followerCost').innerHTML = nf.format(followerCost);
	document.getElementById('hypeFollowersCost').innerHTML = nf.format(hypeFollowersCost);
	document.getElementById('fans').innerHTML = nf.format(fans);
	document.getElementById('FansCost').innerHTML = nf.format(FansCost);
	document.getElementById('hypeFansCost').innerHTML = nf.format(hypeFansCost);
	document.getElementById('paparazzis').innerHTML = nf.format(paparazzis);
	document.getElementById('paparazzisCost').innerHTML = nf.format(paparazzisCost);
	document.getElementById('hypePaparazzisCost').innerHTML = nf.format(hypePaparazzisCost);
	document.getElementById('stalkers').innerHTML = nf.format(stalkers);
	document.getElementById('stalkersCost').innerHTML = nf.format(stalkersCost);
	document.getElementById('hypeStalkersCost').innerHTML = nf.format(hypeStalkersCost);
	document.getElementById('lunatics').innerHTML = nf.format(lunatics);
	document.getElementById('lunaticsCost').innerHTML = nf.format(lunaticsCost);
	document.getElementById('hypeLunaticsCost').innerHTML = nf.format(hypeLunaticsCost);
	document.getElementById('bots').innerHTML = nf.format(bots);
	document.getElementById('botCost').innerHTML = nf.format(botCost);
	document.getElementById('doubleBotsCost').innerHTML = nf.format(doubleBotsCost);
	//document.getElementById('lpc').innerHTML = "LPC: " + nf.format(lpc);
	document.getElementById('lpc').innerHTML = nf.format(lpc);
	document.getElementById('addClickCost').innerHTML = nf.format(addClickCost);
	/*document.getElementById('doubleClickCost').innerHTML = nf.format(doubleClickCost);
	hypeFollowersPurchased = 0;
	hypeFansPurchased = 0;
	hypePaparazzisPurchased = 0;
	hypeStalkersPurchased = 0;
	hypeLunaticsPurchased = 0;
	doubleBotsPurchased = 0;
	/*doubleClickPurchased = 0;
	autoSaveEnabled = 1;
	darkThemeEnabled = 0;
	disableDarkTheme();
	/*musicsEnabled = 1;
	var musicsenabledcheckbox = document.getElementById("musicsenabled");
	musicsenabledcheckbox.style.display="block";
	musicsenabledcheckbox.style.visibility="initial";
	var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
	musicsdisabledcheckbox.style.display="none";
	musicsdisabledcheckbox.style.visibility="hidden";
	localStorage.clear();
};*/

//CLICK FUNCTION
function likeClick(lpc){
    likes = likes + lpc;
	updateLikes();
};

//SHOP
	
followerCost = Math.floor(10 * Math.pow(1,followers));
document.getElementById('followerCost').innerHTML = nf.format(followerCost);

FansCost = Math.floor(100 * Math.pow(1,fans));
document.getElementById('FansCost').innerHTML = nf.format(FansCost);

paparazzisCost = Math.floor(500 * Math.pow(1,paparazzis));
document.getElementById('paparazzisCost').innerHTML = nf.format(paparazzisCost);

stalkersCost = Math.floor(1000 * Math.pow(1,stalkers));
document.getElementById('stalkersCost').innerHTML = nf.format(stalkersCost);

lunaticsCost = Math.floor(5000 * Math.pow(1,lunatics));
document.getElementById('lunaticsCost').innerHTML = nf.format(lunaticsCost);

botCost = Math.floor(10000 * Math.pow(1,bots));
document.getElementById('botCost').innerHTML = nf.format(botCost);

//+1 FOLLOWER
function gainFollower(){
    /*var followerCost = Math.floor(10 * Math.pow(1.1,followers));     //adds a cost amount to each unit purchased*/
    if(likes >= followerCost){                                   //check if the player has enough likes
        followers = followers + 1;                                   //item lpc increases
    	likes = likes - followerCost;                          //spend the likes
        document.getElementById('followers').innerHTML = followers;  //updates the lpc of units purchased
        updateLikes();                                    //update likes
		lps += followerLPS;                                    //increases the total dps according to item dps
		updateLPS();                                     //update dps
		followerCost = Math.floor(10 * Math.pow(1.1,followers));
		document.getElementById('followerCost').innerHTML = nf.format(followerCost);
    }
	else {
		notEnoughLikes();                                //if you do not have enough likes, show an alert
	};
	/*var nextCostFollower = Math.floor(10 * Math.pow(1.1,followers));
    document.getElementById('followerCost').innerHTML = nextCostFollower;  //update the lpc for the player
	followerCost = Math.floor(10 * Math.pow(1,followers));*/
};

//HYPE FOLLOWERS
function hypeFollowersFunc(){
    var hypeFollowersCost = 500;                              //set the value of the item
    if(likes >= hypeFollowersCost){
    	likes = likes - hypeFollowersCost;
        updateLikes();
		removehypeFollowers();
		hypeFollowersLPS();
		updateLPS();                                     //update dps
		hypeFollowersPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removehypeFollowers()                                 //"remove" the x2 upgrade from the respective item
{ 
   var rmvHypeFollowers = document.getElementById("HypeFollowers"); 
   rmvHypeFollowers.style.display="none"; 
   rmvHypeFollowers.style.visibility="hidden";
   var rmvHypeFollowersBR = document.getElementById("brHypeFollowers"); 
   rmvHypeFollowersBR.style.display="none"; 
   rmvHypeFollowersBR.style.visibility="hidden";
}

function recreatehypeFollowers()                                 //"recreates" the x2 upgrade of the respective item
{ 
   var rctHypeFollowers = document.getElementById("HypeFollowers"); 
   rctHypeFollowers.style.display="block"; 
   rctHypeFollowers.style.visibility="initial";
   var rctHypeFollowersBR = document.getElementById("brHypeFollowers"); 
   rctHypeFollowersBR.style.display="block"; 
   rctHypeFollowersBR.style.visibility="initial";
}

function hypeFollowersLPS() {                                 //updates the followers dps
	var hypeFollowersLPS = document.getElementById("HypeFollowers");
	if (hypeFollowersLPS.style.visibility == "hidden") {
			followerLPS = 2;
			updateLPS();
		} else {
			followerLPS = 1;
		}
}

//+1 FAN
function gainFan(){
    /*var FansCost = nf.format(Math.floor(100 * Math.pow(1.1,fans)));*/
    if(likes >= FansCost){
        fans = fans + 1;
    	likes = likes - FansCost;
        document.getElementById('fans').innerHTML = fans;
        lps += FansLPS;
		updateLPS();
		FansCost = Math.floor(100 * Math.pow(1.1,fans));
		document.getElementById('FansCost').innerHTML = nf.format(FansCost);
    }
	else {
		notEnoughLikes();
	};
	/*var nextCostFans = nf.format(Math.floor(100 * Math.pow(1.1,fans)));
    document.getElementById('FansCost').innerHTML = nextCostFans;*/
};

//HYPE FANS
function hypeFansFunc(){
    var hypeFansCost = 1000;
    if(likes >= hypeFansCost){
    	likes = likes - hypeFansCost;
        updateLikes();
		removehypeFans();
		hypeFanLPS();
		updateLPS();
		hypeFansPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removehypeFans() 
{ 
   var rmvHypeFans = document.getElementById("HypeFans"); 
   rmvHypeFans.style.display="none"; 
   rmvHypeFans.style.visibility="hidden";
   var rmvHypeFansBR = document.getElementById("brHypeFans"); 
   rmvHypeFansBR.style.display="none"; 
   rmvHypeFansBR.style.visibility="hidden";
}

function recreatehypeFans() 
{ 
   var rctHypeFans = document.getElementById("HypeFans"); 
   rctHypeFans.style.display="block"; 
   rctHypeFans.style.visibility="initial";
   var rctHypeFansBR = document.getElementById("brHypeFans"); 
   rctHypeFansBR.style.display="block"; 
   rctHypeFansBR.style.visibility="initial";
}

function hypeFanLPS() {
	var hypeFansLPS = document.getElementById("HypeFans");
	if (hypeFansLPS.style.visibility == "hidden") {
			FansLPS = 4;
			updateLPS();
		} else {
			FansLPS = 2;
		}
}

//+1 PAPARAZZI
function gainPaparazzi(){
    /*var paparazzisCost = nf.format(Math.floor(500 * Math.pow(1.1,paparazzis)));*/
    if(likes >= paparazzisCost){
        paparazzis = paparazzis + 1;
    	likes = likes - paparazzisCost;
        document.getElementById('paparazzis').innerHTML = paparazzis;
        lps += paparazzisLPS;
		updateLPS();
		paparazzisCost = Math.floor(500 * Math.pow(1.1,paparazzis));
		document.getElementById('paparazzisCost').innerHTML = nf.format(paparazzisCost);
    }
	else {
		notEnoughLikes();
	};
    /*var nextCostPaparazzis = nf.format(Math.floor(500 * Math.pow(1.1,paparazzis)));
    document.getElementById('paparazzisCost').innerHTML = nextCostPaparazzis;*/
};

//HYPE PAPARAZZIS
function hypePaparazzisFunc(){
    var hypePaparazzisCost = 6000;
    if(likes >= hypePaparazzisCost){
    	likes = likes - hypePaparazzisCost;
        updateLikes();
		removehypePaparazzis();
		hypePaparazzisLPS();
		updateLPS();
		hypePaparazzisPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removehypePaparazzis() 
{ 
   var rmvHypePaparazzis = document.getElementById("HypePaparazzis"); 
   rmvHypePaparazzis.style.display="none"; 
   rmvHypePaparazzis.style.visibility="hidden";
   var rmvHypePaparazzisBR = document.getElementById("brHypePaparazzis"); 
   rmvHypePaparazzisBR.style.display="none"; 
   rmvHypePaparazzisBR.style.visibility="hidden";
}

function recreatehypePaparazzis() 
{ 
   var rctHypePaparazzis = document.getElementById("HypePaparazzis"); 
   rctHypePaparazzis.style.display="block"; 
   rctHypePaparazzis.style.visibility="initial";
   var rctHypePaparazzisBR = document.getElementById("brHypePaparazzis"); 
   rctHypePaparazzisBR.style.display="block"; 
   rctHypePaparazzisBR.style.visibility="initial";
}

function hypePaparazzisLPS() {
	var hypePaparazzisLPS = document.getElementById("HypePaparazzis");
	if (hypePaparazzisLPS.style.visibility == "hidden") {
			paparazzisLPS = 8;
			updateLPS();
		} else {
			paparazzisLPS = 4;
		}
}

//+1 STALKER
function gainStalker(){
    /*var stalkersCost = nf.format(Math.floor(1000 * Math.pow(1.1,stalkers)));*/
    if(likes >= stalkersCost){
        stalkers = stalkers + 1;
    	likes = likes - stalkersCost;
        document.getElementById('stalkers').innerHTML = stalkers;
        lps += stalkersLPS;
		updateLPS();
		stalkersCost = Math.floor(1000 * Math.pow(1.1,stalkers));
		document.getElementById('stalkersCost').innerHTML = nf.format(stalkersCost);
    }
	else {
		notEnoughLikes();
	};
    /*var nextCostStalkers = nf.format(Math.floor(1000 * Math.pow(1.1,stalkers)));
    document.getElementById('stalkersCost').innerHTML = nextCostStalkers;*/
};

//HYPE STALKERS
function hypeStalkersFunc(){
    var hypeStalkersCost = 12000;
    if(likes >= hypeStalkersCost){
    	likes = likes - hypeStalkersCost;
        updateLikes();
		removeHypeStalkers();
		hypeStalkersLPS();
		updateLPS();
		hypeStalkersPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removeHypeStalkers() 
{ 
   var rmvHypeStalkers = document.getElementById("HypeStalkers"); 
   rmvHypeStalkers.style.display="none"; 
   rmvHypeStalkers.style.visibility="hidden";
   var rmvHypeStalkersBR = document.getElementById("brHypeStalkers"); 
   rmvHypeStalkersBR.style.display="none"; 
   rmvHypeStalkersBR.style.visibility="hidden";
}

function recreateHypeStalkers() 
{ 
   var rctHypeStalkers = document.getElementById("HypeStalkers"); 
   rctHypeStalkers.style.display="block"; 
   rctHypeStalkers.style.visibility="initial";
   var rctHypeStalkersBR = document.getElementById("brHypeStalkers"); 
   rctHypeStalkersBR.style.display="block"; 
   rctHypeStalkersBR.style.visibility="initial";
}

function hypeStalkersLPS() {
	var hypeStalkersLPS = document.getElementById("HypeStalkers");
	if (hypeStalkersLPS.style.visibility == "hidden") {
			stalkersLPS = 16;
			updateLPS();
		} else {
			stalkersLPS = 8;
		}
}

//+1 LUNATIC
function gainLunatic(){
    /*var lunaticsCost = nf.format(Math.floor(5000 * Math.pow(1.1,lunatics)));*/
    if(likes >= lunaticsCost){
        lunatics = lunatics + 1;
    	likes = likes - lunaticsCost;
        document.getElementById('lunatics').innerHTML = lunatics;
        lps += lunaticsLPS;
		updateLPS();
		lunaticsCost = Math.floor(5000 * Math.pow(1.1,lunatics));
		document.getElementById('lunaticsCost').innerHTML = nf.format(lunaticsCost);
    }
	else {
		notEnoughLikes();
	};
    /*var nextCostLunatics = nf.format(Math.floor(5000 * Math.pow(1.1,lunatics)));
    document.getElementById('lunaticsCost').innerHTML = nextCostLunatics;*/
};

//HYPE LUNATICS
function hypeLunaticsFunc(){
    var hypeLunaticsCost = 25000;
    if(likes >= hypeLunaticsCost){
    	likes = likes - hypeLunaticsCost;
        updateLikes();
		removeHypeLunatics();
		hypeLunaticsLPS();
		updateLPS();
		hypeLunaticsPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removeHypeLunatics() 
{ 
   var rmvHypeLunatics = document.getElementById("HypeLunatics"); 
   rmvHypeLunatics.style.display="none"; 
   rmvHypeLunatics.style.visibility="hidden";
   var rmvHypeLunaticsBR = document.getElementById("brHypeLunatics"); 
   rmvHypeLunaticsBR.style.display="none"; 
   rmvHypeLunaticsBR.style.visibility="hidden";
}

function recreateHypeLunatics() 
{ 
   var rctHypeLunatics = document.getElementById("HypeLunatics"); 
   rctHypeLunatics.style.display="block"; 
   rctHypeLunatics.style.visibility="initial";
   var rctHypeLunaticsBR = document.getElementById("brHypeLunatics"); 
   rctHypeLunaticsBR.style.display="block"; 
   rctHypeLunaticsBR.style.visibility="initial";
}

function hypeLunaticsLPS() {
	var hypeLunaticsLPS = document.getElementById("HypeLunatics");
	if (hypeLunaticsLPS.style.visibility == "hidden") {
			lunaticsLPS = 32;
			updateLPS();
		} else {
			lunaticsLPS = 16;
		}
}

//+1 BOT
function addBot(){
    /*var botCost = nf.format(Math.floor(10000 * Math.pow(1.1,bots)));*/
    if(likes >= botCost){
        bots = bots + 1;
    	likes = likes - botCost;
        document.getElementById('bots').innerHTML = bots;
        lps += botLPS;
		updateLPS();
		botCost = Math.floor(10000 * Math.pow(1.1,bots));
		document.getElementById('botCost').innerHTML = nf.format(botCost);
    }
	else {
		notEnoughLikes();
	};
    /*var nextCostBot = nf.format(Math.floor(10000 * Math.pow(1.1,bots)));
    document.getElementById('botCost').innerHTML = nextCostBot;*/
};

//x2 BOTS
function doubleBots(){
    var doubleBotsCost = 50000;
    if(likes >= doubleBotsCost){
    	likes = likes - doubleBotsCost;
        updateLikes();
		removeDoubleBots();
		doubleBotsLPS();
		updateLPS();
		doubleBotsPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removeDoubleBots()
{ 
   var rmvDoubleBots = document.getElementById("DoubleBots"); 
   rmvDoubleBots.style.display="none"; 
   rmvDoubleBots.style.visibility="hidden";
   var rmvDoubleBotsBR = document.getElementById("brDoubleBot"); 
   rmvDoubleBotsBR.style.display="none"; 
   rmvDoubleBotsBR.style.visibility="hidden";
}

function recreateDoubleBots()
{ 
   var rctDoubleBots = document.getElementById("DoubleBots"); 
   rctDoubleBots.style.display="block"; 
   rctDoubleBots.style.visibility="initial";
   var rctDoubleBotsBR = document.getElementById("brDoubleBot"); 
   rctDoubleBotsBR.style.display="block"; 
   rctDoubleBotsBR.style.visibility="initial";
}

function doubleBotsLPS() {
	var doubleBotsLPS = document.getElementById("DoubleBots");
	if (doubleBotsLPS.style.visibility == "hidden") {
			botLPS = 64;
			updateLPS();
		} else {
			botLPS = 32;
		}
}

//+1 CLICK
function addClick(){
    /*var addClickCost = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));*/
    if(likes >= addClickCost){
        lpc = lpc + 1;
    	likes = likes - addClickCost;
        document.getElementById('lpc').innerHTML = lpc;
		document.getElementById('addClickCost').innerHTML = nextCostAddClick;
        updateLikes();
		updateLPC();
		addClickCost = Math.floor(1000 * Math.pow(1.2,lpc));
		document.getElementById('addClickCost').innerHTML = nf.format(addClickCost);
    }
	else {
		notEnoughLikes();
	};
    /*var nextCostAddClick = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));
    document.getElementById('addClickCost').innerHTML = nextCostAddClick;
	addClickCost = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));*/
};

/*//x2 CLICK
function doubleClick(){
    var doubleClickCost = 45000;
    if(likes >= doubleClickCost){
        lpc = lpc * 2;
    	likes = likes - doubleClickCost;
        document.getElementById('lpc').innerHTML = lpc;
		var nextCostAddClick = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));
		document.getElementById('addClickCost').innerHTML = nextCostAddClick;
        updateLikes();
		removeDoubleClick();
		updateLPC();
		doubleClickPurchased = 1;
		document.getElementById("newupgradeicon").style.display = "none";
		document.getElementById("newupgradeicon").style.visibility = "hidden";
		document.getElementById("newupgradeicon2").style.display = "none";
		document.getElementById("newupgradeicon2").style.visibility="hidden";
    }
	else {
		notEnoughLikes();
	};
};

function removeDoubleClick()
{ 
   var rmvDoubleClick = document.getElementById("DoubleClick");
   rmvDoubleClick.style.display="none";
   rmvDoubleClick.style.visibility="hidden";
   var rmvDoubleClickBR = document.getElementById("brDoubleClick");
   rmvDoubleClickBR.style.display="none";
   rmvDoubleClickBR.style.visibility="hidden";
}

function recreateDoubleClick()
{ 
   var rctDoubleClick = document.getElementById("DoubleClick"); 
   rctDoubleClick.style.display="block"; 
   rctDoubleClick.style.visibility="initial";
   var rctDoubleClickBR = document.getElementById("brDoubleClick"); 
   rctDoubleClickBR.style.display="block"; 
   rctDoubleClickBR.style.visibility="initial";
}*/

//INSUFFICIENT LIKES
function notEnoughLikes() {
	createNotEnoughLikes();
	window.setTimeout(function(){
		removeNotEnoughLikes();
	}, 3000);
}

function createNotEnoughLikes()                                 //"creates" the text "You have not got enough likes."
{ 
   var crtNotEnoughLikes = document.getElementById("NotEnoughLikes"); 
   crtNotEnoughLikes.style.display="block"; 
   crtNotEnoughLikes.style.visibility="visible"; 
}

function removeNotEnoughLikes()                                 //"remove" the text "You have not got enough likes."
{ 
   var rmvNotEnoughLikes = document.getElementById("NotEnoughLikes");
   rmvNotEnoughLikes.style.display="none";
   rmvNotEnoughLikes.style.visibility="hidden";
}

//FUNCTION OF UPDATING LIKES
function updateLikes(){
	document.getElementById('LabelLikes').innerHTML = nf.format(likes);
	//document.getElementById('likestxt').innerHTML = "You have " + nf.format(likes) + " likes";
	document.getElementById('likestxt').innerHTML = nf.format(likes);
}

//FUNCTION OF UPDATING LPS
function updateLPS(){
	//document.getElementById('lps').innerHTML = 'LPS: ' + nf.format(lps);
	document.getElementById('lps').innerHTML = nf.format(lps);
	document.getElementById('followerLPS').innerHTML = followerLPS;
	document.getElementById('FansLPS').innerHTML = FansLPS;
	document.getElementById('paparazzisLPS').innerHTML = paparazzisLPS;
	document.getElementById('stalkersLPS').innerHTML = stalkersLPS;
	document.getElementById('lunaticsLPS').innerHTML = lunaticsLPS;
	document.getElementById('botLPS').innerHTML = botLPS;
}

//FUNCTION OF UPDATING LPC
function updateLPC(){
	//document.getElementById('lpc').innerHTML = 'LPC: ' + nf.format(lpc);
	document.getElementById('lpc').innerHTML = nf.format(lpc);
	document.getElementById('lpcshop').innerHTML = nf.format(lpc);
}

//TIME INTERVAL (LIKES PER SECOND)
window.setInterval(function(){
	likes += (followerLPS * followers);
	likes += (FansLPS * fans);
	likes += (paparazzisLPS * paparazzis);
	likes += (stalkersLPS * stalkers);
	likes += (lunaticsLPS * lunatics);
	likes += (botLPS * bots);
	updateLikes();
}, 1000);

//TABS
function showHome() {
	var ShopPage = document.getElementById("ShopPage"); 
	ShopPage.style.display="none";
	ShopPage.style.visibility="hidden";
	document.getElementById("MenuCellShop").style.background="#c1c1c1";
	
	var SettingsPage = document.getElementById("SettingsPage"); 
	SettingsPage.style.display="none";
	SettingsPage.style.visibility="hidden";
	document.getElementById("MenuCellSettings").style.background="#c1c1c1";
	
	var LikePage = document.getElementById("LikePage"); 
	LikePage.style.display="block"; 
	LikePage.style.visibility="visible";
	document.getElementById("MenuCellHome").style.background="#a3a3a3";

	document.getElementById("MenuTabsTable").style.display="none";
	
	var x=window.scrollX;
    var y=window.scrollY;
    window.scrollTo(x, 0);
}

function showShop() {
	var LikePage = document.getElementById("LikePage"); 
	LikePage.style.display="none"; 
	LikePage.style.visibility="hidden";
	document.getElementById("MenuCellHome").style.background="#c1c1c1";
	
	var SettingsPage = document.getElementById("SettingsPage"); 
	SettingsPage.style.display="none";
	SettingsPage.style.visibility="hidden";
	document.getElementById("MenuCellSettings").style.background="#c1c1c1";
	
	var ShopPage = document.getElementById("ShopPage"); 
	ShopPage.style.display="block";
	ShopPage.style.visibility="visible";
	document.getElementById("MenuCellShop").style.background="#a3a3a3";

	document.getElementById("MenuTabsTable").style.display="table";
	
	var x=window.scrollX;
    var y=window.scrollY;
    window.scrollTo(x, 0);
}

function showSettings() {
	var LikePage = document.getElementById("LikePage"); 
	LikePage.style.display="none"; 
	LikePage.style.visibility="hidden";
	document.getElementById("MenuCellHome").style.background="#c1c1c1";
	
	var ShopPage = document.getElementById("ShopPage"); 
	ShopPage.style.display="none";
	ShopPage.style.visibility="hidden";
	document.getElementById("MenuCellShop").style.background="#c1c1c1";
	
	var SettingsPage = document.getElementById("SettingsPage"); 
	SettingsPage.style.display="block";
	SettingsPage.style.visibility="visible";
	document.getElementById("MenuCellSettings").style.background="#a3a3a3";

	document.getElementById("MenuTabsTable").style.display="none";
	
	var x=window.scrollX;
    var y=window.scrollY;
    window.scrollTo(x, 0);
}

function showShopTab() {
	var UpgradeTab = document.getElementById("UpgradeTab"); 
	UpgradeTab.style.display="none";
	UpgradeTab.style.visibility="hidden";
	document.getElementById("MenuUpgradesTab").style.background="#c1c1c1";
	
	var ShopTab = document.getElementById("ShopTab"); 
	ShopTab.style.display="block"; 
	ShopTab.style.visibility="visible";
	document.getElementById("MenuShopTab").style.background="#a3a3a3";
}

function showUpgradesTab() {
	var UpgradeTab = document.getElementById("UpgradeTab"); 
	UpgradeTab.style.display="block";
	UpgradeTab.style.visibility="visible";
	document.getElementById("MenuUpgradesTab").style.background="#a3a3a3";
	
	var ShopTab = document.getElementById("ShopTab"); 
	ShopTab.style.display="none"; 
	ShopTab.style.visibility="hidden";
	document.getElementById("MenuShopTab").style.background="#c1c1c1";
}

//DIALOGS
/*var changelogModal = new bootstrap.Modal(document.getElementById('changelogModal'));
var creditsModal = new bootstrap.Modal(document.getElementById('creditsModal'));

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('.showchangelog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
		changelogModal.show();
    });
    document.querySelector('.close-changelog').addEventListener('click', function() {
		changelogModal.hide();
    });
	
	var dialogReset = document.querySelector('#resetDialog');
    var showDialogResetButton = document.querySelector('.reset');
    if (! dialogReset.showModal) {
      dialogPolyfill.registerDialog(dialogReset);
    }
    showDialogResetButton.addEventListener('click', function() {
		dialogReset.showModal();
		disableScrolling();
    });
    dialogReset.querySelector('.closedialog').addEventListener('click', function() {
      dialogReset.close();
	  enableScrolling();
    });
	dialogReset.querySelector('.resetgame').addEventListener('click', function() {
      dialogReset.close();
	  enableScrolling();
    });
	
var dialogCredits = document.querySelector('#creditsDialog');
var showDialogCreditsButton = document.querySelector('.showcredits');
if (! dialogCredits.showModal) {
	dialogPolyfill.registerDialog(dialogCredits);
}
showDialogCreditsButton.addEventListener('click', function() {
	creditsModal.show();
});
dialogCredits.querySelector('.close-credits').addEventListener('click', function() {
	creditsModal.hide();
});

/*function creditsReset() {
	document.getElementById('creditsDialog').src = document.getElementById('creditsDialog').src;
}*/

function showLikeOverlay() {
	if(darkThemeEnabled == 0){
		document.querySelector("#like-icon").style.color = "#595959";
	} else {
		document.querySelector("#like-icon").style.color = "#cccccc";
	}
}

function hideLikeOverlay() {
	if(darkThemeEnabled == 0){
		document.querySelector("#like-icon").style.color = "black";
	} else {
		document.querySelector("#like-icon").style.color = "white";
	}
}

document.getElementById("newupgradeicon").style.display = "none";
document.getElementById("newupgradeicon").style.visibility = "hidden";
document.getElementById("newupgradeicon2").style.display = "none";
document.getElementById("newupgradeicon2").style.visibility="hidden";

window.setInterval(function(){
	if (followers >= 10 && hypeFollowersPurchased == 0) {
		recreatehypeFollowers();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);

window.setInterval(function(){
	if (fans >= 10 && hypeFansPurchased == 0) {
		recreatehypeFans();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);

window.setInterval(function(){
	if (paparazzis >= 10 && hypePaparazzisPurchased == 0) {
		recreatehypePaparazzis();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);

window.setInterval(function(){
	if (stalkers >= 10 && hypeStalkersPurchased == 0) {
		recreateHypeStalkers();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);

window.setInterval(function(){
	if (lunatics >= 10 && hypeLunaticsPurchased == 0) {
		recreateHypeLunatics();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);

window.setInterval(function(){
	if (bots >= 10 && doubleBotsPurchased == 0) {
		recreateDoubleBots();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);

/*window.setInterval(function(){
	if (lpc >= 10 && doubleClickPurchased == 0) {
		recreateDoubleClick();
		document.getElementById("newupgradeicon").style.display = "initial";
		document.getElementById("newupgradeicon").style.visibility = "visible";
		document.getElementById("newupgradeicon2").style.display = "initial";
		document.getElementById("newupgradeicon2").style.visibility="visible";
	}
}, 100);*/

var unknvar = 0;

function unknfunc(){
	if (unknvar == 0){
		unknvar = 1;
	}
	else if (unknvar == 1){
		unknvar = 2;
	}
	else if (unknvar == 2){
		unknvar = 3;
	}
	else if (unknvar == 3){
		unknvar = 4;
	}
	else if (unknvar == 4){
		var minigameModal = new bootstrap.Modal(document.getElementById('minigameModal'));
		minigameModal.show();
	}
}

var minigameModal = document.getElementById('minigameModal')
minigameModal.addEventListener('shown.bs.modal', function (event) {
	resetunkdlg();
})

minigameModal.addEventListener('hide.bs.modal', function (event) {
	unknvar = 0;
})

/*var dialogUnknown = document.querySelector('#eastereggDialog');
if (! dialogUnknown.showModal) {
	dialogPolyfill.registerDialog(dialogUnknown);
}
dialogUnknown.querySelector('.closeminigame').addEventListener('click', function() {
	dialogUnknown.close();
	enableScrolling();
	unknvar = 0;
});

function showunkndlg(){
	dialogUnknown.showModal();
	disableScrolling();
}*/

function resetunkdlg(){
	document.getElementById('minigameiframe').src = document.getElementById('minigameiframe').src;
}

function saveGame() {
	localStorage.setItem("likes", JSON.stringify(likes));
	localStorage.setItem("lps", JSON.stringify(lps));
	localStorage.setItem("lpc", JSON.stringify(lpc));
	localStorage.setItem("followerLPS", JSON.stringify(followerLPS));
	localStorage.setItem("followers", JSON.stringify(followers));
	localStorage.setItem("FansLPS", JSON.stringify(FansLPS));
	localStorage.setItem("fans", JSON.stringify(fans));
	localStorage.setItem("paparazzisLPS", JSON.stringify(paparazzisLPS));
	localStorage.setItem("paparazzis", JSON.stringify(paparazzis));
	localStorage.setItem("stalkersLPS", JSON.stringify(stalkersLPS));
	localStorage.setItem("stalkers", JSON.stringify(stalkers));
	localStorage.setItem("lunaticsLPS", JSON.stringify(lunaticsLPS));
	localStorage.setItem("lunatics", JSON.stringify(lunatics));
	localStorage.setItem("botLPS", JSON.stringify(botLPS));
	localStorage.setItem("bots", JSON.stringify(bots));
	localStorage.setItem("followerCost", JSON.stringify(followerCost));
	localStorage.setItem("FansCost", JSON.stringify(FansCost));
	localStorage.setItem("paparazzisCost", JSON.stringify(paparazzisCost));
	localStorage.setItem("stalkersCost", JSON.stringify(stalkersCost));
	localStorage.setItem("lunaticsCost", JSON.stringify(lunaticsCost));
	localStorage.setItem("botCost", JSON.stringify(botCost));
	localStorage.setItem("addClickCost", JSON.stringify(addClickCost));
	localStorage.setItem("hypeFollowersPurchased", JSON.stringify(hypeFollowersPurchased));
	localStorage.setItem("hypeFansPurchased", JSON.stringify(hypeFansPurchased));
	localStorage.setItem("hypePaparazzisPurchased", JSON.stringify(hypePaparazzisPurchased));
	localStorage.setItem("hypeStalkersPurchased", JSON.stringify(hypeStalkersPurchased));
	localStorage.setItem("hypeLunaticsPurchased", JSON.stringify(hypeLunaticsPurchased));
	localStorage.setItem("doubleBotsPurchased", JSON.stringify(doubleBotsPurchased));
	/*localStorage.setItem("doubleClickPurchased", JSON.stringify(doubleClickPurchased));*/
	localStorage.setItem("autoSaveEnabled", JSON.stringify(autoSaveEnabled));
	localStorage.setItem("darkThemeEnabled", JSON.stringify(darkThemeEnabled));
	/*localStorage.setItem("musicsEnabled", JSON.stringify(musicsEnabled));*/
	saveGameAlert();
}

function loadGame() {
	likes = JSON.parse(localStorage.getItem("likes"));
	if (JSON.parse(localStorage.getItem("likes")) == null) {
		likes = 0;
	}
	lps = JSON.parse(localStorage.getItem("lps"));
	if (JSON.parse(localStorage.getItem("lps")) == null) {
		lps = 0;
	}
	lpc = JSON.parse(localStorage.getItem("lpc"));
	if (JSON.parse(localStorage.getItem("lpc")) == null) {
		lpc = 1;
	}
	followerLPS = JSON.parse(localStorage.getItem("followerLPS"));
	if (JSON.parse(localStorage.getItem("followerLPS")) == null) {
		followerLPS = 1;
	}
	followers = JSON.parse(localStorage.getItem("followers"));
	if (JSON.parse(localStorage.getItem("followers")) == null) {
		followers = 0;
	}
	FansLPS = JSON.parse(localStorage.getItem("FansLPS"));
	if (JSON.parse(localStorage.getItem("FansLPS")) == null) {
		FansLPS = 2;
	}
	fans = JSON.parse(localStorage.getItem("fans"));
	if (JSON.parse(localStorage.getItem("fans")) == null) {
		fans = 0;
	}
	paparazzisLPS = JSON.parse(localStorage.getItem("paparazzisLPS"));
	if (JSON.parse(localStorage.getItem("paparazzisLPS")) == null) {
		paparazzisLPS = 4;
	}
	paparazzis = JSON.parse(localStorage.getItem("paparazzis"));
	if (JSON.parse(localStorage.getItem("paparazzis")) == null) {
		paparazzis = 0;
	}
	stalkersLPS = JSON.parse(localStorage.getItem("stalkersLPS"));
	if (JSON.parse(localStorage.getItem("stalkersLPS")) == null) {
		stalkersLPS = 8;
	}
	stalkers = JSON.parse(localStorage.getItem("stalkers"));
	if (JSON.parse(localStorage.getItem("stalkers")) == null) {
		stalkers = 0;
	}
	lunaticsLPS = JSON.parse(localStorage.getItem("lunaticsLPS"));
	if (JSON.parse(localStorage.getItem("lunaticsLPS")) == null) {
		lunaticsLPS = 16;
	}
	lunatics = JSON.parse(localStorage.getItem("lunatics"));
	if (JSON.parse(localStorage.getItem("lunatics")) == null) {
		lunatics = 0;
	}
	botLPS = JSON.parse(localStorage.getItem("botLPS"));
	if (JSON.parse(localStorage.getItem("botLPS")) == null) {
		botLPS = 32;
	}
	bots = JSON.parse(localStorage.getItem("bots"));
	if (JSON.parse(localStorage.getItem("bots")) == null) {
		bots = 0;
	}
	followerCost = JSON.parse(localStorage.getItem("followerCost"));
	if (JSON.parse(localStorage.getItem("followerCost")) == null) {
		followerCost = 10;
	}
	FansCost = JSON.parse(localStorage.getItem("FansCost"));
	if (JSON.parse(localStorage.getItem("FansCost")) == null) {
		FansCost = 100;
	}
	paparazzisCost = JSON.parse(localStorage.getItem("paparazzisCost"));
	if (JSON.parse(localStorage.getItem("paparazzisCost")) == null) {
		paparazzisCost = 500;
	}
	stalkersCost = JSON.parse(localStorage.getItem("stalkersCost"));
	if (JSON.parse(localStorage.getItem("stalkersCost")) == null) {
		stalkersCost = 1000;
	}
	lunaticsCost = JSON.parse(localStorage.getItem("lunaticsCost"));
	if (JSON.parse(localStorage.getItem("lunaticsCost")) == null) {
		lunaticsCost = 5000;
	}
	botCost = JSON.parse(localStorage.getItem("botCost"));
	if (JSON.parse(localStorage.getItem("botCost")) == null) {
		botCost = 10000;
	}
	addClickCost = JSON.parse(localStorage.getItem("addClickCost"));
	if (JSON.parse(localStorage.getItem("addClickCost")) == null) {
		addClickCost = 1000;
	}
	hypeFollowersPurchased = JSON.parse(localStorage.getItem("hypeFollowersPurchased"));
	if (JSON.parse(localStorage.getItem("hypeFollowersPurchased")) == null) {
		hypeFollowersPurchased = 0;
	}
	hypeFansPurchased = JSON.parse(localStorage.getItem("hypeFansPurchased"));
	if (JSON.parse(localStorage.getItem("hypeFansPurchased")) == null) {
		hypeFansPurchased = 0;
	}
	hypePaparazzisPurchased = JSON.parse(localStorage.getItem("hypePaparazzisPurchased"));
	if (JSON.parse(localStorage.getItem("hypePaparazzisPurchased")) == null) {
		hypePaparazzisPurchased = 0;
	}
	hypeStalkersPurchased = JSON.parse(localStorage.getItem("hypeStalkersPurchased"));
	if (JSON.parse(localStorage.getItem("hypeStalkersPurchased")) == null) {
		hypeStalkersPurchased = 0;
	}
	hypeLunaticsPurchased = JSON.parse(localStorage.getItem("hypeLunaticsPurchased"));
	if (JSON.parse(localStorage.getItem("hypeLunaticsPurchased")) == null) {
		hypeLunaticsPurchased = 0;
	}
	doubleBotsPurchased = JSON.parse(localStorage.getItem("doubleBotsPurchased"));
	if (JSON.parse(localStorage.getItem("doubleBotsPurchased")) == null) {
		doubleBotsPurchased = 0;
	}
	/*doubleClickPurchased = JSON.parse(localStorage.getItem("doubleClickPurchased"));
	if (JSON.parse(localStorage.getItem("doubleClickPurchased")) == null) {
		doubleClickPurchased = 0;
	}*/
	autoSaveEnabled = JSON.parse(localStorage.getItem("autoSaveEnabled"));
	if (JSON.parse(localStorage.getItem("autoSaveEnabled")) == null) {
		autoSaveEnabled = 1;
	}
	darkThemeEnabled = JSON.parse(localStorage.getItem("darkThemeEnabled"));
	if (JSON.parse(localStorage.getItem("darkThemeEnabled")) == null) {
		darkThemeEnabled = 0;
	}
	/*musicsEnabled = JSON.parse(localStorage.getItem("musicsEnabled"));
	if (JSON.parse(localStorage.getItem("musicsEnabled")) == null) {
		musicsEnabled = 1;
	}*/
	
	updateLikes();
	updateLPS();
	updateLPC();
	checkDarkTheme();
	
	document.getElementById('followers').innerHTML = nf.format(followers);
	document.getElementById('followerLPS').innerHTML = followerLPS;
	document.getElementById('followerCost').innerHTML = followerCost;
	document.getElementById('fans').innerHTML = nf.format(fans);
	document.getElementById('FansLPS').innerHTML = FansLPS;
	document.getElementById('FansCost').innerHTML = nf.format(FansCost);
	document.getElementById('paparazzis').innerHTML = nf.format(paparazzis);
	document.getElementById('paparazzisLPS').innerHTML = paparazzisLPS;
	document.getElementById('paparazzisCost').innerHTML = nf.format(paparazzisCost);
	document.getElementById('stalkers').innerHTML = nf.format(stalkers);
	document.getElementById('stalkersLPS').innerHTML = stalkersLPS;
	document.getElementById('stalkersCost').innerHTML = nf.format(stalkersCost);
	document.getElementById('lunatics').innerHTML = nf.format(lunatics);
	document.getElementById('lunaticsLPS').innerHTML = lunaticsLPS;
	document.getElementById('lunaticsCost').innerHTML = nf.format(lunaticsCost);
	document.getElementById('bots').innerHTML = nf.format(bots);
	document.getElementById('botLPS').innerHTML = botLPS;
	document.getElementById('botCost').innerHTML = nf.format(botCost);
	document.getElementById('addClickCost').innerHTML = nf.format(addClickCost);
}

function enableDisableAutoSave() {
	if (autoSaveEnabled == 0) {
		var saveenabledcheckbox = document.getElementById("saveenabled");
		saveenabledcheckbox.style.display="block";
		saveenabledcheckbox.style.visibility="initial";
	
		var savedisabledcheckbox = document.getElementById("savedisabled");
		savedisabledcheckbox.style.display="none";
		savedisabledcheckbox.style.visibility="hidden";
		
		autoSaveEnabled = 1;
	} else if (autoSaveEnabled == 1) {
		var saveenabledcheckbox = document.getElementById("saveenabled");
		saveenabledcheckbox.style.display="none";
		saveenabledcheckbox.style.visibility="hidden";
	
		var savedisabledcheckbox = document.getElementById("savedisabled");
		savedisabledcheckbox.style.display="block";
		savedisabledcheckbox.style.visibility="initial";
		
		autoSaveEnabled = 0;
	}
}

window.setInterval(function(){
	if (autoSaveEnabled == 1) {
		saveGame();
	}
}, 30000);

function saveGameAlert() {
	createSaveGameAlert();
	window.setTimeout(function(){
		removeSaveGameAlert();
	}, 3000);
}

function createSaveGameAlert()
{ 
   var crtSaveGameAlert = document.getElementById("SaveGameAlert"); 
   crtSaveGameAlert.style.display="block"; 
   crtSaveGameAlert.style.visibility="visible"; 
}

function removeSaveGameAlert()
{ 
   var rmvSaveGameAlert = document.getElementById("SaveGameAlert");
   rmvSaveGameAlert.style.display="none";
   rmvSaveGameAlert.style.visibility="hidden";
}

/*if (lpc == 1) {
	addClickCost = 1000;
	document.getElementById('addClickCost').innerHTML = nf.format(addClickCost);
} else if (lpc > 1) {
	addClickCost = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));
	document.getElementById('addClickCost').innerHTML = nf.format(addClickCost);
}*/

/*function enableDisableDarkTheme() {
	if (darkThemeEnabled == 0) {
		var darkthemeenabledcheckbox = document.getElementById("darkthemeenabled");
		darkthemeenabledcheckbox.style.display="block";
		darkthemeenabledcheckbox.style.visibility="initial";
	
		var darkthemedisabledcheckbox = document.getElementById("darkthemedisabled");
		darkthemedisabledcheckbox.style.display="none";
		darkthemedisabledcheckbox.style.visibility="hidden";
		
		darkThemeEnabled = 1;
	} else if (darkThemeEnabled == 1) {
		var darkthemeenabledcheckbox = document.getElementById("darkthemeenabled");
		darkthemeenabledcheckbox.style.display="none";
		darkthemeenabledcheckbox.style.visibility="hidden";
	
		var darkthemedisabledcheckbox = document.getElementById("darkthemedisabled");
		darkthemedisabledcheckbox.style.display="block";
		darkthemedisabledcheckbox.style.visibility="initial";
		
		darkThemeEnabled = 0;
	}
}*/

/*window.setInterval(function(){
	if (darkThemeEnabled == 0) {
		disableDarkTheme();
	} else if (darkThemeEnabled == 1) {
		enableDarkTheme();
	}
}, 100);*/

/*function enableDarkTheme() {
	darkThemeEnabled = 1;
}

function disableDarkTheme() {	
	darkThemeEnabled = 0;
}*/

//Dark theme check
function disableDarkTheme() {
    var darkthemeenabledcheckbox = document.getElementById("darkthemeenabled");
	darkthemeenabledcheckbox.style.display="none";
	darkthemeenabledcheckbox.style.visibility="hidden";
	var darkthemedisabledcheckbox = document.getElementById("darkthemedisabled");
	darkthemedisabledcheckbox.style.display="block";
	darkthemedisabledcheckbox.style.visibility="initial";
	document.body.style.background = "white";
	document.body.style.color = "black";
	document.getElementById("TopActionBar").style.borderBottom = "1px solid black";
	document.getElementById("TopActionBar").style.backgroundColor = "white";
	document.querySelector(".likelabelicon").style.color = "black";
	document.querySelector(".likeicon").style.color = "black";
	document.querySelector(".shopitem1").style.backgroundColor = "white";
	document.querySelector(".shopitem1").style.border = "1px solid black";
	document.querySelector(".shopitem1btn").style.border = "1px solid black";
	document.querySelector(".shopitem1icon").style.color = "black";
	document.querySelector(".shopitem2").style.backgroundColor = "white";
	document.querySelector(".shopitem2").style.border = "1px solid black";
	document.querySelector(".shopitem2btn").style.border = "1px solid black";
	document.querySelector(".shopitem2icon").style.color = "black";
	document.querySelector(".shopitem3").style.backgroundColor = "white";
	document.querySelector(".shopitem3").style.border = "1px solid black";
	document.querySelector(".shopitem3btn").style.border = "1px solid black";
	document.querySelector(".shopitem3icon").style.color = "black";
	document.querySelector(".shopitem4").style.backgroundColor = "white";
	document.querySelector(".shopitem4").style.border = "1px solid black";
	document.querySelector(".shopitem4btn").style.border = "1px solid black";
	document.querySelector(".shopitem4icon").style.color = "black";
	document.querySelector(".shopitem5").style.backgroundColor = "white";
	document.querySelector(".shopitem5").style.border = "1px solid black";
	document.querySelector(".shopitem5btn").style.border = "1px solid black";
	document.querySelector(".shopitem5icon").style.color = "black";
	document.querySelector(".shopitem6").style.backgroundColor = "white";
	document.querySelector(".shopitem6").style.border = "1px solid black";
	document.querySelector(".shopitem6btn").style.border = "1px solid black";
	document.querySelector(".shopitem6icon").style.color = "black";
	document.querySelector(".shopitem7").style.backgroundColor = "white";
	document.querySelector(".shopitem7").style.border = "1px solid black";
	document.querySelector(".shopitem7btn").style.border = "1px solid black";
	document.querySelector(".shopitem7icon").style.color = "black";
	document.querySelector(".shopitem8").style.backgroundColor = "white";
	document.querySelector(".shopitem8").style.border = "1px solid black";
	document.querySelector(".shopitem8btn").style.border = "1px solid black";
	document.querySelector(".shopitem8icon").style.color = "black";
	document.querySelector(".shopitem9").style.backgroundColor = "white";
	document.querySelector(".shopitem9").style.border = "1px solid black";
	document.querySelector(".shopitem9btn").style.border = "1px solid black";
	document.querySelector(".shopitem9icon").style.color = "black";
	document.querySelector(".shopitem10").style.backgroundColor = "white";
	document.querySelector(".shopitem10").style.border = "1px solid black";
	document.querySelector(".shopitem10btn").style.border = "1px solid black";
	document.querySelector(".shopitem10icon").style.color = "black";
	document.querySelector(".shopitem11").style.backgroundColor = "white";
	document.querySelector(".shopitem11").style.border = "1px solid black";
	document.querySelector(".shopitem11btn").style.border = "1px solid black";
	document.querySelector(".shopitem11icon").style.color = "black";
	document.querySelector(".shopitem12").style.backgroundColor = "white";
	document.querySelector(".shopitem12").style.border = "1px solid black";
	document.querySelector(".shopitem12btn").style.border = "1px solid black";
	document.querySelector(".shopitem12icon").style.color = "black";
	document.querySelector(".shopitem13").style.backgroundColor = "white";
	document.querySelector(".shopitem13").style.border = "1px solid black";
	document.querySelector(".shopitem13btn").style.border = "1px solid black";
	document.querySelector(".shopitem13icon").style.color = "black";
	/*document.querySelector(".shopitem14").style.backgroundColor = "white";
	document.querySelector(".shopitem14").style.border = "1px solid black";
	document.querySelector(".shopitem14btn").style.border = "1px solid black";
	document.querySelector(".shopitem14icon").style.color = "black";
	document.querySelector(".shopitem15").style.backgroundColor = "white";
	document.querySelector(".shopitem15").style.border = "1px solid black";
	document.querySelector(".shopitem15btn").style.border = "1px solid black";
	document.querySelector(".shopitem15icon").style.color = "black";
    document.querySelector(".shopitem16").style.backgroundColor = "white";
	document.querySelector(".shopitem16").style.border = "1px solid black";
	document.querySelector(".shopitem16btn").style.border = "1px solid black";
	document.querySelector(".shopitem16icon").style.color = "black";*/
	/*document.querySelector(".menuicon1").style.color = "black";
	document.querySelector(".menuicon2").style.color = "black";
	document.querySelector(".menuicon3").style.color = "black";*/
	document.querySelector(".confighr1").style.border = "1px solid black";
	document.querySelector(".confighr2").style.border = "1px solid black";
	document.querySelector(".confighr3").style.border = "1px solid black";
	//document.querySelector(".confighr4").style.border = "1px solid black";
	document.querySelector(".confighr5").style.border = "1px solid black";
	//document.querySelector(".confighr6").style.border = "1px solid black";
	/*document.querySelector(".confighr7").style.border = "1px solid black";*/
	document.querySelector(".configoption1").style.border = "1px solid black";
	document.querySelector(".configoption1").style.color = "black";
	document.querySelector(".option1icon").style.color = "black";
	document.querySelector(".configoption2").style.border = "1px solid black";
	document.querySelector(".configoption2").style.color = "black";
	document.querySelector(".option2icon").style.color = "black";
	document.querySelector(".configoption3").style.border = "1px solid black";
	document.querySelector(".configoption3").style.color = "black";
	document.querySelector(".option3icon").style.color = "black";
	document.querySelector(".configoption4").style.border = "1px solid black";
	document.querySelector(".configoption4").style.color = "black";
	document.querySelector(".option4icon").style.color = "black";
	document.querySelector(".configoption5").style.border = "1px solid black";
	document.querySelector(".configoption5").style.color = "black";
	document.querySelector(".option5icon").style.color = "black";
	/*document.querySelector(".configoption6").style.border = "1px solid black";
	document.querySelector(".configoption6").style.color = "black";
	document.querySelector(".option6icon").style.color = "black";*/
	document.querySelector(".configoption7").style.border = "1px solid black";
	document.querySelector(".configoption7").style.color = "black";
	document.querySelector(".option7icon").style.color = "black";
	document.querySelector(".configoption8").style.border = "1px solid black";
	document.querySelector(".configoption8").style.color = "black";
	document.querySelector(".option8icon").style.color = "black";
	/*document.querySelector(".configoption9").style.border = "1px solid black";
	document.querySelector(".configoption9").style.color = "black";
	document.querySelector(".option9icon").style.color = "black";
	document.querySelector(".configoption10").style.border = "1px solid black";
	document.querySelector(".configoption10").style.color = "black";
	document.querySelector(".option10icon").style.color = "black";
	document.querySelector(".configoption11").style.border = "1px solid black";
	document.querySelector(".configoption11").style.color = "black";
	document.querySelector(".option11icon").style.color = "black";*/
	/*document.querySelector(".configoption12").style.border = "1px solid black";
	document.querySelector(".configoption12").style.color = "black";
	document.querySelector(".option12icon").style.color = "black";
	document.querySelector(".configoption13").style.border = "1px solid black";
	document.querySelector(".configoption13").style.color = "black";
	document.querySelector(".option13icon").style.color = "black";*/
	/*document.querySelector(".configoption14").style.border = "1px solid black";
	document.querySelector(".configoption14").style.color = "black";
	document.querySelector(".option14icon").style.color = "black";
	document.querySelector(".configoption15").style.border = "1px solid black";
	document.querySelector(".configoption15").style.color = "black";
	document.querySelector(".option15icon").style.color = "black";
	document.querySelector(".configoption16").style.border = "1px solid black";
	document.querySelector(".configoption16").style.color = "black";
	document.querySelector(".option16icon").style.color = "black";*/
	document.body.style.color = "black";
	document.querySelectorAll(".modal-content").forEach(el => {
		el.style.backgroundColor = "white";
		el.style.border = "1px solid #0000002d";
	});
	document.querySelectorAll(".btn-close").forEach(el => {
		el.classList.remove("darkthemed");
	});
	document.querySelector(".minigame-source-string-one").style.color = "black";
	document.querySelector(".minigame-source-string-two").style.color = "black";
	document.querySelector(".minigame-source-sky").style.color = "black";
	document.querySelector(".minigame-source-ship").style.color = "black";
}

function enableDarkTheme() {
    var darkthemeenabledcheckbox = document.getElementById("darkthemeenabled");
	darkthemeenabledcheckbox.style.display="block";
	darkthemeenabledcheckbox.style.visibility="initial";
	var darkthemedisabledcheckbox = document.getElementById("darkthemedisabled");
	darkthemedisabledcheckbox.style.display="none";
	darkthemedisabledcheckbox.style.visibility="hidden";
	document.body.style.background = "#333333";
	document.body.style.color = "white";
	document.getElementById("TopActionBar").style.borderBottom = "1px solid white";
	document.getElementById("TopActionBar").style.backgroundColor = "#333333";
	document.querySelector(".likelabelicon").style.color = "white";
	document.querySelector(".likeicon").style.color = "white";
	document.querySelector(".shopitem1").style.backgroundColor = "#333333";
	document.querySelector(".shopitem1").style.border = "1px solid white";
	document.querySelector(".shopitem1btn").style.border = "1px solid white";
	document.querySelector(".shopitem1icon").style.color = "white";
	document.querySelector(".shopitem2").style.backgroundColor = "#333333";
	document.querySelector(".shopitem2").style.border = "1px solid white";
	document.querySelector(".shopitem2btn").style.border = "1px solid white";
	document.querySelector(".shopitem2icon").style.color = "white";
	document.querySelector(".shopitem3").style.backgroundColor = "#333333";
	document.querySelector(".shopitem3").style.border = "1px solid white";
	document.querySelector(".shopitem3btn").style.border = "1px solid white";
	document.querySelector(".shopitem3icon").style.color = "white";
	document.querySelector(".shopitem4").style.backgroundColor = "#333333";
	document.querySelector(".shopitem4").style.border = "1px solid white";
	document.querySelector(".shopitem4btn").style.border = "1px solid white";
	document.querySelector(".shopitem4icon").style.color = "white";
	document.querySelector(".shopitem5").style.backgroundColor = "#333333";
	document.querySelector(".shopitem5").style.border = "1px solid white";
	document.querySelector(".shopitem5btn").style.border = "1px solid white";
	document.querySelector(".shopitem5icon").style.color = "white";
	document.querySelector(".shopitem6").style.backgroundColor = "#333333";
	document.querySelector(".shopitem6").style.border = "1px solid white";
	document.querySelector(".shopitem6btn").style.border = "1px solid white";
	document.querySelector(".shopitem6icon").style.color = "white";
	document.querySelector(".shopitem7").style.backgroundColor = "#333333";
	document.querySelector(".shopitem7").style.border = "1px solid white";
	document.querySelector(".shopitem7btn").style.border = "1px solid white";
	document.querySelector(".shopitem7icon").style.color = "white";
	document.querySelector(".shopitem8").style.backgroundColor = "#333333";
	document.querySelector(".shopitem8").style.border = "1px solid white";
	document.querySelector(".shopitem8btn").style.border = "1px solid white";
	document.querySelector(".shopitem8icon").style.color = "white";
	document.querySelector(".shopitem9").style.backgroundColor = "#333333";
	document.querySelector(".shopitem9").style.border = "1px solid white";
	document.querySelector(".shopitem9btn").style.border = "1px solid white";
	document.querySelector(".shopitem9icon").style.color = "white";
	document.querySelector(".shopitem10").style.backgroundColor = "#333333";
	document.querySelector(".shopitem10").style.border = "1px solid white";
	document.querySelector(".shopitem10btn").style.border = "1px solid white";
	document.querySelector(".shopitem10icon").style.color = "white";
	document.querySelector(".shopitem11").style.backgroundColor = "#333333";
	document.querySelector(".shopitem11").style.border = "1px solid white";
	document.querySelector(".shopitem11btn").style.border = "1px solid white";
	document.querySelector(".shopitem11icon").style.color = "white";
	document.querySelector(".shopitem12").style.backgroundColor = "#333333";
	document.querySelector(".shopitem12").style.border = "1px solid white";
	document.querySelector(".shopitem12btn").style.border = "1px solid white";
	document.querySelector(".shopitem12icon").style.color = "white";
	document.querySelector(".shopitem13").style.backgroundColor = "#333333";
	document.querySelector(".shopitem13").style.border = "1px solid white";
	document.querySelector(".shopitem13btn").style.border = "1px solid white";
	document.querySelector(".shopitem13icon").style.color = "white";
	/*document.querySelector(".shopitem14").style.backgroundColor = "#333333";
	document.querySelector(".shopitem14").style.border = "1px solid white";
	document.querySelector(".shopitem14btn").style.border = "1px solid white";
	document.querySelector(".shopitem14icon").style.color = "white";*/
	/*document.querySelector(".menuicon1").style.color = "white";
	document.querySelector(".menuicon2").style.color = "white";
	document.querySelector(".menuicon3").style.color = "white";*/
	document.querySelector(".confighr1").style.border = "1px solid white";
	document.querySelector(".confighr2").style.border = "1px solid white";
	document.querySelector(".confighr3").style.border = "1px solid white";
	//document.querySelector(".confighr4").style.border = "1px solid white";
	document.querySelector(".confighr5").style.border = "1px solid white";
	//document.querySelector(".confighr6").style.border = "1px solid white";
	/*document.querySelector(".confighr7").style.border = "1px solid white";*/
	document.querySelector(".configoption1").style.border = "1px solid white";
	document.querySelector(".configoption1").style.color = "white";
	document.querySelector(".option1icon").style.color = "white";
	document.querySelector(".configoption2").style.border = "1px solid white";
	document.querySelector(".configoption2").style.color = "white";
	document.querySelector(".option2icon").style.color = "white";
	document.querySelector(".configoption3").style.border = "1px solid white";
	document.querySelector(".configoption3").style.color = "white";
	document.querySelector(".option3icon").style.color = "white";
	document.querySelector(".configoption4").style.border = "1px solid white";
	document.querySelector(".configoption4").style.color = "white";
	document.querySelector(".option4icon").style.color = "white";
	document.querySelector(".configoption5").style.border = "1px solid white";
	document.querySelector(".configoption5").style.color = "white";
	document.querySelector(".option5icon").style.color = "white";
	/*document.querySelector(".configoption6").style.border = "1px solid white";
	document.querySelector(".configoption6").style.color = "white";
	document.querySelector(".option6icon").style.color = "white";*/
	document.querySelector(".configoption7").style.border = "1px solid white";
	document.querySelector(".configoption7").style.color = "white";
	document.querySelector(".option7icon").style.color = "white";
	document.querySelector(".configoption8").style.border = "1px solid white";
	document.querySelector(".configoption8").style.color = "white";
	document.querySelector(".option8icon").style.color = "white";
	/*document.querySelector(".configoption9").style.border = "1px solid white";
	document.querySelector(".configoption9").style.color = "white";
	document.querySelector(".option9icon").style.color = "white";
	document.querySelector(".configoption10").style.border = "1px solid white";
	document.querySelector(".configoption10").style.color = "white";
	document.querySelector(".option10icon").style.color = "white";
	document.querySelector(".configoption11").style.border = "1px solid white";
	document.querySelector(".configoption11").style.color = "white";
	document.querySelector(".option11icon").style.color = "white";*/
	/*document.querySelector(".configoption12").style.border = "1px solid white";
	document.querySelector(".configoption12").style.color = "white";
	document.querySelector(".option12icon").style.color = "white";
	document.querySelector(".configoption13").style.border = "1px solid white";
	document.querySelector(".configoption13").style.color = "white";
	document.querySelector(".option13icon").style.color = "white";*/
	/*document.querySelector(".configoption14").style.border = "1px solid white";
	document.querySelector(".configoption14").style.color = "white";
	document.querySelector(".option14icon").style.color = "white";
	document.querySelector(".configoption15").style.border = "1px solid white";
	document.querySelector(".configoption15").style.color = "white";
	document.querySelector(".option15icon").style.color = "white";
	document.querySelector(".configoption16").style.border = "1px solid white";
	document.querySelector(".configoption16").style.color = "white";
	document.querySelector(".option16icon").style.color = "white";*/
	document.querySelectorAll(".modal-content").forEach(el => {
	el.style.backgroundColor = "#212529";
	el.style.border = "1px solid #ffffff26";
	});
	document.querySelectorAll(".btn-close").forEach(el => {
		el.classList.add("darkthemed");
	});
	document.querySelector(".minigame-source-string-one").style.color = "white";
	document.querySelector(".minigame-source-string-two").style.color = "white";
	document.querySelector(".minigame-source-sky").style.color = "white";
	document.querySelector(".minigame-source-ship").style.color = "white";
}

/*function enableDisableMusics() {
	if (musicsEnabled == 0) {
		var musicsenabledcheckbox = document.getElementById("musicsenabled");
		musicsenabledcheckbox.style.display="block";
		musicsenabledcheckbox.style.visibility="initial";
	
		var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
		musicsdisabledcheckbox.style.display="none";
		musicsdisabledcheckbox.style.visibility="hidden";
		
		musicsEnabled = 1;
		document.querySelector('#HouseInAForestLoop').play();
	} else if (musicsEnabled == 1) {
		var musicsenabledcheckbox = document.getElementById("musicsenabled");
		musicsenabledcheckbox.style.display="none";
		musicsenabledcheckbox.style.visibility="hidden";
	
		var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
		musicsdisabledcheckbox.style.display="block";
		musicsdisabledcheckbox.style.visibility="initial";
		
		musicsEnabled = 0;
		stopMusic();
	}
}*/

/*if (JSON.parse(localStorage.getItem("musicsEnabled")) == 0) {
	var musicsenabledcheckbox = document.getElementById("musicsenabled");
	musicsenabledcheckbox.style.display="none";
	musicsenabledcheckbox.style.visibility="hidden";
	
	var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
	musicsdisabledcheckbox.style.display="block";
	musicsdisabledcheckbox.style.visibility="initial";
	
	stopMusic();
	} else if (JSON.parse(localStorage.getItem("musicsEnabled")) == 1) {
	var musicsenabledcheckbox = document.getElementById("musicsenabled");
	musicsenabledcheckbox.style.display="block";
	musicsenabledcheckbox.style.visibility="initial";
	
	var musicsdisabledcheckbox = document.getElementById("musicsdisabled");
	musicsdisabledcheckbox.style.display="none";
	musicsdisabledcheckbox.style.visibility="hidden";
	
	stopMusic();
	checkDarkTheme();
}

function stopMusic() {
	document.querySelector('#HouseInAForestLoop').pause();
}

window.setInterval(function(){
	if (musicsEnabled == 0) {
		stopMusic();
	}
}, 100);*/

var nextCostAddClick = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));
document.getElementById('addClickCost').innerHTML = nextCostAddClick;
addClickCost = nf.format(Math.floor(1000 * Math.pow(1.2,lpc)));

/*if (musicsEnabled == 1) {
	document.querySelector('#HouseInAForestLoop').play();
}*/

loadGame();