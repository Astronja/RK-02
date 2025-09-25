export class MSR {
    constructor () {
        this.endpoint = 'https://monster-siren.hypergryph.com/api/';
        this.lastAlbumCid = '';
    }

    /**
     * 
     * @returns {object} 
     */
    async newSong () {
        const params = 'song';
        const response = await fetch(this.endpoint + params);
        console.log(await response.json());
    }

    async getAlbum (cid) {
        const params = `album/${cid}/detail`;
        const response = await fetch(this.endpoint + params);
        return await response.json();
    }

    /**
     * @returns {object} Returns response from msr.
     * @returns {object} @param {array} data Includes all albums on msr.
     */
    async allAlbums () {
        const params = 'albums';
        const response = await fetch(this.endpoint + params);
        return await response.json();
    }

    async search (string) {
        const params = `search`;
    }
}

async function main () {
    const imp = new Msr();
    const albs = (await imp.allAlbums()).data;
    const response = await imp.getAlbum(albs[0].cid);
    console.log(response.data);
}


main();