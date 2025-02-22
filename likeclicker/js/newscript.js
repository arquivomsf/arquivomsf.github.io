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
    if (activetab == "likes") {
        document.querySelector("#LikeSection").style.zIndex = -1;
        document.querySelector("#LikeSection").style.opacity = 1;
        document.querySelector("#LikeSection").classList.remove("pointer-events");
        document.querySelector(".likestab").classList.add("active");
    } else {
        document.querySelector("#LikeSection").style.zIndex = 0;
        document.querySelector("#LikeSection").style.opacity = 0;
        document.querySelector("#LikeSection").classList.add("pointer-events");
        document.querySelector(".likestab").classList.remove("active");
    }
    if (activetab == "shop") {
        document.querySelector("#ShopSection").style.zIndex = -1;
        document.querySelector("#ShopSection").style.opacity = 1;
        document.querySelector("#ShopSection").classList.remove("pointer-events");
        document.querySelector(".shoptab").classList.add("active");
        document.querySelector(".allshoptabs").style.zIndex = -1;
        document.querySelector(".allshoptabs").style.opacity = 1;
        document.querySelector(".allshoptabs").classList.remove("pointer-events");
    } else {
        document.querySelector("#ShopSection").style.zIndex = 0;
        document.querySelector("#ShopSection").style.opacity = 0;
        document.querySelector("#ShopSection").classList.add("pointer-events");
        document.querySelector(".shoptab").classList.remove("active");
        document.querySelector(".allshoptabs").style.zIndex = 0;
        document.querySelector(".allshoptabs").style.opacity = 0;
        document.querySelector(".allshoptabs").classList.add("pointer-events");
    }
    if (activetab == "config") {
        document.querySelector("#ConfigSection").style.zIndex = -1;
        document.querySelector("#ConfigSection").style.opacity = 1;
        document.querySelector("#ConfigSection").classList.remove("pointer-events");
        document.querySelector(".configtab").classList.add("active");
    } else {
        document.querySelector("#ConfigSection").style.zIndex = 0;
        document.querySelector("#ConfigSection").style.opacity = 0;
        document.querySelector("#ConfigSection").classList.add("pointer-events");
        document.querySelector(".configtab").classList.remove("active");
    }
}

//change shop tab
function changeShopTab(selTab) {
    activeshoptab = selTab;
    if (activeshoptab == "common") {
        document.querySelector("#CommonUpgrades").style.zIndex = -1;
        document.querySelector("#CommonUpgrades").style.opacity = 1;
        document.querySelector("#CommonUpgrades").classList.remove("pointer-events");
        document.querySelector(".commontab").classList.add("active");
    } else {
        document.querySelector("#CommonUpgrades").style.zIndex = 0;
        document.querySelector("#CommonUpgrades").style.opacity = 0;
        document.querySelector("#CommonUpgrades").classList.add("pointer-events");
        document.querySelector(".commontab").classList.remove("active");
    }
    if (activeshoptab == "special") {
        document.querySelector("#SpecialUpgrades").style.zIndex = -1;
        document.querySelector("#SpecialUpgrades").style.opacity = 1;
        document.querySelector("#SpecialUpgrades").classList.remove("pointer-events");
        document.querySelector(".specialtab").classList.add("active");
    } else {
        document.querySelector("#SpecialUpgrades").style.zIndex = 0;
        document.querySelector("#SpecialUpgrades").style.opacity = 0;
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
        document.querySelector("#CommonUpgrades").innerHTML += `
            <div id="${divname}">
					<center>
					<div class="${shopitemclass}" id="${shopitemid}" class="rounded">
						<table class="ItemTable">
							<td class="ItemCell">
								<div class="${divclass} float-right BuyButton" onClick="${itemaction}" title="">
									<center>
										<i class="material-icons ${iconclass}" id="like-icon" style="font-size: 50px; color: black; display: inline-flex; vertical-align: middle;">${iconname}</i><br>
										<span class="${spanclass}" style="padding-left: 5px; padding-right: 5px;">+1 Follower</span>
									</center>
								</div>
							</td>
							<td class="ItemCell">
								<div class="ItemInfo">
									<span class="${namespanclass}">Followers: </span><span id="${namespanid}">0</span><br />
									<span class="${lpsspanclass}">LPS: </span><span id="${lpsspanid}">1</span><br />
									<span class="${costspanclass}">Cost: </span><span id="${costspanid}">10</span>
								</div>
							</td>
						</table>
					</div>
					</center>
					<br>
				</div>
        `;
          }
}

createShopItems();