import { Ping } from './commands/ping.js';
import { Queue } from './commands/queue.js';
import { Refer } from './commands/refer.js';

export class Command {
    constructor() {
        this.name = 'Ptilopsis';
        this.version = '0.0.1';
    }

    async executeCommand(command) {
        switch (command.split(" ")[0]) {
            case 'ping':
                const pingCommand = new Ping();
                return pingCommand.execute();
            case 'refer':
                const referCommand = new Refer(command);
                return await referCommand.execute();
            case 'queue':
                const queueCommand = new Queue(command);
                return await queueCommand.execute();
            default:
                return `Unknown command: ${command.split(" ")[0]}`;
        }
    }
}