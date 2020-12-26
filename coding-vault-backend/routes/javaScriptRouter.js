var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const {node} = require('compile-run');
//TO DO
const javaScriptRouter = express.Router();

javaScriptRouter.use(bodyParser.json());

javaScriptRouter.route('/')
.post( (req,res, next) => {
    /*
    REQUEST FORMAT:
    {
        "source_code":"console.log(\"Hello World!\")",
        "test_cases":null
    }
    RESULT FORMAT:
    {
        "stderr": "",
        "stdout": "Hello World!\n",
        "exitCode": 0,
        "memoryUsage": 561152,
        "cpuUsage": 12596
    }
    */
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    node.runSource(req.body.source_code, req.body.test_cases, (err, result) => {
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

module.exports = javaScriptRouter;