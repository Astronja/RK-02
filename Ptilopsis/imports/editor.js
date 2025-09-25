import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + '/.env' });

export class Editor {
    constructor () {
        this.baseUrl = 'https://arknights.wiki.gg/api.php';
    }

    /** 
    * Execute edit action on wiki page.
    * @param {object} source The source code needed to be uploaded to wiki, including config & other params sepcified below.
    * @param {string} source.page_name The name of the page that needs to be modified, the page can be not yet created.
    * @param {string} source.wikitext The wikitext needs to be uploaded to the page
    * @param {string} source.summary The comment you want to leave for this edit, maybe you want to indicate that this is a bot edit.
    * @returns {object} The edit result rertrieved from the wiki.
    */ 
    async edit (source) {
        try {
            await this.login();
            await this.delay();
            const editToken = await this.getToken(this.cookies, 'csrf');
            await this.delay();
            const params = new URLSearchParams({
                action: 'edit',
                title: source.page_name,
                text: source.wikitext,
                summary: source.summary,
                bot: true,
                minor: true,
                token: editToken,
                format: 'json'
            });
            const response = await fetch(this.baseUrl + "?", {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': this.cookies,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                    'Origin': 'https://arknights.wiki.gg',
                    'Referer': `https://arknights.wiki.gg/wiki/${encodeURIComponent(source.page_name)}`,
                    'Accept': 'application/json, */*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin'
                }
            });
            const result = await response.json();
            if (result.edit && result.edit.result === 'Success') {
                console.log(`Edit successful: ${source.page_name}`);
                return {
                    success: true,
                    newRevId: result.edit.newrevid
                };
            } else {
                console.error('Edit failed:', result);
                return {
                    success: false,
                    error: result.error || result.edit
                };
            }
        } catch (error) {
            console.error('Edit error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 
     * @param {string} file_name 
     * @param {string} fileUrl 
     */
    async upload (file_name, fileUrl) {
        try {
            await this.login();
            const uploadToken = await this.getToken(this.cookies, 'csrf');
            const params = {
                action: 'upload',
                format: 'json'
            }
        } catch (err) {
            
        }
    }

    async login () {
        await this.getCookies();
        const loginToken = await this.getToken(this.cookies, 'login');
        const lgParams = new URLSearchParams({
            action: 'login',
            lgname: process.env.botUser,
            lgpassword: process.env.botPassword,
            lgtoken: loginToken,
            format: 'json'
        });
        const lgResponse = await fetch(this.baseUrl + "?", {
            method: 'POST',
            body: lgParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': this.cookies,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Origin': 'https://arknights.wiki.gg',
                'Referer': 'https://arknights.wiki.gg/w/index.php?title=Special:UserLogin',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                'Connection': 'keep-alive',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'TE': 'trailers'
            }
        });
        const cookies = lgResponse.headers.getSetCookie();
        this.cookies = cookies;
        console.log(await lgResponse.json());
        return;
    }
   
    async getCookies () {
        const lgParams = new URLSearchParams({
            action: 'login',
            lgname: 'xxx',
            lgpassword: 'xxx',
            logintoken: 'xxx',
            format: 'json'
        });
        const getResponse = await fetch(this.baseUrl, {
            method: 'POST',
            body: lgParams,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',    
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0'
            }
        });
        const cookies = getResponse.headers.getSetCookie();
        this.cookies = cookies;
        return;
    }
    
    /**
     * You will retrieve a acess token from this.
     * @param {*} cookies You can get this via this.cookies.
     * @param {*} type The type of token you want to retrieve from the wiki, it could either be 'login' or 'csrf', 'csrf' for the majorities of the cases.
     * @returns {Promise<string>} The eventual token retrieved from the wiki, it is not processed by encodeURIComponents().
     */
    async getToken(cookies, type) {
        const tkParams = new URLSearchParams({
            action: 'query',
            meta: 'tokens',
            type: type,
            format: 'json'
        });
        
        // Construct proper URL with parameters
        const tokenUrl = `${this.baseUrl}?${tkParams.toString()}`;
        
        const response = await fetch(tokenUrl, {
            headers: {
                'Cookie': cookies,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            }
        });
        
        const result = await response.json();
        const rawToken = result.query.tokens[`${type}token`];
        return (rawToken);
    }

    //delay function
    delay () {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

}