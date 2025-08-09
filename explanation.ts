// HTTP caching headers

// 2 headers are handled on the browser and won`t trigger a new http request --> so its better to use
// - cache-controls + expires header

// example on browser

// other headers ETag

// etag will create some string about a resource for example (user) => string && string output => etag header
// browser for any new request for same resource or url will send the etag
// on your  server side you will need to handle the etag and you will run some logic
// the most important tip for optimization the server i reduce the requests

// app.get('user/10',(req,res)=>{
// const user= getUserById(10)
// const currentResourceEtag =  (user) => string
// const headerEtag = req.header.etag
// headerEtag === currentResourceEtag => true => res.status(304)

// return user
// }

// browser client --> ISP PROXY ---> Reverse Proxy --> nodejs server

// Paths

// absolute path /home/belal/code/c2c-backend-bootcamp/typescript

// relative path typescript === ./typescript

// i can run the file from cron job or another location run typescript
