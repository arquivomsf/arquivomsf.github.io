var activetab, activeshoptab;
var likes = 0, lps = 0, lpc = 1, lpcBaseCost = 1000, lpcNextCost = 1000;
var darkenabled = false, autosaveenabled = true;
var followers = fans = paparazzi = stalkers = lunatics = bots = 0;
var followersLPS = 1, fansLPS = 2, paparazziLPS = 4, stalkersLPS = 8, lunaticsLPS = 16, botsLPS = 32;
var followersBaseCost = 10, fansBaseCost = 100, paparazziBaseCost = 500, stalkersBaseCost = 1000, lunaticsBaseCost = 5000, botsBaseCost = 10000;
var followersNextCost = 10, fansNextCost = 100, paparazziNextCost = 500, stalkersNextCost = 1000, lunaticsNextCost = 5000, botsNextCost = 10000;
var followersDoublePurchased = fansDoublePurchased = paparazziDoublePurchased = stalkersDoublePurchased = lunaticsDoublePurchased = botsDoublePurchased = 1;
var followersDoubleCost = 500, fansDoubleCost = 1000, paparazziDoubleCost = 6000, stalkersDoubleCost = 12000, lunaticsDoubleCost = 25000, botsDoubleCost = 50000;
var uniqueUpgradesAvailable = 0;

//click
function likeClick() {
    likes += lpc;
	updateElementDisplay(document.getElementById("likestxt"),likes,false);
    updateElementDisplay(document.getElementById("LabelLikes"),likes,false);
}

//lps logic
window.setInterval(function(){
	likes += lps;
	updateElementDisplay(document.getElementById("likestxt"),likes,false);
    updateElementDisplay(document.getElementById("LabelLikes"),likes,false);
}, 1000);

function updateLPSValue() {
    lps = ((followersLPS * followersDoublePurchased) * followers) + ((fansLPS * fansDoublePurchased) * fans) + ((paparazziLPS * paparazziDoublePurchased) * paparazzi) + ((stalkersLPS * stalkersDoublePurchased) * stalkers) + ((lunaticsLPS * lunaticsDoublePurchased) * lunatics) + ((botsLPS * botsDoublePurchased) * bots);
    updateElementDisplay(document.getElementById("lps"),lps,false);
}

//update like display
function updateElementDisplay(element,value,loop) {
    if (loop) {
        element.forEach(el => {
            el.innerHTML = value;
        });
    } else {
        element.innerHTML = value;
    }
}

//animations functions
function triggerAnimation(element,animation,delay) {
    setTimeout(()=>{
        element.classList.remove(animation);
        void element.offsetWidth;
        element.classList.add(animation);
    },delay);
}

function resetAnimation(element,animation,delay) {
    setTimeout(()=>{
        element.classList.remove(animation);
        void element.offsetWidth;
    },delay);
}

//change menu tab
function changeTab(selTab) {
    unknvar = 0;
    resetAnimation(document.getElementById("LikeBtnDiv"),"click",0);
    activetab = selTab;
    var x=window.scrollX;
    window.scrollTo(x, 0);
    document.getElementById("tab-loading").style.animation = "tabloading 0.6s alternate";
    setTimeout(()=>{
        document.getElementById("tab-loading").style.animation = "none";
    },600);
    setTimeout(()=>{
    if (activetab == "likes") {
        document.querySelector("#LikeSection").classList.remove("hide");
        document.querySelector("#LikeSection").classList.remove("pointer-events");
        document.querySelector(".likestab").classList.add("active");
    } else {
        document.querySelector("#LikeSection").classList.add("hide");
        document.querySelector("#LikeSection").classList.add("pointer-events");
        document.querySelector(".likestab").classList.remove("active");
    }
    if (activetab == "shop") {
        document.querySelector("#ShopSection").classList.remove("hide");
        document.querySelector("#ShopSection").classList.remove("pointer-events");
        document.querySelector(".shoptab").classList.add("active");
        document.querySelector(".allshoptabs").classList.remove("hide");
        document.querySelector(".allshoptabs").classList.remove("pointer-events");
    } else {
        document.querySelector("#ShopSection").classList.add("hide");
        document.querySelector("#ShopSection").classList.add("pointer-events");
        document.querySelector(".shoptab").classList.remove("active");
        document.querySelector(".allshoptabs").classList.add("hide");
        document.querySelector(".allshoptabs").classList.add("pointer-events");
    }
    if (activetab == "config") {
        document.querySelector("#ConfigSection").classList.remove("hide");
        document.querySelector("#ConfigSection").classList.remove("pointer-events");
        document.querySelector(".configtab").classList.add("active");
    } else {
        document.querySelector("#ConfigSection").classList.add("hide");
        document.querySelector("#ConfigSection").classList.add("pointer-events");
        document.querySelector(".configtab").classList.remove("active");
    }
},300);
}

