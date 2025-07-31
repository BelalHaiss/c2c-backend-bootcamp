/**
 * EventEmitter - One of the most IMPORTANT modules in Node.js
 *
 * This is a fundamental building block of Node.js that enables EVENT-DRIVEN programming.
 * Many core Node.js modules use EventEmitter under the hood:
 * - HTTP servers and clients
 * - File system streams
 * - Process object
 * - Child processes
 * - And many more!
 */

import { EventEmitter } from 'node:events';
const userLogEventName = 'userLogin';

type User = {
  name: string;
  id: number;
};
type EventsMap = {
  userLogin: User[];
  userDeleted: number[];
};

const myEmitter = new EventEmitter<EventsMap>();

// event name = "userLogin"
// send email to user
// log in my system that user logging

myEmitter.on('userLogin', (user: User) => {
  console.log('sending email to ', user.name);
});

myEmitter.on(userLogEventName, (user: User) => {
  console.log(user.name, 'is logged to the system at', new Date().toString());
});

// publish

// myEmitter.emit('userLogin', { name: 'ahmed', id: 2 });

type ServerEventsMap = {
  connection: unknown[];
  error: Error[];
};

const serverEmitter = new EventEmitter<ServerEventsMap>();

const onConnectionCallback = () => {
  console.log('someone connected to server');
};
serverEmitter.on('connection', onConnectionCallback);
serverEmitter.on('connection', () => {
  console.log('listener a');
});
serverEmitter.on('connection', () => {
  console.log('listener b');
  serverEmitter.emit('error', new Error('throw inside connection listener'));
});

serverEmitter.on('error', (e) => {
  console.log('error is thrown', e.message);
  console.log('save the error in my logs service');
});

serverEmitter.emit('connection');
serverEmitter.emit('connection');

// you have to handle error event as convention
serverEmitter.emit('error', new Error('whoops!'));
serverEmitter.removeAllListeners('connection');

serverEmitter.emit('connection');
serverEmitter.emit('connection');
serverEmitter.emit('connection');
serverEmitter.emit('connection');
