import { edit } from '../imports/editor.js';
import template from '../utils/template.js';
import source from '../source.js';
import wiki from "../imports/getwiki.js";

export class UpOpFile {
    /**
     * 
     * @param {object} data The data object containing necessary information for uploading operator files.
     * @param {string} data.cnname The original name (likely Chinese) of the operator whose files are to be uploaded.
     * @param {string} data.enname The desired page name of the operator. (It is not necessarily English!)
     */
    constructor (name) {
        this.name = name;
    }
    
    async execute () {
        //upload to wiki
        const original = await wiki.getWikiText(`${this.name}/File`);
        const data = (await source.readOperatorData(this.name)).handbookInfo.storyTextAudio;
        const wikitext = template.op_file(data, original, this.name);
        const editResult = await edit({
            page_name: `${this.name}/File`,
            wikitext: wikitext,
            summary: `Upload operator archives for ${this.name}`,
        });
        return `${JSON.stringify(editResult)}`;
    }
}


// only for test use
async function start () {

}

//start();