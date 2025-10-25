export class Template {

    /**
     * Initialization of ~/OPERATOR page.
     * @param {object} data The data regarding the operator
     */
    static op_main () {
        const header = "{{Operator notice|unreleased}}";
        const info = formatCell({
            name: "Operator info",
            content: {
                name: "Snegurochka", // proper page name (e.g. Snegurochka)
                name2: "", // alternative name (e.g. Russian: Снегурочка 🤶)
                catname: "", // 
                class: "Vanguard", //
                branch: "Agent",
                faction: "Ursus",
                rarity: 4,
                position: "Melee",
                tags: "DP-Recovery, Fast-Redeploy",
                trait: "Has {{Color|reduced|kw}} Redeployment Time, can use ranged attacks",
                headhunting: "standard cn",
                desc: "Vanguard Operator Snegurochka treats every data with utmost care.",
                quote: "Not every problem in the world has solution, but she tries to look for one.",
                cn: true
            }
        });
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
    let wikitext = `{{${data.name}\n`;
    for (let key in data.content) wikitext+=`|${key} = ${data.content[key]}\n`;
    return wikitext + "}}\n";
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

//only for test use

async function test () {
    console.log(parseCell(Template.op_main()));
}


//test();