var common_shop_items = `
{
    "followers": {
            "divname": "FollowersDiv",
            "shopitemclass": "shopitem1",
            "shopitemid": "GainFollower",
            "divclass": "shopitem1btn plus-follower-title",
            "itemaction": "gainFollower()",
            "iconclass": "shopitem1icon",
            "iconname": "add",
            "spanclass": "plus-follower",
            "namespanclass": "followers-name",
            "namespanid": "followers",
            "lpsspanclass": "lps-follower-string",
            "lpsspanid": "followerLPS",
            "costspanclass": "cost-follower-string",
            "costspanid": "followerCost",
            "descspanclass": "desc-follower-string"
    },
    "fans": {
            "divname": "FansDiv",
            "shopitemclass": "shopitem2",
            "shopitemid": "GainFan",
            "divclass": "shopitem2btn plus-fan-title",
            "itemaction": "gainFan()",
            "iconclass": "shopitem2icon",
            "iconname": "add",
            "spanclass": "plus-fan",
            "namespanclass": "fans-name",
            "namespanid": "fans",
            "lpsspanclass": "lps-fan-string",
            "lpsspanid": "fanLPS",
            "costspanclass": "cost-fan-string",
            "costspanid": "fanCost",
            "descspanclass": "desc-fan-string"
    },
    "paparazzi": {
            "divname": "PaparazziDiv",
            "shopitemclass": "shopitem3",
            "shopitemid": "GainPaparazzo",
            "divclass": "shopitem3btn plus-paparazzo-title",
            "itemaction": "gainPaparazzo()",
            "iconclass": "shopitem3icon",
            "iconname": "add",
            "spanclass": "plus-paparazzo",
            "namespanclass": "paparazzi-name",
            "namespanid": "paparazzi",
            "lpsspanclass": "lps-paparazzo-string",
            "lpsspanid": "paparazzoLPS",
            "costspanclass": "cost-paparazzo-string",
            "costspanid": "paparazzoCost",
            "descspanclass": "desc-paparazzo-string"
    },
    "stalkers": {
            "divname": "StalkersDiv",
            "shopitemclass": "shopitem4",
            "shopitemid": "GainStalker",
            "divclass": "shopitem4btn plus-stalker-title",
            "itemaction": "gainStalker()",
            "iconclass": "shopitem4icon",
            "iconname": "add",
            "spanclass": "plus-stalker",
            "namespanclass": "stalkers-name",
            "namespanid": "stalkers",
            "lpsspanclass": "lps-stalker-string",
            "lpsspanid": "stalkerLPS",
            "costspanclass": "cost-stalker-string",
            "costspanid": "stalkerCost",
            "descspanclass": "desc-stalker-string"
    },
    "lunatics": {
            "divname": "LunaticsDiv",
            "shopitemclass": "shopitem5",
            "shopitemid": "GainLunatic",
            "divclass": "shopitem5btn plus-lunatic-title",
            "itemaction": "gainLunatic()",
            "iconclass": "shopitem5icon",
            "iconname": "add",
            "spanclass": "plus-lunatic",
            "namespanclass": "lunatics-name",
            "namespanid": "lunatics",
            "lpsspanclass": "lps-lunatic-string",
            "lpsspanid": "lunaticLPS",
            "costspanclass": "cost-lunatic-string",
            "costspanid": "lunaticCost",
            "descspanclass": "desc-lunatic-string"
    },
    "bots": {
            "divname": "BotsDiv",
            "shopitemclass": "shopitem6",
            "shopitemid": "GainBot",
            "divclass": "shopitem6btn plus-bot-title",
            "itemaction": "gainBot()",
            "iconclass": "shopitem6icon",
            "iconname": "add",
            "spanclass": "plus-bot",
            "namespanclass": "bots-name",
            "namespanid": "bots",
            "lpsspanclass": "lps-bot-string",
            "lpsspanid": "botLPS",
            "costspanclass": "cost-bot-string",
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
            "shopitemclass": "shopitem7",
            "shopitemid": "AddClick",
            "divclass": "shopitem7btn plus-lpc-title",
            "itemaction": "addClick()",
            "iconclass": "shopitem7icon",
            "iconname": "add",
            "namespanclass": "upgrade-string",
            "lpccomplete": "lpc-complete-string",
            "levelspanclass": "level-lpc-string",
            "levelspanid": "lpcshop",
            "costspanclass": "cost-lpc-string",
            "costspanid": "addClickCost",
            "descspanclass": "desc-lpc-string"
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
            "checkoffid": "",
            "checkonid": ""
    },
    "save": {
            "type": "option_simple",
            "textclass": "save-game-label",
            "action": "saveGame(); saveLang()",
            "icon": "icon-save",
            "checkoffid": "",
            "checkonid": ""
    },
    "load": {
            "type": "option_simple",
            "textclass": "load-game-label",
            "action": "loadGame(); loadLang()",
            "icon": "icon-load",
            "checkoffid": "",
            "checkonid": ""
    },
    "autosave": {
            "type": "option_check",
            "textclass": "auto-save-label",
            "action": "enableDisableAutoSave()",
            "icon": "icon-save",
            "checkoffid": "savedisabled",
            "checkonid": "saveenabled"
    },
    "darkcategory": {
            "type": "category_name",
            "textclass": "dark-theme-category",
            "action": "",
            "icon": "",
            "checkoffid": "",
            "checkonid": ""
    },
    "darktheme": {
            "type": "option_check",
            "textclass": "dark-theme-label",
            "action": "clickDarkTheme()",
            "icon": "icon-brush",
            "checkoffid": "darkthemedisabled",
            "checkonid": "darkthemeenabled"
    },
    "langcategory": {
            "type": "category_name",
            "textclass": "lang-category",
            "action": "",
            "icon": "",
            "checkoffid": "",
            "checkonid": ""
    },
    "lang": {
            "type": "option_modal",
            "textclass": "change-lang-label",
            "action": "#langModal",
            "icon": "icon-language",
            "checkoffid": "",
            "checkonid": ""
    },
    "resetcategory": {
            "type": "category_name",
            "textclass": "reset-game-category",
            "action": "",
            "icon": "",
            "checkoffid": "",
            "checkonid": ""
    },
    "reset": {
            "type": "option_modal",
            "textclass": "reset-game-label",
            "action": "#resetModal",
            "icon": "icon-trash",
            "checkoffid": "",
            "checkonid": ""
    },
    "about": {
            "type": "category_name",
            "textclass": "about-category",
            "action": "",
            "icon": "",
            "checkoffid": "",
            "checkonid": ""
    },
    "version": {
            "type": "option_simple",
            "textclass": "game-version-label",
            "action": "unknfunc()",
            "icon": "icon-info-circled",
            "checkoffid": "",
            "checkonid": ""
    },
    "credits": {
            "type": "option_modal",
            "textclass": "credits-label",
            "action": "#creditsModal",
            "icon": "icon-changelog",
            "checkoffid": "",
            "checkonid": ""
    }
}
`