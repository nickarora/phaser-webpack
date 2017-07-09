# Phaser + Webpack.
#### A bootstrap project to create games with Phaser + ES6 + Webpack.

## Features
- ESLINT with JavaScript Standard Style configuration
- Next generation of Javascript
- Webpack ready
- WebFont Loader

# Setup
To use this bootstrap you’ll need to install a few things before you have a working copy of the project.

## 1. Clone this repo:

Navigate into your workspace directory.

Run:

```git clone https://github.com/nickarora/phaser-webpack.git```

## 2. Install Nodejs

This project uses asdf tool manager with the asdf-nodejs plugin

https://github.com/asdf-vm/asdf

https://github.com/asdf-vm/asdf-nodejs

Once both are installed, navigate to the cloned repo’s directory.

Run:

```asdf install```

## 3. Install dependencies using [yarn](https://yarnpkg.com/):

Navigate to the cloned repo’s directory.

Run:

```yarn```

## 4. Run the development server:

Run:

```yarn dev```

This will run a server so you can run the game in a browser.

Open your browser and enter localhost:8080 into the address bar.

Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser


## Build for deployment:

Run:

```yarn deploy```

This will optimize and minimize the compiled bundle.
