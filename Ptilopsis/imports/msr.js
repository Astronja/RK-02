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

    async getSong (cid) {
        const params = `song/${cid}`;
        const response = await fetch(this.endpoint + params);
        return await response.json();
    }

    /**
     * @returns {Promise<object>} Includes all albums on msr.
     */
    async allAlbums () {
        const params = 'albums';
        const response = await fetch(this.endpoint + params);
        return await response.json();
    }

    async search (string) {
        const params = `search?keyword=${encodeURIComponent(string)}`;
        const response = await fetch(this.endpoint + params);
        return await response.json();
    }
}