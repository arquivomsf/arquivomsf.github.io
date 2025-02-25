var activetab, activeshoptab, darkenabled;
var uniqueUpgradesAvailable = 0;

//click
function likeClick(lpc) {
    lpc = 0;
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
                <div class="child-flex-vertical">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span>
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
                <div class="child-flex-vertical">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span>
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
                <div class="child-flex-vertical">
                    <span class="item-cost">Cost: </span><span id="${costspanid}">10</span>
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
        darkenabled = 1;
        document.documentElement.style.setProperty('--main-bg', '#333333');
        document.documentElement.style.setProperty('--border-color', 'white');
        document.documentElement.style.setProperty('--text-color', 'white');
        document.documentElement.style.setProperty('--option-hover', '#575757');
        document.documentElement.style.setProperty('--focus-shadow', 'rgba(255, 255, 255, .8)');
        document.documentElement.style.setProperty('--close-filter', 'invert(1)');
    } else {
        darkenabled = 0;
        document.documentElement.style.setProperty('--main-bg', 'white');
        document.documentElement.style.setProperty('--border-color', 'black');
        document.documentElement.style.setProperty('--text-color', 'black');
        document.documentElement.style.setProperty('--option-hover', 'rgba(0,0,0,.1)');
        document.documentElement.style.setProperty('--focus-shadow', 'rgba(255, 255, 255, .8)');
        document.documentElement.style.setProperty('--close-filter', 'none');
    }
    
}

//document.getElementById('darkCheck').click();