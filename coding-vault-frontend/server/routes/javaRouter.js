var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const {java} = require('compile-run');

const javaRouter = express.Router();

javaRouter.use(bodyParser.json());

javaRouter.route('/')
.post( (req,res, next) => {
    /*
    REQUEST FORMAT:
    {
        "source_code":"public class Simple{  public static void main(String args[]){  System.out.println(\"Hello Java\");  }  }  ",
        "test_cases":"\n"
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
    java.runSource(req.body.source_code, req.body.test_cases, (err, result) => {
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

module.exports = javaRouter;