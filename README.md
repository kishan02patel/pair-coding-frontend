# Pair Coding

## Description 
A live coding platform which gives users the ability to code together.
  - A user can create a session and make it available to other users by giving them socket namespace.
  - Other users can connect to that socket namespace and start working together.
  - All the code and users' details connected to that session will be saved in the database. 
  - This is mostly helpful for interviewers to conduct technical interviews and know the thought process of the interviewee. 
  - Link for this app: https://paircoding.herokuapp.com

### Features:
  - Multiple language support.
  - Multiple editor-themes.
  - Download the code.
  - Stay tuned for more features.

### Getting Started
This is a React app built with create-react-app. It uses CircleCI and heroku for CI/CD. Only master branch gets deployed.

  1. Download/clone the repository.
  2. Run `npm install` to install all the dependencies.
  3. Run `npm run start-dev` to start local server for development.

### Environment Variables
  1. When the app is deployed the node server requires `process.env.PORT` variable. Default PORT is 8000.
  2. To connect to the backend specify the `process.env.REACT_APP_SERVER_URL` variable. Default is `localhost:3000`.

### CI and CD Environment Variables

  #### CircleCI Configurations
  Both the below configurations are used to push to the heroku server. CircleCI force pushes the code to heroku to avoid any conflicts.
   1. Specify the environment variable `REACT_APP_HEROKU_API_KEY` which is the heroku api key for deployment.
   2. Specify the environment variable `REACT_APP_NAME` which is the app name in heroku.

  #### Heroku Configurations
   1. Set the environment variable `REACT_APP_SERVER_URL` in heroku to connect the backend. Default is `localhost:3000`.
