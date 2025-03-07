var common_shop_items = `
{
    "followers": {
            "divname": "FollowersDiv",
            "shopitemid": "GainFollower",
            "itemaction": "buyCommon(followers,'followers',followersNextCost,'followersNextCost',followersBaseCost,followersDoublePurchased,'doubleFollowers','DoubleFollowersDiv')",
            "iconname": "add",
            "spanclass": "plus-follower",
            "namespanclass": "followers-name",
            "namespanid": "followers",
            "lpsspanclass": "lps-follower-string",
            "lpsspanid": "followersLPS",
            "costspanid": "followersNextCost",
            "descspanclass": "desc-follower-string"
    },
    "fans": {
            "divname": "FansDiv",
            "shopitemid": "GainFan",
            "itemaction": "buyCommon(fans,'fans',fansNextCost,'fansNextCost',fansBaseCost,fansDoublePurchased,'doubleFans','DoubleFansDiv')",
            "iconname": "add",
            "spanclass": "plus-fan",
            "namespanclass": "fans-name",
            "namespanid": "fans",
            "lpsspanclass": "lps-fan-string",
            "lpsspanid": "fansLPS",
            "costspanid": "fansNextCost",
            "descspanclass": "desc-fan-string"
    },
    "paparazzi": {
            "divname": "PaparazziDiv",
            "shopitemid": "GainPaparazzo",
            "itemaction": "buyCommon(paparazzi,'paparazzi',paparazziNextCost,'paparazziNextCost',paparazziBaseCost,paparazziDoublePurchased,'doublePaparazzi','DoublePaparazziDiv')",
            "iconname": "add",
            "spanclass": "plus-paparazzo",
            "namespanclass": "paparazzi-name",
            "namespanid": "paparazzi",
            "lpsspanclass": "lps-paparazzo-string",
            "lpsspanid": "paparazziLPS",
            "costspanid": "paparazziNextCost",
            "descspanclass": "desc-paparazzo-string"
    },
    "stalkers": {
            "divname": "StalkersDiv",
            "shopitemid": "GainStalker",
            "itemaction": "buyCommon(stalkers,'stalkers',stalkersNextCost,'stalkersNextCost',stalkersBaseCost,stalkersDoublePurchased,'doubleStalkers','DoubleStalkersDiv')",
            "iconname": "add",
            "spanclass": "plus-stalker",
            "namespanclass": "stalkers-name",
            "namespanid": "stalkers",
            "lpsspanclass": "lps-stalker-string",
            "lpsspanid": "stalkersLPS",
            "costspanid": "stalkersNextCost",
            "descspanclass": "desc-stalker-string"
    },
    "lunatics": {
            "divname": "LunaticsDiv",
            "shopitemid": "GainLunatic",
            "itemaction": "buyCommon(lunatics,'lunatics',lunaticsNextCost,'lunaticsNextCost',lunaticsBaseCost,lunaticsDoublePurchased,'doubleLunatics','DoubleLunaticsDiv')",
            "iconname": "add",
            "spanclass": "plus-lunatic",
            "namespanclass": "lunatics-name",
            "namespanid": "lunatics",
            "lpsspanclass": "lps-lunatic-string",
            "lpsspanid": "lunaticsLPS",
            "costspanid": "lunaticsNextCost",
            "descspanclass": "desc-lunatic-string"
    },
    "bots": {
            "divname": "BotsDiv",
            "shopitemid": "GainBot",
            "itemaction": "buyCommon(bots,'bots',botsNextCost,'botsNextCost',botsBaseCost,botsDoublePurchased,'doubleBots','DoubleBotsDiv')",
            "iconname": "add",
            "spanclass": "plus-bot",
            "namespanclass": "bots-name",
            "namespanid": "bots",
            "lpsspanclass": "lps-bot-string",
            "lpsspanid": "botsLPS",
            "costspanid": "botsNextCost",
            "descspanclass": "desc-bot-string"
    }
}
`

