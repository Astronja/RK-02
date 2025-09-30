import { Ping } from './commands/ping.js';

export class Command {
    constructor() {
        this.name = 'Ptilopsis';
        this.version = '0.0.1';
    }

    async executeCommand(commandName) {
        switch (commandName) {
            case 'ping':
                const pingCommand = new Ping();
                return pingCommand.execute();
            default:
                return `Unknown command: ${commandName}`;
        }
    }

    async uploadOperatorIntro(data) {

    }
}