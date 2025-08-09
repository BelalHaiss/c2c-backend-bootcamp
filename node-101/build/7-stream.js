import fs from 'node:fs';
// 4 Types of Streams:
// 1. Readable - for reading data (fs.createReadStream)
// 2. Writable - for writing data (fs.createWriteStream) remember to end the stream
// 3. Duplex - can read and write (TCP sockets)
// 4. Transform - modify data while reading/writing (compression) // google drive
// write file with file system api
const inputFileName = 'input.txt';
const outputFileName = 'output.txt';
fs.writeFileSync(inputFileName, 'iam input file');
// read file with stream
const readableFileStream = fs.createReadStream(inputFileName, {
    highWaterMark: 1000
});
// write in another file with with stream of the input file
const writableFileStream = fs.createWriteStream(outputFileName, 'utf-8');
const allChunks = [];
readableFileStream.on('data', (chunk) => {
    console.log('reading chunk', chunk);
    writableFileStream.write(chunk); // handle each chunk seprately
    //   allChunks.push(chunk); // not safety it can full the memory
});
// what is the best place to end the stream
readableFileStream.on('end', () => {
    writableFileStream.end();
});
writableFileStream.on('finish', () => {
    console.log('iam finished written');
});