//change shop tab
function changeShopTab(selTab) {
    activeshoptab = selTab;
    var x=window.scrollX;
    window.scrollTo(x, 0);
    document.getElementById("tab-loading").style.animation = "tabloading 0.6s alternate";
    setTimeout(()=>{
        document.getElementById("tab-loading").style.animation = "none";
    },600);
    setTimeout(()=>{
    if (activeshoptab == "common") {
        document.querySelector("#CommonUpgrades").classList.remove("hide");
        document.querySelector("#CommonUpgrades").classList.remove("pointer-events");
        document.querySelector(".commontab").classList.add("active");
    } else {
        document.querySelector("#CommonUpgrades").classList.add("hide");
        document.querySelector("#CommonUpgrades").classList.add("pointer-events");
        document.querySelector(".commontab").classList.remove("active");
    }
    if (activeshoptab == "special") {
        document.querySelector("#SpecialUpgrades").classList.remove("hide");
        document.querySelector("#SpecialUpgrades").classList.remove("pointer-events");
        document.querySelector(".specialtab").classList.add("active");
    } else {
        document.querySelector("#SpecialUpgrades").classList.add("hide");
        document.querySelector("#SpecialUpgrades").classList.add("pointer-events");
        document.querySelector(".specialtab").classList.remove("active");
    }
},300);
}

//default tabs
changeTab("likes");
changeShopTab("common");

//create common upgrades
function createShopItems() {
    var shop_items_get = JSON.parse(common_shop_items);
    var itemName = Object.keys(shop_items_get);

    for( var i=0; i<itemName.length; i++ ){
        let divname = shop_items_get[itemName[i]].divname;
        let shopitemid = shop_items_get[itemName[i]].shopitemid;
        let itemaction = shop_items_get[itemName[i]].itemaction;
        let iconname = shop_items_get[itemName[i]].iconname;
        let spanclass = shop_items_get[itemName[i]].spanclass;
        let namespanclass = shop_items_get[itemName[i]].namespanclass;
        let namespanid = shop_items_get[itemName[i]].namespanid;
        let lpsspanclass = shop_items_get[itemName[i]].lpsspanclass;
        let lpsspanid = shop_items_get[itemName[i]].lpsspanid;
        let costspanid = shop_items_get[itemName[i]].costspanid;
        let descspanclass = shop_items_get[itemName[i]].descspanclass;
        document.querySelector("#CommonUpgrades").innerHTML += `
            <div id="${divname}" class="shopitem">
            <div class="ItemDiv" id="${shopitemid}">
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemBuy">
                    <div class="BuyButton pointer" onClick="${itemaction}">
						<div class="BuyButtonContent">
							<i class="material-icons shop-add-icon">${iconname}</i><br>
							<span class="${spanclass}">+1 Follower</span>
						</div>
					</div>
            </div>
            <div class="ItemCell ItemInfo parent-flex hide-mobile">
                <div class="child-flex-vertical">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span><br />
                    <span class="${lpsspanclass} item-lps1"></span><span id="${lpsspanid}">1</span><span class="${lpsspanclass} item-lps2"></span><br />
				</div>
            </div>
            <div class="ItemCell ItemHave float-right">
                <div class="parent-flex">
                <div class="child-flex-vertical item-number">
					<span class="${namespanclass}">Followers: </span><span id="${namespanid}">0</span><br />
				</div>
                </div>
            </div>
            </div>
            <div class="ItemTable ItemRow hide-pc">
            <div class="ItemCell ItemInfoMobile parent-flex">
                <div class="child-flex">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span><br />
                    <span class="${lpsspanclass} item-lps1 itemlps-mobile"></span><span id="${lpsspanid}">1</span><span class="${lpsspanclass} item-lps2 itemlps-mobile"></span><br />
				</div>
            </div>
            </div>
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemDesc parent-flex">
                <div class="child-flex">
                    <span class="${descspanclass}">description</span>
				</div>
            </div>
            </div>
        </div>
        </div>
        <br>
        `;
        updateElementDisplay(document.getElementById(lpsspanid),eval(lpsspanid),false);
        updateElementDisplay(document.getElementById(costspanid),eval(costspanid),false);
        updateElementDisplay(document.getElementById(namespanid),eval(namespanid),false);
    }
}

