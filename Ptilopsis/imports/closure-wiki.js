import slugify from 'slugify';
const baseurl = "https://api.closure.wiki/v2/en/";
const staticurl = "https://static.closure.wiki/en/";

export class closure {
    /* I AM TURNING EVERY SHIT STATIC THEREFORE SORRY MY CONSTRUCTORS
    constructor () {
        // All valid pages of closure.wiki must include "/en" (Sept 13, 2025)
        this.baseurl = "https://api.closure.wiki/en/";
        // API V2 is recommended to be used, since V1 does not assure connection. (Oct 29, 2025)
        this.v2url = "https://api.closure.wiki/v2/en/";
        this.baseurl = this.v2url;
    }
    */

    // public methods (for external use)

    /**
     * 
     */

    static async getOperatorThumbnail (charId) {
    }

    /**
     * Gets data of operator by page name.
     * @param {string} name The targeted operator page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted operator.
     * @returns {Promise<boolean>} If the data of the targeted operator is not applicable, returns false.
     */
    static async getOperator (name) {
        const url = baseurl + "operators/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }

    /**
     * Gets data of enemy by page name.
     * @param {string} name The targeted enemy page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted enemy.
     * @returns {Promise<boolean>} If the data of the targeted enemy is not applicable, returns false.
     */
    static async getEnemy (name) {
        const url = baseurl + "enemies/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }

    /**
     * Gets data of operation by page name.
     * @param {string} name The targeted operation page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted operation.
     * @returns {Promise<boolean>} If the data of the targeted operation is not applicable, returns false.
     */
    static async getOperation (name) {
        const url = baseurl + "operations/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }

    /**
     * Gets data of module by page name.
     * @param {string} name The targeted module page name on closure.wiki.
     * @returns {Promise<object>} The data of the targeted module.
     * @returns {Promise<boolean>} If the data of the targeted module is not applicable, returns false.
     */
    static async getModule (name) {
        const url = baseurl + "modules/" + this.formatName(name);
        const response = await fetch(url);
        return this.responseHandler(response);
    }


    // utility methods (for internal use)

    /**
     * Checks connection to closure.wiki
     * @returns {Promise<boolean>} If the connection is okay, return true, vice versa.
     */
    static async ok () {
        const response = await fetch("https://api.closure.wiki/");
        return response.ok;
    }

    /**
     * Logs 404 message if the page is not found on closure.wiki.
     * @param {string} url The url that the request has made to.
     * @returns {string} Returns error message of 404.
     */
    static pageNotFound (url) {
        console.log("Page not found, please check your spelling and check if data is ready");
        console.log("Access URL: ", url.replace("api.", ""));
        console.log("API URL: ", url);
        return `[ERROR404] Page not found with request url: ${url}`;
    }
    
    /**
     * Checks if the response is ready for further data parsing.
     * @param {object} response The response data of the request.
     * @returns {Promise<object>} The json (in format of an object) data of the request.
     * @returns {Promise<string>} Returns error message if the response status is not 200.
     */
    static async responseHandler (response) {
        if (response.status == 200) return await response.json();
        else if (response.status == 404) return this.pageNotFound(response.url);
        else return `[ERROR] Code ${response.status}: ${response.statusText}`;
    }

    /**
     * Checks if an operator's original data is ready for uploading use.
     * @param {object} data The data object containing the operator's information
     * @returns {boolean} If the operator data is completed
     */
    /* DEPRECATED
    checkOperatorSourceCompleteness (data) {
        if (data
            && data.charProfile.storyTextAudio.length > 0
            && data.charDialog.length > 0
        ) return true;
    }*/
    

    /**
     * Formats the given string that functions as page name in closure.wiki.
     * @param {string} name The unformatted page name 
     * @returns {string} The formatted page name that is valid in closure.wiki
     */
    static formatName (name) {
        switch (name) {
            case "Gummy":
                return "gum";
            case "Pozëmka":
                return "pozyomka";
            case "THRM-EX":
                return "thermal-ex";
            case "Mr. Nothing": 
                return "mrnothing";
            case "Miss. Christine":
                return "misschristine";
        }
        //const result = name.toLowerCase().replaceAll(' ', '-');
        const result = slugify(name, { lower: true, strict: true });
        return result;
    }
}


// only for test use
async function start () {
    const data = await closure.getOperator("mrnothing");
    console.log(data);
}

//start();