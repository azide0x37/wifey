import app from '@vulcan/core'
import welcome from 'app/controllers/welcome'
import * as users from 'app/controllers/users'
import api from 'app/middleware/api'

app.get('home', '/', welcome())
app.resource('users', api(), users)

export default app
