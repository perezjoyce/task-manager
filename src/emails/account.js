const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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