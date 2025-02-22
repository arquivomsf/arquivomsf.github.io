var lang = "pt";

//MISC
var gameVersion = "2.0.0";
var yesString = "";
var noString = "";

//LIKES
var likeIconTitle = "";
var likeCountString1 = "";
var likeCountString2 = "";
var lpsCountString = "";
var lpcCountString = "";
var lpsCountTitle = "";
var lpcCountTitle = "";

//ALERTS
var enoughLikes = "";
var gameSaved = "";

//UPGRADES
var commonUpgrades = "";
var specialUpgrades = "";
var costString = "";
var upgradeString = "";
var warningString = "";
var useOnceString1 = "";
var useOnceString2 = "";
var doubleRewardString = "";

//FOLLOWER
var plusFollower = "";
var followersName = "";
var hypeFollowers = "";

//FAN
var plusFan = "";
var fansName = "";
var hypeFans = "";

//PAPARAZZI
var plusPaparazzi = "";
var paparazzisName = "";
var hypePaparazzis = "";

//STALKER
var plusStalker = "";
var stalkersName = "";
var hypeStalkers = "";

//LUNATICS
var plusLunatic = "";
var lunaticsName = "";
var hypeLunatics = "";

//BOTS
var plusBot = "";
var botsName = "";
var botPlan = "";
var botPlan2 = "";

//LPC
var plusLPC = "";
var lpcLevel = "";
var lpcCompleteString = "";

//TABS
var tabUpgrades = "";
var tabLikes = "";
var tabConfig = "";

//CREDITS
var creditsTitle = "";
var creditsString = "";

//CONFIG
var saveAndLoad = "";
var saveGameString = "";
var loadGameString = "";
var autoSaveString = "";
var saveGameTitle = "";
var loadGameTitle = "";
var autoSaveTitle = "";
var darkThemeCategory = "";
var darkThemeOption = "";
var darkThemeTitle = "";
var resetGameString = "";
var resetGameTitle = "";
var resetDialogString = "";
var eraseDataString = "";
var aboutCategory = "";
var gameVersionString = "";
var creditsOptionTitle = "";

//EASTEREGG
var restartMinigameString = "";
var minigameSourceString1 = "";
var minigameSourceString2 = "";
var minigameSourceSky = "";
var minigameSourceShip = "";

//LANGUAGE
var languageString = "";
var englishString = "";
var portugueseString = "";
var languageOptionTitle = "";

function setLang(langString) {
	lang = langString;
	updateLang();
}

