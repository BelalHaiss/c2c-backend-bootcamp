export function add(a, b) {
    return a + b


}


export function subtract(a, b) {
    return a - b
}


export function multiple(a, b) {
    return a * b
}

// make function that use dynamic import from util.mjs
export async function dynamicImportUtilMethod() {
    const { utilMethod } = await import('./util.mjs')
    console.log('util method inside dynamic import', utilMethod())
}
