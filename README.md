**WARNING**: This repository is not maintained anymore.

# Serve-SPA Demos

Demonstrates the use of [Serve-SPA](https://github.com/analog-nico/serve-spa) with different SPA frameworks.

The [demos](demos/) folder contains the implementation of the same example SPA implemented using different SPA frameworks. Each one in its original form as well as in its precomposed form served with Serve-SPA – so you can see in a diff which changes to make.

## Installation

1. Clone this repo to your desktop,
2. in the shell `cd` to the main folder,
3. hit `npm install`
4. hit `npm install bower -g` if you haven't installed Bower globally yet, and
5. run `bower install`. (Or run `node ./node_modules/.bin/bower install` if you don't want to install Bower globally.)

## Running the Demos

E.g. for running the precomposed SPA using Angular.js:

1. `cd` to the main folder of this repo,
2. hit `node demos/angularjs/precomposed/server.js`, and
3. open [http://localhost:3000](http://localhost:3000) in your browser.
