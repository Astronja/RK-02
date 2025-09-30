import { MSR } from '../imports/msr.js';

export class UpEvent {
    constructor (name) {
        this.cnname = name.cnname;
        this.enname = name.enname;
    }

    async execute () {
        const msr = new MSR();
        const allAlbResponse = await msr.allAlbums();
        let data = {};
        for (let item of allAlbResponse.data) {
            if (item.name.includes(this.cnname)) {
                data = item;
                break;
            }
        }
        if (data == {}) {
            console.log('No such album found.');
            return;
        }
        this.albumCoverUrl = data.coverUrl;
        const albDetailResponse = await msr.getAlbum(data.cid);
        for (let song of albDetailResponse.data.songs) {
            const songResponse = await msr.getSong(song.cid);
            console.log(songResponse.data);
        }
    }
}

//only for test use
async function test () {
    const up = new UpEvent({
        cnname: "弧光作战",
        enname: "Battleplan Arc Light"
    });
    await up.execute();
    //console.log(up.name);
}

test();