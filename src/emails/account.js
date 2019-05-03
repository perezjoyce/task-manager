const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//send individ email
// const msg = {
//     to: 'joyce.perez@tuitt.com',
//     from: 'japerez.ph@gmail.com',
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };
//   sgMail.send(msg);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'japerez.ph@gmail.com',
        subject: `Welcome To The App, ${name}!`,
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'japerez.ph@gmail.com',
        subject: `Sorry to see you go, ${name}!`,
        text: 'We want to improve our services. Please let us know why you\'re unsubscribing.'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}