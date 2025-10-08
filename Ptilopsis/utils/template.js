export class Template {

    /**
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
        console.log(footer);
        /*
        original.replace("{{Operator tab}}", "")
            .replace("{{Translation|article}}", "")
            .replace(`[[Category: ${enname}]]`, "")
            .replace("[[Category: Operator files]]", "");
        */

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

//only for test use

async function test () {

}


//test();