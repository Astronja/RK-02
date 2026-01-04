import source from "../source.js";

export default async function compileTask (operator) {
    /*
    await source.pushTask({
        uploadtype: "operator_main",
        opname: operator,
    });
    */
    await source.pushTask({
        uploadtype: "operator_file",
        opname: operator,
    });
    await source.pushTask({
        uploadtype: "operator_dialogue",
        opname: operator,
    });
    await source.pushTask({
        uploadtype: "operator_gallery",
        opname: operator,
    });
}

async function start () {
    await compileTask("Cairn");
    await compileTask("Skybox");
    await compileTask("Nasti");
}

//start();