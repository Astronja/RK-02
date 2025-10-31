import { source } from '../source.js';
import slugify from 'slugify';
import { closure } from '../imports/closure-wiki.js';
import compileTask from '../utils/task-compiler.js';
import { UpOperator } from './up-opmain.js';
import { UpOpFile } from './up-opfile.js';
import { UpOpDialogue } from './up-opdialogue.js';
import { UpOpGallery } from './up-opgallery.js';

export class Upload {
    constructor (interaction) {
        this.interaction = interaction;
        this.resultLogs = "";
    }

    async execute () {
        //await this.downloadOperatorData();
        await this.updateProcess(this.interaction);
    }

    async downloadOperatorData () {
        let data = await closure.getOperator("Akkord");
        await source.writeOperatorData("Akkord", data);
        await delay(3000);
        data = await closure.getOperator("Hadiya");
        await source.writeOperatorData("Hadiya", data);
        await delay(3000);
        data = await closure.getOperator("Snow Hunter");
        await source.writeOperatorData("Snow Hunter", data);
        await delay(3000);
        data = await closure.getOperator("Astgenne the Lightchaser");
        await source.writeOperatorData("Astgenne the Lightchaser", data);
        await delay(3000);
        data = await closure.getOperator("Pramanix the Prerita");
        await source.writeOperatorData("Pramanix the Prerita", data);
        await delay(3000);
        data = await closure.getOperator("SilverAsh the Reignfrost");
        await source.writeOperatorData("SilverAsh the Reignfrost", data);
    }

    async getTasks () {
        return await source.readTasks();
    }

    async updateLogs (message) {
        if (this.ephemeral) {
            await this.interaction.editReply(message);
        } else {
            await this.logmessage.edit(message);
        }
    }

    async updateProcess (interaction) {
        try {
            const startTime = Date.now();
            const elapse = `Elapse: <t:${Math.floor(startTime / 1000)}:R>\n`;
            let list = await this.getTasks();
            if (list.length > 20) {
                this.ephemeral = false;
                await interaction.editReply("Processing a large number of items, creating a new message for logs...");
                this.logmessage = await interaction.channel.send("``New logs session.``");
            } else {
                this.ephemeral = true;
            }
            await this.updateLogs({
                content: elapse,
                files: [await this.formatLog("Execution started.")]
            });
            let success = 0;
            for (var i = 0; i < list.length; i++) {
                await delay(5000);
                const log = `(${i + 1}) ${await this.toIssue(list[i])}`;
                if (!log.includes("ERROR")) success++;
                const progress = `(${i + 1}/${list.length})`;
                const percentage = `${Math.round((i + 1)/list.length*10000)/100}%`;
                const barLength = 60;
                const bar = "``[" + "#".repeat(Math.round((i + 1)/list.length*barLength)) + ".".repeat(barLength - Math.round((i + 1)/list.length*barLength)) + "]``";
                await this.updateLogs({
                    content: elapse + progress + "\n" + percentage + "\n" + bar,
                    files: [await this.formatLog(log)]
                });
            }
            const endTime = Date.now();
            await delay(5000);
            await this.updateLogs({ files: [await this.formatLog(`(${success}/${list.length}) item(s) successfully issued.`)] });
            await this.updateLogs({ files: [await this.formatLog(`Execution completed, process time: ${`${Math.floor(Math.round((endTime - startTime) / 1000)/3600)}h${Math.floor((Math.round((endTime - startTime) / 1000)%3600)/60)}m${Math.round((endTime - startTime) / 1000) % 60}s`}`)]});
        } catch (error) {
            console.error(error);
            await this.updateLogs({ files: [await this.formatLog("Execution failed. (Code: -1 Unexpected error)")] });
        }
        await source.unlinkUpdateLog();
    }

    /**
     * @param {object} task 
     * @param {string} task.pagetype
     * @param {string} task.opname
     * @param {string} task.pagename
     * @param {string} task.slug
     * @param {object} task.data
     * @returns {Promise<string>} The result log of the issue process.
     */
    async toIssue (task) {
        try {
            switch (task.uploadtype) {
                //case "operator-main":
                    //const upmain = new UpOperator(task.opname, task.pagename, task.slug, task.data);
                    //return await upmain.execute();
                case "operator_file":
                    const upfile = new UpOpFile(task.opname);
                    return await upfile.execute();
                case "operator_dialogue":
                    const updialogue = new UpOpDialogue(task.opname);
                    return await updialogue.execute();
                case "operator_gallery":
                    const upgallery = new UpOpGallery(task.opname);
                    return await upgallery.execute();
                default:
                    return `[ERROR] Unknown page type: ${task.pagetype}`;
            }
        } catch (error) {
            console.log(error);
            return `[ERROR] ${error}`;
        }
    }

    async formatLog (msg) {
        const message = this.resultLogs + `[Ptilopsis][${(new Date()).toTimeString().split(" ")[0]}] ${msg}`;
        this.resultLogs+=`[Ptilopsis][${(new Date()).toTimeString().split(" ")[0]}] ${msg}\n`;
        return await source.bufferUpdateLog(message);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function start () {
    await compileTask("Akkord");
    await compileTask("Hadiya");
    await compileTask("Snow Hunter");
    await compileTask("Astgenne the Lightchaser");
    await compileTask("Pramanix the Prerita");
    await compileTask("SilverAsh the Reignfrost");
}

//start();