createShopItems();

//create special upgrades
function createSpecialShopItem(item) {
    var shop_items_get = JSON.parse(special_shop_items);

    let onlyonce = shop_items_get[item].onlyonce;
    let divname = shop_items_get[item].divname;
    let shopitemid = shop_items_get[item].shopitemid;
    let itemaction = shop_items_get[item].itemaction;
    let iconname = shop_items_get[item].iconname;
    let namespanclass = shop_items_get[item].namespanclass;
    let levelspanclass = shop_items_get[item].levelspanclass;
    let levelspanid = shop_items_get[item].levelspanid;
    let lpccomplete = shop_items_get[item].lpccomplete;
    let costspanid = shop_items_get[item].costspanid;
    let descspanclass = shop_items_get[item].descspanclass;
    let destroyclass = shop_items_get[item].destroyclass;

    if (onlyonce == "false") {
    document.querySelector("#SpecialUpgrades").innerHTML += `
            <div id="${divname}" class="shopitem">
            <div class="ItemDiv" id="${shopitemid}">
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemBuy">
                    <div class="BuyButton pointer" onClick="${itemaction}">
						<div class="BuyButtonContent">
							<i class="material-icons shop-add-icon">${iconname}</i><br>
							<span class="${namespanclass}">+1 Follower</span>
						</div>
					</div>
            </div>
            <div class="ItemCell ItemInfo parent-flex hide-mobile">
                <div class="child-flex-vertical">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span><br />
                    <span class="${lpccomplete} item-name">+1 LpC</span><br />
				</div>
            </div>
            <div class="ItemCell ItemHave float-right">
                <div class="parent-flex">
                <div class="child-flex-vertical item-number">
					<span class="${levelspanclass}">Followers: </span><span id="${levelspanid}">0</span><br />
				</div>
                </div>
            </div>
            </div>
            <div class="ItemTable ItemRow hide-pc">
            <div class="ItemCell ItemInfoMobile parent-flex">
                <div class="child-flex">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span><br />
                    <span class="${lpccomplete} item-name item-name-mobile">+1 LpC</span><br />
				</div>
            </div>
            </div>
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemDesc parent-flex">
                <div class="child-flex">
                    <span class="${descspanclass}">description</span>
				</div>
            </div>
            </div>
        </div>
        </div>
        <br>
        `;
        updateElementDisplay(document.querySelectorAll("#"+costspanid),eval(costspanid),true);
        updateElementDisplay(document.getElementById(levelspanid),lpc,false);
    } else {
        document.querySelector("#SpecialUpgrades").innerHTML += `
            <div id="${divname}" class="shopitem ${destroyclass}">
            <div class="ItemDiv" id="${shopitemid}">
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemBuy">
                    <div class="BuyButton pointer" onClick="${itemaction}">
						<div class="BuyButtonContent">
							<i class="material-icons shop-add-icon">${iconname}</i><br>
							<span class="${namespanclass}">+1 Follower</span>
						</div>
					</div>
            </div>
            <div class="ItemCell ItemInfo parent-flex hide-mobile">
                <div class="child-flex-vertical">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span><br />
                    <span class="${lpccomplete} item-name">+1 LpC</span><br />
				</div>
            </div>
            <div class="ItemCell ItemHave float-right">
                <div class="parent-flex">
                <div class="child-flex-vertical item-number only-once-string">
				</div>
                </div>
            </div>
            </div>
            <div class="ItemTable ItemRow hide-pc">
            <div class="ItemCell ItemInfoMobile parent-flex">
                <div class="child-flex">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span><br />
                    <span class="${lpccomplete} item-name item-name-mobile">+1 LpC</span><br />
				</div>
            </div>
            </div>
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemDesc parent-flex">
                <div class="child-flex">
                    <span class="${descspanclass}">description</span>
				</div>
            </div>
            </div>
        </div>
        </div>
        <br class="${destroyclass}">
        `;
        uniqueUpgradesAvailable++;
        updateElementDisplay(document.querySelectorAll("#"+costspanid),eval(costspanid),true);
        updateLang(lang);
    }
}

