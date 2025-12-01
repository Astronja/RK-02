import { edit } from '../imports/editor.js';
import template from '../utils/template.js';
import source from '../source.js';

export class PV {
    constructor (command, url) {
        this.command = command;
        this.url = url;
    }

    async execute () {
        return "This command is not available.";
        await this.parseData();
        return "received.";
    }

    async parseData () {
        const json = await fetch(this.url);
        const object = await json.json();
        this.data = object;
    }
}