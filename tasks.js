export async function clean() {
    await folder('.cache').delete().exec()
    await folder('target').delete().exec()
}

export async function watch() {  
    await shell('tsc -p ./smoke-hub/tsconfig.json --outDir ./target/smoke-hub').exec()
    await Promise.all([
        shell('node ./target/smoke-hub/index.js --port 5001 ').exec(),
        shell('parcel ./bench/index.html --out-file index --out-dir ./target/bench --port 5000').exec(),
    ])
}