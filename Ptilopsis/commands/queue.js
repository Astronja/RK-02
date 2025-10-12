import { Source } from '../source.js';
import { UpOpFile } from './up-opfile.js';
import { UpOpDialogue } from './up-opdialogue.js';
import { Closure } from '../imports/closure-wiki.js';

export class Queue {

    /**
     * 
     * @param {string} message The original message from the user.
     */
    constructor (message) {
        this.message = message;
    }

    async execute () {
        const command = this.message.replace('queue', '').trim();
        switch (command.split(' ')[0]) {
            case 'add':
                return await this.addTask(command);
            case 'start':
                return await this.startTask();
        }
    }

    async addTask (command) {
        const name = command.replace("add", "").trim();
        console.log(name);
        return await (new Source()).addQueue(name);
    }

    async readTask () {
        return await (new Source()).readQueue();
    }

    async startTask () {
        let resultList = [];
        const source = new Source();
        const closure = new Closure();
        const taskList = await this.readTask();
        if (taskList.length > 0) {
            for (let item of taskList) {
                const enname = await source.readReference(item);
                if (await closure.writeOperatorData(enname)) {
                    /*
                    const opFile = new UpOpFile({ cnname: item, enname: enname});
                    resultList.push(await opFile.execute());
                    */
                   
                    const opDialogue = new UpOpDialogue({ cnname: item, enname: enname});
                    resultList.push(await opDialogue.execute());
                }
            }
        }
        return resultList.join("\n");
    }
}