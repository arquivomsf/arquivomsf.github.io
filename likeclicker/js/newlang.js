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
var shopLpsString1;
var shopLpsString2;
var upgradeString;
var warningString;
var useOnceString1;
var useOnceString2;
var doubleRewardString;
var plusLPC;
var lpcLevel;
var lpcCompleteString;
var descLpc;

//FOLLOWER
var plusFollower;
var followersName;
var hypeFollowers;
var descFollower;

//FAN
var plusFan;
var fansName;
var hypeFans;
var descFan;

//PAPARAZZI
var plusPaparazzo;
var paparazziName;
var hypePaparazzi;
var descPaparazzo;

//STALKER
var plusStalker;
var stalkersName;
var hypeStalkers;
var descStalker;

//LUNATICS
var plusLunatic;
var lunaticsName;
var hypeLunatics;
var descLunatic;

//BOTS
var plusBot;
var botsName;
var botPlan;
var botPlan2;
var descBot;

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
    fetch(`js/data/lang/strings-${selLang}.json`)
    .then(response => response.json())
    .then(data => {
        //MISC
        yesString = data.misc[0].yesString;
        document.querySelectorAll(".btn-yes").forEach(el => {
            el.innerHTML = yesString;
        });
        noString = data.misc[0].noString;
        document.querySelectorAll(".btn-no").forEach(el => {
            el.innerHTML = noString;
        });

        //LIKES
        likeCountString1 = data.likes[0].likeCountString1;
        document.querySelector(".like-string-one").innerHTML = likeCountString1;
        likeCountString2 = data.likes[0].likeCountString2;
        document.querySelector(".like-string-two").innerHTML = likeCountString2;
        lpsCountString = data.likes[0].lpsCountString;
        document.querySelector(".lps-home-string").innerHTML = lpsCountString;
        lpcCountString = data.likes[0].lpcCountString;
        document.querySelector(".lpc-home-string").innerHTML = lpcCountString;

        //ALERTS
        enoughLikes = data.alerts[0].enoughLikes;
        document.querySelector(".enough-likes").innerHTML = enoughLikes;
        gameSaved = data.alerts[0].gameSaved;
        document.querySelector(".game-saved").innerHTML = gameSaved;

        //UPGRADES
        costString = data.upgrades[0].costString;
        document.querySelectorAll(".item-cost").forEach(el => {
            el.innerHTML = costString;
        });
        shopLpsString1 = data.upgrades[0].shopLpsString1;
        document.querySelectorAll(".item-lps1").forEach(el => {
            el.innerHTML = shopLpsString1;
        });
        shopLpsString2 = data.upgrades[0].shopLpsString2;
        document.querySelectorAll(".item-lps2").forEach(el => {
            el.innerHTML = shopLpsString2;
        });
        upgradeString = data.upgrades[0].upgradeString;
        document.querySelectorAll(".upgrade-string").forEach(el => {
            el.innerHTML = upgradeString;
        });
        lpcLevel = data.upgrade_items[0].lpc[0].lpcLevel;
        document.querySelector(".level-lpc-string").innerHTML = lpcLevel;
        lpcCompleteString = data.upgrade_items[0].lpc[0].lpcCompleteString;
        document.querySelector(".lpc-complete-string").innerHTML = lpcCompleteString;
        descLpc = data.upgrade_items[0].lpc[0].descLpc;
        document.querySelector(".desc-lpc-string").innerHTML = descLpc;

        //FOLLOWERS
        followersName = data.upgrade_items[0].followers[0].followersName;
        document.querySelector(".followers-name").innerHTML = followersName;
        plusFollower = data.upgrade_items[0].followers[0].plusFollower;
        document.querySelector(".plus-follower").innerHTML = plusFollower;
        descFollower = data.upgrade_items[0].followers[0].descFollower;
        document.querySelector(".desc-follower-string").innerHTML = descFollower;

        //FANS
        fansName = data.upgrade_items[0].fans[0].fansName;
        document.querySelector(".fans-name").innerHTML = fansName;
        plusFan = data.upgrade_items[0].fans[0].plusFan;
        document.querySelector(".plus-fan").innerHTML = plusFan;
        descFan = data.upgrade_items[0].fans[0].descFan;
        document.querySelector(".desc-fan-string").innerHTML = descFan;

        //PAPARAZZI
        paparazziName = data.upgrade_items[0].paparazzi[0].paparazziName;
        document.querySelector(".paparazzi-name").innerHTML = paparazziName;
        plusPaparazzo = data.upgrade_items[0].paparazzi[0].plusPaparazzo;
        document.querySelector(".plus-paparazzo").innerHTML = plusPaparazzo;
        descPaparazzo = data.upgrade_items[0].paparazzi[0].descPaparazzo;
        document.querySelector(".desc-paparazzo-string").innerHTML = descPaparazzo;

        //STALKERS
        stalkersName = data.upgrade_items[0].stalkers[0].stalkersName;
        document.querySelector(".stalkers-name").innerHTML = stalkersName;
        plusStalker = data.upgrade_items[0].stalkers[0].plusStalker;
        document.querySelector(".plus-stalker").innerHTML = plusStalker;
        descStalker = data.upgrade_items[0].stalkers[0].descStalker;
        document.querySelector(".desc-stalker-string").innerHTML = descStalker;

        //LUNATICS
        lunaticsName = data.upgrade_items[0].lunatics[0].lunaticsName;
        document.querySelector(".lunatics-name").innerHTML = lunaticsName;
        plusLunatic = data.upgrade_items[0].lunatics[0].plusLunatic;
        document.querySelector(".plus-lunatic").innerHTML = plusLunatic;
        descLunatic = data.upgrade_items[0].lunatics[0].descLunatic;
        document.querySelector(".desc-lunatic-string").innerHTML = descLunatic;

        //BOTS
        botsName = data.upgrade_items[0].bots[0].botsName;
        document.querySelector(".bots-name").innerHTML = botsName;
        plusBot = data.upgrade_items[0].bots[0].plusBot;
        document.querySelector(".plus-bot").innerHTML = plusBot;
        descBot = data.upgrade_items[0].bots[0].descBot;
        document.querySelector(".desc-bot-string").innerHTML = descBot;

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

        //CONFIG-CATEGORY
        saveLoadCategory = data.config[0].saveLoadCategory;
        document.querySelector(".save-load-category").innerHTML = saveLoadCategory;
        darkThemeCategory = data.config[0].darkThemeCategory;
        document.querySelector(".dark-theme-category").innerHTML = darkThemeCategory;
        langCategory = data.config[0].langCategory;
        document.querySelector(".lang-category").innerHTML = langCategory;
        resetGameCategory = data.config[0].resetGameCategory;
        document.querySelector(".reset-game-category").innerHTML = resetGameCategory;
        aboutCategory = data.config[0].aboutCategory;
        document.querySelector(".about-category").innerHTML = aboutCategory;

        //CONFIG-OPTIONS
        saveGameLabel = data.config[0].saveGameLabel;
        document.querySelector(".save-game-label").innerHTML = saveGameLabel;
        loadGameLabel = data.config[0].loadGameLabel;
        document.querySelector(".load-game-label").innerHTML = loadGameLabel;
        autoSaveLabel = data.config[0].autoSaveLabel;
        document.querySelector(".auto-save-label").innerHTML = autoSaveLabel;
        darkThemeLabel = data.config[0].darkThemeLabel;
        document.querySelector(".dark-theme-label").innerHTML = darkThemeLabel;
        changeLangLabel = data.config[0].changeLangLabel;
        document.querySelector(".change-lang-label").innerHTML = changeLangLabel;
        resetGameLabel = data.config[0].resetGameLabel;
        document.querySelector(".reset-game-label").innerHTML = resetGameLabel;
        gameVersionLabel = data.config[0].gameVersionLabel;
        document.querySelector(".game-version-label").innerHTML = gameVersionLabel + gameVersion;
        creditsLabel = data.config[0].creditsLabel;
        document.querySelector(".credits-label").innerHTML = creditsLabel;

        //CONFIG-DIALOG
        resetDialogHeader = data.reset[0].resetDialogHeader;
        document.querySelector(".reset-dialog-header").innerHTML = resetDialogHeader;
        resetDialogString = data.reset[0].resetDialogString;
        document.querySelector(".reset-dialog-string").innerHTML = resetDialogString;
        eggDialogHeader = data.egg[0].eggDialogHeader;
        document.querySelector(".egg-dialog-header").innerHTML = eggDialogHeader;
        eggDialogRestartString = data.egg[0].eggDialogRestartString;
        document.querySelector(".egg-dialog-restart-string").innerHTML = eggDialogRestartString;
        eggDialogSourceString1 = data.egg[0].eggDialogSourceString1;
        document.querySelector(".egg-dialog-source-string-one").innerHTML = eggDialogSourceString1;
        eggDialogSourceString2 = data.egg[0].eggDialogSourceString2;
        document.querySelector(".egg-dialog-source-string-two").innerHTML = eggDialogSourceString2;
        eggDialogSourceStringSky = data.egg[0].eggDialogSourceStringSky;
        document.querySelector(".egg-dialog-source-string-sky").innerHTML = eggDialogSourceStringSky;
        eggDialogSourceStringShip = data.egg[0].eggDialogSourceStringShip;
        document.querySelector(".egg-dialog-source-string-ship").innerHTML = eggDialogSourceStringShip;
        creditsDialogHeader = data.credits[0].creditsDialogHeader;
        document.querySelector(".credits-dialog-header").innerHTML = creditsDialogHeader;
        creditsDialogString = data.credits[0].creditsDialogString;
        document.querySelector(".credits-dialog-string").innerHTML = creditsDialogString;
        langDialogHeader = data.lang[0].langDialogHeader;
        document.querySelector(".lang-dialog-header").innerHTML = langDialogHeader;
        langDialogStringEn = data.lang[0].langDialogStringEn;
        document.querySelector(".lang-dialog-string-en").innerHTML = langDialogStringEn;
        langDialogStringPt = data.lang[0].langDialogStringPt;
        document.querySelector(".lang-dialog-string-pt").innerHTML = langDialogStringPt;
    }
    );

    document.querySelector("input[value="+selLang+"]").checked = true;
}

updateLang("pt");