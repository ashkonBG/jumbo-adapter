# Jumbo adapter

[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

## Contributing

When contributing to this project please adhere to the development philosophy & guidelines

## Project structure

This project is a mono-repo for the following packages:

- `<project root>/packages/server`  
The server package that is hosting the gorillas-fulfillment-adapter service.
- `<project root>/packages/client`  
The client that is auto-generated with hallo-api based on the OpenAPI spec.
- `<project root>/packages/event-consumer`  
The event-consumer package that is deployed separately from the server and polls an SQS queue for newly created orders inside the Jumbo landscape.

We use [pnpm](https://pnpm.io/) for workspace management.

## Local development

### Requirements

- NodeJS **18.x** (💡 use [nvm](https://github.com/nvm-sh/nvm) to easily manage your node versions)
- pnpm **7.x**

### Getting started

#### General setup

1. Clone this repo
2. Configure npm to be able to use Jumbo private packages (which are hosted on GitHub):
Put the below content in `~/.npmrc`.  
Generate a token in GitHub (*Settings > Developer settings > Personal access token*) and put it in the placeholder in below snippet.

    ```text
    //npm.pkg.github.com/:_authToken=<insert your GitHub token here>
    ```

#### Server setup

1. From the project root, install dependencies `pnpm install`
2. Navigate to the server directory `cd packages/server`
3. Create .env file.  
For local development we use [dotenv](https://github.com/motdotla/dotenv) for providing the required environmental variables to our application.
`cp .env.example .env`
4. Run the app `pnpm dev`.  
It now should be running at `http://localhost:3001` 🚀  
Visit `http://localhost:3001/documentation` to see the OpenAPI spec 🎉
5. Profit ☀️🍺😎
