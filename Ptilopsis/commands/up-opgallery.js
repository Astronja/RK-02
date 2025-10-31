import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { closure } from "../imports/closure-wiki.js";
import { source } from "../source.js";
import reference from "../utils/reference.js";

export class UpOpGallery {
    constructor (name) {
        this.name = name;
    }
    
    async execute () {
        const data = (await source.readOperatorData(this.name)).charSkins;
        let noe2 = false;
        if (data.length == 1) noe2 = true;
        const wikitext = Template.op_gallery(this.name, noe2);
        const editor = new Editor();
        const editResult = await editor.edit({
            page_name: `${this.name}/Gallery`,
            wikitext: wikitext,
            summary: `Upload operator gallery for ${this.name}`,
        });
        return `${JSON.stringify(editResult)}`;
    }
}

async function start () {
    const data = (await source.readOperatorData("Haruka")).charSkins;
    let noe2 = false;
    if (data.length == 1) noe2 = true;
    const wikitext = Template.op_gallery("Haruka", noe2);
    console.log(wikitext);
}

//start();