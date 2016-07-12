<div align="center">
  <img src="http://i.imgur.com/oYGzAXZ.png">
  <br><br>
  <a href="http://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat"></a> <a href="https://travis-ci.org/aniftyco/vulcan"><img src="https://img.shields.io/travis/aniftyco/vulcan/master.svg"></a> <a href="https://coveralls.io/github/aniftyco/vulcan"><img src="https://img.shields.io/coveralls/aniftyco/vulcan.svg"></a> <a href="https://github.com/aniftyco/vulcan/releases"><img src="https://img.shields.io/github/release/aniftyco/vulcan.svg"></a> <a href="https://github.com/aniftyco/vulcan/releases"><img src="https://img.shields.io/github/downloads/aniftyco/vulcan/total.svg"></a> <a href="https://github.com/aniftyco/vulcan/blob/master/LICENSE"><img src="https://img.shields.io/github/license/aniftyco/vulcan.svg"></a>
</div>

## Install
```sh
$ npm install --global @vulcan/cli
$ vulcan make my-app
```

## Intro
**Vulcan** Is a boilerplate framework built on [Koa][koa] utilizing [Bookshelf][bookshelf] ORM and [Knex][knex] for database management and migrations. We built this framework to give us a quick base to start building our applications on.

## Getting Started
Out of the box Vulcan is setup to use sqlite so that you don't have to worry about picking a database right away. Worry about building your application.

After you have ran `vulcan make` you should have a fully usable install of Vulcan already. Just run `vulcan start` to kick off the start command and you should be greeted with the Vulcan startup screen. Now you can open your browser to the address the screen gives you and you'll see our Welcome page. Welcome to Vulcan. :)

**Vulcan** is setup in the typical MVC style, you have Models (`app/models/`), Views (`app/views/`) and Controllers (`app/controllers/`). The whole application can be configured in the `app/config/` directory. This configuration setup is setup to load the base config files for every environment, and then the sub environment folders are merged in based on `NODE_ENV` environment variable. This allows you to fine grain change just the things you need in `development` or `test` environments.

The `core` folder holds all the boilerplate, you shouldn't have to ever change anything in this folder. You'll mostly be working in the `app`, `test` and `database` folders.

The `database` folder handles all migrations and seed files, which can be generated using the `gen:*` commands available by running `node vulcan`.

The `test` folder handles just what you'd expect. Your tests. We ship with a base test on a `user` route so you can see how to use tests and your application together.

## Routes
The `app/routes.js` file is your entry point. All routes for your application will be defined here. The function exported has the `this` context automatically bound to the base router object so you can start defining your routes right away.

The router we use is [Koa Router][koa-router] with a custom `resources` method tacked onto the instance so that you can quickly define REST-ful Resources for your API. To showcase this, we've provided you with a pre-defined Users controller that exports all the methods needed for a REST-ful resource in `app/controllers/users.js` and then we use that controller in the `app/routes.js` file to define a resource route for `/users`.

## Middleware
Since we are using [Koa][koa] under the hood, you have complete access to using middleware on all routes. We have a few helpful stock middleware available to you in `app/middleware/`. You can also `npm install` any Koa middleware from npm registry and use it to your liking.

## Hooks
Since we abstracted the server setup into the core, we have exposed a way for you to hook into the base application instance and `use()` anything you want onto the application. We've shipped with a Error handling hook found at `app/hooks/errors.js` which showcase how to export a hook. All hooks are default functions exported with the application instance bound to the `this` context on the function.

The errors hook is using a custom Vulcan error handler middleware that passes the error thrown in the app and allows you to return anything you want to be passed back as the response. In this case we're checking to see if [Bookshelf][bookshelf] threw an error for no results, in which case we return a 404 Not Found error instance or 400 Bad Request error instance, which tells our custom `send` method to return an Error object.

## Controllers
Controllers are simple files that export functions to use in your routes. Only special controller is for REST-ful resource routes. They must export properly named functions for the routes to be created. Any that are missing are not defined.

In our codebase we export a function that returns a generator function so that our routes are executed as functions in our routes. This allows us to reuse routes by defining arguments on the parent function exported. You don't have to do it this way if you don't want to.

## Models
Vulcan models are nothing special, just basic [Bookshelf][bookshelf] models. Only difference is we extend our own base model with a bunch of defaults already set including adding a handful of helpful static methods onto the models.

## Views
For view rendering, we are using [Koa Views][koa-views] module defaulting to [Jade][jade] as our preferred template syntax but you can change that by installing it manually and changing the mappings in `app/config/app.js` under the `views` property.

Our `app/controllers/welcome.js` controller shows how to render views.

## Services
We're working on a few services to default ship with Vulcan, right now we've got a Mailer service that is added to all your controllers using a middlware step to define `this.mailer`.

### ‣ Mailer
The Mailer service utilizes [Nodemailer][nodemailer] under the hood with some custom transports by us, such as the file and console mailer. You can configure the mailer in `app/config/mail.js`

#### Console Transport
The Console Transport returns the response of the mailer back when you `yield` it so you can do checks on it. This does not send any mail.

### File Transport
The File Transport directs the final email into `storage/emails.log` for you to inspect. This is great to test your emails.

## Vulcan CLI
To help with mundane tasks like creating database migrations, seeds, and generating boilerplate. We've included the `vulcan` command line file. This can be invoked by running `node vulcan` inside your application directory. By not supplying a sub command, the default help output is sent. You can see a list of all commands that are available and even dive into them with the `--help` flag.

The CLI also loads custom commands that you can define by creating the command inside your `app/commands/` folder. By default we ship a example command called `greet` available at `app/commands/greet.js` so you can see how to create a command.

[koa]: http://koajs.com
[bookshelf]: http://bookshelfjs.org
[knex]: http://knexjs.org
[koa-router]: https://github.com/alexmingoia/koa-router
[koa-views]: https://github.com/queckezz/koa-views
