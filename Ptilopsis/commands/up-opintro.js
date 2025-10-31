import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { source } from "../source.js";
import reference from "../utils/reference.js";

export class UpOpIntro {
    constructor (data) {
        this.data = data;
    }

    async execute () {
        //upload to wiki
        const result = Template.op_intro(this.data);
        const source = new Source();
        if (await source.readReference(result.name) != undefined) {
            const enOpName = await source.readReference(result.name);
            const editor = new Editor();
            const editResult = await editor.edit({
                page_name: `${enOpName}/File`,
                wikitext: result.wikitext,
                summary: `Upload operator introduction for ${result.name}`,
            });
            return `\`\`\`${JSON.stringify(editResult, null, 2)}\`\`\``;
        } else {
            console.log(`No such operator named "${result.name}" exist in reference sheet.`);
            return `No such operator named "${result.name}" exist in reference sheet.`;
        }
    }
}