import source from '../source.js';

export class Refer {
    constructor (command) {
        this.command = command;
    }

    async execute () {
        const args = this.command.replace("refer", "").trim().split("->");
        if (args.length != 2) {
            return "Please provide correct numbers of parameters.";
        }
        await source.writeReference(args[0].trim(), args[1].trim());
        return `Referring "${args[0].trim()}" as "${args[1].trim()}".`;
    }
}