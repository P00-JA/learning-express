const express = require('express');
const fs = require('fs');
const app = express();
const { body, validationResult } = require('express-validator');

app.use(express.json());

app.get('/user',(req,res)=>{
    res.json({'message' : 'Hi new user!'})
})

const validateRegistry = [
  body('username').isEmail(),
  body('password').isLength({ min: 5, max: 8 })
  .withMessage('must be at least 5-8 chars long')
  .matches(/\d/)
  .withMessage('must contain a number')

]

app.post(
  '/user',
  validateRegistry,
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({'UserData' : req.body});
  });

const port = 8000;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})