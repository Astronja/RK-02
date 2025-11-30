import { Template } from "../utils/template.js";
import { edit } from "../imports/editor.js";
import { source } from "../source.js";

export class UpOpDialogue {

    constructor (name) {
        this.name = name;
    }
    
    async execute () {
        //upload to wiki
        const data = (await source.readOperatorData(this.name)).charWords;
        const wikitext = Template.op_dialogue(this.name, data);
        const editResult = await edit({
            page_name: `${this.name}/Dialogue`,
            wikitext: wikitext,
            summary: `Upload operator dialogues for ${this.name}`,
        });
        return `${JSON.stringify(editResult)}`;
    }
}


// only for test use
async function start () {
    console.log(Template.op_dialogue("Haruka", (await source.readOperatorData("Haruka")).charWords));
}

//start();