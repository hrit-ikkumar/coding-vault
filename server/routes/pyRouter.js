var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const {python} = require('compile-run');

const pyRouter = express.Router();

pyRouter.use(bodyParser.json());

pyRouter.route('/')
.post( (req,res, next) => {
    /*
    REQUEST FORMAT:
    {
        "source_code":"print(\"Hello World\")",
        "test_cases":null
    }
    RESULT FORMAT:
    {
        "stderr": "",
        "stdout": "Hello World\n",
        "exitCode": 0,
        "memoryUsage": 593920,
        "cpuUsage": 7551
    }
    */
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    python.runSource(req.body.source_code, req.body.test_cases, (err, result) => {
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

module.exports = pyRouter;