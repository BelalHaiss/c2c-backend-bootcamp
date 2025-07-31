// Process in Node.js - The Main Application Process that is currently running
export const myPrcoessId = process.pid;
console.log(process.pid, 'process id');
console.log(process.version, 'Nodejs version');
console.log(process.platform, 'process platform');

console.log(process.argv, 'args that passed when i run the node application');

console.log(process.env.NODE_ENV, 'node environment');
console.log(process.env.HOME, 'Home Directory');

console.log(process.cwd(), 'current directory');
console.log(process.memoryUsage(), 'Memory Usage');

process.on('exit', (code) => {
  if (code !== 0) {
    // error  and you must alerting
  }
  console.log('application exit with code:', code);
});

process.on('uncaughtException', (error) => {
  console.log('uncaughtException catch the error ', error);
  //   process.exit(1);
  console.log('i will run normally');
});

console.log(process.uptime(), 'uptime in seconds');
