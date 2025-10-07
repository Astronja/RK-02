import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { Source } from "../source.js";

export class UpOpIntro {
    constructor (data) {
        this.data = data;
    }

    async execute () {
        //upload to wiki
        const template = new Template(this.data);
        const result = template.op_intro();
        const source = new Source();
        if (await source.readReference(result.name) != undefined) {
            const enOpName = await source.readReference(result.name);
            const editor = new Editor();
            const editResult = await editor.edit({
                page_name: `${enOpName}/File`,
                wikitext: result.wikitext,
                summary: "Trial edit for operator intro uploading.",
            });
            return `\`\`\`${JSON.stringify(editResult, null, 2)}\`\`\``;
        } else {
            console.log(`No such operator named "${result.name}" exist in reference sheet.`);
            return `No such operator named "${result.name}" exist in reference sheet.`;
        }
    }
}