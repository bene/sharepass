// Get version from packages.json
// Write version to manifest.json

import fs from "fs/promises";
import pkg from "../package.json";
import manifest from "../src/manifest.json";

async function setVersion() {
    const version = pkg.version;
    manifest.version = version;

    fs.writeFile("./build/manifest.json", JSON.stringify(manifest));
}

setVersion();
