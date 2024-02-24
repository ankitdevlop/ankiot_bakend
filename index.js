const express = require('express')
const app = express()
const cors=require("cors")
const port = 5000
const nodemailer=require('nodemailer')
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/send-email', (req, res) => {
    const { email ,name} = req.body;
    const transporter = nodemailer.createTransport({
   
      service: 'gmail',
      auth: {
        user: 'ankitdubey58825@gmail.com', 
        pass: 'hlnf pcoa rdnd agsw' 
      }
    });
  
    // Email content
    const mailOptions = {
      from: 'ankitdubey58825@gmail.com', 
      to: email,
      cc: 'ankitdubey58825@gmail.com' ,  
      subject: 'no replay ', 
      text: `Thank you ${name} for showing interest. I will contact you shortly.` 
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error.message);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  });

  app.post('/receive-message', (req, res) => {
    const { email, name, message } = req.body;

    // Log the message details to the console
    console.log(`Received message from ${name} (${email}): ${message}`);

    // Send email notification
    const mailOptions = {
        from: 'ankitdubey58825@gmail.com',
        to: 'ankitdubey58825@gmail.com',
        subject: 'New message received',
        text: `New message received from ${name} (${email}): ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email notification:', error);
        } else {
            console.log('Email notification sent successfully:', info.response);
        }
    });

    // Optionally, you can send a response back to the client
    res.status(200).send('Message received successfully');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})