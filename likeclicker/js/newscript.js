var activetab;
var activeshoptab;

function likeClickEffect() {
    document.querySelector("#LikeBtnDiv").style.animation = "likeclicked 0.3s linear 1";
    setTimeout(()=>{
        document.querySelector("#LikeBtnDiv").style.animation = "none";
    },30);
}

function likeClick(lpc) {
    lpc = 0;
}

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

changeTab("likes");
changeShopTab("common");