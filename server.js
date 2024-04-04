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
const add = (n1, n2) => { return n1 + n2; }
const subtract = (n1, n2) => { return n1 - n2; }
const multiply = (n1, n2) => { return n1 * n2; }
const divide = (n1, n2) => { return n1 / n2; }

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

//Sending a GET endpoint to /divide which will respond the the result of the divide of the two query parameters n1 and n2
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

//Start the app on port 3000
const port = 3000;
app.listen(port, () => {
    console.log("hello I'm listening to port " + port);
})