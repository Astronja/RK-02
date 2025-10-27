export class Template {
    /**
     * Initialization of ~/OPERATOR page.
     * @param {object} data The data regarding the operator
     * @param {boolean} init True if creating page
     */
    static op_main (data, init) {
        const wikitextList = [];
        const header = "{{Operator notice|unreleased}}";
        wikitextList.push(header);
        const info = formatCell({
            name: "Operator info",
            content: {
                /**
                 * proper page name
                 * (e.g. Snegurochka)
                 * Provided in: INITIAL
                 */
                name: "Snegurochka",
                //catname: "", // this is probably deprecated
                /**
                 * operator's profession
                 * (e.g. Vanguard)
                 * Provided in: INITIAL
                 */
                class: "Vanguard",
                /**
                 * operator's profession branch
                 * (e.g. Agent)
                 * Provided in: INITIAL
                 */
                branch: "Agent",
                /**
                 * operator's faction
                 * (e.g. Rhodes Island)
                 * Provided in: INITIAL
                 */
                faction: "Ursus",
                /**
                 * operator's rarity
                 * (e.g. 4)
                 * Provided in: INITIAL
                 */
                rarity: 4,
                /**
                 * operator's position
                 * (e.g. Melee)
                 * Provided in: INITIAL
                 */
                position: "Melee",
                /**
                 * operator's tags
                 * (e.g. DP-Recovery, Fast-Redeploy)
                 * Provided in: RELEASE
                 */
                tags: "DP-Recovery, Fast-Redeploy",
                /**
                 * operator's trait
                 * (e.g. DP-Recovery, Fast-Redeploy)
                 * Provided in: RELEASE
                 */
                trait: "Has {{Color|reduced|kw}} Redeployment Time, can use ranged attacks",
                /**
                 * operator's available headhunting banner
                 * (e.g. standard cn)
                 * Provided in: INITIAL
                 */
                headhunting: "standard cn",
                /**
                 * operator's description (do not mix up with trait)
                 * (e.g. "Vanguard Operator Snegurochka treats every data with utmost care.")
                 * Provided in: RELEASE
                 */
                desc: "Vanguard Operator Snegurochka treats every data with utmost care.",
                /**
                 * opeartor's quote (in game) 
                 * (e.g. "Not every problem in the world has solution, but she tries to look for one.")
                 * Provided in: RELEASE
                 */
                quote: "Not every problem in the world has solution, but she tries to look for one.",
                /**
                 * true if this operator is explicit to cn server
                 * (e.g. true)
                 * Provided in: INITIAL
                 */
                cn: true
            }
        });
        wikitextList.push(info);
        const optab = "{{Operator tab}}";
        wikitextList.push(optab);
        const infobox = formatCell({
            name: "Operator infobox",
            content: {
                /**
                 * operator's English or romanized name, usually same with the page name
                 * Provided in: INITIAL
                 */
                name: "Snegurochka", 
                /**
                 * pronounciation of the name
                 * Provided in: MANUAL
                 */
                pronunc: "[[wikipedia:Help:IPA/Russian/|/sʲnʲɪˈɡurət͡ɕkə, sʲnʲɪˈɡurkə/]]",
                /**
                 * rarity, in format of `${num}star`
                 * Provided in: INITIAL
                 */
                rarity: "4star",
                /**
                 * since this page will be created before opeartor is officially released, this part will be commented out to avoid exceptions
                 * Provided in: INITIAL
                 */
                image: "<!--\nSnegurochka.png:Base;\nSnegurochka Elite 2.png:Elite 2\n-->",
                /**
                 * operator's cn name
                 * Provided in: INITIAL
                 */
                cnname: "冬时",
                /**
                 * since usually the operator's name is already in English, this is not commonly used
                 * Provided in: INITIAL
                 */
                enname: "Snegurochka",
                /**
                 * operator's japanese name
                 * Provided in: MANUAL
                 */
                jpname: "",
                /**
                 * operator's korean name
                 * Provided in: MANUAL
                 */
                krname: "",
                /**
                 * operator realname
                 * Provided in: MANUAL
                 */
                realname: "{{Names|text=Ksenia Markovna Nelyudova|cn=科谢尼娅·马尔科芙娜·涅留朵娃}}",
                /**
                 * operator's nickname (or alternative one)
                 * Provided in: MANUAL
                 */
                othername: "",
                /**
                 * operator's EP
                 * Provided in: MANUAL
                 */
                theme: "",
                /**
                 * operator's basis, usually animals
                 * Provided in: MANUAL
                 */
                basis: "[[wikipedia:Daurian jackdaw|Daurian jackdaw]] (''Coloeus dauuricus'')",
                /**
                 * operator's name's etymology
                 * Provided in: MANUAL
                 */
                etymology: "[[wikipedia:Snegurochka|Snegurochka in Russian fairy tales]]",
                /**
                 * operator's in-game code
                 * Provided in: RELEASE
                 */
                filename: "char_4208_wintim",
                /**
                 * operator's archive code
                 * Provided in: RELEASE
                 */
                fileno: "US38",
                //appearance: "", // deprecated
                /**
                 * illustrator of the operator
                 * Provided in: INITIAL
                 */
                illustrator: "3MO",
                /**
                 * operator's Japanese voice
                 * Provided in: INITIAL
                 */
                jpcv: "Saya Hitomi",
                /**
                 * operator's Mandarin voice
                 * Provided in: INITIAL
                 */
                cncv: "Wang Yaxin",
                /**
                 * operator's English voice
                 * Provided in: MANUAL
                 */
                encv: "",
                /**
                 * operator's Korean voice
                 * Provided in: MANUAL
                 */
                krcv: "",
                /**
                 * operator's gender
                 * Provided in: INITIAL
                 */
                gender: "Female",
                /**
                 * operator's battling experience, measured in time.
                 * Provided in: RELEASE
                 */
                experience: "None",
                /**
                 * operator's birthplace
                 * Provided in: RELEASE
                 */
                birthplace: "Ursus",
                /**
                 * operator's birthdate
                 * Provided in: RELEASE
                 */
                birthdate: "December 1st",
                /**
                 * operator's race
                 * Provided in: RELEASE
                 */
                race: "[[Liberi]]",
                /**
                 * operator's physical height
                 * Provided in: RELEASE
                 */
                height: "170 cm",
                /**
                 * operator's infection status, if infected: "Confirmed [[Infected]] by medical examination.", "Confirmed Uninfected by medical examination." vice versa
                 * Provided in: RELEASE
                 */
                infection: "Medical tests have confirmed that no infection is present.",
                /**
                 * rated by 8 levels: feeble, flawed, normal, standard, average, outstanding, exceptional
                 * Provided in: RELEASE
                 */
                strength: "",
                /**
                 * see above
                 * Provided in: RELEASE
                 */
                mobility: "",
                /**
                 * see above
                 * Provided in: RELEASE
                 */
                endurance: "",
                /**
                 * see above
                 * Provided in: RELEASE
                 */
                tactical: "",
                /**
                 * see above
                 * Provided in: RELEASE
                 */
                skill: "", // see above
                /**
                 * see above
                 * Provided in: RELEASE
                 */
                originium: ""
            }
        });
        wikitextList.push(infobox);
        const summary = "'''Snegurochka''' is a [[4-star|4★]] [[Ursus|Ursine]] [[Agent Vanguard]] [[Operator]] in ''[[Arknights]]'', introduced in [[Abnormal Spectrum]]."
        // const summary = '''{{subst:#titleparts:{{subst:PAGENAME}}}}''' is a [[-star|★]] [[]] [[]] [[Operator]] in ''[[Arknights]]'', introduced in [[]].
        // ⬆️ this is the one provided in the boiler template.
        wikitextList.push(summary);


        return info;
    }


    /**
     * @param {string} 
     */
    static op_gallery_skin () {
        
    }

    /**
     * Initialization of ~/OPERATOR/Gallery page.
     * @param {string} enname The page name of the operator (usually English).
     * @param {boolean} noe2 True if the operator does not have a E2 art.
     * @returns {string} Returns the generated wikitext for the operator gallery section.
     */
    static op_gallery (enname, noe2) {
        let wikitext = `{{Operator tab}}\n\n==Skins==\n{{Operator skin\n|name = base}}\n{{Operator skin\n|name = e2}}\n\n==Sprites==\n<gallery widths=360px>\n${enname}.webm|gif|${enname}'s Base Sprite\n</gallery>`;
        if (noe2) wikitext = wikitext.replace("\n{{Operator skin\n|name = e2}}", "");
        return wikitext;
    }

    /**
     * Initialization of ~/OPERATOR/Dialogue page.
     * @param {string} enname The page name of the operator (usually English).
     * @param {Array} data The data array containing necessary information.
     * @param {number} data[].voiceIndex The index of the voiceline of the whole dialogue set.
     * @param {string} data[].voiceText The content of the piece of voiceline.
     * @returns {string} Returns the generated wikitext for the operator dialogues section.
     */
    static op_dialogue (enname, data) {
        let wikitext = "{{Operator tab}}\n{{Translation|article}}\n{{Operator dialogue head}}\n";
        let footer = `{{Table end}}\n\n[[Category: ${enname}]]\n[[Category: Operator dialogues]]\n`;
        for (let item of data) wikitext+=`{{Operator dialogue cell2|no=${item.voiceIndex}|dialogue=${item.voiceText}}}\n`;
        return wikitext + footer;
    }

    /**
     * Modification of ~/OPERATOR/File page, prescence of /File page is assumed due to the prior execution of op_intro() 
     * @param {Array} data The data object containing necessary information. 
     * @param {string} data[].storyTitle The title of the archive segment.
     * @param {Array} data[].stories The array of story objects.
     * @param {string} data[].stories[].storyText The text content of the story.
     * @param {string} original The original wikitext of the targeted operator file page, for modification use.
     * @param {string} enname The desired page name of the operator. (It might not necessarily be English!)
     * @returns {string} Returns the generated wikitext for the operator files section.
     */
    static op_file (data, original, enname) {
        let wikitext = "{{Operator tab}}\n{{Translation|article}}\n";
        let footer = `[[Category: ${enname}]]\n[[Category: Operator files]]\n`;
        if (original.includes(`[[Category: ${enname}]]`)) footer = footer.replace(`[[Category: ${enname}]]\n`, "");
        if (original.includes(`[[Category: Operator files]]`)) footer = footer.replace(`[[Category: Operator files]]\n`, "");
        const originalLines = original.split("\n");
        let index = 0;
        while (index < originalLines.length) {
            if (originalLines[index].startsWith("{{Operator tab}}")) wikitext = wikitext.replace("{{Operator tab}}\n", "");
            if (originalLines[index].startsWith("{{Translation|article}}")) wikitext = wikitext.replace("{{Translation|article}}\n", "");
            if (originalLines[index].startsWith("{{Operator intro")) break;
            index++;
        }
        const reference = {
            客观履历: "Profile",
            临床诊断分析: "Clinical Analysis",
            档案资料一: "Archive File 1",
            档案资料二: "Archive File 2",
            档案资料三: "Archive File 3",
            档案资料四: "Archive File 4",
            晋升记录: "Promotion Record"
        }
        for (let item of data) {
            let cell = '{{Archive\n';
            if (item.storyTitle == "客观履历"
                || item.storyTitle == "临床诊断分析"
                || item.storyTitle == "档案资料一"
                || item.storyTitle == "档案资料二"
                || item.storyTitle == "档案资料三"
                || item.storyTitle == "档案资料四"
                || item.storyTitle == "晋升记录"
            ) {
                cell += `|title = ${reference[item.storyTitle]}\n`;
                cell += `|text = ${item.stories[0].storyText.replaceAll("\n", "<br/>")}}}\n`;
                wikitext += cell;
            }
        }
        originalLines.splice(index, 0, wikitext);
        return originalLines.join('\n') + '\n' + footer;
    }

    /**
     * Initialization of ~/OPERATOR/File
     * @param {Object} data The data object containing necessary information.
     * @param {string} data.text The original text to be processed.
     * @param {string} data.source The source URL of the text.
     * @returns {object} Returns an object containing the generated wikitext and the operator name.
     */
    static op_intro (data) {
        let op_name = '';
        const lines = data.text.split("\n");
        let isText = false;
        let isQuote = false;
        let text = '';
        let quote = '';
        for (let item of lines) {
            if (item.startsWith("//")) {
                op_name = item.replace("//", "").trim();
            }
            if (item.startsWith('“')) {
                isQuote = true;
            }
            if (isText) {
                text = text + item + '<br>';
            } else if (isQuote) {
                if (item.startsWith('___')) {
                    isQuote = false;
                    isText = true;
                } else if (item != '') {
                    quote = quote + item + '<br>';
                }
            }
        }
        const wikitext = `{{Operator intro\n|translator = \n|quote = ${quote.replace(/^<br>|<br>$/g, '').replace(/^“|”$/g, '')}\n|text = ${text.replace(/^<br>|<br>$/g, '')}\n|source = ${data.source}}}`;
        return {
            wikitext: wikitext,
            name: op_name
        };
    }
}