createSpecialShopItem("click");

//special upgrades count
window.setInterval(function(){
    if (uniqueUpgradesAvailable == 0) {
        document.querySelectorAll(".newupgradeicon").forEach(el => {
            el.classList.add("hide");
        });
    } else {
        document.querySelectorAll(".newupgradeicon").forEach(el => {
            el.classList.remove("hide");
        });
        if (uniqueUpgradesAvailable == 1) {
            document.querySelectorAll(".newupgradeicon").forEach(el => {
                el.innerHTML = "!";
            });
        } else {
            document.querySelectorAll(".newupgradeicon").forEach(el => {
                el.innerHTML = uniqueUpgradesAvailable;
            });
        }
    }
}, 1000);

//destroy special upgrade
function destroySpecialShopItem(item_destroyclass) {
    document.querySelectorAll("."+item_destroyclass).forEach(el => {
        el.style.display = "none";
    });
    uniqueUpgradesAvailable--;
}

//createSpecialShopItem("doubleFollowers");
//destroySpecialShopItem("destroy-double-followers");

//create options
function createConfigOptions() {
    var option_items_get = JSON.parse(option_items);
    var itemName = Object.keys(option_items_get);

    for( var i=0; i<itemName.length; i++ ){
        let type = option_items_get[itemName[i]].type;
        let textclass = option_items_get[itemName[i]].textclass;
        let action = option_items_get[itemName[i]].action;
        let icon = option_items_get[itemName[i]].icon;
        let checkname = option_items_get[itemName[i]].checkname;
        let checkid = option_items_get[itemName[i]].checkid;
        if (type == "category_name") {
            document.querySelector("#ConfigPage").innerHTML += `
            <div class="config-category">
                <b class="category-text ${textclass}">Categoria</b>
            </div>
            <hr class="config-hr">
            `;
        }
        if (type == "option_simple") {
            document.querySelector("#ConfigPage").innerHTML += `
            <div class="config-option pointer" onclick="${action}">
				<i class="fontelloicons ${icon}"></i>
				<span class="${textclass}">Texto</span>
			</div>
            `;
        }
        if (type == "option_modal") {
            document.querySelector("#ConfigPage").innerHTML += `
            <div class="config-option pointer" data-bs-toggle="modal" data-bs-target="${action}">
				<i class="fontelloicons ${icon}"></i>
				<span class="${textclass}">Texto</span>
			</div>
            `;
        }
        if (type == "option_check") {
            document.querySelector("#ConfigPage").innerHTML += `
            <label class="config-option option-check-label pointer" for="${checkid}">
                <i class="fontelloicons ${icon}"></i>
                <span class="${textclass}">Texto</span>
                <input class="check-input" onchange="${action}" type="checkbox" name="${checkname}" id="${checkid}">
                <span class="check-input-visual check-input-visual-option float-right"></span>
            </label>
            `;
        }
    }
}

createConfigOptions();

