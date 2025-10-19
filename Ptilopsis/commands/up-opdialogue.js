import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { Closure } from "../imports/closure-wiki.js";
import { Source } from "../source.js";

export class UpOpDialogue {
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
        if (await (new Closure()).writeOperatorData(this.data.enname)) {
            const data = (await (new Source()).readClosure('operator', this.data.enname)).charSkins;
            let noe2 = false;
            if (data.length == 1) noe2 = true;
            const wikitext = Template.op_gallery(this.data.enname, data);
            const editor = new Editor();
            const editResult = await editor.edit({
                page_name: `${this.data.enname}/Gallery`,
                wikitext: wikitext,
                summary: `Upload operator gallery for ${this.data.enname}`,
            });
            return `${JSON.stringify(editResult, null, 2)}`;
        } else return `Found invalid source from closure.wiki when uploading ${this.data.enname}'s gallery.`;
    }
}


// only for test use
async function start () {
    const data = await (new Closure()).getOperator("Haruka");
    const source = new Source();
    await source.writeClosure("operator", "Haruka", data);
}

//start();