const formatCell = (data) => {
    if (typeof(data) == "object") {
        let wikitext = `{{${data.name}\n`;
        for (let key in data.content) wikitext+=`|${key} = ${data.content[key]}\n`;
        return wikitext + "}}\n";
    } else {
        let wikitext = `{{${data[0]}\n`;
        for (var i = 1; i < data.length; i++) wikitext+=`|${data[i]}`;
        return wikitext + "}}\n";
    }
}

/**
 * Parsing wikitext inscribed in templates, only supporting some of the templates.
 * @param {string} wikitext The wikitext CELL that needs to be parsed. It should be using an template and the formate has to be in:
 * {{name
 * |a = apple
 * |b = banana
 * |...}}.
 * @returns {object} Supposedly parsed wikitext.
 */
const parseCell = (wikitext) => {
    wikitext = wikitext.replace(/}}$/, "");
    let cell = { name: "", content: {} };
    const textList = wikitext.split("\n|");
    cell['name'] = textList[0].replaceAll("\n", "").replaceAll("{{", "");
    for (let item of textList) {
        if (item.includes("=")) {
            let string = item.replace(/\n$/, "");
            if (string.startsWith("\n")) string = string.replace("\n", "");
            const splitted = string.split("=");
            const left = splitted[0].trim();
            const right = splitted.join("").replace(left, "").trim();
            cell['content'][left] = right;
        }
    }
    return cell;
}

