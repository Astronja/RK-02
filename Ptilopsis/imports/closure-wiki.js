import { Source } from '../source.js';

export class Closure {
    constructor () {
        // All valid pages of closure.wiki must include "/en" (Sept 13, 2025)
        this.baseurl = "https://api.closure.wiki/en/";
    }

    // public methods (for external use)
    
    /**
     * Writes the data of an operator if the data is fully available.
     * @param {string} name The targeted operator page name on closure.wiki. (usually in English)
     */
    async writeOperatorData (name) {
        const data = await this.getOperator(name);
        if (this.checkOperatorSourceCompleteness(data)) {
            new Source().writeClosure("operator", name, data);
        }
    } // other write methods can be added later

    /**
     * Gets data of operator by page name.
     * @param {string} name The targeted operator page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted operator.
     * @returns {Promise<boolean>} If the data of the targeted operator is not applicable, returns false.
     */
    async getOperator (name) {
        const url = this.baseurl + "operators/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }

    /**
     * Gets data of enemy by page name.
     * @param {string} name The targeted enemy page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted enemy.
     * @returns {Promise<boolean>} If the data of the targeted enemy is not applicable, returns false.
     */
    async getEnemy (name) {
        const url = this.baseurl + "enemies/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }

    /**
     * Gets data of operation by page name.
     * @param {string} name The targeted operation page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted operation.
     * @returns {Promise<boolean>} If the data of the targeted operation is not applicable, returns false.
     */
    async getOperation (name) {
        const url = this.baseurl + "operations/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }

    /**
     * Gets data of module by page name.
     * @param {string} name The targeted module page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted module.
     * @returns {Promise<boolean>} If the data of the targeted module is not applicable, returns false.
     */
    async getModule (name) {
        const url = this.baseurl + "modules/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }


    // utility methods (for internal use)

    /**
     * Checks connection to closure.wiki
     * @returns {Promise<boolean>} If the connection is okay, return true, vice versa.
     */
    async ok () {
        const response = await fetch("https://closure.wiki/en/home");
        return response.ok;
    }

    /**
     * Logs 404 message if the page is not found on closure.wiki.
     * @param {string} url The url that the request has made to.
     * @returns {Promise<boolean>} Returns false.
     */
    async pageNotFound (url) {
        console.log("Page not found, please check your spelling and check if data is ready");
        console.log("Access URL: ", url.replace("api.", ""));
        console.log("API URL: ", url);
        return false;
    }
    
    /**
     * Checks if the response is ready for further data parsing.
     * @param {object} response The response data of the request.
     * @returns {Promise<object>} The json (in format of an object) data of the request.
     * @returns {Promise<boolean>} Returns false if the response status is not 200.
     */
    async responseHandler (response) {
        if (response.status == 200) return await response.json();
        else if (response.status == 404) return this.pageNotFound(response.url);
        else console.log(response.status, response.statusText); return false;
    }

    /**
     * Checks if an operator's original data is ready for uploading use.
     * @param {object} data The data object containing the operator's information
     * @returns {boolean} If the operator data is completed
     */
    checkOperatorSourceCompleteness (data) {
        if (data
            && data.charProfile.storyTextAudio.length > 0
            // other conditions...
        ) return true;
    }

    /**
     * Formats the given string that functions as page name in closure.wiki.
     * @param {string} name The unformatted page name 
     * @returns {string} The formatted page name that is valid in closure.wiki
     */
    formatName (name) {
        const result = name.toLowerCase().replaceAll(' ', '-');
        return result;
    }
}


// usage
async function start () {
    const closure = new Closure();
    if (await closure.ok()) { // If connection is okay
        //rest of the main executions...
        await closure.getOperator("leizi-the-thunderbringer");
    } else console.log("Closure wiki connection failed."); // report if connection failure
}

start();