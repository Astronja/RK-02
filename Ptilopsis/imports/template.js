//import { Editor } from './edit.js';

export class Event {
    constructor (event_name) {
        this.name = event_name;
    }
    

    OST (data) {
        let wikitext = '';
        function ss () {

        }

        function ccb () {

        }

        function sc () {

        }

        function ms () {

        }
        switch (this.type) {
            
        }
    }
    
}

export class Operator {
    constructor (names) {
        /*
        this.cnname = names.cnname;
        this.enname = names.enname;
        this.eventcnname = names.eventcnname;
        this.eventenname = names.eventenname;
        */
    }


    /**
     * @param {object} data 
     */
    intro (data) {
        const lines = data.split("\n");
        let isText = false;
        let isQuote = false;
        let text = '';
        let quote = '';
        for (let item of lines) {
            if (item.startsWith('“')) {
                isQuote = true;
            }
            if (isText) {
                text = text + item + '<br/>';
            } else if (isQuote) {
                if (item.startsWith('___')) {
                    isQuote = false;
                    isText = true;
                } else if (item != '') {
                    quote = quote + item + '<br/>';
                }
            }
        }
        const wikitext = `{{Operator intro\n|translator = YOUR_USERNAME\n|quote = ${quote}\n|text = ${text}\n|source = ${data.source}}}`;
        console.log(wikitext);
        return wikitext;
    }
}

export class Music {
    constructor (type) {
        this.type
    }
}


// only for test use
async function start () {
    const text = `【新增干员】\n//三角初华\n“你好，我叫三角......初华。欸，小祥已经和你介绍过了？！她、她是怎么介绍我的？”\n\n____________\n欢迎打开梦城堡的大门，这里欢迎每一个烦恼的孩子\n一位善于隐藏情感的少女，梦到自己变成了一名佩洛\n她生活在无名海岛的别墅中\n她最重要的朋友即将从远方归来\n她们约定好了以后一起在这里生活下去\n那么她的愿望，一定会实现吧？\n欢迎来到\n另一个Ave Mujica的世界\n在这里的你，会是怎样一副样貌？`;

    const template = new Operator();
    const wikitext = template.intro(text);
    console.log(wikitext);
}

//start();