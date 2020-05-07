export async function clean() {
    await folder('.cache').delete().exec()
    await folder('target').delete().exec()
}

// runs an example from the ./examples directory
export async function example(example) {  
    await shell('tsc -p ./smoke-hub/tsconfig.json --outDir ./target/smoke-hub').exec()
    await Promise.all([
        shell('node ./target/smoke-hub/index.js --port 5001 ').exec(),
        shell(`parcel ./examples/${example}.html --out-dir ./target/examples --port 5000`).exec(),
    ])
}