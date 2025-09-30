export class Template {
    constructor (data) {
        this.data = data;
    }

    op_intro () {
        const lines = this.data.text.split("\n");
        let isText = false;
        let isQuote = false;
        let text = '';
        let quote = '';
        for (let item of lines) {
            if (item.startsWith('“')) {
                isQuote = true;
            }
            if (isText) {
                text = text + item + '<br>';
            } else if (isQuote) {
                if (item.startsWith('___')) {
                    isQuote = false;
                    isText = true;
                } else if (item != '') {
                    quote = quote + item + '<br>';
                }
            }
        }
        const wikitext = `{{Operator intro\n|translator = \n|quote = ${quote.replace(/^<br>|<br>$/g, '').replace(/^“|”$/g, '')}\n|text = ${text.replace(/^<br>|<br>$/g, '')}\n|source = ${this.data.source}}}`;
        return wikitext;
    }
}

//only for test use
function test () {
    const orig_text = `【活动奖励干员】
//八幡海铃
“我是八幡海铃，有什么需要我做的吗？”

__________________
欢迎打开梦城堡的大门，这里欢迎每一个烦恼的孩子
一位害怕失去归宿的少女，梦到自己变成了一名鲁珀
她生活在叙拉古，成了一个杀手
她在家族里兢兢业业完成着任务
她想要大家信任她，想要成为家族中重要的一员
那么她的愿望，一定会实现吧？
欢迎来到
另一个Ave Mujica的世界
在这里的你，会是怎样一副样貌？`;
    const template = new Template({
        text: orig_text,
        source: 'https://www.bilibili.com/opus/1106746072898732037'
    });
    template.op_intro();
}


//test();