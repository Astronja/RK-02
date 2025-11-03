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

/* IMMA REWRITE THIS DOGSHIT
export class Source {
    env (property) {
        return process.env[property];
    }

    async readUser (uname) {
        return JSON.parse(await fs.readFile(__dirname + 'users.json', 'utf8'))[uname];
    }

    async writeUser (uname, data) {
        let users = JSON.parse(await fs.readFile(__dirname + 'users.json', 'utf8'));
        users[uname] = data;
        await fs.writeFile(__dirname + 'users.json', JSON.stringify(users, null, 2));
    }

    referencePath () {
        return __dirname + 'reference.json';
    }

    async readReference (rname) {
        return JSON.parse(await fs.readFile(__dirname + 'reference.json', 'utf8'))[rname];
    }

    async writeReference (rname, data) {
        const file = JSON.parse(await fs.readFile(__dirname + 'reference.json', 'utf8'));
        file[rname] = data;
        await fs.writeFile(__dirname + 'reference.json', JSON.stringify(file, null, 2), 'utf8');
        return `Referring "${rname}" as "${await this.readReference(rname)}"`;
    }

    async writeClosure (type, name, data) {
        if (type != 'operator'
            && type != 'operation'
            && type != 'enemy'
            && type != 'module'
        ) return false;
        await fs.writeFile(__dirname + 'closure/' + type + '/' + name + '.json', JSON.stringify(data, null, 2), 'utf8');
        return true;
    }

    async readClosure (type, name) {
        if (type != 'operator'
            && type != 'operation'
            && type != 'enemy'
            && type != 'module'
        ) return false;
        const path = __dirname + 'closure/' + type + '/' + name + '.json';
        if (await this.checkExist(path)) return JSON.parse(await fs.readFile(path, 'utf8'));
        return false;
    }

    async readQueue () {
        return JSON.parse(await fs.readFile(__dirname + 'queue.json', 'utf8'));
    }

    async addQueue (name) {
        let data = await this.readQueue();
        data.push(name);
        await fs.writeFile(__dirname + 'queue.json', JSON.stringify(data, null, 2), 'utf8');
        return JSON.stringify(await this.readQueue());
    }

    async clearQueue () {
        await fs.writeFile(__dirname + 'queue.json', JSON.stringify([], null, 2), 'utf8');
        return "Task queue is successfully cleared.";
    }

    async checkExist (filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch (err) {
            return false;
        }
    }
}
*/

// only for test use
async function start () {
    const source = new Source();
    console.log(await source.readClosure("operator", "Json"));
}

//start();