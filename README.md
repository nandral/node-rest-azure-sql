# RESTful appplication with Azure SQL applying JavaScript best practices & productivity tools

### Introduction
This app gives an example of a REST application on [HATEOAS Architecture](https://spring.io/understanding/HATEOAS) using Node, Express and Azure SQL. 

This repository demonstrates the usage of [Sequelize](http://docs.sequelizejs.com/en/latest/) the Object Relational Mapping tool for JavaScript within an [Express](https://expressjs.com) application


**Start Development Server**
```
npm install
npm start
```

**Start Production Server**
```
npm install
npm run prod
```

### Common Dev Env
Building a JavaScript application from scratch today is overwhelming. You have to make decisions about package management, bundling, linting, transpiling, automated testing, and much more. There are literally over 20 important decisions to consider. This project is a playbook of potential options that provides a clear path through the key decisions. Along the way, we'll build a robust automated development environment from the ground up using ES6. 

#### 1. Editor and Editor config
- VS code is editor of choice because its free, built-in support for debugging, light-weight, intellisense, code-completion, first-class support for ES6 & TypeScript, inbuilt terminal etc.
- Webstorm is the best but not free!
- To maintain consistency use .editorconfig from http://editorconfig.org/

#### 2. Automation | Task runner
- Various task runners are available like Gulp, Grunt and npm Scripts
- Read [NPM vs Gulp](http://bit.ly/npmvsgulp) to get better idea about npm Scripts vs Gulp & Grunt
- We will use **npm scripts** for task automation

#### 3. Nodemon
- Watch for the changes in the src files and restart automatically

#### 4. [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
- Enable CORS for accepting requests from different domains
- Backend and Frontend will be two separate projects. **TODO reasons for this**

#### 4. Mocha
- Mocha as a unit test framework. assert module for assertions
- Watch task is added to the npm scripts, so that test cases run for any changes in source files or test cases

#### 5. Integration testing
- Supertest is used for Integration testing. 
- Watch task is added even for integration tests

#### 6. Object Relational Mapper :: [Sequelize](http://sequelizejs.com)
- We should avoid writing SQL queries as much as possible and leverage ORM tools to avoid boilerplate code and improve developer productivity
- Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- Sequelize allows to connect to different types of databases just by configuration. In this app, we will use different databases for dev, test and prod environments


#### 7. Development database :: SQLITE 
- sqlite is used as development database
- Workspace is configured to create an sqlite instance and store data in local file system in binary format.
- Data is persisted after server is restarted

#### 8. Test database :: SQLITE in-memory
- sqlite in-memory used as test database.
- Database is launched in memory, used for unit and integration testcases and deleted with out any hassles.

#### 9. Production database: Azure SQL
- We will be using Azure SQL as a production database this app.
- Sequelize ORM also supports other databases like postgres, mysql, mariadb etc.

#### 10. Database logging
- To enable Sequelize SQL logging, just remove the entry `logging: false` from db.config.json

#### TODO. Linting
#### TODO. Transpiling with Babel
- transpile ES6 to ES5 to assure that it runs in all browsers

#### TODO. Check Security of node modules
- To find security vulnerablities in node modules, use Node Security Platform. https://nodesecurity.io/opensource






