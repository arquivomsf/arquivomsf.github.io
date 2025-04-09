var systems = [
    "Amstrad_-_CPC",
    "Amstrad_-_GX4000",
    "Arduboy_Inc_-_Arduboy",
    "Atari_-_2600",
	"Atari_-_5200",
	"Atari_-_7800",
	"Atari_-_8-bit",
    "Atari_-_Jaguar",
    "Atari_-_Lynx",
    "Atari_-_ST",
    "Atomiswave",
    "Bandai_-_WonderSwan",
    "Bandai_-_WonderSwan_Color",
    "Cannonball",
    "Casio_-_Loopy",
    "Casio_-_PV-1000",
    "Cave_Story",
    "ChaiLove",
    "Coleco_-_ColecoVision",
    "Commodore_-_64",
    "Commodore_-_Amiga",
    "Commodore_-_CD32",
    "Commodore_-_CDTV",
    "Commodore_-_PET",
    "Commodore_-_Plus-4",
    "Commodore_-_VIC-20",
    "DOOM",
    "DOS",
    "Dinothawr",
    "Emerson_-_Arcadia_2001",
    "Entex_-_Adventure_Vision",
    "Epoch_-_Super_Cassette_Vision",
    "FBNeo_-_Arcade_Games",
    "Fairchild_-_Channel_F",
    "Flashback",
    "Funtech_-_Super_Acan",
    "GCE_-_Vectrex",
    "GamePark_-_GP32",
    "Handheld_Electronic_Game",
    "Hartung_-_Game_Master",
    "Jump_'n_Bump",
    "LeapFrog_-_Leapster_Learning_Game_System",
    "LowRes_NX",
    "Lutro",
    "MAME",
    "Magnavox_-_Odyssey2",
    "Mattel_-_Intellivision",
    "Microsoft_-_MSX",
    "Microsoft_-_MSX2",
    "Microsoft_-_Xbox",
    "Microsoft_-_Xbox_360",
    "MrBoom",
    "NEC_-_PC_Engine_-_TurboGrafx_16",
    "NEC_-_PC_Engine_CD_-_TurboGrafx-CD",
    "NEC_-_PC_Engine_SuperGrafx",
    "NEC_-_PC-8001_-_PC-8801",
    "NEC_-_PC-98",
    "NEC_-_PC-FX",
    "Nintendo_-_Family_Computer_Disk_System",
    "Nintendo_-_Game_Boy",
    "Nintendo_-_Game_Boy_Advance",
    "Nintendo_-_Game_Boy_Color",
    "Nintendo_-_GameCube",
    "Nintendo_-_Nintendo_3DS",
    "Nintendo_-_Nintendo_64",
    "Nintendo_-_Nintendo_64DD",
    "Nintendo_-_Nintendo_DS",
    "Nintendo_-_Nintendo_DSi",
    "Nintendo_-_Nintendo_Entertainment_System",
    "Nintendo_-_Pokemon_Mini",
    "Nintendo_-_Satellaview",
    "Nintendo_-_Sufami_Turbo",
    "Nintendo_-_Super_Nintendo_Entertainment_System",
    "Nintendo_-_Virtual_Boy",
    "Nintendo_-_Wii",
    "Nintendo_-_Wii_U",
    "Philips_-_CD-i",
    "Philips_-_Videopac+",
    "Quake",
    "Quake_II",
    "Quake_III",
    "RCA_-_Studio_II",
    "RPG_Maker",
    "Rick_Dangerous",
    "SNK_-_Neo_Geo",
    "SNK_-_Neo_Geo_CD",
    "SNK_-_Neo_Geo_Pocket",
    "SNK_-_Neo_Geo_Pocket_Color",
    "ScummVM",
    "Sega_-_32X",
    "Sega_-_Dreamcast",
    "Sega_-_Game_Gear",
    "Sega_-_Master_System_-_Mark_III",
    "Sega_-_Mega_Drive_-_Genesis",
    "Sega_-_Mega-CD_-_Sega_CD",
    "Sega_-_Naomi",
    "Sega_-_Naomi_2",
    "Sega_-_PICO",
    "Sega_-_SG-1000",
    "Sega_-_Saturn",
    "Sharp_-_X1",
    "Sharp_-_X68000",
    "Sinclair_-_ZX_81",
    "Sinclair_-_ZX_Spectrum",
    "Sony_-_PlayStation",
    "Sony_-_PlayStation_2",
    "Sony_-_PlayStation_3",
    "Sony_-_PlayStation_4",
    "Sony_-_PlayStation_Portable",
    "Sony_-_PlayStation_Vita",
    "Spectravideo_-_SVI-318_-_SVI-328",
    "TIC-80",
    "The_3DO_Company_-_3DO",
    "Thomson_-_MOTO",
    "Tiger_-_Game.com",
    "Tomb_Raider",
    "VTech_-_CreatiVision",
    "VTech_-_V.Smile",
    "Vircon32",
    "WASM-4",
    "Watara_-_Supervision",
    "Wolfenstein_3D"
]

var types = [
    "Named_Boxarts",
    "Named_Snaps",
    "Named_Titles"
]

function start() {
    //create types
    let type_input = document.querySelector("#type");
    for (var i = 0; i < types.length; i++) {
        let cur_type_name = types[i].replaceAll(/\_/g, " ");
        type_input.innerHTML += `
            <option value="${types[i]}">${cur_type_name}</option>
        `
    }

    //create systems
    let sys_input = document.querySelector("#system");
    for (var i = 0; i < systems.length; i++) {
        let cur_sys_name = systems[i].replaceAll(/\_/g, " ");
        sys_input.innerHTML += `
            <option value="${systems[i]}">${cur_sys_name}</option>
        `
    }
}

function getImage() {
    let system_val = document.querySelector("#system").value;
    let type_val = document.querySelector("#type").value;
    let game_name = document.querySelector("#name").value;
    //let game_val = document.querySelector("#name").value.replaceAll(/\_/g, "%20");
    document.querySelector(".img-preview").src = `https://raw.githubusercontent.com/libretro-thumbnails/${system_val}/refs/heads/master/${type_val}/${game_name}.png`;
}