var special_shop_items = `
{
    "click": {
            "onlyonce": "false",
            "divname": "ClickDiv",
            "shopitemid": "AddClick",
            "itemaction": "buyCommon(lpc,'lpc',lpcNextCost,'lpcNextCost',lpcBaseCost,'','')",
            "iconname": "add",
            "namespanclass": "upgrade-string",
            "lpccomplete": "lpc-complete-string",
            "levelspanclass": "level-lpc-string",
            "levelspanid": "lpcshop",
            "costspanid": "lpcNextCost",
            "descspanclass": "desc-lpc-string",
            "destroyclass": ""
    },
    "doubleFollowers": {
            "onlyonce": "true",
            "divname": "DoubleFollowersDiv",
            "shopitemid": "DoubleFollowers",
            "itemaction": "buySpecial(followersDoubleCost,'destroy-double-followers','followersDoublePurchased',followersLPS,'followersLPS')",
            "iconname": "add",
            "namespanclass": "double-followers-string",
            "lpccomplete": "double-followers-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "followersDoubleCost",
            "descspanclass": "desc-double-followers-string",
            "destroyclass": "destroy-double-followers"
    },
    "doubleFans": {
            "onlyonce": "true",
            "divname": "DoubleFansDiv",
            "shopitemid": "DoubeFans",
            "itemaction": "buySpecial(fansDoubleCost,'destroy-double-fans','fansDoublePurchased',fansLPS,'fansLPS')",
            "iconname": "add",
            "namespanclass": "double-fans-string",
            "lpccomplete": "double-fans-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "fansDoubleCost",
            "descspanclass": "desc-double-fans-string",
            "destroyclass": "destroy-double-fans"
    },
    "doublePaparazzi": {
            "onlyonce": "true",
            "divname": "DoublePaparazziDiv",
            "shopitemid": "DoubePaparazzi",
            "itemaction": "buySpecial(paparazziDoubleCost,'destroy-double-paparazzi','paparazziDoublePurchased',paparazziLPS,'paparazziLPS')",
            "iconname": "add",
            "namespanclass": "double-paparazzi-string",
            "lpccomplete": "double-paparazzi-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "paparazziDoubleCost",
            "descspanclass": "desc-double-paparazzi-string",
            "destroyclass": "destroy-double-paparazzi"
    },
    "doubleStalkers": {
            "onlyonce": "true",
            "divname": "DoubleStalkersDiv",
            "shopitemid": "DoubeStalkers",
            "itemaction": "buySpecial(stalkersDoubleCost,'destroy-double-stalkers','stalkersDoublePurchased',stalkersLPS,'stalkersLPS')",
            "iconname": "add",
            "namespanclass": "double-stalkers-string",
            "lpccomplete": "double-stalkers-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "stalkersDoubleCost",
            "descspanclass": "desc-double-stalkers-string",
            "destroyclass": "destroy-double-stalkers"
    },
    "doubleLunatics": {
            "onlyonce": "true",
            "divname": "DoubleLunaticsDiv",
            "shopitemid": "DoubeLunatics",
            "itemaction": "buySpecial(lunaticsDoubleCost,'destroy-double-lunatics','lunaticsDoublePurchased',lunaticsLPS,'lunaticsLPS')",
            "iconname": "add",
            "namespanclass": "double-lunatics-string",
            "lpccomplete": "double-lunatics-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "lunaticsDoubleCost",
            "descspanclass": "desc-double-lunatics-string",
            "destroyclass": "destroy-double-lunatics"
    },
    "doubleBots": {
            "onlyonce": "true",
            "divname": "DoubleBotsDiv",
            "shopitemid": "DoubeBots",
            "itemaction": "buySpecial(botsDoubleCost,'destroy-double-bots','botsDoublePurchased',botsLPS,'botsLPS')",
            "iconname": "add",
            "namespanclass": "double-bots-string",
            "lpccomplete": "double-bots-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "botsDoubleCost",
            "descspanclass": "desc-double-bots-string",
            "destroyclass": "destroy-double-bots"
    }
}
`

var option_items = `
{
    "saveload": {
            "type": "category_name",
            "textclass": "save-load-category",
            "action": "",
            "icon": "",
            "checkname": "",
            "checkid": ""
    },
    "save": {
            "type": "option_simple",
            "textclass": "save-game-label",
            "action": "saveGame()",
            "icon": "icon-save",
            "checkname": "",
            "checkid": ""
    },
    "load": {
            "type": "option_simple",
            "textclass": "load-game-label",
            "action": "loadGame()",
            "icon": "icon-load",
            "checkname": "",
            "checkid": ""
    },
    "autosave": {
            "type": "option_check",
            "textclass": "auto-save-label",
            "action": "enableDisableAutoSave()",
            "icon": "icon-save",
            "checkname": "autoSaveOption",
            "checkid": "autoSaveCheck"
    },
    "darkcategory": {
            "type": "category_name",
            "textclass": "dark-theme-category",
            "action": "",
            "icon": "",
            "checkname": "",
            "checkid": ""
    },
    "darktheme": {
            "type": "option_check",
            "textclass": "dark-theme-label",
            "action": "clickDarkTheme()",
            "icon": "icon-brush",
            "checkname": "darkOption",
            "checkid": "darkCheck"
    },
    "langcategory": {
            "type": "category_name",
            "textclass": "lang-category",
            "action": "",
            "icon": "",
            "checkname": "",
            "checkid": ""
    },
    "lang": {
            "type": "option_modal",
            "textclass": "change-lang-label",
            "action": "#langModal",
            "icon": "icon-language",
            "checkname": "",
            "checkid": ""
    },
    "resetcategory": {
            "type": "category_name",
            "textclass": "reset-game-category",
            "action": "",
            "icon": "",
            "checkname": "",
            "checkid": ""
    },
    "reset": {
            "type": "option_modal",
            "textclass": "reset-game-label",
            "action": "#resetModal",
            "icon": "icon-trash",
            "checkname": "",
            "checkid": ""
    },
    "about": {
            "type": "category_name",
            "textclass": "about-category",
            "action": "",
            "icon": "",
            "checkname": "",
            "checkid": ""
    },
    "version": {
            "type": "option_simple",
            "textclass": "game-version-label",
            "action": "unknfunc()",
            "icon": "icon-info-circled",
            "checkname": "",
            "checkid": ""
    },
    "credits": {
            "type": "option_modal",
            "textclass": "credits-label",
            "action": "#creditsModal",
            "icon": "icon-changelog",
            "checkname": "",
            "checkid": ""
    }
}
`