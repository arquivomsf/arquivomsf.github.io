var lang = "pt";
//var nf = new Intl.NumberFormat(lang, {style:'decimal'});
var gameVersion = "2.0.0";

//MISC
var yesString;
var noString;

//LIKES
var likeCountString1;
var likeCountString2;
var lpsCountString;
var lpcCountString;

//ALERTS
var enoughLikes;
var gameSaved;

//UPGRADES
var costString;
var shopLpsString1;
var shopLpsString2;
var upgradeString;
var onlyOnceString;
var lpcLevel;
var lpcCompleteString;
var descLpc;

//FOLLOWER
var plusFollower;
var followersName;
var descFollower;
var doubleFollowers;
var doubleFollowersName;
var descDoubleFollowers;

//FAN
var plusFan;
var fansName;
var descFan;
var doubleFans;
var doubleFansName;
var descDoubleFans;

//PAPARAZZI
var plusPaparazzo;
var paparazziName;
var descPaparazzo;
var doublePaparazzi;
var doublePaparazziName;
var descDoublePaparazzi;

//STALKER
var plusStalker;
var stalkersName;
var descStalker;
var doubleStalkers;
var doubleStalkersName;
var descDoubleStalkers;

//LUNATICS
var plusLunatic;
var lunaticsName;
var descLunatic;
var doubleLunatics;
var doubleLunaticsName;
var descDoubleLunatics;

//BOTS
var plusBot;
var botsName;
var descBot;
var doubleBots;
var doubleBotsName;
var descDoubleBots;

//TABS
var tabUpgrades;
var tabLikes;
var tabConfig;
var tabShopCommon;
var tabShopSpecial;

//CONFIG-CATEGORY
var saveLoadCategory;
var darkThemeCategory;
var langCategory;
var resetGameCategory;
var aboutCategory;

//CONFIG-OPTIONS
var saveGameLabel;
var loadGameLabel;
var autoSaveLabel;
var darkThemeLabel;
var changeLangLabel;
var resetGameLabel;
var gameVersionLabel;
var creditsLabel;

//CONFIG-DIALOG
var resetDialogHeader;
var resetDialogString;
var eggDialogHeader;
var eggDialogRestartString;
var eggDialogSourceString1;
var eggDialogSourceString2;
var eggDialogSourceStringSky;
var eggDialogSourceStringShip;
var creditsDialogHeader;
var creditsDialogString;
var langDialogHeader;
var langDialogStringEn;
var langDialogStringPt;

//EASTEREGG
var restartMinigameString;
var minigameSourceString1;
var minigameSourceString2;
var minigameSourceSky;
var minigameSourceShip;

