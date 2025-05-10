
/**  Player plugin to set the audio track in the player to the value passed from the URL

*/


videojs.registerPlugin('autoAudioTrackSelection', function()
{
    var myPlayer = this;
    myPlayer.on('loadedmetadata',function()
    {
        var trackLanguage, audioTracks;

        // Get the list of audio tracks in the video asset
        audioTracks = myPlayer.audioTracks();

        // If we have a single or no audio track, we do not need to do anything
        if (audioTracks.length <= 1)
        {
            console.log("Single Audio (%s) track exists in the video, not required to set the track", audioTracks[0].language);
            return;
        }

        // Get the language code passed in the URL
        var langCode = getLangCode();
        console.log ('Lang Code extracted : ', langCode);
        if (null == langCode)
        {
            console.log("Invlid Lang code, so not setting the audio track");
            return;
        }
        /* Now we have the valid lang code, and we have more than one audio track, so we can try to set the audio track to the lang code (ISO 639-1 code)
        */
        var isAudioTrackSet = false; // Just to check if we were able to set the track successfully
        for (var i = 0; i < (audioTracks.length); i++)
        {
            trackLanguage = audioTracks[i].language;
            console.log('Validating langCode %s agaist the audio track %s', langCode, trackLanguage);

            // Set the track language to the one passed in the URL
            if (trackLanguage)
            {
                // When the track language matches the browser language, then enable that audio track
                if (trackLanguage == langCode)
                {
                    // Only one audio track can be enabled. So the audio track will be selected once it is enabled.
                    audioTracks[i].enabled = true;
                    isAudioTrackSet = true;
                    console.log('Changed the audio track to ', langCode);
                    break;
                }
            }
        }
        if (!isAudioTrackSet)
            console.log('*** Audion Track was not set for lang code:', langCode);
  })
});

// Function to retrive the passed language code from the userLanguage
/**
We assume that the language parameter passed in the URL follows the ISO 639-1
standard.
If a proper language code is not detected, function will return null value
*/
function getLangCode()
{
    var langCode = null;

    // First check the Query string if we have any luck from the query parameter
    // the lang code can be passed as value of 'lang' or 'language' parameter
    // in the URL
    // e.g https://hdfcbank.com/89487394/vidoe/video.html?lang=hi
    // https://hdfcbank.com/89487394/vidoe/video.html?language=hi
    const queryParamList = new URLSearchParams(window.location.search);
    if ((queryParamList.has('lang')) || (queryParamList.has('language')))
    {
        if (queryParamList.has('lang'))
            langCode = queryParamList.get('lang');
        else if (queryParamList.has('language'))
            langCode = queryParamList.get('language');
    }
    else // lang code is not passed as part of query param. So we need to check th e URL path for the lang code.
    {
        // Important note: We expect the language parameter as the first entry in the URL path
        // Example: https://hdfc.com/en/creditcard/mastercard/query
        // we do not expect the parameter in any other place
        var pageUrl = new URL(window.location.href);
        langCode = pageUrl.pathname.split("/")[1];
        console.log('Pathname ', pageUrl.pathname);
        console.log('lang code from URL Path', langCode);

    }
    if (isValidLangCode(langCode))
        return langCode;

    // if nothing works, we will return null
    return null;
}


