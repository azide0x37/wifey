import consoleTransport from 'core/console-transport'
import fileTransport from 'core/file-transport'

export default {
  console: consoleTransport,
  file: fileTransport,
  mailgun: {
    host: 'smtp.mailgun.org',
    port: 587
  },
  mandrill: {
    host: 'smtp.mandrillapp.com',
    port: 587
  },
  postmark: {
    host: 'smtp.postmarkapp.com',
    port: 2525
  },
  yahoo: {
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true
  },
  gmail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true
  }
}
