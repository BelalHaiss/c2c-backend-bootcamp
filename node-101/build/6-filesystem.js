var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs, { promises as fsPromises } from 'node:fs';
// sync based with file system
fs.writeFileSync('./sync.json', JSON.stringify({ name: 'ahmed', age: 2 }));
// callback based with file system
fs.writeFile('./callback.json', JSON.stringify({ name: 'ahmed', age: 2 }), (err) => {
    console.log('error is thrown', err);
});
// promise based api
function writeFileWithPromise(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fsPromises.writeFile(fileName, 'iam created with promise based api');
        }
        catch (error) {
            console.log(error);
        }
    });
}
writeFileWithPromise('./promise.txt');
