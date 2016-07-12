import index from 'app/controllers/index'
import plaid_test from 'app/controllers/plaid_test'
import dome from 'app/controllers/dome'
import dash from 'app/controllers/dash'
import * as users from 'app/controllers/users'
import api from 'app/middleware/api'

export default function () {
  this.get('home', '/', index())
  this.get('dome', '/dome.html', dome())
  this.get('dash', '/dash.html', dash())
  this.get('plaid_test', '/plaid_test.html', plaid_test())
  this.resource('/users', api(), users)
}