function updateLang() {
	if (lang == "en") {
		//MISC
		yesString = "Yes";
		noString = "No";
		
		//LIKES
		likeIconTitle = "Like";
		likeCountString1 = "You have ";
		likeCountString2 = " likes";
		lpsCountString = "LPS: ";
		lpcCountString = "LPC: ";
		lpsCountTitle = "Number of Likes per Second";
		lpcCountTitle = "Number of Likes per Click";
		
		//ALERTS
		enoughLikes = "You don't have enough likes.";
		gameSaved = "Game saved.";
		
		//UPGRADES
		commonUpgrades = "Common Upgrades";
		specialUpgrades = "Special Upgrades";
		costString = "Cost: ";
		upgradeString = "Upgrade";
		warningString = "Warning";
		useOnceString1 = "You can only";
		useOnceString2 = "use this once!";
		doubleRewardString = "(2x LPS)";
		
		//FOLLOWER
		plusFollower = "+1 Follower";
		followersName = "Followers: ";
		hypeFollowers = "Hype Followers";
		
		//FAN
		plusFan = "+1 Fan";
		fansName = "Fans: ";
		hypeFans = "Hype Fans";
		
		//PAPARAZZI
		plusPaparazzi = "+1 Paparazzi";
		paparazzisName = "Paparazzis: ";
		hypePaparazzis = "Hype Paparazzis";
		
		//STALKER
		plusStalker = "+1 Stalker";
		stalkersName = "Stalkers: ";
		hypeStalkers = "Hype Stalkers";
		
		//LUNATICS
		plusLunatic = "+1 Lunatic";
		lunaticsName = "Lunatics: ";
		hypeLunatics = "Hype Lunatics";
		
		//BOTS
		plusBot = "+1 Bot";
		botsName = "Bots: ";
		botPlan = "Upgrade Bot Plan";
		botPlan2 = "Upgrade Bot Plan";
		
		//LPC
		plusLPC = "Buy +1 LPC (Likes per Click)";
		lpcLevel = "Level: ";
		lpcCompleteString = "Likes per click";
		
		//TABS
		tabUpgrades = "Upgrades";
		tabLikes = "Likes";
		tabConfig = "Config.";
		
		//CREDITS
		creditsTitle = "Credits";
		creditsString = "<p><b><h6>Like Clicker</h6></b></p>" +
		"<p><span>Directed by TechHero</span><br>" +
		"<span>Developed by TechHero</span><br>" +
		"<span>Programmed by TechHero</span><br>" +
		"<span>Idealized by TechHero</span><br>" +
		"<span>Game design by TechHero</span><br>" +
		"<span>Game balance by TechHero</span><br>" +
		"</p><p>All by TechHero?</p>"
		
		//CONFIG
		saveAndLoad = "Save and Load";
		saveGameString = "Save game";
		loadGameString = "Load game";
		autoSaveString = "Auto save";
		saveGameTitle = "Save the game";
		loadGameTitle = "Load the game";
		autoSaveTitle = "Enable/Disable auto save";
		darkThemeCategory = "Dark Theme";
		darkThemeOption = "Dark theme";
		darkThemeTitle = "Enable/Disable dark theme";
		resetGameOption = "Reset";
		resetGameTitle = "Reset the game";
		resetDialogString = "Do you really want to reset the game?";
		eraseDataOption = "Erase data";
		aboutCategory = "About";
		gameVersionString = "Version: ";
		creditsOptionTitle = "Credits of the game";
		
		//EASTEREGG
		restartMinigameString = "Restart Game";
		minigameSourceString1 = "This game can be found ";
		minigameSourceString2 = "here";
		minigameSourceSky = "Sky image by ";
		minigameSourceShip = "Ship image by ";
		
		//LANGUAGE
		languageString = "Language";
		englishString = "English";
		portugueseString = "Portuguese";
		languageOptionTitle = "Choose the language of the game";
	}
	if (lang == "pt") {
		//MISC
		yesString = "Sim";
		noString = "Não";
		
		//LIKES
		likeIconTitle = "Curtir";
		likeCountString1 = "Você tem ";
		likeCountString2 = " curtidas";
		lpsCountString = " CPS: ";
		lpcCountString = " CPC: ";
		lpsCountTitle = "Número de Curtidas por Segundo";
		lpcCountTitle = "Número de Curtidas por Click";
		
		//ALERTS
		enoughLikes = "Você não tem curtidas suficientes.";
		gameSaved = "Jogo salvo.";
		
		//UPGRADES
		commonUpgrades = "Melhorias Comuns";
		specialUpgrades = "Melhorias Especiais";
		costString = "Preço: ";
		upgradeString = "Melhorar";
		warningString = "Atenção";
		useOnceString1 = "Você só pode";
		useOnceString2 = "usar isso uma vez!";
		doubleRewardString = "(2x CPS)";
		
		//FOLLOWER
		plusFollower = "+1 Seguidor";
		followersName = "Seguidores: ";
		hypeFollowers = `Estratégia de Engajamento\n(Melhoria de Seguidores)`;
		
		//FAN
		plusFan = "+1 Fã";
		fansName = "Fãs: ";
		hypeFans = "Hypar os Fãs";
		
		//PAPARAZZI
		plusPaparazzi = "+1 Paparazzi";
		paparazzisName = "Paparazzis: ";
		hypePaparazzis = `Aparecer em Público\n(Melhoria de Paparazzis)`;
		
		//STALKER
		plusStalker = "+1 Stalker";
		stalkersName = "Stalkers: ";
		hypeStalkers = `Dar Corda pra Gente Ruim\n(Melhoria de Stalkers)`;
		
		//LUNATICS
		plusLunatic = "+1 Lunático";
		lunaticsName = "Lunáticos: ";
		hypeLunatics = "Hypar Lunáticos";
		
		//BOTS
		plusBot = "+1 Bot";
		botsName = "Bots: ";
		botPlan = "Melhorar Bots";
		botPlan2 = "Melhorar Serviço de Bots";
		
		//LPC
		plusLPC = "Comprar +1 CPC (Curtidas por Click)";
		lpcLevel = "Nível: ";
		lpcCompleteString = "Curtidas por click";
		
		//TABS
		tabUpgrades = "Melhorias";
		tabLikes = "Curtidas";
		tabConfig = "Config.";
		
		//CREDITS
		creditsTitle = "Créditos";
		creditsString = `<span class="credits-string"><p><b><h6>Like Clicker</h6></b></p>
		<p><span>Dirigido por TechHero</span><br>
		<span>Desenvolvido por TechHero</span><br>
		<span>Programado por TechHero</span><br>
		<span>Idealizado por TechHero</span><br>
		<span>Design de jogo por TechHero</span><br>
		<span>Balanceamento de jogo por TechHero</span><br>
		</p>
		<br>
		<br>
		<p>Tudo por TechHero?</p></span>`
		
		//CONFIG
		saveAndLoad = "Salvar e Carregar";
		saveGameString = "Salvar jogo";
		loadGameString = "Carregar jogo";
		autoSaveString = "Salvamento automático";
		saveGameTitle = "Salvar o jogo";
		loadGameTitle = "Carregar o jogo";
		autoSaveTitle = "Ativar/Desativar o salvamento automático";
		darkThemeCategory = "Tema Escuro";
		darkThemeOption = "Tema escuro";
		darkThemeTitle = "Ativar/Desativar o tema escuro";
		resetGameOption = "Resetar";
		resetGameTitle = "Resetar o jogo";
		resetDialogString = "Você realmente quer resetar o jogo?";
		eraseDataOption = "Apagar dados";
		aboutCategory = "Sobre";
		gameVersionString = "Versão: ";
		creditsOptionTitle = "Créditos do jogo";
		
		//EASTEREGG
		restartMinigameString = "Reiniciar Jogo";
		minigameSourceString1 = "Este jogo pode ser encontrado ";
		minigameSourceString2 = "aqui";
		minigameSourceSky = "Imagem do céu por ";
		minigameSourceShip = "Imagem da nave por ";
		
		//LANGUAGE
		languageString = "Idioma";
		englishString = "Inglês";
		portugueseString = "Português";
		languageOptionTitle = "Escolha o idioma do jogo";
	}

	//LIKES
	document.querySelector('.like-icon-title').title = likeIconTitle;
	document.querySelector('.like-string-one').innerHTML = likeCountString1;
	document.querySelector('.like-string-two').innerHTML = likeCountString2;
	document.querySelector('.lps-home-string').innerHTML = lpsCountString;
	document.querySelector('.lps-home-string').title = lpsCountTitle;
	document.querySelector('.lpc-home-string').innerHTML = lpcCountString;
	document.querySelector('.lpc-home-string').title = lpcCountTitle;

	//ALERTS
	document.querySelector('.game-saved').innerHTML = gameSaved;
	document.querySelector('.enough-likes').innerHTML = enoughLikes;

	//UPGRADES
	document.querySelector('.common-upgrades').innerHTML = commonUpgrades;
	document.querySelector('.special-upgrades').innerHTML = specialUpgrades;
	document.querySelector('.upgrade-string').innerHTML = upgradeString;

	//FOLLOWER
	document.querySelector('.plus-follower').innerHTML = plusFollower;
	document.querySelector('.plus-follower-title').title = plusFollower;
	document.querySelector('.followers-name').innerHTML = followersName;
	document.querySelector('.lps-follower-string').innerHTML = lpsCountString;
	document.querySelector('.cost-follower-string').innerHTML = costString;
	document.querySelector('.cost-follower-hype').innerHTML = costString;
	document.querySelector('.warning-follower-string').innerHTML = warningString;
	document.querySelector('.useonce-follower-string-one').innerHTML = useOnceString1;
	document.querySelector('.useonce-follower-string-two').innerHTML = useOnceString2
	document.querySelector('.hype-followers-string-one').innerHTML = hypeFollowers;
	document.querySelector('.hype-followers-string-two').innerHTML = doubleRewardString;
	document.querySelector('.hype-followers-title').title = hypeFollowers + " " + doubleRewardString;

	//FAN
	document.querySelector('.plus-fan').innerHTML = plusFan;
	document.querySelector('.plus-fan-title').title = plusFan;
	document.querySelector('.fans-name').innerHTML = fansName;
	document.querySelector('.lps-fan-string').innerHTML = lpsCountString;
	document.querySelector('.cost-fan-string').innerHTML = costString;
	document.querySelector('.cost-fan-hype').innerHTML = costString;
	document.querySelector('.warning-fan-string').innerHTML = warningString;
	document.querySelector('.useonce-fan-string-one').innerHTML = useOnceString1;
	document.querySelector('.useonce-fan-string-two').innerHTML = useOnceString2;
	document.querySelector('.hype-fans-string-one').innerHTML = hypeFans;
	document.querySelector('.hype-fans-string-two').innerHTML = doubleRewardString;
	document.querySelector('.hype-fans-title').title = hypeFans + " " + doubleRewardString;

	//PAPARAZZI
	document.querySelector('.plus-paparazzi').innerHTML = plusPaparazzi;
	document.querySelector('.plus-paparazzi-title').title = plusPaparazzi;
	document.querySelector('.paparazzis-name').innerHTML = paparazzisName;
	document.querySelector('.lps-paparazzi-string').innerHTML = lpsCountString;
	document.querySelector('.cost-paparazzi-string').innerHTML = costString;
	document.querySelector('.cost-paparazzi-hype').innerHTML = costString;
	document.querySelector('.warning-paparazzi-string').innerHTML = warningString;
	document.querySelector('.useonce-paparazzi-string-one').innerHTML = useOnceString1;
	document.querySelector('.useonce-paparazzi-string-two').innerHTML = useOnceString2;
	document.querySelector('.hype-paparazzis-string-one').innerHTML = hypePaparazzis;
	document.querySelector('.hype-paparazzis-string-two').innerHTML = doubleRewardString;
	document.querySelector('.hype-paparazzis-title').title = hypePaparazzis + " " + doubleRewardString;

	//STALKER
	document.querySelector('.plus-stalker').innerHTML = plusStalker;
	document.querySelector('.plus-stalker-title').title = plusStalker;
	document.querySelector('.stalkers-name').innerHTML = stalkersName;
	document.querySelector('.lps-stalker-string').innerHTML = lpsCountString;
	document.querySelector('.cost-stalker-string').innerHTML = costString;
	document.querySelector('.cost-stalker-hype').innerHTML = costString;
	document.querySelector('.warning-stalker-string').innerHTML = warningString;
	document.querySelector('.useonce-stalker-string-one').innerHTML = useOnceString1;
	document.querySelector('.useonce-stalker-string-two').innerHTML = useOnceString2;
	document.querySelector('.hype-stalkers-string-one').innerHTML = hypeStalkers;
	document.querySelector('.hype-stalkers-string-two').innerHTML = doubleRewardString;
	document.querySelector('.hype-stalkers-title').title = hypeStalkers + " " + doubleRewardString;

	//LUNATICS
	document.querySelector('.plus-lunatic').innerHTML = plusLunatic;
	document.querySelector('.plus-lunatic-title').title = plusLunatic;
	document.querySelector('.lunatics-name').innerHTML = lunaticsName;
	document.querySelector('.lps-lunatic-string').innerHTML = lpsCountString;
	document.querySelector('.cost-lunatic-string').innerHTML = costString;
	document.querySelector('.cost-lunatic-hype').innerHTML = costString;
	document.querySelector('.warning-lunatic-string').innerHTML = warningString;
	document.querySelector('.useonce-lunatic-string-one').innerHTML = useOnceString1;
	document.querySelector('.useonce-lunatic-string-two').innerHTML = useOnceString2;
	document.querySelector('.hype-lunatics-string-one').innerHTML = hypeLunatics;
	document.querySelector('.hype-lunatics-string-two').innerHTML = doubleRewardString;
	document.querySelector('.hype-lunatics-title').title = hypeLunatics + " " + doubleRewardString;

	//BOTS
	document.querySelector('.plus-bot').innerHTML = plusBot;
	document.querySelector('.plus-bot-title').title = plusBot;
	document.querySelector('.bots-name').innerHTML = botsName;
	document.querySelector('.lps-bot-string').innerHTML = lpsCountString;
	document.querySelector('.cost-bot-string').innerHTML = costString;
	document.querySelector('.cost-bot-hype').innerHTML = costString;
	document.querySelector('.warning-bot-string').innerHTML = warningString;
	document.querySelector('.useonce-bot-string-one').innerHTML = useOnceString1;
	document.querySelector('.useonce-bot-string-two').innerHTML = useOnceString2;
	document.querySelector('.bots-plan-string-one').innerHTML = botPlan;
	document.querySelector('.bots-plan-string-two').innerHTML = doubleRewardString;
	document.querySelector('.bots-plan-title').title = botPlan2 + " " + doubleRewardString;
	
	//LPC
	document.querySelector('.plus-lpc-title').title = plusLPC;
	document.querySelector('.level-lpc-string').innerHTML = lpcLevel;
	document.querySelector('.lpc-complete-string').innerHTML = lpcCompleteString;
	document.querySelector('.cost-lpc-string').innerHTML = costString;
	
	//TABS
	document.querySelector('.tab-upgrades').innerHTML = tabUpgrades;
	document.querySelector('.tab-likes').innerHTML = tabLikes;
	document.querySelector('.tab-config').innerHTML = tabConfig;
	
	//CREDITS
	document.querySelector('.credits-title').innerHTML = creditsTitle;
	document.querySelector('.credits-string').innerHTML = creditsString;
	
	//CONFIG
	document.querySelector('.tab-config-title').innerHTML = tabConfig;
	document.querySelector('.save-and-load').innerHTML = saveAndLoad;
	document.querySelector('.save-game-string').innerHTML = saveGameString;
	document.querySelector('.load-game-string').innerHTML = loadGameString;
	document.querySelector('.auto-save-string').innerHTML = autoSaveString;
	document.querySelector('.save-game-title').title = saveGameTitle;
	document.querySelector('.load-game-title').title = loadGameTitle;
	document.querySelector('.auto-save-title').title = autoSaveTitle;
	document.querySelector('.dark-theme-category').innerHTML = darkThemeCategory;
	document.querySelector('.dark-theme-option').innerHTML = darkThemeOption;
	document.querySelector('.dark-theme-title').title = darkThemeTitle;
	document.querySelector('.reset-game-string').innerHTML = resetGameOption;
	document.querySelector('.reset-game-title').title = resetGameTitle;
	document.querySelector('.reset-game-dialog-title').innerHTML = resetGameTitle;
	document.querySelector('.reset-game-dialog-string').innerHTML = resetDialogString;
	document.querySelector('.reset-game-dialog-btn-yes').innerHTML = yesString;
	document.querySelector('.reset-game-dialog-btn-no').innerHTML = noString;
	document.querySelector('.erase-data-string').innerHTML = eraseDataOption;
	document.querySelector('.about-category').innerHTML = aboutCategory;
	document.querySelector('.game-version-string').innerHTML = gameVersionString + gameVersion;
	document.querySelector('.game-version-title').title = gameVersionString + gameVersion;
	document.querySelector('.credits-option-string').innerHTML = creditsTitle;
	document.querySelector('.credits-option-title').title = creditsOptionTitle;
	
	//EASTEREGG
	document.querySelector('.restart-minigame-string').innerHTML = restartMinigameString;
	document.querySelector('.minigame-source-string-one').innerHTML = minigameSourceString1;
	document.querySelector('.minigame-source-string-two').innerHTML = minigameSourceString2;
	document.querySelector('.minigame-source-sky').innerHTML = minigameSourceSky;
	document.querySelector('.minigame-source-ship').innerHTML = minigameSourceShip;
	
	//LANGUAGE
	/*document.querySelector('.language-title').innerHTML = languageString;
	document.querySelector('.language-english').innerHTML = englishString;
	document.querySelector('.language-portuguese').innerHTML = portugueseString;
	document.querySelector('.language-category').innerHTML = languageString;
	document.querySelector('.language-option-title').title = languageOptionTitle;
	document.querySelector('.language-option-string').innerHTML = languageString;*/
}

function loadLang() {
	lang = JSON.parse(localStorage.getItem("lang"));
	if (JSON.parse(localStorage.getItem("lang")) == null) {
		lang = "pt";
	}
	
	updateLang();
}

function saveLang() {
	localStorage.setItem("lang", JSON.stringify(lang));
}

function resetLang() {
	setLang("pt");
	
	loadLang();
}

loadLang();