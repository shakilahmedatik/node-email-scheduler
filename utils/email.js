const nodemailer = require('nodemailer')

exports.sendEmail = async (userEmail, todo) => {
  const { title, subject, message } = todo
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID, // Email Address(Gmail)
      pass: process.env.PASSWORD, // Password(App Password)
    },
  })

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: '"TodoIt" <support@todoit.com>', // sender address
      to: userEmail, // list of receivers or a single receiver
      subject: `${subject} | TodoIt`, // Subject line
      html: `
      <h1>${title}</h1>
      <p>${message}</p>
      <i>todoit.com</i>`, // html body
    })
    .catch(error => {
      console.log(error)
    })

  console.log('Message sent: ', info.messageId)
}
