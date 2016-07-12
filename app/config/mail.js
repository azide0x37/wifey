export default {
  service: 'file',
  from: 'Your App <you@example.com>',

  services: {
    gmail: {
      user: 'example@gmail.com',
      pass: 'hunter2'
    },
    yahoo: {
      user: 'example@yahoo.com',
      pass: 'hunter2'
    },
    mailgun: {
      user: 'postmaster@example.com',
      pass: 'hunter2'
    },
    mandrill: {
      user: 'postmaster@example.com',
      pass: 'hunter2'
    },
    postmark: {
      user: 'postmaster@example.com',
      pass: 'hunter2'
    }
  }
}
