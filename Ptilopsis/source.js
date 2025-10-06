import fs from 'fs/promises';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + "/sources/";
dotenv.config({ path: __dirname + '.env' });

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
}