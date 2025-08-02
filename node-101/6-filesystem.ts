import fs, { promises as fsPromises } from 'node:fs';

// sync based with file system
fs.writeFileSync('./sync.json', JSON.stringify({ name: 'ahmed', age: 2 }));

// callback based with file system
fs.writeFile(
  './callback.json',
  JSON.stringify({ name: 'ahmed', age: 2 }),
  (err) => {
    console.log('error is thrown', err);
  }
);

// promise based api
async function writeFileWithPromise(fileName: string) {
  try {
    await fsPromises.writeFile(fileName, 'iam created with promise based api');
  } catch (error) {
    console.log(error);
  }
}

writeFileWithPromise('./promise.txt');