function updateLang(selLang) {
    lang = selLang;
    //nf = new Intl.NumberFormat(lang, {style:'decimal'});
    fetch(`js/data/lang/strings-${selLang}.json`)
    .then(response => response.json())
    .then(data => {
        //MISC
        yesString = data.misc[0].yesString;
        updateElementDisplay(document.querySelectorAll(".btn-yes"),yesString,true);
        noString = data.misc[0].noString;
        updateElementDisplay(document.querySelectorAll(".btn-no"),noString,true);

        //LIKES
        likeCountString1 = data.likes[0].likeCountString1;
        updateElementDisplay(document.querySelector(".like-string-one"),likeCountString1,false);
        likeCountString2 = data.likes[0].likeCountString2;
        updateElementDisplay(document.querySelector(".like-string-two"),likeCountString2,false);
        lpsCountString = data.likes[0].lpsCountString;
        updateElementDisplay(document.querySelector(".lps-home-string"),lpsCountString,false);
        lpcCountString = data.likes[0].lpcCountString;
        updateElementDisplay(document.querySelector(".lpc-home-string"),lpcCountString,false);

        //ALERTS
        enoughLikes = data.alerts[0].enoughLikes;
        updateElementDisplay(document.querySelector(".enough-likes"),enoughLikes,false);
        gameSaved = data.alerts[0].gameSaved;
        updateElementDisplay(document.querySelector(".game-saved"),gameSaved,false);

        //UPGRADES
        costString = data.upgrades[0].costString;
        updateElementDisplay(document.querySelectorAll(".item-cost"),costString,true);
        shopLpsString1 = data.upgrades[0].shopLpsString1;
        updateElementDisplay(document.querySelectorAll(".item-lps1"),shopLpsString1,true);
        shopLpsString2 = data.upgrades[0].shopLpsString2;
        updateElementDisplay(document.querySelectorAll(".item-lps2"),shopLpsString2,true);
        upgradeString = data.upgrades[0].upgradeString;
        updateElementDisplay(document.querySelectorAll(".upgrade-string"),upgradeString,true);
        onlyOnceString = data.upgrades[0].onlyOnce;
        updateElementDisplay(document.querySelectorAll(".only-once-string"),onlyOnceString,true);
        lpcLevel = data.upgrade_items[0].lpc[0].lpcLevel;
        updateElementDisplay(document.querySelector(".level-lpc-string"),lpcLevel,false);
        lpcCompleteString = data.upgrade_items[0].lpc[0].lpcCompleteString;
        updateElementDisplay(document.querySelectorAll(".lpc-complete-string"),lpcCompleteString,true);
        descLpc = data.upgrade_items[0].lpc[0].descLpc;
        updateElementDisplay(document.querySelector(".desc-lpc-string"),descLpc,false);

        //FOLLOWERS
        followersName = data.upgrade_items[0].followers[0].followersName;
        updateElementDisplay(document.querySelector(".followers-name"),followersName,false);
        plusFollower = data.upgrade_items[0].followers[0].plusFollower;
        updateElementDisplay(document.querySelector(".plus-follower"),plusFollower,false);
        descFollower = data.upgrade_items[0].followers[0].descFollower;
        updateElementDisplay(document.querySelector(".desc-follower-string"),descFollower,false);
        if (document.querySelector(".double-followers-string") !== null) {
            doubleFollowers = data.upgrade_items[0].doubleFollowers[0].doubleFollowers;
            updateElementDisplay(document.querySelector(".double-followers-string"),doubleFollowers,false);
            doubleFollowersName = data.upgrade_items[0].doubleFollowers[0].doubleFollowersName;
            updateElementDisplay(document.querySelectorAll(".double-followers-name"),doubleFollowersName,true);
            descDoubleFollowers = data.upgrade_items[0].doubleFollowers[0].descDoubleFollowers;
            updateElementDisplay(document.querySelector(".desc-double-followers-string"),descDoubleFollowers,false);
        }

        //FANS
        fansName = data.upgrade_items[0].fans[0].fansName;
        updateElementDisplay(document.querySelector(".fans-name"),fansName,false);
        plusFan = data.upgrade_items[0].fans[0].plusFan;
        updateElementDisplay(document.querySelector(".plus-fan"),plusFan,false);
        descFan = data.upgrade_items[0].fans[0].descFan;
        updateElementDisplay(document.querySelector(".desc-fan-string"),descFan,false);
        if (document.querySelector(".double-fans-string") !== null) {
            doubleFans = data.upgrade_items[0].doubleFans[0].doubleFans;
            updateElementDisplay(document.querySelector(".double-fans-string"),doubleFans,false);
            doubleFansName = data.upgrade_items[0].doubleFans[0].doubleFansName;
            updateElementDisplay(document.querySelectorAll(".double-fans-name"),doubleFansName,true);
            descDoubleFans = data.upgrade_items[0].doubleFans[0].descDoubleFans;
            updateElementDisplay(document.querySelector(".desc-double-fans-string"),descDoubleFans,false);
        }

        //PAPARAZZI
        paparazziName = data.upgrade_items[0].paparazzi[0].paparazziName;
        updateElementDisplay(document.querySelector(".paparazzi-name"),paparazziName,false);
        plusPaparazzo = data.upgrade_items[0].paparazzi[0].plusPaparazzo;
        updateElementDisplay(document.querySelector(".plus-paparazzo"),plusPaparazzo,false);
        descPaparazzo = data.upgrade_items[0].paparazzi[0].descPaparazzo;
        updateElementDisplay(document.querySelector(".desc-paparazzo-string"),descPaparazzo,false);
        if (document.querySelector(".double-paparazzi-string") !== null) {
            doublePaparazzi = data.upgrade_items[0].doublePaparazzi[0].doublePaparazzi;
            updateElementDisplay(document.querySelector(".double-paparazzi-string"),doublePaparazzi,false);
            doublePaparazziName = data.upgrade_items[0].doublePaparazzi[0].doublePaparazziName;
            updateElementDisplay(document.querySelectorAll(".double-paparazzi-name"),doublePaparazziName,true);
            descDoublePaparazzi = data.upgrade_items[0].doublePaparazzi[0].descDoublePaparazzi;
            updateElementDisplay(document.querySelector(".desc-double-paparazzi-string"),descDoublePaparazzi,false);
        }

        //STALKERS
        stalkersName = data.upgrade_items[0].stalkers[0].stalkersName;
        updateElementDisplay(document.querySelector(".stalkers-name"),stalkersName,false);
        plusStalker = data.upgrade_items[0].stalkers[0].plusStalker;
        updateElementDisplay(document.querySelector(".plus-stalker"),plusStalker,false);
        descStalker = data.upgrade_items[0].stalkers[0].descStalker;
        updateElementDisplay(document.querySelector(".desc-stalker-string"),descStalker,false);
        if (document.querySelector(".double-stalkers-string") !== null) {
            doubleStalkers = data.upgrade_items[0].doubleStalkers[0].doubleStalkers;
            updateElementDisplay(document.querySelector(".double-stalkers-string"),doubleStalkers,false);
            doubleStalkersName = data.upgrade_items[0].doubleStalkers[0].doubleStalkersName;
            updateElementDisplay(document.querySelectorAll(".double-stalkers-name"),doubleStalkersName,true);
            descDoubleStalkers = data.upgrade_items[0].doubleStalkers[0].descDoubleStalkers;
            updateElementDisplay(document.querySelector(".desc-double-stalkers-string"),descDoubleStalkers,false);
        }

        //LUNATICS
        lunaticsName = data.upgrade_items[0].lunatics[0].lunaticsName;
        updateElementDisplay(document.querySelector(".lunatics-name"),lunaticsName,false);
        plusLunatic = data.upgrade_items[0].lunatics[0].plusLunatic;
        updateElementDisplay(document.querySelector(".plus-lunatic"),plusLunatic,false);
        descLunatic = data.upgrade_items[0].lunatics[0].descLunatic;
        updateElementDisplay(document.querySelector(".desc-lunatic-string"),descLunatic,false);
        if (document.querySelector(".double-lunatics-string") !== null) {
            doubleLunatics = data.upgrade_items[0].doubleLunatics[0].doubleLunatics;
            updateElementDisplay(document.querySelector(".double-lunatics-string"),doubleLunatics,false);
            doubleLunaticsName = data.upgrade_items[0].doubleLunatics[0].doubleLunaticsName;
            updateElementDisplay(document.querySelectorAll(".double-lunatics-name"),doubleLunaticsName,true);
            descDoubleLunatics = data.upgrade_items[0].doubleLunatics[0].descDoubleLunatics;
            updateElementDisplay(document.querySelector(".desc-double-lunatics-string"),descDoubleLunatics,false);
        }

        //BOTS
        botsName = data.upgrade_items[0].bots[0].botsName;
        updateElementDisplay(document.querySelector(".bots-name"),botsName,false);
        plusBot = data.upgrade_items[0].bots[0].plusBot;
        updateElementDisplay(document.querySelector(".plus-bot"),plusBot,false);
        descBot = data.upgrade_items[0].bots[0].descBot;
        updateElementDisplay(document.querySelector(".desc-bot-string"),descBot,false);
        if (document.querySelector(".double-bots-string") !== null) {
            doubleBots = data.upgrade_items[0].doubleBots[0].doubleBots;
            updateElementDisplay(document.querySelector(".double-bots-string"),doubleBots,false);
            doubleBotsName = data.upgrade_items[0].doubleBots[0].doubleBotsName;
            updateElementDisplay(document.querySelectorAll(".double-bots-name"),doubleBotsName,true);
            descDoubleBots = data.upgrade_items[0].doubleBots[0].descDoubleBots;
            updateElementDisplay(document.querySelector(".desc-double-bots-string"),descDoubleBots,false);
        }

        //TABS
        tabUpgrades = data.tabs[0].menu[0].tabUpgrades;
        updateElementDisplay(document.querySelector(".tab-upgrades"),tabUpgrades,false);
        tabLikes = data.tabs[0].menu[0].tabLikes;
        updateElementDisplay(document.querySelector(".tab-likes"),tabLikes,false);
        tabConfig = data.tabs[0].menu[0].tabConfig;
        updateElementDisplay(document.querySelector(".tab-config"),tabConfig,false);
        tabShopCommon = data.tabs[0].shop[0].tabShopCommon;
        updateElementDisplay(document.querySelector(".tab-common"),tabShopCommon,false);
        tabShopSpecial = data.tabs[0].shop[0].tabShopSpecial;
        updateElementDisplay(document.querySelector(".tab-special"),tabShopSpecial,false);

        //CONFIG-CATEGORY
        saveLoadCategory = data.config[0].saveLoadCategory;
        updateElementDisplay(document.querySelector(".save-load-category"),saveLoadCategory,false);
        darkThemeCategory = data.config[0].darkThemeCategory;
        updateElementDisplay(document.querySelector(".dark-theme-category"),darkThemeCategory,false);
        langCategory = data.config[0].langCategory;
        updateElementDisplay(document.querySelector(".lang-category"),langCategory,false);
        resetGameCategory = data.config[0].resetGameCategory;
        updateElementDisplay(document.querySelector(".reset-game-category"),resetGameCategory,false);
        aboutCategory = data.config[0].aboutCategory;
        updateElementDisplay(document.querySelector(".about-category"),aboutCategory,false);

        //CONFIG-OPTIONS
        saveGameLabel = data.config[0].saveGameLabel;
        updateElementDisplay(document.querySelector(".save-game-label"),saveGameLabel,false);
        loadGameLabel = data.config[0].loadGameLabel;
        updateElementDisplay(document.querySelector(".load-game-label"),loadGameLabel,false);
        autoSaveLabel = data.config[0].autoSaveLabel;
        updateElementDisplay(document.querySelector(".auto-save-label"),autoSaveLabel,false);
        darkThemeLabel = data.config[0].darkThemeLabel;
        updateElementDisplay(document.querySelector(".dark-theme-label"),darkThemeLabel,false);
        changeLangLabel = data.config[0].changeLangLabel;
        updateElementDisplay(document.querySelector(".change-lang-label"),changeLangLabel,false);
        resetGameLabel = data.config[0].resetGameLabel;
        updateElementDisplay(document.querySelector(".reset-game-label"),resetGameLabel,false);
        gameVersionLabel = data.config[0].gameVersionLabel;
        updateElementDisplay(document.querySelector(".game-version-label"),gameVersionLabel + gameVersion,false);
        creditsLabel = data.config[0].creditsLabel;
        updateElementDisplay(document.querySelector(".credits-label"),creditsLabel,false);

        //CONFIG-DIALOG
        resetDialogHeader = data.reset[0].resetDialogHeader;
        updateElementDisplay(document.querySelector(".reset-dialog-header"),resetDialogHeader,false);
        resetDialogString = data.reset[0].resetDialogString;
        updateElementDisplay(document.querySelector(".reset-dialog-string"),resetDialogString,false);
        eggDialogHeader = data.egg[0].eggDialogHeader;
        updateElementDisplay(document.querySelector(".egg-dialog-header"),eggDialogHeader,false);
        eggDialogRestartString = data.egg[0].eggDialogRestartString;
        updateElementDisplay(document.querySelector(".egg-dialog-restart-string"),eggDialogRestartString,false);
        eggDialogSourceString1 = data.egg[0].eggDialogSourceString1;
        updateElementDisplay(document.querySelector(".egg-dialog-source-string-one"),eggDialogSourceString1,false);
        eggDialogSourceString2 = data.egg[0].eggDialogSourceString2;
        updateElementDisplay(document.querySelector(".egg-dialog-source-string-two"),eggDialogSourceString2,false);
        eggDialogSourceStringSky = data.egg[0].eggDialogSourceStringSky;
        updateElementDisplay(document.querySelector(".egg-dialog-source-string-sky"),eggDialogSourceStringSky,false);
        eggDialogSourceStringShip = data.egg[0].eggDialogSourceStringShip;
        updateElementDisplay(document.querySelector(".egg-dialog-source-string-ship"),eggDialogSourceStringShip,false);
        creditsDialogHeader = data.credits[0].creditsDialogHeader;
        updateElementDisplay(document.querySelector(".credits-dialog-header"),creditsDialogHeader,false);
        creditsDialogString = data.credits[0].creditsDialogString;
        updateElementDisplay(document.querySelector(".credits-dialog-string"),creditsDialogString,false);
        langDialogHeader = data.lang[0].langDialogHeader;
        updateElementDisplay(document.querySelector(".lang-dialog-header"),langDialogHeader,false);
        langDialogStringEn = data.lang[0].langDialogStringEn;
        updateElementDisplay(document.querySelector(".lang-dialog-string-en"),langDialogStringEn,false);
        langDialogStringPt = data.lang[0].langDialogStringPt;
        updateElementDisplay(document.querySelector(".lang-dialog-string-pt"),langDialogStringPt,false);
    }
    );

    document.querySelector("input[value="+selLang+"]").checked = true;
}

updateLang(lang);