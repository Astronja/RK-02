import { Template } from "../utils/template.js";
import { Editor } from "../imports/editor.js";
import { Closure } from "../imports/closure-wiki.js";
import { Source } from "../source.js";

export class UpOpFile {
    /**
     * 
     * @param {object} data The data object containing necessary information for uploading operator files.
     * @param {string} data.cnname The original name (likely Chinese) of the operator whose files are to be uploaded.
     * @param {string} data.enname The desired page name of the operator. (It is not necessarily English!)
     */
    constructor (data) {
        this.data = data;
    }
    
    async execute () {
        //upload to wiki
    }

    /**
     * @returns {Promise<Array>} Returns an array of objects containing the availability of the source (boolean) and the description of the source.
     */
    async sourceReady () {
        /**
         * Sources:
         * 1. Closure wiki operator page files
         */

        let results = [];

        // Closure wiki operator page files
        const closure = new Closure();
        const closureData = await closure.getOperator(this.data.enname);

        console.log("stories", closureData.charProfile.storyTextAudio);
    }
}


// only for test use
async function start () {
    const upOpFile = new UpOpFile({
        cnname: "遥",
        enname: "Haruka"
    });
    await upOpFile.sourceReady();
}

start();