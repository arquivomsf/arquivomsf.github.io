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
    "4173030de008fe2_128128.png",
    "45f09798500578c_200300.gif",
    "34ac875b4001190_300417.gif",
    "4029bcfa1008fe2_300301.gif",
    "4197bd789008fe2_225225.gif",
    "4180180680048ac_300300.png",
    "36095b58a009292_250342.gif",
    "40b03634a0048ac_270300.gif",
    "41a07dde7008fe2_258258.gif",
    "40b035709008fe2_300300.gif",
    "3de130d31008fe2_200258.gif",
    "511ac3fa500984a_225225.jpg",
    "45f73c89200578c_320320.jpg",
    "41d8c3d5f008fe2_300300.png",
    "511ae04e100865d_945918.jpg",
    "3b0dd577b0017d2_300300.gif",
    "3ccd4dcea005657_235386.gif",
    "469032731008aab_150225.gif",
    "4513a89cd0048ac_112112.gif",
    "5f1c557fa004840_810455.gif",
    "478e4d019008aab_288288.gif",
    "36a27e1eb008626_300257.gif",
    "43b0ddad8008fe2_300300.png",
    "3f9948e93008fe2_300303.png",
    "457e76c51001709_300428.jpg",
    "40ecef19b0048ac_300174.gif",
    "6f972a7e100996c_358640.gif",
    "437b0635f008fe2_300300.gif",
    "3769db69f005657_300326.gif",
    "421c58b34008fe2_300225.gif",
    "38e8e857b00431d_224233.gif",
    "37aff953a005657_112112.gif",
    "41e0318cb008fe2_112112.gif",
    "3655c879c001622_300309.gif",
    "4495fbb06008fe2_112112.gif",
    "42a369037008fe2_300300.gif",
    "447a4607e0048ac_300202.jpg",
    "3825d778b005020_300237.png",
    "413d3afb60048ac_220232.gif",
    "414efaeec008fe2_250240.jpg",
    "40e9262530048ac_300451.gif",
    "37b4c40dc000955_300345.gif",
    "404f390a50048ac_269386.gif",
    "714d1ace200493a_500500.gif",
    "3ff8cb1e6008fe2_112112.gif"
]

function load_stickers() {
    for (i = 0; i < stickers_array.length; i++) {
        document.querySelector(".sticker_content_list").innerHTML += `
            <img src="stickers/canal/${stickers_array[i]}" class="w-auto h-auto">
        `
    }

    for (i = 0; i < followers_array.length; i++) {
        document.querySelector(".sticker_followers_content_list").innerHTML += `
            <img src="stickers/followers/${followers_array[i]}" class="w-auto h-auto">
        `
    }
}