//openToast function
function openToast(selToast) {
    let toastElement = document.getElementById(selToast);
    bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

//openModal function
function openModal(selModal) {
    let modalElement = document.getElementById(selModal);
    bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

//egg
var unknvar = 0;
var unknurl = "assets/easteregg/index.html";

function unknfunc(){
	if (unknvar < 4){
		unknvar++;
        console.log(unknvar);
	} else {
        unknvar = 0;
        console.log(unknvar);
        openModal('minigameModal');
        resetunkdlg();
	}
}

function resetunkdlg(){
	document.getElementById('minigameiframe').src = unknurl + "?dark=" + darkenabled;
}

//dark theme
function clickDarkTheme() {
    if (document.getElementById('darkCheck').checked) {
        darkenabled = true;
        document.documentElement.style.setProperty('--main-bg', '#333333');
        document.documentElement.style.setProperty('--border-color', 'white');
        document.documentElement.style.setProperty('--text-color', 'white');
        document.documentElement.style.setProperty('--option-hover', '#575757');
        document.documentElement.style.setProperty('--focus-shadow', 'rgba(255, 255, 255, .8)');
        document.documentElement.style.setProperty('--close-filter', 'invert(1)');
    } else {
        darkenabled = false;
        document.documentElement.style.setProperty('--main-bg', 'white');
        document.documentElement.style.setProperty('--border-color', 'black');
        document.documentElement.style.setProperty('--text-color', 'black');
        document.documentElement.style.setProperty('--option-hover', 'rgba(0,0,0,.1)');
        document.documentElement.style.setProperty('--focus-shadow', 'rgba(255, 255, 255, .8)');
        document.documentElement.style.setProperty('--close-filter', 'none');
    }
    
}

//buy common item
function buyCommon(item,itemName,itemNextCost,itemNextCostName,itemBaseCost,itemPurchased,itemDoubleCreateID) {
    if(likes >= itemNextCost) {
        likes -= itemNextCost;
        eval(itemName+"+=1");
        updateLPSValue();
        updateElementDisplay(document.getElementById("lpc"),lpc,false);
        updateElementDisplay(document.getElementById("lpcshop"),lpc,false);
        updateElementDisplay(document.getElementById(itemName),item+1,false);
        updateNextCost(item,itemName,itemBaseCost,itemNextCostName,false);
        updateElementDisplay(document.getElementById("likestxt"),likes,false);
        updateElementDisplay(document.getElementById("LabelLikes"),likes,false);
        if (itemName !== "lpc") checkDoubleCondition(item+1,itemPurchased,itemDoubleCreateID);
    } else {
        openToast("NotEnoughLikesToast");
    }
}

//update item cost
function updateNextCost(item,itemName,itemBaseCost,itemNextCostName) {
    let scale_value = 1.15;
    if (itemName == "lpc") scale_value = 1.175;
    eval(itemNextCostName+"="+Math.floor(itemBaseCost * Math.pow(1.15,(item+1))));
    updateElementDisplay(document.querySelectorAll("#"+itemNextCostName),Math.floor(itemBaseCost * Math.pow(scale_value,(item+1))),true);
}

//buy special item
function buySpecial(itemDoubleCost,itemDestroyClass,itemPurchasedName,targetLPS,targetLPSID) {
    if(likes >= itemDoubleCost) {
        likes -= itemDoubleCost;
        eval(itemPurchasedName+"=2");
        updateLPSValue();
        updateElementDisplay(document.querySelectorAll("#"+targetLPSID),targetLPS*2,true);
        destroySpecialShopItem(itemDestroyClass);
        updateElementDisplay(document.getElementById("likestxt"),likes,false);
        updateElementDisplay(document.getElementById("LabelLikes"),likes,false);
    } else {
        openToast("NotEnoughLikesToast");
    }
}

//check double condition
function checkDoubleCondition(target,condition,create_key) {
    if (target >= 10 && condition == 1) {
        createSpecialShopItem(create_key);
    }
}

//save and load section
function saveValue(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function saveGame() {
    //likes
    saveValue("likes",likes);
    saveValue("lpc",lpc);
    //options
    saveValue("lang",lang);
    saveValue("darkenabled",darkenabled);
    saveValue("autosaveenabled",autosaveenabled);
    //followers
    saveValue("followers",followers);
    saveValue("followersDoublePurchased",followersDoublePurchased);
    //fans
    saveValue("fans",fans);
    saveValue("fansDoublePurchased",fansDoublePurchased);
    //paparazzi
    saveValue("paparazzi",paparazzi);
    saveValue("paparazziDoublePurchased",paparazziDoublePurchased);
    //stalkers
    saveValue("stalkers",stalkers);
    saveValue("stalkersDoublePurchased",stalkersDoublePurchased);
    //lunatics
    saveValue("lunatics",lunatics);
    saveValue("lunaticsDoublePurchased",lunaticsDoublePurchased);
    //bots
    saveValue("bots",bots);
    saveValue("botsDoublePurchased",botsDoublePurchased);
    openToast("GameSavedToast");
}

function loadValue(key) {
    return JSON.parse(localStorage.getItem(key));
}

function loadGame() {
    //likes
    if (loadValue("likes") !== null) {
        likes = loadValue("likes");
        updateElementDisplay(document.getElementById("likestxt"),likes,false);
        updateElementDisplay(document.getElementById("LabelLikes"),likes,false);
    } else {
        saveValue("likes",likes);
        updateElementDisplay(document.getElementById("likestxt"),likes,false);
        updateElementDisplay(document.getElementById("LabelLikes"),likes,false);
    }
    if (loadValue("lpc") !== null) {
        lpc = loadValue("lpc");
        updateElementDisplay(document.getElementById("lpcshop"),lpc,false);
        updateElementDisplay(document.getElementById("lpc"),lpc,false);
        lpcNextCost = Math.floor(lpcBaseCost * Math.pow(1.175,(lpc)),false);
        updateElementDisplay(document.querySelectorAll("#lpcNextCost"),lpcNextCost,true);
    } else {
        saveValue("lpc",lpc);
        updateElementDisplay(document.getElementById("lpcshop"),lpc,false);
        updateElementDisplay(document.getElementById("lpc"),lpc,false);
    }
    //options
    if (loadValue("lang") !== null) {
        lang = loadValue("lang");
        updateLang(lang);
    } else {
        saveValue("lang",lang);
        updateLang(lang);
    }
    if (loadValue("darkenabled") !== null) {
        darkenabled = loadValue("darkenabled");
        if (darkenabled == true) {
            document.getElementById('darkCheck').click();
        }
    } else {
        saveValue("darkenabled",darkenabled);
    }
    if (loadValue("autosaveenabled") !== null) {
        autosaveenabled = loadValue("autosaveenabled");
        if (autosaveenabled == true) {
            document.getElementById('autoSaveCheck').click();
            autosaveenabled = true;
        }
    } else {
        saveValue("autosaveenabled",autosaveenabled);
        document.getElementById('autoSaveCheck').click();
        autosaveenabled = true;
    }
    //followers
    if (loadValue("followers") !== null) {
        followers = loadValue("followers");
        updateElementDisplay(document.getElementById("followers"),followers,false);
        followersNextCost = Math.floor(followersBaseCost * Math.pow(1.15,(followers)));
        updateElementDisplay(document.querySelectorAll("#followersNextCost"),followersNextCost,true);
    } else {
        saveValue("followers",followers);
        updateElementDisplay(document.getElementById("followers"),followers,false);
    }
    if (loadValue("followersDoublePurchased") !== null) {
        followersDoublePurchased = loadValue("followersDoublePurchased");
        updateElementDisplay(document.querySelectorAll("#followersLPS"),followersLPS*followersDoublePurchased),true;
        if (followersDoublePurchased == 1){
            checkDoubleCondition(followers,followersDoublePurchased,"doubleFollowers");
        }
    } else {
        saveValue("followersDoublePurchased",followersDoublePurchased);
        checkDoubleCondition(followers,followersDoublePurchased,"doubleFollowers");
    }
    //fans
    if (loadValue("fans") !== null) {
        fans = loadValue("fans");
        updateElementDisplay(document.getElementById("fans"),fans,false);
        fansNextCost = Math.floor(fansBaseCost * Math.pow(1.15,(fans)));
        updateElementDisplay(document.querySelectorAll("#fansNextCost"),fansNextCost,true);
    } else {
        saveValue("fans",fans);
        updateElementDisplay(document.getElementById("fans"),fans,false);
    }
    if (loadValue("fansDoublePurchased") !== null) {
        fansDoublePurchased = loadValue("fansDoublePurchased");
        updateElementDisplay(document.querySelectorAll("#fansLPS"),fansLPS*fansDoublePurchased,true);
        if (fansDoublePurchased == 1){
            checkDoubleCondition(fans,fansDoublePurchased,"doubleFans");
        }
    } else {
        saveValue("fansDoublePurchased",fansDoublePurchased);
        checkDoubleCondition(fans,fansDoublePurchased,"doubleFans");
    }
    //paparazzi
    if (loadValue("paparazzi") !== null) {
        paparazzi = loadValue("paparazzi");
        updateElementDisplay(document.getElementById("paparazzi"),paparazzi,false);
        paparazziNextCost = Math.floor(paparazziBaseCost * Math.pow(1.15,(paparazzi)));
        updateElementDisplay(document.querySelectorAll("#paparazziNextCost"),paparazziNextCost,true);
    } else {
        saveValue("paparazzi",paparazzi);
        updateElementDisplay(document.getElementById("paparazzi"),paparazzi,false);
    }
    if (loadValue("paparazziDoublePurchased") !== null) {
        paparazziDoublePurchased = loadValue("paparazziDoublePurchased");
        updateElementDisplay(document.querySelectorAll("#paparazziLPS"),paparazziLPS*paparazziDoublePurchased,true);
        if (paparazziDoublePurchased == 1){
            checkDoubleCondition(paparazzi,paparazziDoublePurchased,"doublePaparazzi");
        }
    } else {
        saveValue("paparazziDoublePurchased",paparazziDoublePurchased);
        checkDoubleCondition(paparazzi,paparazziDoublePurchased,"doublePaparazzi");
    }
    //stalkers
    if (loadValue("stalkers") !== null) {
        stalkers = loadValue("stalkers");
        updateElementDisplay(document.getElementById("stalkers"),stalkers,false);
        stalkersNextCost = Math.floor(stalkersBaseCost * Math.pow(1.15,(stalkers)));
        updateElementDisplay(document.querySelectorAll("#stalkersNextCost"),stalkersNextCost,true);
    } else {
        saveValue("stalkers",stalkers);
        updateElementDisplay(document.getElementById("stalkers"),stalkers,false);
    }
    if (loadValue("stalkersDoublePurchased") !== null) {
        stalkersDoublePurchased = loadValue("stalkersDoublePurchased");
        updateElementDisplay(document.querySelectorAll("#stalkersLPS"),stalkersLPS*stalkersDoublePurchased,true);
        if (stalkersDoublePurchased == 1){
            checkDoubleCondition(stalkers,stalkersDoublePurchased,"doubleStalkers");
        }
    } else {
        saveValue("stalkersDoublePurchased",stalkersDoublePurchased);
        checkDoubleCondition(stalkers,stalkersDoublePurchased,"doubleStalkers");
    }
    //lunatics
    if (loadValue("lunatics") !== null) {
        lunatics = loadValue("lunatics");
        updateElementDisplay(document.getElementById("lunatics"),lunatics,false);
        lunaticsNextCost = Math.floor(lunaticsBaseCost * Math.pow(1.15,(lunatics)));
        updateElementDisplay(document.querySelectorAll("#lunaticsNextCost"),lunaticsNextCost,true);
    } else {
        saveValue("lunatics",lunatics);
        updateElementDisplay(document.getElementById("lunatics"),lunatics,false);
    }
    if (loadValue("lunaticsDoublePurchased") !== null) {
        lunaticsDoublePurchased = loadValue("lunaticsDoublePurchased");
        updateElementDisplay(document.querySelectorAll("#lunaticsLPS"),lunaticsLPS*lunaticsDoublePurchased,true);
        if (lunaticsDoublePurchased == 1){
            checkDoubleCondition(lunatics,lunaticsDoublePurchased,"doubleLunatics");
        }
    } else {
        saveValue("lunaticsDoublePurchased",lunaticsDoublePurchased);
        checkDoubleCondition(lunatics,lunaticsDoublePurchased,"doubleLunatics");
    }
    //bots
    if (loadValue("bots") !== null) {
        bots = loadValue("bots");
        updateElementDisplay(document.getElementById("bots"),bots,false);
        botsNextCost = Math.floor(botsBaseCost * Math.pow(1.15,(bots)));
        updateElementDisplay(document.querySelectorAll("#botsNextCost"),botsNextCost,true);
    } else {
        saveValue("bots",bots);
        updateElementDisplay(document.getElementById("bots"),bots,false);
    }
    if (loadValue("botsDoublePurchased") !== null) {
        botsDoublePurchased = loadValue("botsDoublePurchased");
        updateElementDisplay(document.querySelectorAll("#botsLPS"),botsLPS*botsDoublePurchased,true);
        if (botsDoublePurchased == 1){
            checkDoubleCondition(bots,botsDoublePurchased,"doubleBots");
        }
    } else {
        saveValue("botsDoublePurchased",botsDoublePurchased);
        checkDoubleCondition(bots,botsDoublePurchased,"doubleBots");
    }
    updateLPSValue();
}

//erase all game data
function resetGame() {
    localStorage.clear();
    location.reload();
}

//manage auto save
function enableDisableAutoSave() {
    if (!autosaveenabled) {
        autosaveenabled = true;
        return
    }
    if (autosaveenabled) {
        autosaveenabled = false;
    }
}

window.setInterval(function(){
    if (autosaveenabled) {
        saveGame();
    }
}, 60000);

window.setTimeout(function(){
	loadGame();
}, 30);