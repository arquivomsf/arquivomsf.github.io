var common_shop_items = `
{
    "followers": {
            "divname": "FollowersDiv",
            "shopitemid": "GainFollower",
            "itemaction": "gainFollower()",
            "iconname": "add",
            "spanclass": "plus-follower",
            "namespanclass": "followers-name",
            "namespanid": "followers",
            "lpsspanclass": "lps-follower-string",
            "lpsspanid": "followerLPS",
            "costspanid": "followerCost",
            "descspanclass": "desc-follower-string"
    },
    "fans": {
            "divname": "FansDiv",
            "shopitemid": "GainFan",
            "itemaction": "gainFan()",
            "iconname": "add",
            "spanclass": "plus-fan",
            "namespanclass": "fans-name",
            "namespanid": "fans",
            "lpsspanclass": "lps-fan-string",
            "lpsspanid": "fanLPS",
            "costspanid": "fanCost",
            "descspanclass": "desc-fan-string"
    },
    "paparazzi": {
            "divname": "PaparazziDiv",
            "shopitemid": "GainPaparazzo",
            "itemaction": "gainPaparazzo()",
            "iconname": "add",
            "spanclass": "plus-paparazzo",
            "namespanclass": "paparazzi-name",
            "namespanid": "paparazzi",
            "lpsspanclass": "lps-paparazzo-string",
            "lpsspanid": "paparazzoLPS",
            "costspanid": "paparazzoCost",
            "descspanclass": "desc-paparazzo-string"
    },
    "stalkers": {
            "divname": "StalkersDiv",
            "shopitemid": "GainStalker",
            "itemaction": "gainStalker()",
            "iconname": "add",
            "spanclass": "plus-stalker",
            "namespanclass": "stalkers-name",
            "namespanid": "stalkers",
            "lpsspanclass": "lps-stalker-string",
            "lpsspanid": "stalkerLPS",
            "costspanid": "stalkerCost",
            "descspanclass": "desc-stalker-string"
    },
    "lunatics": {
            "divname": "LunaticsDiv",
            "shopitemid": "GainLunatic",
            "itemaction": "gainLunatic()",
            "iconname": "add",
            "spanclass": "plus-lunatic",
            "namespanclass": "lunatics-name",
            "namespanid": "lunatics",
            "lpsspanclass": "lps-lunatic-string",
            "lpsspanid": "lunaticLPS",
            "costspanid": "lunaticCost",
            "descspanclass": "desc-lunatic-string"
    },
    "bots": {
            "divname": "BotsDiv",
            "shopitemid": "GainBot",
            "itemaction": "gainBot()",
            "iconname": "add",
            "spanclass": "plus-bot",
            "namespanclass": "bots-name",
            "namespanid": "bots",
            "lpsspanclass": "lps-bot-string",
            "lpsspanid": "botLPS",
            "costspanid": "botCost",
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
            "itemaction": "addClick()",
            "iconname": "add",
            "namespanclass": "upgrade-string",
            "lpccomplete": "lpc-complete-string",
            "levelspanclass": "level-lpc-string",
            "levelspanid": "lpcshop",
            "costspanid": "addClickCost",
            "descspanclass": "desc-lpc-string",
            "destroyclass": ""
    },
    "doubleFollowers": {
            "onlyonce": "true",
            "divname": "DoubleFollowersDiv",
            "shopitemid": "DoubeFollowers",
            "itemaction": "doubeFollowers()",
            "iconname": "add",
            "namespanclass": "double-followers-string",
            "lpccomplete": "double-followers-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "doubleFollowersCost",
            "descspanclass": "desc-double-followers-string",
            "destroyclass": "destroy-double-followers"
    },
    "doubleFans": {
            "onlyonce": "true",
            "divname": "DoubleFansDiv",
            "shopitemid": "DoubeFans",
            "itemaction": "doubeFans()",
            "iconname": "add",
            "namespanclass": "double-fans-string",
            "lpccomplete": "double-fans-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "doubleFansCost",
            "descspanclass": "desc-double-fans-string",
            "destroyclass": "destroy-double-fans"
    },
    "doublePaparazzi": {
            "onlyonce": "true",
            "divname": "DoublePaparazziDiv",
            "shopitemid": "DoubePaparazzi",
            "itemaction": "doubePaparazzi()",
            "iconname": "add",
            "namespanclass": "double-paparazzi-string",
            "lpccomplete": "double-paparazzi-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "doublePaparazziCost",
            "descspanclass": "desc-double-paparazzi-string",
            "destroyclass": "destroy-double-paparazzi"
    },
    "doubleStalkers": {
            "onlyonce": "true",
            "divname": "DoubleStalkersDiv",
            "shopitemid": "DoubeStalkers",
            "itemaction": "doubeStalkers()",
            "iconname": "add",
            "namespanclass": "double-stalkers-string",
            "lpccomplete": "double-stalkers-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "doubleStalkersCost",
            "descspanclass": "desc-double-stalkers-string",
            "destroyclass": "destroy-double-stalkers"
    },
    "doubleLunatics": {
            "onlyonce": "true",
            "divname": "DoubleLunaticsDiv",
            "shopitemid": "DoubeLunatics",
            "itemaction": "doubeLunatics()",
            "iconname": "add",
            "namespanclass": "double-lunatics-string",
            "lpccomplete": "double-lunatics-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "doubleLunaticsCost",
            "descspanclass": "desc-double-lunatics-string",
            "destroyclass": "destroy-double-lunatics"
    },
    "doubleBots": {
            "onlyonce": "true",
            "divname": "DoubleBotsDiv",
            "shopitemid": "DoubeBots",
            "itemaction": "doubeBots()",
            "iconname": "add",
            "namespanclass": "double-bots-string",
            "lpccomplete": "double-bots-name",
            "levelspanclass": "",
            "levelspanid": "",
            "costspanid": "doubleBotsCost",
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
            "action": "saveGame(); saveLang()",
            "icon": "icon-save",
            "checkname": "",
            "checkid": ""
    },
    "load": {
            "type": "option_simple",
            "textclass": "load-game-label",
            "action": "loadGame(); loadLang()",
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

var default_values = `
{
    "followers": {
            "lps": "1",
            "cost": "10",
            "doublecost": "500",
            "doubledefault": "1"
    },
    "fans": {
            "lps": "2",
            "cost": "100",
            "doublecost": "1000",
            "doubledefault": "1"
    },
    "paparazzi": {
            "lps": "4",
            "cost": "500",
            "doublecost": "6000",
            "doubledefault": "1"
    },
    "stalkers": {
            "lps": "8",
            "cost": "1000",
            "doublecost": "12000",
            "doubledefault": "1"
    },
    "lunatics": {
            "lps": "16",
            "cost": "5000",
            "doublecost": "25000",
            "doubledefault": "1"
    },
    "bots": {
            "lps": "32",
            "cost": "10000",
            "doublecost": "50000",
            "doubledefault": "1"
    },
    "lpc": {
            "cost": "1000",
            "default": "1"
    },
    "lang": {
        "default": "en"
    },
    "autosave": {
        "default": "1"
    }
}
`