import { edit } from '../imports/editor.js';
import template from '../utils/template.js';
import source from '../source.js';

export class UpOpIntro {
    constructor (data) {
        this.data = data;
    }

    async execute () {
        //upload to wiki
        const result = template.op_intro(this.data);
        if (await source.readReference(result.name) != undefined) {
            const enOpName = await source.readReference(result.name);
            const editResult = await edit({
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