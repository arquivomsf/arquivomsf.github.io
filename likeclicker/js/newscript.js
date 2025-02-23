var activetab;
var activeshoptab;

//scale effect on click
function likeClickEffect() {
    document.querySelector("#LikeBtnDiv").style.animation = "likeclicked 0.3s linear 1";
    setTimeout(()=>{
        document.querySelector("#LikeBtnDiv").style.animation = "none";
    },30);
}

//click
function likeClick(lpc) {
    lpc = 0;
}

//change menu tab
function changeTab(selTab) {
    activetab = selTab;
    var x=window.scrollX;
    window.scrollTo(x, 0);
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
}

//change shop tab
function changeShopTab(selTab) {
    activeshoptab = selTab;
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
}

//default tabs
changeTab("likes");
changeShopTab("common");

function createShopItems() {
    var shop_items_get = JSON.parse(common_shop_items);
    var itemName = Object.keys(shop_items_get);

    for( var i=0; i<itemName.length; i++ ){
        let divname = shop_items_get[itemName[i]].divname;
        let shopitemclass = shop_items_get[itemName[i]].shopitemclass;
        let shopitemid = shop_items_get[itemName[i]].shopitemid;
        let divclass = shop_items_get[itemName[i]].divclass;
        let itemaction = shop_items_get[itemName[i]].itemaction;
        let iconclass = shop_items_get[itemName[i]].iconclass;
        let iconname = shop_items_get[itemName[i]].iconname;
        let spanclass = shop_items_get[itemName[i]].spanclass;
        let namespanclass = shop_items_get[itemName[i]].namespanclass;
        let namespanid = shop_items_get[itemName[i]].namespanid;
        let lpsspanclass = shop_items_get[itemName[i]].lpsspanclass;
        let lpsspanid = shop_items_get[itemName[i]].lpsspanid;
        let costspanclass = shop_items_get[itemName[i]].costspanclass;
        let costspanid = shop_items_get[itemName[i]].costspanid;
        let descspanclass = shop_items_get[itemName[i]].descspanclass;
        document.querySelector("#CommonUpgrades").innerHTML += `
            <div id="${divname}" class="shopitem">
            <div class="ItemDiv ${shopitemclass}" id="${shopitemid}">
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemBuy">
                    <div class="${divclass} BuyButton pointer" onClick="${itemaction}">
						<div class="BuyButtonContent">
							<i class="material-icons ${iconclass} shop-add-icon">${iconname}</i><br>
							<span class="${spanclass}">+1 Follower</span>
						</div>
					</div>
            </div>
            <div class="ItemCell ItemInfo parent-flex hide-mobile">
                <div class="child-flex-vertical">
                    <span class="${costspanclass} item-cost">Cost: </span><span id="${costspanid}">10</span><br />
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
                    <span class="${costspanclass} item-cost">Cost: </span><span id="${costspanid}">10</span>
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

function createSpecialShopItem(item) {
    var shop_items_get = JSON.parse(special_shop_items);

    let onlyonce = shop_items_get[item].onlyonce;
    let divname = shop_items_get[item].divname;
    let shopitemclass = shop_items_get[item].shopitemclass;
    let shopitemid = shop_items_get[item].shopitemid;
    let divclass = shop_items_get[item].divclass;
    let itemaction = shop_items_get[item].itemaction;
    let iconclass = shop_items_get[item].iconclass;
    let iconname = shop_items_get[item].iconname;
    let namespanclass = shop_items_get[item].namespanclass;
    let levelspanclass = shop_items_get[item].levelspanclass;
    let levelspanid = shop_items_get[item].levelspanid;
    let lpccomplete = shop_items_get[item].lpccomplete;
    let costspanclass = shop_items_get[item].costspanclass;
    let costspanid = shop_items_get[item].costspanid;
    let descspanclass = shop_items_get[item].descspanclass;

    if (onlyonce == "false") {
    document.querySelector("#SpecialUpgrades").innerHTML += `
            <div id="${divname}" class="shopitem">
            <div class="ItemDiv ${shopitemclass}" id="${shopitemid}">
            <div class="ItemTable ItemRow">
            <div class="ItemCell ItemBuy">
                    <div class="${divclass} BuyButton pointer" onClick="${itemaction}">
						<div class="BuyButtonContent">
							<i class="material-icons ${iconclass} shop-add-icon">${iconname}</i><br>
							<span class="${namespanclass}">+1 Follower</span>
						</div>
					</div>
            </div>
            <div class="ItemCell ItemInfo parent-flex hide-mobile">
                <div class="child-flex-vertical">
                    <span class="${costspanclass} item-cost">Cost: </span><span id="${costspanid}">10</span><br />
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
                    <span class="${costspanclass} item-cost">Cost: </span><span id="${costspanid}">10</span>
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
        //create "only once" upgrade
    }
}

createSpecialShopItem("click");

function createConfigOptions() {
    var option_items_get = JSON.parse(option_items);
    var itemName = Object.keys(option_items_get);

    for( var i=0; i<itemName.length; i++ ){
        let type = option_items_get[itemName[i]].type;
        let textclass = option_items_get[itemName[i]].textclass;
        let action = option_items_get[itemName[i]].action;
        let icon = option_items_get[itemName[i]].icon;
        let checkoffid = option_items_get[itemName[i]].checkoffid;
        let checkonid = option_items_get[itemName[i]].checkonid;
        if (type == "category_name") {
            document.querySelector("#ConfigPage").innerHTML += `
            <div class="config-category">
                <b class="${textclass}">Categoria</b>
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
            <div class="config-option pointer" onclick="${action}">
				<i class="fontelloicons ${icon}"></i>
				<span class="${textclass}">Texto</span>
                <i id="${checkoffid}" class="material-icons float-right checkbox hidden">check_box_outline_blank</i>
				<i id="${checkonid}" class="material-icons float-right checkbox">check_box</i>
			</div>
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