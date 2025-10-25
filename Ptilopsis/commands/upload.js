import { UpOperator } from './up-opmain.js';
import { UpOpFile } from './up-opfile.js';
import { UpOpDialogue } from './up-opdialogue.js';
import { UpOpGallery } from './up-opgallery.js';

export class Upload {
    constructor () {
        this.resultLogs = '';
    }

    async execute (interaction) {
        try {
            const elapse = `Elapse: <t:${Math.floor(Date.now() / 1000)}:R>`;
            await interaction.editReply(elapse + this.formatLog("Execution started."));
            let list = [];
            for (var i = 0; i < 10; i++) list.push(i);
            let success = '';
            for (var i = 0; i < list.length; i++) {
                await delay(Math.round(Math.random()*5000));
                const log = `(${i + 1}) ${await this.toIssue(i)}`;
                if (!log.includes("ERROR")) success++;
                const progress = `(${i + 1}/${list.length})`;
                const percentage = `${Math.round((i + 1)/list.length*10000)/100}%`;
                const barLength = 40;
                const bar = "``[" + "#".repeat(Math.round((i + 1)/list.length*barLength)) + ".".repeat(barLength - Math.round((i + 1)/list.length*barLength)) + "]``";
                await interaction.editReply(elapse + this.formatLog(log) + progress + "\n" + percentage + "\n" + bar);
            }
            await delay(5000);
            await interaction.editReply(this.formatLog(`(${success}/${list.length}) item(s) successfully issued.`));
            await interaction.editReply(this.formatLog("Execution completed. (Code: 0)"));
        } catch (error) {
            await interaction.editReply(this.formatLog("Execution failed. (Code: -1 Unexpected error)"));
        }
    }

    getTimeString () {
        return (new Date()).toTimeString().split(" ")[0];
    }

    formatLog (msg) {
        const message = "```" + this.resultLogs + `[Ptilopsis][${this.getTimeString()}] ${msg}` + "```";; 
        this.resultLogs+=`[Ptilopsis][${this.getTimeString()}] ${msg}\n`;
        return message;
    }

    /**
     * 
     */
    async toIssue (task) {
        try {
            return "Issued.";
        } catch (error) {
            console.log(error);
            return `[ERROR] ${error}`;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));