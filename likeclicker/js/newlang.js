var lang = "pt";

//MISC
var gameVersion = "2.0.0";
var yesString;
var noString;

//LIKES
var likeIconTitle;
var likeCountString1;
var likeCountString2;
var lpsCountString;
var lpcCountString;
var lpsCountTitle;
var lpcCountTitle;

//ALERTS
var enoughLikes;
var gameSaved;

//UPGRADES
var costString;
var upgradeString;
var warningString;
var useOnceString1;
var useOnceString2;
var doubleRewardString;

//FOLLOWER
var plusFollower;
var followersName;
var hypeFollowers;

//FAN
var plusFan;
var fansName;
var hypeFans;

//PAPARAZZI
var plusPaparazzo;
var paparazziName;
var hypePaparazzi;

//STALKER
var plusStalker;
var stalkersName;
var hypeStalkers;

//LUNATICS
var plusLunatic;
var lunaticsName;
var hypeLunatics;

//BOTS
var plusBot;
var botsName;
var botPlan;
var botPlan2;

//LPC
var plusLPC;
var lpcLevel;
var lpcCompleteString;

//TABS
var tabUpgrades;
var tabLikes;
var tabConfig;
var tabShopCommon;
var tabShopSpecial;

//CREDITS
var creditsTitle;
var creditsString;

//CONFIG
var saveAndLoad;
var saveGameString;
var loadGameString;
var autoSaveString;
var saveGameTitle;
var loadGameTitle;
var autoSaveTitle;
var darkThemeCategory;
var darkThemeOption;
var darkThemeTitle;
var resetGameString;
var resetGameTitle;
var resetDialogString;
var eraseDataString;
var aboutCategory;
var gameVersionString;
var creditsOptionTitle;

//EASTEREGG
var restartMinigameString;
var minigameSourceString1;
var minigameSourceString2;
var minigameSourceSky;
var minigameSourceShip;

//LANGUAGE
var languageString;
var englishString;
var portugueseString;
var languageOptionTitle;

function updateLang(selLang) {
    fetch(`js/data/lang/strings-${selLang}.json`)
    .then(response => response.json())
    .then(data => {
        //MISC
        yesString = data.misc[0].yesString;
        noString = data.misc[0].noString;

        //FOLLOWER
        followersName = data.upgrade_items[0].followers[0].followersName;
        document.querySelector(".followers-name").innerHTML = followersName;
        plusFollower = data.upgrade_items[0].followers[0].plusFollower;
        document.querySelector(".plus-follower").innerHTML = plusFollower;

        //FAN
        fansName = data.upgrade_items[0].fans[0].fansName;
        document.querySelector(".fans-name").innerHTML = fansName;
        plusFan = data.upgrade_items[0].fans[0].plusFan;
        document.querySelector(".plus-fan").innerHTML = plusFan;

        //TABS
        tabUpgrades = data.tabs[0].menu[0].tabUpgrades;
        document.querySelector(".tab-upgrades").innerHTML = tabUpgrades;
        tabLikes = data.tabs[0].menu[0].tabLikes;
        document.querySelector(".tab-likes").innerHTML = tabLikes;
        tabConfig = data.tabs[0].menu[0].tabConfig;
        document.querySelector(".tab-config").innerHTML = tabConfig;
        tabShopCommon = data.tabs[0].shop[0].tabShopCommon;
        document.querySelector(".tab-common").innerHTML = tabShopCommon;
        tabShopSpecial = data.tabs[0].shop[0].tabShopSpecial;
        document.querySelector(".tab-special").innerHTML = tabShopSpecial;
    }
    );
}