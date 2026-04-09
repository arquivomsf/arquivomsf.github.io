const stickers_array = [
    "4e673961500865d_340225.gif",
    "4e673a10f00865d_320265.gif",
    "4b7a8aa9700984a_640634.gif",
    "5516dbde300584e_124128.png",
    "5b09d6baa000966_300280.gif",
    "5b09d726800986f_300220.gif",
    "648b02778008e71_300300.png",
    "6499efd43005fb3_300300.png",
    "6499eff0f005fb3_300300.png",
    "77593521300430f_400345.jpg",
    "81592a5ef008f73_079140.gif",
    "81592cc91000e91_220220.gif",
    "8215a1a18005788_320320.jpg",
    "821622bdd00118a_320320.jpg",
    "828cb28a9004273_320236.png",
    "83375bf6600491c_720733.jpg",
    "834953c13001b01_692695.jpg",
    "836857614001b01_313235.gif",
    "86d4baefb00905d_692695.jpg",
    "86d4cd5a400905d_480356.gif",
    "49241fad3000c72_320180.gif",
    "4b4e1a7ef00865d_168168.gif",
    "5538ad37300805b_320320.png",
    "5538b3aa800805b_320320.png",
    "5538be14c00805b_320320.png",
    "5538c1a5300805b_320320.png",
    "5538c816800584e_320320.png",
    "55394e34f00805b_320320.png",
    "57f502dc300805b_306270.png",
    "62588caf0005fb3_380214.gif"
]

const followers_array = [
    "3e781500b008fe2_300329.png",
    "473915f5300578c_245245.gif",
    "4173030de008fe2_128128.png"
]

function load_stickers() {
    for (i = 0; i < stickers_array.length; i++) {
        document.querySelector(".sticker_content_list").innerHTML += `
            <img src="stickers/${stickers_array[i]}" class="w-auto h-auto">
        `
    }

    for (i = 0; i < followers_array.length; i++) {
        document.querySelector(".sticker_followers_content_list").innerHTML += `
            <img src="stickers/${followers_array[i]}" class="w-auto h-auto">
        `
    }
}