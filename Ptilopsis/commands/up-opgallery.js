import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { Closure } from "../imports/closure-wiki.js";
import { Source } from "../source.js";

export class UpOpGallery {
    constructor (data) {
        this.data = data;
    }
    
    async execute () {
        if (await (new Closure()).writeOperatorData(this.data.enname)) {
            const data = (await (new Source()).readClosure('operator', this.data.enname)).charDialog;
            const wikitext = Template.op_dialogue(this.data.enname, data);
            const editor = new Editor();
            const editResult = await editor.edit({
                page_name: `${this.data.enname}/Dialogue`,
                wikitext: wikitext,
                summary: `Upload operator dialogues for ${this.data.enname}`,
            });
            return `${JSON.stringify(editResult, null, 2)}`;
        } else return `Found invalid source from closure.wiki when uploading ${this.data.enname}'s dialogues.`;
    }
}