import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { Closure } from "../imports/closure-wiki.js";
import { Source } from "../source.js";
import { GetWiki } from "../imports/getwiki.js";

export class UpOpFile {
    /**
     * 
     * @param {object} data The data object containing necessary information for uploading operator files.
     * @param {string} data.cnname The original name (likely Chinese) of the operator whose files are to be uploaded.
     * @param {string} data.enname The desired page name of the operator. (It is not necessarily English!)
     */
    constructor (data) {
        this.data = data;
    }
    
    async execute () {
        //upload to wiki
        const original = await (new GetWiki()).getWikiText(`${this.data.enname}/File`);
        const data = (await (new Closure()).getOperator(this.data.enname)).charProfile.storyTextAudio;
        const wikitext = Template.op_file(data, original, this.data.enname);
    }

    /**
     * @returns {Promise<Array>} Returns an array of objects containing the availability of the source (boolean) and the description of the source.
     */
    async sourceReady () {
        /**
         * Sources:
         * 1. Closure wiki operator page files
         */

        let results = [];

        // Closure wiki operator page files
        const closure = new Closure();
        const closureData = await closure.getOperator(this.data.enname);

        console.log("stories", closureData.charProfile.storyTextAudio);

        for (let item of closureData.charProfile.storyTextAudio) {
            console.log(item);
        }
    }
}


// only for test use
async function start () {
    const data = await (new Closure()).getOperator("Haruka");
    const source = new Source();
    await source.writeClosure("operator", "Haruka", data);
}

start();