//Imports express and creates an express app
const express = require("express");
const app = express();

//Imports winston to create log files
const winston = require('winston');

//Creates winston logger to save all logs of importance error info or less to log files
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        new winston.transports.File({ filename: 'error.log', level: 'error' }),

        // - Write all logs with importance level of `info` or less to `combined.log`
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//Setup winston logger to log to console

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

//Funtion to convert two strings into floats
//Is parsing either strings dones not return a number throws an error
function parseFloats(s1, s2)
{
    const n1 = parseFloat(s1);
    if (isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }

    const n2 = parseFloat(s2);
    if (isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }

    return [n1, n2]
}

//Functions to add, subtract, multiply and divide 2 numbers
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2; 
const divide = (n1, n2) => n1 / n2;
const mod = (n1, n2) => n1 % n2;
const power = (n1, n2) => Math.pow(n1, n2);
const root = (n1, n2) => Math.pow(n1, 1 / n2)

//Sending a GET endpoint to /add which will respond the the result of the addition of the two query parameters n1 and n2
app.get("/add", (req, res) => {
    try {

        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for addition');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)

        //Add the floats then respond with the result and the status 200 OK
        const result = add(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Sending a GET endpoint to /subtract which will respond the the result of the subtraction of the two query parameters n1 and n2
app.get("/subtract", (req, res) => {
    try {

        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for subtraction');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)
        
        //Subtract the floats then respond with the result and the status 200 OK
        const result = subtract(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Sending a GET endpoint to /multiply which will respond the the result of the multiplication of the two query parameters n1 and n2
app.get("/multiply", (req, res) => {
    try {

        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for multiplication');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)

        //Multply the floats then respond with the result and the status 200 OK
        const result = multiply(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Sending a GET endpoint to /divide which will respond the the result of the division of the two query parameters n1 and n2
app.get("/divide", (req, res) => {
    try {
        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for division');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)

        //Throw and log a divide error if n2 is 0
        if (n2 == 0)
        {
            logger.error("cannot divide by zero");
            throw new Error("cannot divide by zero");
        }

        //Divide the floats then respond with the result and the status 200 OK
        const result = divide(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Sending a GET endpoint to /mod which will respond the the result of the modulo of the two query parameters n1 and n2
app.get("/mod", (req, res) => {
    try {
        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for modulo');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)

        //Throw and log a divide error if n2 is 0
        if (n2 == 0)
        {
            logger.error("cannot divide by zero");
            throw new Error("cannot divide by zero");
        }

        //Mod the floats then respond with the result and the status 200 OK
        const result = mod(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Sending a GET endpoint to /power which will respond the the result of n1 to the power of n2
app.get("/power", (req, res) => {
    try {
        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for powers');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)

        //Throw and log if power is not a positive integer
        if (!(Number.isInteger(n2) && n2 >= 0))
        {
            logger.error("power must be a positive integer");
            throw new Error("power must be a positive integer");
        }

        //Throw and log if both numbers are 0
        if (n1 == 0 && n2 == 0)
        {
            logger.error("cannot calulate 0^0");
            throw new Error("cannot calulate 0^0");
        }

        //Power the floats then respond with the result and the status 200 OK
        const result = power(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Sending a GET endpoint to /root which will respond the the result of n1 to the n2th root
app.get("/root", (req, res) => {
    try {
        //Log the parameters passed in the request
        logger.info('Parameters '+req.query.n1+' and '+req.query.n2+' received for roots');

        //Convert the query paramters into floats
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)

        //Throw and log if root is not a positive non zero integer
        if (!(Number.isInteger(n2) && n2 > 0))
        {
            logger.error("root must be a positive, non zero, integer");
            throw new Error("root must be a positive, non zero, integer");
        }

        //Throw and log cannot get even root of negative number
        if (n1 < 0 && mod(n2, 2) == 0)
        {
            logger.error("cannot get even root of negative number");
            throw new Error("cannot get even root of negative number");
        }

        //Root the floats then respond with the result and the status 200 OK
        const result = root(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    }
    //If an error was thrown respond with the error message and 400 Bad Request
    catch (error) {
        res.status(400).json({
            statuscocde: 400, msg: error.toString()
        })
    }
});

//Start the app on port 3000
const port = 3000;
app.listen(port, () => {
    console.log("hello I'm listening to port " + port);
})