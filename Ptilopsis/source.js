import fs from 'fs/promises';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + "/sources/";
dotenv.config({ path: __dirname + '.env' });

export class source {
    static env (property) {
        return process.env[property];
    }

    static async bufferUpdateLog (logs) {
        await fs.writeFile(__dirname + "buffers/upload-logs.txt", logs, "utf8");
        return __dirname + "buffers/upload-logs.txt";
    }

    static async unlinkUpdateLog () {
        await fs.unlink(__dirname + "buffers/upload-logs.txt");
    }

    static async readTasks () {
        return JSON.parse(await fs.readFile(__dirname + 'tasks.json', 'utf8'));
    }

    static async pushTask (task) {
        const tasks = await this.readTasks();
        if (!tasks.includes(task)) tasks.push(task);
        await fs.writeFile(__dirname + 'tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
    }

    static async readReference (rname) {
        return JSON.parse(await fs.readFile(__dirname + 'reference.json', 'utf8'))[rname];
    }

    static async writeReference (rname, data) {
        const file = JSON.parse(await fs.readFile(__dirname + 'reference.json', 'utf8'));
        file[rname] = data;
        await fs.writeFile(__dirname + 'reference.json', JSON.stringify(file, null, 2), 'utf8');
    }

    static async readOperatorData (name) {
        return JSON.parse(await fs.readFile(__dirname + 'operators/' + name + '.json', 'utf8'));
    }

    static async writeOperatorData (name, data) {
        await fs.writeFile(__dirname + 'operators/' + name + '.json', JSON.stringify(data, null, 2), 'utf8');
    }
}

// only for test use
async function start () {
    const source = new Source();
    console.log(await source.readClosure("operator", "Json"));
}

//start();