/**
List of ISO 639-1 language codes.
I copied this from https://gist.github.com/Josantonius/b455e315bc7f790d14b136d61d9ae469
*/
var iso639_1_List =
{
    "aa": "Afar",
    "ab": "Abkhazian",
    "ae": "Avestan",
    "af": "Afrikaans",
    "ak": "Akan",
    "am": "Amharic",
    "an": "Aragonese",
    "ar": "Arabic",
    "ar-ae": "Arabic (U.A.E.)",
    "ar-bh": "Arabic (Bahrain)",
    "ar-dz": "Arabic (Algeria)",
    "ar-eg": "Arabic (Egypt)",
    "ar-iq": "Arabic (Iraq)",
    "ar-jo": "Arabic (Jordan)",
    "ar-kw": "Arabic (Kuwait)",
    "ar-lb": "Arabic (Lebanon)",
    "ar-ly": "Arabic (Libya)",
    "ar-ma": "Arabic (Morocco)",
    "ar-om": "Arabic (Oman)",
    "ar-qa": "Arabic (Qatar)",
    "ar-sa": "Arabic (Saudi Arabia)",
    "ar-sy": "Arabic (Syria)",
    "ar-tn": "Arabic (Tunisia)",
    "ar-ye": "Arabic (Yemen)",
    "as": "Assamese",
    "av": "Avaric",
    "ay": "Aymara",
    "az": "Azeri",
    "ba": "Bashkir",
    "be": "Belarusian",
    "bg": "Bulgarian",
    "bh": "Bihari",
    "bi": "Bislama",
    "bm": "Bambara",
    "bn": "Bengali",
    "bo": "Tibetan",
    "br": "Breton",
    "bs": "Bosnian",
    "ca": "Catalan",
    "ce": "Chechen",
    "ch": "Chamorro",
    "co": "Corsican",
    "cr": "Cree",
    "cs": "Czech",
    "cu": "Church Slavonic",
    "cv": "Chuvash",
    "cy": "Welsh",
    "da": "Danish",
    "de": "German",
    "de-at": "German (Austria)",
    "de-ch": "German (Switzerland)",
    "de-de": "German (Germany)",
    "de-li": "German (Liechtenstein)",
    "de-lu": "German (Luxembourg)",
    "div": "Divehi",
    "dv": "Divehi",
    "dz": "Bhutani",
    "ee": "Ewe",
    "el": "Greek",
    "en": "English",
    "en-au": "English (Australia)",
    "en-bz": "English (Belize)",
    "en-ca": "English (Canada)",
    "en-cb": "English (Caribbean)",
    "en-gb": "English (United Kingdom)",
    "en-ie": "English (Ireland)",
    "en-jm": "English (Jamaica)",
    "en-nz": "English (New Zealand)",
    "en-ph": "English (Philippines)",
    "en-tt": "English (Trinidad and Tobago)",
    "en-us": "English (United States)",
    "en-za": "English (South Africa)",
    "en-zw": "English (Zimbabwe)",
    "eo": "Esperanto",
    "es": "Spanish",
    "es-ar": "Spanish (Argentina)",
    "es-bo": "Spanish (Bolivia)",
    "es-cl": "Spanish (Chile)",
    "es-co": "Spanish (Colombia)",
    "es-cr": "Spanish (Costa Rica)",
    "es-do": "Spanish (Dominican Republic)",
    "es-ec": "Spanish (Ecuador)",
    "es-es": "Spanish (Spain)",
    "es-gt": "Spanish (Guatemala)",
    "es-hn": "Spanish (Honduras)",
    "es-mx": "Spanish (Mexico)",
    "es-ni": "Spanish (Nicaragua)",
    "es-pa": "Spanish (Panama)",
    "es-pe": "Spanish (Peru)",
    "es-pr": "Spanish (Puerto Rico)",
    "es-py": "Spanish (Paraguay)",
    "es-sv": "Spanish (El Salvador)",
    "es-us": "Spanish (United States)",
    "es-uy": "Spanish (Uruguay)",
    "es-ve": "Spanish (Venezuela)",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Farsi",
    "ff": "Fulah",
    "fi": "Finnish",
    "fj": "Fiji",
    "fo": "Faroese",
    "fr": "French",
    "fr-be": "French (Belgium)",
    "fr-ca": "French (Canada)",
    "fr-ch": "French (Switzerland)",
    "fr-fr": "French (France)",
    "fr-lu": "French (Luxembourg)",
    "fr-mc": "French (Monaco)",
    "fy": "Frisian",
    "ga": "Irish",
    "gd": "Gaelic",
    "gl": "Galician",
    "gn": "Guarani",
    "gu": "Gujarati",
    "gv": "Manx",
    "ha": "Hausa",
    "he": "Hebrew",
    "hi": "Hindi",
    "ho": "Hiri Motu",
    "hr": "Croatian",
    "hr-ba": "Croatian (Bosnia and Herzegovina)",
    "hr-hr": "Croatian (Croatia)",
    "ht": "Haitian",
    "hu": "Hungarian",
    "hy": "Armenian",
    "hz": "Herero",
    "ia": "Interlingua",
    "id": "Indonesian",
    "ie": "Interlingue",
    "ig": "Igbo",
    "ii": "Sichuan Yi",
    "ik": "Inupiak",
    "in": "Indonesian",
    "io": "Ido",
    "is": "Icelandic",
    "it": "Italian",
    "it-ch": "Italian (Switzerland)",
    "it-it": "Italian (Italy)",
    "iu": "Inuktitut",
    "iw": "Hebrew",
    "ja": "Japanese",
    "ji": "Yiddish",
    "jv": "Javanese",
    "jw": "Javanese",
    "ka": "Georgian",
    "kg": "Kongo",
    "ki": "Kikuyu",
    "kj": "Kuanyama",
    "kk": "Kazakh",
    "kl": "Greenlandic",
    "km": "Cambodian",
    "kn": "Kannada",
    "ko": "Korean",
    "kok": "Konkani",
    "kr": "Kanuri",
    "ks": "Kashmiri",
    "ku": "Kurdish",
    "kv": "Komi",
    "kw": "Cornish",
    "ky": "Kirghiz",
    "kz": "Kyrgyz",
    "la": "Latin",
    "lb": "Luxembourgish",
    "lg": "Ganda",
    "li": "Limburgan",
    "ln": "Lingala",
    "lo": "Laothian",
    "ls": "Slovenian",
    "lt": "Lithuanian",
    "lu": "Luba-Katanga",
    "lv": "Latvian",
    "mg": "Malagasy",
    "mh": "Marshallese",
    "mi": "Maori",
    "mk": "FYRO Macedonian",
    "ml": "Malayalam",
    "mn": "Mongolian",
    "mo": "Moldavian",
    "mr": "Marathi",
    "ms": "Malay",
    "ms-bn": "Malay (Brunei Darussalam)",
    "ms-my": "Malay (Malaysia)",
    "mt": "Maltese",
    "my": "Burmese",
    "na": "Nauru",
    "nb": "Norwegian (Bokmal)",
    "nd": "North Ndebele",
    "ne": "Nepali (India)",
    "ng": "Ndonga",
    "nl": "Dutch",
    "nl-be": "Dutch (Belgium)",
    "nl-nl": "Dutch (Netherlands)",
    "nn": "Norwegian (Nynorsk)",
    "no": "Norwegian",
    "nr": "South Ndebele",
    "ns": "Northern Sotho",
    "nv": "Navajo",
    "ny": "Chichewa",
    "oc": "Occitan",
    "oj": "Ojibwa",
    "om": "(Afan)/Oromoor/Oriya",
    "or": "Oriya",
    "os": "Ossetian",
    "pa": "Punjabi",
    "pi": "Pali",
    "pl": "Polish",
    "ps": "Pashto/Pushto",
    "pt": "Portuguese",
    "pt-br": "Portuguese (Brazil)",
    "pt-pt": "Portuguese (Portugal)",
    "qu": "Quechua",
    "qu-bo": "Quechua (Bolivia)",
    "qu-ec": "Quechua (Ecuador)",
    "qu-pe": "Quechua (Peru)",
    "rm": "Rhaeto-Romanic",
    "rn": "Kirundi",
    "ro": "Romanian",
    "ru": "Russian",
    "rw": "Kinyarwanda",
    "sa": "Sanskrit",
    "sb": "Sorbian",
    "sc": "Sardinian",
    "sd": "Sindhi",
    "se": "Sami",
    "se-fi": "Sami (Finland)",
    "se-no": "Sami (Norway)",
    "se-se": "Sami (Sweden)",
    "sg": "Sangro",
    "sh": "Serbo-Croatian",
    "si": "Singhalese",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "sr-ba": "Serbian (Bosnia and Herzegovina)",
    "sr-sp": "Serbian (Serbia and Montenegro)",
    "ss": "Siswati",
    "st": "Sesotho",
    "su": "Sundanese",
    "sv": "Swedish",
    "sv-fi": "Swedish (Finland)",
    "sv-se": "Swedish (Sweden)",
    "sw": "Swahili",
    "sx": "Sutu",
    "syr": "Syriac",
    "ta": "Tamil",
    "te": "Telugu",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tonga",
    "tr": "Turkish",
    "ts": "Tsonga",
    "tt": "Tatar",
    "tw": "Twi",
    "ty": "Tahitian",
    "ug": "Uighur",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "us": "English",
    "uz": "Uzbek",
    "ve": "Venda",
    "vi": "Vietnamese",
    "vo": "Volapuk",
    "wa": "Walloon",
    "wo": "Wolof",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "za": "Zhuang",
    "zh": "Chinese",
    "zh-cn": "Chinese (China)",
    "zh-hk": "Chinese (Hong Kong SAR)",
    "zh-mo": "Chinese (Macau SAR)",
    "zh-sg": "Chinese (Singapore)",
    "zh-tw": "Chinese (Taiwan)",
    "zu": "Zulu"
};

// Function that checks if the lang code is valid ISO 639-1 code or not
// return flase if not valid
function isValidLangCode(lnCode)
{
    console.log('isValidLangCode() lnCode:', lnCode);
    if (null == lnCode)
        return false;

    if(0 == lnCode.trim().length)
        return false;

    console.log('lang code object type', typeof iso639_1_List[lnCode]);

    // Note that in our system, the lang code can be in upper case e.g  es-MX
    // but in our standard langCode structure, all are in lowercase
    if ("undefined" == typeof iso639_1_List[lnCode.toLowerCase()])
        return false;

    return true;
}
