import { Ping } from './commands/ping.js';
import { Queue } from './commands/queue.js';
import { Refer } from './commands/refer.js';
import { Upload } from './commands/upload.js';

export class Command {
    constructor() {
        this.name = 'Ptilopsis';
        this.version = '0.0.1';
    }

    static registerCommand () {
        return [
            {
                name: "upload",
                description: "Start an upload session!"
            }
        ]
    }

    async executeCommand (command) {
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

    async slashCommandHandler (interaction) {
        switch (interaction.commandName) {
            case 'upload':
                const uploadCommand = new Upload();
                uploadCommand.execute(interaction);
        }
    }
}