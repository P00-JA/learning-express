const express = require('express')
const app = express()
const path = require('path');
const users = require('./routes/users');
const posts = require('./routes/posts');
const port = 5050;
//Application level middle ware function
app.use('/users',users);
app.use('/posts',posts);

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//global middle ware function
const globalMiddleWare =(req,res,next)=> {
    req.requestTime = new Date().toLocaleDateString();
    next();
}
app.use(globalMiddleWare);

app.get('/next', (req, res) => {
    let responseText = '<h1>Hello World!</h1><br>'
    responseText += `<h2>Requested at: ${req.requestTime}</h2>`
    res.send(responseText)
  })

//middleWare function
app.get('/',[
    (req,res,next)=>{
       next();
       console.log("This will be  executed 1st after the middleware is execute")
    },(req,res,next)=>{
        next();
    },(req,res,next)=>{
         res.send('<h1>This is the last middleware function</h1>')
         next();
    }
])
//post
app.post('/', (req, res) => {
    res.send('<h1>Got a POST request</h1>')
  })

//error handling middle ware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });

//wildcard http method, used to load middleware functions at a path for all HTTP request methods
app.all('/secret', (req, res, next) => {
    res.send('<h2>Accessing the secret section ...</h2>')
    next() // pass control to the next handler
  })

//put
app.put('/user', (req, res) => {
    res.send('<h1>Got a PUT request at /user</h1>')
  })
//delete
app.delete('/user', (req, res) => {
    res.send('<h1>Got a DELETE request at /user</h1>')
  })

app.listen(port,()=>{
    console.log(`listening to http://localhost:${port}`);
})