import fs from 'fs/promises';

export class GetWiki {
    constructor (command) {
        this.url = 'https://arknights.wiki.gg/api.php?';
        this.command = command.replace('wiki', '').trim();
    }
    
    async process () {
        console.log(this.command);
        const commandList = this.command.split(' ');
        switch (commandList[0]) {
            case 'wt':
                return await this.getWT(this.command.replace('wt', '').trim());
            case 'cm':
                return await this.listCM(this.command.replace('cm', '').trim());
            case 'iu':
                return await this.getIU(this.command.replace('iu', '').trim());
            case 'itr':
                return await this.introduction(this.command.replace('itr', '').trim());
        }
    }

    async getWT (page_name) {
        const params = {
            action: 'parse',
            prop: 'wikitext',
            page: page_name,
            format: 'json'
        }
        const response = await (await fetch(this.url + new URLSearchParams(params))).json();
        if (response.error) {
            return response.error.info;
        } else {
            return response.parse.wikitext;
        }
    }
    
    async listCM (category_name) {
        if (!category_name.startsWith('Category:')) {
            category_name = 'Category:' + category_name;
        }
        const params = {
            action: 'query',
            list: 'categorymembers',
            cmtitle: category_name,
            cmlimit: 500,
            format: 'json'
        }
        const response = await (await fetch(this.url + new URLSearchParams(params))).json();
        if (response.error) {
            return response.error.info;
        } else {
            const json = Buffer.from(JSON.stringify(response.query.categorymembers, null, 2));
            const path = './data.json';
            await fs.writeFile(path, json, 'utf8');
            return {
                content: `CM of ${category_name}.`,
                files: [path]
            };
        }
    }
    
    async getIU (file_name) {
        
        let fn = file_name;
        if (!file_name.startsWith('File:')) {
            fn = 'File:' + file_name;
        }
        const params = {
            action: 'query',
            prop: 'imageinfo',
            titles: fn,
            iiprop: 'url',
            format: 'json'
        }
        const response = await (await fetch(this.url + new URLSearchParams(params))).json();
        if (response.error) {
            return response.error.info;
        } else {
            const pageid = Object.keys(response.query.pages)[0];
            return response.query.pages[pageid].imageinfo[0].url;
        }
    }

    async introduction(page_name) {
        const params = {
            action: 'parse',
            page: page_name,
            format: 'json'
        }
        const response = await (await fetch(this.url + new URLSearchParams(params))).json();
        if (response.error) {
            return response.error.info;
        } else {
            const properties = response.parse.properties;
            let result = {};
            for (let item of properties) {
                if (item.name == 'description') {
                    result.desc = item['*'];
                } else if (item.name == 'page_image_free') {
                    result.thumbnail = await this.getIU(item['*']);
                }
            }
            console.log(result);
            return result;
        }
    }
}