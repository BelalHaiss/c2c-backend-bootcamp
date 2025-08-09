import fs from 'node:fs';
import zlib from 'node:zlib';
const inputFileName = 'input.txt';
const outputFileName = 'output.txt.gz';
fs.writeFileSync(inputFileName, 'iam input file');
// read file with stream
const readableFileStream = fs.createReadStream(inputFileName, {
    highWaterMark: 1000
});
// gzip stream
const gzipStream = zlib.createGzip();
// write in another file with with stream of the input file
const writableFileStream = fs.createWriteStream(outputFileName, 'utf-8');
// throw error  because i can`t pipe from writable stream to another stream
// const stream = readableFileStream.pipe(writableFileStream).pipe(gzipStream);
const stream = readableFileStream.pipe(gzipStream).pipe(writableFileStream);
writableFileStream.on('finish', () => {
    console.log('iam finished written');
});
// this is more readable
// import { pipeline } from 'node:stream/promises';
// import { createReadStream, createWriteStream } from 'node:fs';
// import { createGzip } from 'node:zlib';
// await pipeline(
//   createReadStream('archive.tar'),
//   createGzip(),
//   createWriteStream('archive.tar.gz')
// );
// console.log('Pipeline succeeded.');
