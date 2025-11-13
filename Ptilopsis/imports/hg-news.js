import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import pkg from 'js-beautify';
const { html } = pkg;

/** 
 * THIS FILE IS NOT WORKING!
 * @deprecated October 2025
 */ 
export class HGNews {
    constructor (newsID) {
        this.newsID = newsID;
    }

    async execute () {
        await this.fetchContent();
        console.log(await this.parseContent());
    }

    async fetchContent () {
        const url = `https://ak.hypergryph.com/news/${this.newsID}?_rsc=1rbip`;
        const response = await fetch(url);
        const file = html(await response.text());
        const dom = new JSDOM(file);
        const document = dom.window.document;
        let targetContentList = document.querySelector('._d6be3557').textContent.split('\n');
        let targetContent = '';
        for (let item of targetContentList) targetContent += (item.trim() + '\n');
        targetContent = targetContent.replace(/^\s*[\r\n]+/gm, '');
        await fs.writeFile('./temp.txt', targetContent, 'utf8');
        this.text = targetContent;
        return targetContent;
    }

    async parseContent () {
        if (this.text == undefined || this.text == "") return "this.fetchContent() probably did not function as expected.";
        let paragraphList = [];
        const textList = this.text.split('\n');
        let paragraph = '';
        let isParagraph = false;
        let title = '';
        let isParagraphBody = false;
        for (let item of textList) {
            if (item.startsWith("更多活动内容请持续关注《明日方舟》游戏内公告及官方公告。")) {
                isParagraph = false;
                isParagraphBody = false;
                paragraphList.push(paragraph);
                paragraph = "";
            }
            if (this.isParagraphTitle(item)) {
                isParagraph = true;
                isParagraphBody = true;
                if (paragraph != "") {
                    paragraphList.push(paragraph);
                }
                paragraph = item//.replace(`${hanNum}、`, "");
            } else if (isParagraphBody) {
                paragraph+=(item + "\n");
            }
            if (!isParagraph && item.startsWith("[")) {
                title = item;
            }
        }
        return {
            title: title,
            paragraphs: paragraphList
        };
    }





    isParagraphTitle (string) {
        let hanNumList = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        for (let hanNum of hanNumList) {
            if (string.startsWith(`${hanNum}、`)) return true;
        }
        return false;
    }
}

// only for test use
async function test () {
    const hg = new HGNews("9609");
    await hg.execute();
}

//test();