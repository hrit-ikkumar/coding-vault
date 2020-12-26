var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const {cpp} = require('compile-run');

const cppRouter = express.Router();

cppRouter.use(bodyParser.json());

cppRouter.route('/')
.post( (req,res, next) => {
    /*
    REQUEST FORMAT:
    {
        "source_code":" #include<bits/stdc++.h> \n using namespace std;\n int main()\n { \n   cout<<4+3<<endl;\nreturn 0;\n }",
        "test_cases": null
    }
    RESULT FORMAT:
    {
        "stderr": "",
        "stdout": "7\n",
        "exitCode": 0,
        "memoryUsage": 606208,
        "cpuUsage": 9357
    }
    */
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    cpp.runSource(req.body.source_code, req.body.test_cases, (err, result) => {
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

module.exports = cppRouter;