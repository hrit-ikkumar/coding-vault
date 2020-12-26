var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const {c} = require('compile-run');

const cRouter = express.Router();

cRouter.use(bodyParser.json());

cRouter.route('/')
.post( (req,res, next) => {
    /*
    REQUEST FORMAT:
    {
        "source_code":" #include <stdio.h>\n int main()\n { \n   printf(\"Hello World\");\nreturn 0;\n }",
        "test_cases": null
    }
    RESULT FORMAT:
    {
        "stderr": "",
        "stdout": "Hello World",
        "exitCode": 0,
        "memoryUsage": 512000,
        "cpuUsage": 10500
    }
    */
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    c.runSource(req.body.source_code, req.body.test_cases, (err, result) => {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            res.send(result);
        }
    });

});

module.exports = cRouter;