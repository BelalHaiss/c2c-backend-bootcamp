// esm module syntax
//  "export" for exporting method or props
// " from" for importing methods or props from other modules  


import { add, subtract, dynamicImportUtilMethod } from './math.mjs'


console.log(add(1, 2))
console.log(subtract(4, 2))

dynamicImportUtilMethod()