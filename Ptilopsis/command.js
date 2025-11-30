import { Ping } from './commands/ping.js';
import { Upload } from './commands/upload.js';
import { PV } from './commands/pv.js';

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

    async attachmentCommand (command, file) {
        switch (command.split(" ")[0]) {
            case 'pv':
                const pvCommand = new PV(command, file);
                return await pvCommand.execute();
        }
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
            case 'pv':
                const pvCommand = new PV(command);
                return await pvCommand.execute();
            default:
                return `Unknown command: ${command.split(" ")[0]}`;
        }
    }

    async slashCommandHandler (interaction) {
        switch (interaction.commandName) {
            case 'upload':
                const uploadCommand = new Upload(interaction);
                uploadCommand.execute();
        }
    }
}