const getRange = (rangeId) => {
    const range = {
        "1-1": "{{Ranges|s|r}}\n",
        "1-2": "{{Ranges|r|p}}{{Ranges|s|r}}{{Ranges|r|p}}\n",
        "2-3": "{{Ranges|r|r|p}}{{Ranges|s|r|r}}{{Ranges|r|r|p}}\n",
        "3-1": "{{Ranges|r|r|r|p}}\n{{Ranges|s|r|r|r}}\n{{Ranges|r|r|r|p}}\n",
        "3-3": "{{Ranges|r|r|r|r}}\n{{Ranges|s|r|r|r}}\n{{Ranges|r|r|r|r}}\n",
        "3-4": "{{Ranges|r|r|r|p}}\n{{Ranges|r|r|r|r}}\n{{Ranges|s|r|r|r}}\n{{Ranges|r|r|r|r}}\n{{Ranges|r|r|r|p}}\n", // Identical with 3-15, but Lumen used 3-4 and Mostima skill used 3-15
        "3-6": "{{Ranges|r|r|r}}\n{{Ranges|s|r|r}}\n{{Ranges|r|r|r}}\n",
        "3-8": "{{Ranges|r|r|r|r|p}}\n{{Ranges|s|r|r|r|r}}\n{{Ranges|r|r|r|r|p}}\n",
        "3-9": "{{Ranges|r|r|r|p|p}}\n{{Ranges|r|r|r|r|p}}\n{{Ranges|s|r|r|r}|r}\n{{Ranges|r|r|r|r|p}}\n{{Ranges|r|r|r|p|p}}\n",
        "3-10": "{{Ranges|r|r|r|r|r}}\n{{Ranges|s|r|r|r|r}}\n{{Ranges|r|r|r|r|r}}\n",
        "3-15": "{{Ranges|r|r|r|p}}\n{{Ranges|r|r|r|r}}\n{{Ranges|s|r|r|r}}\n{{Ranges|r|r|r|r}}\n{{Ranges|r|r|r|p}}",
        "3-17": "{{Ranges|p|r|r|r}}\n{{Ranges|r|r|r|r}}\n{{Ranges|s|r|r|r}}\n{{Ranges|r|r|r|r}}\n{{Ranges|p|r|r|r}}\n",
        "3-18": "{{Ranges|r|r|p|p}}\n{{Ranges|r|r|r|p}}\n{{Ranges|s|r|r|r}}\n{{Ranges|r|r|r|p}}\n{{Ranges|r|r|p|p}}\n",
        "x-1": "{{Ranges|p|p|r|p|p}}\n{{Ranges|p|r|r|r|p}}\n{{Ranges|r|r|s|r|r}}\n{{Ranges|p|r|r|r|p}}\n{{Ranges|p|p|r|p|p}}\n",
        "x-4": "{{Ranges|r|r|r}}\n{{Ranges|r|s|r}}\n{{Ranges|r|r|r}}\n",
        "y-1": "{{Ranges|r|r|r|p}}\n{{Ranges|r|s|r|r}}\n{{Ranges|r|r|r|p}}\n",
        "y-2": "{{Ranges|r|r|r|r}}\n{{Ranges|r|s|r|r}}\n{{Ranges|r|r|r|r}}\n",
        "y-4": "{{Ranges|r|r|r|p|p}}\n{{Ranges|r|r|r|r|p}}\n{{Ranges|r|s|r|r}|r}\n{{Ranges|r|r|r|r|p}}\n{{Ranges|r|r|r|p|p}}\n"
    }
    return range[rangeId];
}

//only for test use

async function test () {
    console.log(getRange("3-6"));
}


//test();