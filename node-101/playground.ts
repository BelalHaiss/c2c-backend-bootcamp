import * as fs from 'fs';
import * as path from 'path';

// ❌ PROBLEMATIC: Using relative path without __dirname
console.log('--- Attempting to read file with relative path (PROBLEMATIC) ---');
try {
  // This will fail when running from a different directory
  const badContent = fs.readFileSync('data.txt', 'utf-8');
  console.log('✅ Successfully read with relative path:', badContent.trim());
} catch (error) {
  console.log('❌ Error reading with relative path:', (error as Error).message);
  console.log(
    '   This happens because Node.js looks for the file relative to process.cwd(), not the script location'
  );
}

// console.log();

// // ✅ CORRECT: Using __dirname and path.join()
console.log('--- Reading file with __dirname and path.join() (CORRECT) ---');
try {
  // /home/belal/code/c2c-backend-bootcamp/node-101/data.txt
  const correctPath = path.join(__dirname, 'data.txt');
  console.log('Resolved path:', correctPath);
  const goodContent = fs.readFileSync(correctPath, 'utf-8');
  console.log('✅ Successfully read with absolute path:', goodContent.trim());
} catch (error) {
  console.log('❌ Error reading with absolute path:', (error as Error).message);
}

// console.log();
// console.log('=== Instructions ===');
// console.log('To see the difference:');
// console.log(
//   '1. Run from node-101 directory: npm run dev (or ts-node playground.ts)'
// );
// console.log(
//   '2. Run from parent directory: cd .. && ts-node node-101/playground.ts'
// );
// console.log(
//   '3. Run from root directory: cd ../.. && ts-node c2c-backend-bootcamp/node-101/playground.ts'
// );
// console.log();
// console.log(
//   'The relative path will fail in steps 2 and 3, but __dirname + path.join() will always work!'
// );

// on my server i can use set cookie header to the request
// and the browser client will receive the cookie and he will send it back to you on the upcoming requests

// login page --> i wrote the credintials (email-password)& isValid
//  when user send to me logic credentials i validate it then i set cookie header with auth-id=512312321
// browser when user send me another request it will include cookie header  auth-id=512312321

// server i handle url (user/123) (public)

// "/" THIS WILL SEND WITH ANY REQUEST
// '/USER"

// example.com ==> link mywebsite.com
// mywebsite.com

// when user login ==> html ( hello {username}   )
