import { Editor } from '../imports/editor.js';
import { Template } from '../utils/template.js';

export class PV {
    constructor (command, url) {
        this.command = command;
        this.url = url;
    }

    async execute () {
        return "This command is not available.";
        await this.parseJSON();
        return "received.";
    }

    async parseJSON () {
        console.log(this.url);
        const json = await fetch(this.url);
        const object = await json.json();
        this.data = object;
    }
}