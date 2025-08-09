"use strict";
const text = 'あ';
const utf8Buffer = Buffer.from(text, 'utf-8');
console.log(utf8Buffer);
console.log(utf8Buffer.toJSON());
