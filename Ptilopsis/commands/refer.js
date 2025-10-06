import { Source } from '../source.js';

export class Refer {
    constructor (message) {
        this.message = message;
    }

    async execute () {
        if (this.message == "refer") {
            return await this.readWhole();
        } else {
            return await this.write();
        }
    }

    async readWhole () {
        const source = new Source();
        return {
            content: "Reference sheet is shown below:",
            files: [
                source.referencePath()
            ]
        }
    }

    async write () {
        const args = this.message.replace("refer", "").trim().split("->");
        const source = new Source();
        return await source.writeReference(args[0].trim(), args[1].trim());
    }
}