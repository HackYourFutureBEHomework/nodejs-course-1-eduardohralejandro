const express = require("express");
const server = express();
const converter = require("number-to-words");
const nodemailer = require("nodemailer");
const port = 8000;

//Listening to the port
server.listen(port, () => {
  console.log(`server is running on local host ${port}`);
});

//First route
server.get("/:value", (request, response) => {
  const { value } = request.params;
  response.send(`this is an imporant ${value}`);
});

//Sum route
server.get("/value/:value1/plus/:value2/is", (request, response) => {
  const { value1 } = request.params;
  const { value2 } = request.params;
  response.send(`${parseInt(value1) + parseInt(value2)}`);
});

//Cardinal Number
server.get("/value/:CardinalNumber/is", (request, response) => {
  const { CardinalNumber } = request.params;
  response.send(`${converter.toWords(CardinalNumber)}`);
  let error = new Error();
  next(error);
});

//Sending an email
server.get("/send/:email", (request, response) => {
  const { email } = request.params;
  //Create reusable transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: "eduardotest@zoho.eu",
      pass: "A PASSWORD" //I will change this password after this class, don't worry
    },
    tls: {
      rejectUnauthorized: false //I found this in a video but I don't get where it comes from
    }
  });

  // Setup email data
  let mailOptions = {
    from: '"Eduardo HYF class" <eduardotest@zoho.eu>',
    to: email,
    subject: "An email from a nodejs app",
    text: "Hello world",
    html: `I sent an email to this ${email} from my nodejs app`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log("Message sent: %s", info.messageId); //I saw all this code from the docs but I don't get this part
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    response.send(`Email has been sent to ${email}`);
  });
});
//Error
server.use((error, request, response, next) => {
  response.status(500);
  response.send("oh! no this is an error, only numbers are allowed");
});

//Error message
server.get("*", (request, response) => {
  response.send(
    "oh! it seems that you are in the wrong place, under 18 are not allowed, try again kid"
  );
});
