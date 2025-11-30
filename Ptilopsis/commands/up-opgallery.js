import { Template } from "../utils/template.js";
import { edit } from "../imports/editor.js";
import { source } from "../source.js";

export class UpOpGallery {
    constructor (name) {
        this.name = name;
    }
    
    async execute () {
        const data = (await source.readOperatorData(this.name)).charSkins;
        let noe2 = false;
        if (data.length == 1) noe2 = true;
        const wikitext = Template.op_gallery(this.name, noe2);
        const editResult = await edit({
            page_name: `${this.name}/Gallery`,
            wikitext: wikitext,
            summary: `Upload operator gallery for ${this.name}`,
        });
        return `${JSON.stringify(editResult, null, 2)}`;
    }
}


// only for test use
async function start () {
    const data = (await source.readOperatorData("Haruka")).charSkins;
    let noe2 = false;
    if (data.length == 1) noe2 = true;
    const wikitext = Template.op_gallery("Haruka", noe2);
    console.log(wikitext);
}

//start();