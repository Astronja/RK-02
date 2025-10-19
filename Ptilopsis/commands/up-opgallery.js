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
            const data = (await (new Source()).readClosure('operator', this.data.enname)).charSkins;
            let noe2 = false;
            if (data.length == 1) noe2 = true;
            const wikitext = Template.op_gallery(this.data.enname, noe2);
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