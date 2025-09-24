import { Edit } from './edit.js';

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
        this.cnname = names.cnname;
        this.enname = names.enname;
        this.eventcnname = names.eventcnname;
        this.eventenname = names.eventenname;
    }


    /**
     * @param {object} data 
     */
    intro (data) {
        const lines = data.text.split("\n");
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