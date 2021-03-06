---
title: "Webpack 4 Fundamentals"
description: These are notes from the 'Webpack 4 Fundamentals' course on Frontend Masters.
permalink: /frontend-masters/webpack-4-fundamentals

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Webpack from Scratch
    href: webpack-from-scratch
  - name: Webpack Core Concepts
    href: webpack-core-concepts
  - name: Using Plugins
    href: using-plugins
  - name: Wrapping Up
    href: wrapping-up
---

## Introduction

Why are we using Webpack and what problems does it solve? At its core, it's a very simple tool in terms of its standalone capabilities.

### Problems with Script Loading

But why? It is important to understand how we've used JavaScript on the web. There are really only 2 ways that you can use JavaScript in the browser. JavaScript is really just a script with top-down execution. The first way to load JavaScript in the browser is via a `<script>` tag. The second way is to actually write JavaScript in your HTML.

But what are the problems with these things?

They don't scale, you might have too many scripts, and each browser has bottlenecks. You could end up with unmaintainable scripts; scope, size, readability, fragility, monolithic files.

Potential solutions?

Immediately Invoked Function Expressions! Treat each file as an IIFE (Revealing Module Pattern). Using this pattern, you can now concatenate files without any concern of scope collision! This idea lead to the explosion of tools such as; **Make**, **Grunt**, **Gulp**, **Broccoli**, **Brunch**, **StealJS**. All of which are used to concatenate JS files.

But there are still problems... Full rebuilds every time. Dead code (code you are not using). Lots of IIFEs are slow. No way to lazy load.

### History of Modules

How do you load JavaScript if there is no DOM?

NPM + Node + Modules

NPM was created as a package registry to share JS modules across the registry.

There is no browser support for CommonJS, there are no live-bindings which causes problems with circular references, it's slow...

The solution to this is to use bundlers / linkers. **Browserify**, **RequireJS**, **SystemJS**. The bundlers are used to write CommonJS modules and use them in your code.

But there are still problems. There is no static async or lazy loading.

### EcmaScript Modules (ESM)

{% highlight javascript %}

import {uniq, forOf, bar} from 'lodash-es'
import * as utils from 'utils';

export const uniqConst = uniq([1,2,2,4]);

{% endhighlight %}

ES Modules is completely separate from ES 2015. ESM has named and default exports.

ESM brought reusable, encapsulated, organized, and convenient modules. The issues… ESM for Node.js? Incredibly slow in the browser.

### Introducing Webpack

Every [JavaScript] library is different; i.e. may use different module formats. Enter Webpack. Webpack is a module bundler which lets you write in any module format (including mixed formats) and compiles them for the browser. Webpack supports static async bundling which allows you to create separate lazy load bundles at build time. Webpack is the most performant way to ship JavaScript.

### Configuring Webpack

There's 3 ways that you can use Webpack.

1. The config - A CommonJS module that is an object which has a bunch of properties that define what Webpack should do with code.

2. Webpack CLI - Almost every single property in Webpack is bound to a CLI argument and parameter.

3. Node API - Neutrino is built with this.

Webpack is important for web performance, scalability, and maintainability.

## Webpack from Scratch

### Using Webpack for the First Time

[Repo to play along](https://github.com/thelarkinn/webpack-workshop-2018)

Start in branch `feature/01-fem-first-script`. Looking at the package.json file, you will find a lot of dependencies. Run `npm install`. Still in the package.json file, add the following:

{% highlight json %}

"scripts" : {
    "webpack": "webpack"
}

{% endhighlight %}

Then in the CLI type: `npm run webpack` and you will see the default Webpack CLI output and there isn't even a config file yet!

### Adding npm Scripts for Environment Builds

In the output, there should be a warning message that no `mode` has been set. [Click the link to learn more about Webpack `mode`(s)](https://webpack.js.org/concepts/mode) Now add `dev` and `prod` environments to the `scripts` section from above:

{% highlight json %}

"scripts" : {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development",
    "prod": "npm run webpack -- --mode production"
}

{% endhighlight %}

Now in the CLI you can type `npm run dev` or `npm run prod` to trigger the Webpack build mode as needed. Webpack defaults to production. Development is a faster build, production is an optimized build. Time to debug.

Switch to:

`git checkout feature/03-fem-debug-script`

### Setting Up Debugging

If you want to debug a node application, you can simply run node and pass in a couple of arguments; i.e. 

{% highlight json %}

"debugthis": "node --inspect --inspect-brk ./src/index.js"

{% endhighlight %}

When you run the above with `npm run debugthis`, you will see a url in terminal that will link you to a debugger in your browser. If we want to be able to debug Webpack, the debug command in the project is:

{% highlight json %}

"debug": "node --inspect --debug-brk ./node_modules/webpack/bin/webpack.js"

{% endhighlight %}

Run the debug command and you can debug Webpack!

Get comfortable with adding to your config file, because the Webpack methodology is based on 'separation of concerns'. Most people have trouble with Webpack because they shove everything into one file, into one build file, so it becomes fragile.

### Coding Your First Module

In `src/` add a new file; i.e. `nav.js`. If you want to share some variables or a function, using the `export {a, v, r}` syntax will allow you to do so. Otherwise, use `export default "nav"`. In your entry-point; i.e. `index.js` add an import statement, `import nav from "./nav";`.

{% highlight javascript %}

import nav from "./nav";

console.log(nav)

{% endhighlight %}

Then build the project with the `npm run prod` command.

### Adding Watch Mode

To avoid having to continuously run a build command, you can just add a 'watch' flag to your `dev` command in the config file; i.e.


{% highlight json %}

"dev": "npm run webpack -- --mode development --watch"

{% endhighlight %}

Now when you type `npm run dev` in terminal, Webpack will 'watch' for changes. Update `nav.js` to the following:

{% highlight javascript %}

export default () => "nav";

{% endhighlight %}

Then you have to update the index.js file to:

{% highlight javascript %}

import nav from "./nav";

console.log(nav()) <!-- call the nav function -->

{% endhighlight %}

You will see in your terminal the changes to the files being 'watched' and Webpack will incrementally compile the changes.

### ES Module Syntax

Add a new file `footer.js` with the following: 

{% highlight javascript %}

export const top = "top";
export const bottom = "bottom";

{% endhighlight %}

And in the `index.js` file add the following import statement: 

{% highlight javascript %}

import { top, bottom } from "./footer";

{% endhighlight %}

Now you have access to the variables from footer.

### CommonJS Export

If you want / need to use a CommonJS module, the format is kind of similar to what we've already seen. There are two options, a default or a named export. The syntax is as follows (in a file `button.js`):

{% highlight javascript %}

// take a str, the button label and return an element

module.exports = (buttonName) => {
    return `Button: ${buttonName}`;
};

{% endhighlight %}

In Webpack, you cannot use CommonJS and ES6 in the same file, it would throw an error.

Webpack supports using require, but you can import a CommonJS module as any other.

### CommonJS Named Exports

If you want to do a named export, maybe adding button styles?, make a new file `button-styles.js` and add the following: 

{% highlight javascript %}

const red = "color: red;";
const blue = "color:  blue;";
const makeColorStyle = color => `color: ${color};`;

exports.red = red;
exports.blue = blue;
export.makeColorStyle = makeColorStyle;

{% endhighlight %}

You can name the exports anything you want, but it might make sense to name them same or similar to the variable that they represent. If you would like to destructure your exports, you could (in footer.js) do the following:

`export { top, bottom };`

It is recommended to put your exoprts at the bottom  of your files. You *can* put your exports anywhere in the file, but it might make sense to choose and stick to a convention. Webpack only bundles whatever imports you are using, so if you only use the function from the `button-styles.js` file, only that function will be bundled, not the color variables.

### Tree Shaking

If you run `npm prod` and  check your `main.js` file, you would not see the color variables if you did not import them. This is an example of Webpack's tree shaking. Webpack will exclude any unused code. At the top level of your code directory, make a new file: `webpack.config.js`and add to it the following: 

{% highlight javascript %}

module.exports = {
    mode: "none"
};

{% endhighlight %}

The above basic configuration will run Webpack without any encapsulation.

### Webpack Bundle Walkthrough

If you've been following along, you can check out the `dist/main.js` file and take a look at how Webpack handles the code we've been working with.

In that file, you will find a bunch of comments (to see comments, you may need to make a webpack.config.js file in the root of your project, see below for example file) that will inform you of what each piece of the function(s) is doing.

{% highlight javascript %}
// simple webpack.config.js file to remove code minification/optimization... because comments 

module.exports = {
  mode: 'development',
  optimization: {
    minimize: false
  }
};

{% endhighlight %}

Take a look through the file and try to follow each line of comments to figure out what Webpack has produced.

## Webpack Core Concepts

### Weback Entry

Now we will begin to *actually* build out the config file, add loaders, support for other things, and talk about some why(s).

Webpack Entry - It's not the entry property on the config file, but speaking of the 'entry' of the various files required for your project; i.e.

||bootstrap.js||
|---|---|---|
||app.component.ts||
|external.lib.js||some.component.ts|
|external.lib.dep.js||some.component.sass|
|external.lib.dep.css

The first file `bootstrap.js` is your entry point, Webpack uss this as the starting point. This is defined by using an `entry` property in the config file:

{% highlight javascript %}
// webpack.config.js

module.exports = {
  mode: 'development',
  entry: './my-entry-file.main.js',
  //...
  }
};

{% endhighlight %}

There are a couple of different data types that you can enter into the `entry` point of your config file, but the simplest of them is just a string which is  just a relative path. Webpack will trace through each of your imports and then recurisively look for other dependencies in those files until it creates a graph.

The entry point tells Webpack **what** (files) to load for the browser; it compliments the **output** property.

### Output & Loaders

The next concept important to understanding Webpack is the **outuput** property.

{% highlight javascript %}
// webpack.config.js

module.exports = {
  //...
  output: {
    path: './my-output-path',
    filename: './my-output-filename.js',
  },
  //...
};

{% endhighlight %}

The above talks about where and how we are going to name the file. We've previously explored what the output looks like.

Fromo a high level: The output property tells Webpack **where** and **how** to distribute bundles (compilations). It works with entry.

The next concept is Loaders and Rules. Loaders and Rules go 'hand in hand', they tell Webpack how to modify files before they are aded to the dependency graph. Loadrs are also JavaScript modules (functions) that take source files, and return them in their modified state. A Loader / Module set up could look like the following:

{% highlight javascript %}

module: {
  rules: [
      {
          test: /\.ts$/,
          use: 'ts-loader'
      },
      {
          test: /\.js$/,
          use: 'babel-loader'
      },
      {
          test: /\.css$/,
          use: 'css-loader'
      }
  ]
};

{% endhighlight %}

In the above codeblock are a few (what Webpack calls) 'rule sets'. A rule set at its minimum takes two parameters. The first is, as Webpack is creating the dependency graph, to look for one of the test cases. The second parameter 'use' tells Webapck what Node module to use when it finds a 'test' case. When you are adding different rule sets to your configuration, you are basically defining a pattern to match and what loader to use. You are pattern matching the file extension and telling Webpack how to ingest that file. This happens per file, not in bulk.

Rule sets can have the following parameters:

{% highlight javascript %}

module: {
  rules: [
      {
          test: regex,
          use: (Array|String|Function),
          include: RegExp[],
          exclude: RegExp[],
          issuer: (RegExp|String)[],
          enforce: "pre"|"post"
      },
  ],
};

{% endhighlight %}

'test' accepts a regular expression that instructs the compiler which files to run the loader against.

'use' accepts an array/string/function that returns loader objects.

'enforce' can be either "pre" or "post" which tells Webpack to run this rule either before or after all other rules.

'include' accepts an array of regular expressions that instructs the compiler which folders/files to include. Will only search paths provided with the include.

'exclude' accepts an array of regular expressions that instructs the compiler which folders/files to ignore.

Whether or not you use any or all of the available parameters in the rule set will be based on your specific use case.

### Chaining Loaders

The anatomy of a loader is such that it just takes a source and returns a new source. 'use' can accept an array, and execute from right to left. Technically, under the hood they go right left right, but the first pass going from right to left is just to collect metadata. Just before Webpack is going to process any file, it checks to see if any rule sets match against the file. 

{% highlight javascript %}

module: {
  rules: [
      {
          test: /\.less$/,
          use: ['style', 'css', 'less']
      }
  ],
};

{% endhighlight %}

The above example, when finding a file with the `.less` extension, would start with the `less` loader, then pass the result to the `css` loader, andd finally to the `style` loader which results in the styles being placed in a script tag at the head of your HTML file. Not a very performant way to handle your styles, but an example of chaining loaders.

[There are tons of loaders available in the NPM registry](https://www.npmjs.com/search?q=webpack%20loader)... responsive image handling, babel, php to JS.

Loaders tell Webpack **how** to interpret and translate files. Transformed on a per-file basis before adding to the dependency graph.

### Weback Plugins

The last core concept of Webpack is plugins. The anatomy of a Webpack plugin is at its core a JavaScript object that has an `apply` property in the prototype chain. A plugin allows you to hook into the entire Webpack lifecycle of events. There are a bunch of plugins built out of the box to make things easier. An example of plugin:

{% highlight javascript %}

function BellOnBundlerErrorPlugin () { }

BellOnBundlerErrorPlugin.prototype.apply = function(compiler) {
  if (typeof(process) !== 'undefined'){

    // Complier events that are emitted and handled
    compiler.plugin('done', function(stats) {
        if (stats.hasErrors()) {
            process.stderr.write('\x07');
        }
    });

    compiler.plugin('failed', function(err) {
        process.stderr.write('\x07');
    });

  }
}

module.exports = BellOnBundlerErrorPlugin

{% endhighlight %}

The above plugin is instantiable, so we can `require()` it from the `node_modules` into the config file. In the `webpack.config.js` file, you can add this plugin as so:

{% highlight javascript %}

// require() from node_modules or webpack or local file
var BellOnBundleErrorPlugin = require('bell-on-error');
var webpack = require('webpack');

module.exports = {
    //...
    plugins: [
        new BellOnBundlerErrorPlugin(),

        // And some more of the built-in plugins
        new webpack.optimize.CommonsChunckPlugin('vendors'),
        new webpack.optimize.UglifyJSPlugin()
    ]
    //...
}

{% endhighlight %}

The above passes a new instance of the plugin(s) into the configuration. Within the `()` of each plugin you can pass in additional arguments.

80% of Webpack is made up of its own plugin system. Webpack itself is a completely event drive architecture. Having this sort of architecture allows Webpack to pivot very quickly. It allows Webpack to instantly adopt a new feature without breaking anything. Alternatively, Webpack could drop a feature without breaking changes.

Plugins add additional functionality to *Compliations(optimized bundled modules)*. They are more powerful with more access to the [CompilerAPI](https://webpack.js.org/api/compiler-hooks/). They do everything else you'd ever want to do in Webpack. Plugins let you do anything that you can't do with a loader. Loaders are only applied on a profile basis, but plugins can access theh whole bundle.

Plugins are useful when you want to interact with the compiler runtime, the event lifecycle, or even when you want to just apply functionality at the bundle level.

### Weback Config

Time to start for real build out a `webpack.config.js` file!

{% highlight javascript %}

module.exports = () => ({
    output: {
        filename: "bundle.js"
    }
});

{% endhighlight %}

The above will change the defalut Webpack output filename to `bundle.js`

### Passing Variables to Webpack Config

Now we look at how too access environment variables. In the `package.json` file, update the `--mode` flag in the "prod" "dev" "prod:debug" "dev:debug" definitions to `--env.mode`. When you are using the `--env.mode` flag, it takes whatever value that is, in this case it's like an object with a `mode` property and it will provide that to the config for you. Update the `webpack.config.js` file as below:

{% highlight javascript %}

module.exports = env => {
console.log(env); // this way you can see what env is
    return {
        output: {
            filename: "bundle.js"
        }
    }
};

{% endhighlight %}

type `npm run prod` in the console and you can see the value of `env`. It should log the whole object, in this case `{mode: production}`. You'll also see a warning that the mode has not been set, so set one in your `webpack.config.js` file.

{% highlight javascript %}

module.exports = env => {
console.log(env); // this way you can see what env is
    return {
        mode: env.mode,
        output: {
            filename: "bundle.js"
        }
    }
};

{% endhighlight %}

Now that you know how to get different things into your config file, you can start to change the behavior of your returned object conditionally. First update the `webpack.config.js` file to:

{% highlight javascript %}

module.exports = ({ mode }) => {
console.log(mode); // this way you can see what mode is
    return {
        mode,
        output: {
            filename: "bundle.js"
        }
    }
};

{% endhighlight %}

Moving forward, the next step is to configure the different build environments. One will be to define a set of plugins that you want to use across your whole build system, another is what you want for your development mode, and then what you need for your production mode. There can be more than these, but for the purposes of this workshop, this is the baseline.

### Adding Weback Plugins

 [🔥 OOTB Webpack plugins](https://webpack.js.org/plugins/)

The first *essential* Webpack plugin is the `html-webpack-plugin`. If you don't already have it installed, type `npm install html-webpack-plugin --save-dev` in your terminal. To get this to exist across all environments of your project, create a new folder for your config files, called `built-utils` or `webpack-thangs` or whatever makes sense. Then update your `webpack.config.js` file as below:

{% highlight javascript %}

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode }) => {
console.log(mode); // this way you can see what mode is
    return {
        mode,
        output: {
            filename: "bundle.js"
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new webpack.ProgressPlugin()
        ]
    }
};

{% endhighlight %}

Anytime you pass a plugin to your config file, you need to add `new` before declaring it (see above code block).

### Setting Up a Local Development Server

Before you start to separate out the config file into different builds and conditionals, let's set up a development server. Run `npm install webpack-dev-server --dev`. Then update the `package.json` file with: 

{% highlight javascript %}

//...
"webpack-dev-server": "webpack-dev-server",
//...
"dev": "npm run webpack-dev-server..."
//...

{% endhighlight %}

Type `npm run dev` into your terminal and you should see that your code is available to view somewhere on a localhost address. Now you have a dev server to check on your changes as they are compiled, the browser will automatically refresh when changes are compiled. Webpack Dev Server is a web server based on [Express](https://expressjs.com/). All it's doing is instead of making a bundle, is it is making a bundle in memory and serving that up to Express, which then does a web socket connection which displays the updates as they arrive.

### Starting to Code with Webpack

With the development server set up, making changes to files will cause a compile to occur and you can see the changes reflected in your browser. The workshop example shows the `footer.js` file being updated to create some markup with JavaScript.

{% highlight javascript %}
import{ red, blue } from "./button-styles";

const top = document.createElement("div");
top.innerText = "Top of Footer";
top.style = red;
const bottom = document.createElement("div");
bottom.innerText = "Bottom of Footer";
bottom.style = blue;

const footer = document.createElement("footer");
footer.appendChild(top);
footer.appendChild(bottom);

export { top, bottom, footer };

{% endhighlight %}

This is a very basic example, but it does allow you to immediately see the benefit of using the Webpack development server.

### Splitting Environment Config Files

Time to split the environment config files! In `webpack.config.js`, update it to:

{% highlight javascript %}

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
console.log(mode); // this way you can see what mode is
    return {
        mode,
        output: {
            filename: "bundle.js"
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new webpack.ProgressPlugin()
        ]
    }
};

{% endhighlight %}

The new const `modeConfig` is calling require and based on what is passed in to the function (env), it will either look for `webpack.production` or `webpack.developemnt`. This is leveraging the `env.mode` and passing it in. Also on the `module.exports...` line are some additional defaults added as a 'safety net' so that if no object is passed in, there is in fact now a default that would run the base configuration of Webpack.

To get your config split into different files, run `npm install webapck-merge --dev`, then add `const webpackMerge = require("webpack-merge");` to the webpack.config.js file. By deafult, Webpack Merge is just using [Object Assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). Again update the webpack.config.js file to:

{% highlight javascript %}

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const webpackMerge = require("webpack-merge");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
    return webpackMerge (
        {
            mode,
            plugins: [
                new HtmlWebpackPlugin(),
                new webpack.ProgressPlugin()
            ]
        },
        modeConfig(mode),
        loadPresets({ mode, presets })
    );
}
{% endhighlight %}

`modeConfig` will set the mode. With the webpack.config.js file set up, you can now start to separate *production*, *development*, and whatever other build environment settings you would like to have.

### Webpack Q&A

**Can Webpack be used server side?**

Yes, with `webpack-dev-middleware`

**Can you use the HTML Webpack plugin to process all HTML files without having to declare the plugin across multiple build environments?**

For a multi-page app architecture, you do actually have to have a new instance of this plugin. Check out the [Multipage Webpack Plugin](https://github.com/zorigitano/multipage-webpack-plugin) for some insight on how that has been handled by the instructor in a previous role for Multual of Omaha. Basically, it accesses your entries and for each entry creates a new instance of the plugin.

**Are there situations where Webpack runs into an out of memory error andn where would you capture that exception?**

Yes? Your Webpack space complexity will be linear in terms of how many modules you have in your app. You will end up consuming more and more memory because it needs more and more memory. Increasing the memory limit for Node can help (AirBNB has gone up to 32GB). It's also possible that you could have a memory leak i.e. you are using hashing while using the dev server and a new hash is created each time you make a file change which is then stored in memory. Don't do that. BUT... that specific issue has been addressed in Webpack 5.

## Using Plugins

### Using CSS with Webpack

It would be more manageable if styles were out of the JavaScript right?! Like maybe in their own CSS/SCSS file? Yep. Go ahead and make a new stylesheet for your `footer.js` file. Call it `footer.css` or something clever like that (I
'm actually using SASS, so if you'd like to do that as well, run `npm install sass sass-loader` to get support for that filetype). I added classes and an import for the SCSS file to my `footer.js` file like so:

{% highlight javascript %}

import "./footer.scss";
import { red, blue } from "./button-styles";

const top = document.createElement("div");
top.className = "footer--top";
top.innerText = "Top of Footer";
const bottom = document.createElement("div");
bottom.innerText = "Bottom of Footer";
bottom.className = "footer--bottom";
const footer = document.createElement("footer");
footer.appendChild(top);
footer.appendChild(bottom);

export { top, bottom, footer };

{% endhighlight %}

In your new `footer.css` (or `footer.scss`) file, add some styling like so:

{% highlight sass %}

footer {
    height: 100px;
    width: 100%;
    text-align: center;

    .footer--top {
        padding: 10px 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: lawngreen;
    }

    .footer--bottom {
        padding: 10px 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: aqua;
    }
}

{% endhighlight %}

Do whatever you like for styling, the important thing is to see the things! But before we get to see all the awesome we've made, we have to update the config file to provide the appropriate loaders for the stylesheet(s). Update the `webpack.development.js` file with this:

{% highlight javascript %}

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
})

{% endhighlight %}

I believe the instructor skipped over the breaking up of the configs into separate files, so here's that. Make (at the root of your project) a folder for your configuration files, `build-utils` is a fine name. Add `webpack.development.js` and `webpack.production.js` in that folder and add the following base for each:

{% highlight javascript %}

module.exports = () => ({});

{% endhighlight %}

And if you are using straight up CSS, your config should look like this remember that `test` is a regular expession to find the specific filetype and `use` is what loader we will use to process the file:

{% highlight javascript %}

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
})

{% endhighlight %}

Initially, the instructor only includes the `css-loader` and nothing happens. To check out what's going on (if you want to try this progressively), `console.log` the import from `footer.js` and you can then see what is actually being imported. `style-loader` actually consumes the CSS and applies it for you.
*note: if you are modifying your config, you will have to restart your dev environment*.

### Hot Module Replacement with CSS

If you look at the generated code, there are special annotations wrapped around your CSS (now JavaScript code). Loaders are really useful for helping support a unique Webpack feature called [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/). So... we're going to try it. In the `package.json` file, add another flag to the end of your `dev` setup, `--hot`. To see Hot Module Replacement in action, restart your dev environment `npm run dev`, remove the `import ".footer.(s)css";` statement from `footer.js` and place that same line into your entry point, `index.js`. Then, make some arbitrary change to your stylesheet and you should see the browser instantly reload itself. Currently your `package.json` file should look something like this:

{% highlight javascript %}

//...
"scripts": {
    "webpack": "webpack",
    "webpack-dev-server": "webpack-dev-server",
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",
    "prod": "npm run webpack -- --env.mode production",
    "dev": "npm run webpack-dev-server -- --env.mode development --hot",
    "prod:debug": "npm run debug -- --env.mode production",
    "dev:debug": "npm run debug -- --env.mode development"
},
//...

{% endhighlight %}

Webpack has the ability to 'patch' files with changes incrementally and apply them without you ever having to reload the browser. Currently, the setup is relying on JavaScript to insert a style tag to implement the CSS, but that is not an ideal way to apply styling, so let's update the production config to use the `mini-css-extract-plugin`. In `webpack.production.js`, make your file look like this:

{% highlight javascript %}

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
})

{% endhighlight %}

Next run your production environment, `npm run prod`, and check out the magic. There should now be a seperate CSS file in your `dist` folder AND you will see in the `index.html` file that there is a `<link>` without stylesheet in the appropriate place. The `mini-css-extract-plugin` has support for lazy loading CSS, a pretty huge performance win espcially when it comes to CSS. With the `css-loader` you can [minify your CSS amongst other things](https://webpack.js.org/loaders/css-loader/). Whatever CSS you have, say multiple files for each component, they will be concatenated into one file.

### File Loader & URL Loader

Now we will add File and URL Loaders to the base configuration `webpack.config.js`. `npm install file-loader url-loader` These new loaders are an all around fallback to things that may not be mappable to a browser API or a source image/video/audio file, the most basic example being something like a `.jpeg`. You may want to Base64 inline an image or just optput it to your `dist` directory. This is what the URL Loader does for you. Grab any image and put it into your `src` folder. Set up the URL loader in the `webpac.config.js` file like so:

{% highlight javascript %}

//...
mode,
module: {
    rules: [
        test: /\.jpe?g/,
        use: ["url-loader"]
    ]
}
output: {
//...

{% endhighlight %}

### Loading Images with JavaScript

When it comes to Laoders (or pretty much anything) Webpack treats everything like JavaScript, so you can use it like JavaScript. In the `index.js` file, you can now import your image, something like `import image from "./name-of-your-image.jpg"` and if you log that to the console, you would see the base64 encoded version of your image file. Go ahead and make a new file in your `src` folder called `image.js` and add the following:

{% highlight javascript %}

const makeImage = url => {
    const image = document.createElement("img");

    image.src = url;
    return image;
};

export default makeImage

{% endhighlight %}

And back in the entry point `index.js` import the new script `import makeImage from "./image";`

Still in `index.js` add the following:

{% highlight javascript %}
const imageURL = "./path-to-my-image.jpg";

const image = makeImage(imageURL);

document.body.appendChild(image);

{% endhighlight %}

If you are running the dev environment, you should see the image appear.

### Limit Filesize Option in URL Loader

Now you should have an image loading, but it is not optimized yet, because it is a giant URI... Let's fix that. The URL Loader has an option called `limit`. Update the `webpack.config.js` `url-loader` to:

{% highlight javascript %}
use: [
        {
            loader: "url-loader",
            options: {
                limit: 5000
            }
        }
    ]
{% endhighlight %}

Notice the modified syntax for the loader, it is now an object. Both the shorthand `["url-loader"]` or its object counterpart work, but if you want to be able to pass options to the loader, you need to use its object form. Above, the `limit` option is set which for the URL loader will cause it to base64 encode any images that are below the specified size or if they are above the specified size, it will just include a hashed image in your output file (stored in memory). To do this, the url-loader is actually calling the file-loader behind the scenes.

### Implementing Presets

The idea of presets is that you might want more than dev or prod configurations. For this section, check out this [loadPresets.js](https://github.com/TheLarkInn/webpack-workshop-2018/blob/feature/build-utils/build-utils/loadPresets.js) file in the workshop repo on github. The code is:

{% highlight javascript %}
const webpackMerge = require("webpack-merge");

module.exports = env => {
  const { presets } = env;
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(
    presetName => require(`./presets/webpack.${presetName}`)(env) // call the preset and pass env also
  );

  return webpackMerge({}, ...mergedConfigs);
};
{% endhighlight %}

You might have some different scenarios where you want to try out one feature, analyze your build, or have something that only your CI runs. You don't want it shipped in your prod configuration, so presets. The above code block is taking in the `env` settings then flattening all of the presets into a list of strings. Then it maps them into a require function that takes the `presetName` and calls them. They are then merged and returned.

Next, type that code out into your own `loadPresets.js` file and jump to your `webpack.config.js` to implement `loadPresets`. Something like:

{% highlight javascript %}

//...
const presetConfig = require("./build-utils/presets/loadPresets");
//...

//...
presetConfig({ mode, presets })
//...

{% endhighlight %}

With the above code, you could now start to build out a variety of presets for different scenarios; `webpack.typescript.js`?

{% highlight javascript %}
module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader
            }
        ]
    }
});
{% endhighlight %}

You then need to add the typescript loader to your project `npm install ts-loader typescript@next`. Now in the package.json file, you can add another build environment for typescript:

{% highlight javascript %}

//...
"prod:typescript": "npm run prod -- --env.presets typescript",
//...

{% endhighlight %}

If you run `npm run prod:typescript`, you should be able to include a file ending in `.ts` and your new environment and loader should be able to handle the new file. And it does.

### Bundle Analyzer Preset

Webpack, by default, when it builds, it emits a `stats` object. The `stats` object either gets converted to a string or JSON (which is printed in the terminal), which is like the information that you see anytime a build happens. You can print it or you can consume it and do some interesting stuff with it. Possibly analyzing why a certain dependency got pulled into your appliaction as an example, or why is a particular file so large?

Time to add the Webpack Bundle Analyzer plugin! `npm install webpack-bundle-analyzer --dev` Then add to the `package.json`:

{% highlight javascript %}

//...
"prod:analyze": "npm run prod -- --env.presets analyze",
//...

{% endhighlight %}

Now make a new script / preset that calls the Webpack Bundle Analyzer, `webpack.analyze.js` (analyze matches the name in package.json file). `webpack.analyze.js`:

{% highlight javascript %}

const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = () => ({
    plugins: [
        new WebpackBundleAnlyzer
    ]
});

{% endhighlight %}

Run `npm run prod:analyze` and you will see a page loaded in your web browser showing the result. Out of the box, it creates a separate web server which gives you a tree map visualization of what's in your bundle. This is a valuable tool to determine why you may have file duplication or why a file may not be separated out

### Compression Plugin

Another example in adding a specific plugin for a specific purpose, the Compression Plugin! `npm install compression-webpack-plugin --save-dev` Make a new preset file `webpack.compress.js` in the `presets` folder. Make it look like this:

{% highlight javascript %}

const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = () => ({
    plugins: [
        new ComressionWebpackPlugin()
    ]
});

{% endhighlight %}

Oh and of course... Add to your `package.json` file:

{% highlight javascript %}

//...
"prod:compress": "npm run prod -- --env.presets compress",
//...

{% endhighlight %}

Then run `npm run prod:compress` and watch the magic unfold! If you want to take it a step further, try running `npm run prod:compress -- --env.presets analyze` and see how you can now get both the compression and the analyze preset to run together. This is possible with any of your configs... if you've been following how to set up Webpack with this tutorial.

Each of the plugins we've seen do have individual options, it just depends on what your environment is.

### Source Maps

The last piece that is useful to discuss is, Source Maps. There are a variety of different fomats that you can generate source maps and they all have different trade-offs, like everything in programming. Go check out the [Webpack Config Documentation](https://webpack.js.org/configuration) the specific section of the docs is [devtool](https://webpack.js.org/configuration/devtool). Devtool is the property responsible for creating source maps. You'll notice a table that talks about all of the diferent qualities of what the source maps produce. You can see in the table the various trade-offs that can be made depending on the quality of source map you are after.

## Wrapping Up

### Q&A and Closing Remarks

Q: If you split your JavaScript files into `main.js`, `vendor.js`, and `manifest.js` as per the docs on caching, and your vendor file is getting too big, what are some of the steps you would take to reduce the filesize?

A: Focus more on actually splitting your code with the dynamic import statement instead of trying to force or synthetically create the spender bundle. At the end of the day, caching really only solves the time it takes for the network to retrieve an asset, but the number one cost of a page loading slowly is the amount of JavaScript you parse, evaulate, and execute. So you don't get any wins there by creating these vendor bundles. Short answer, turn the caching features off. And focus on trying to asychronously load code that you don't need up front.

Q: Is there a lazy load plugin recommendation?!

A: Lazy loading is code splitting in Webpack. The example given, changes an import statement into a function that loads the import statement when called; i.e. when a button is clicked, load the code.

{% highlight javascript %}

// from index.js in the workshop repo
//..
const loadFooter = () => import('./footer');
//..

button.addEventListener("click", e => {
    loadFooter().then(m => {
        document.body.appendChild(m.footer) // moved from below
    });
});

{% endhighlight %}

The above (contrived) scenario assumes that we only want to load the footer when someone clicks on a button. Lazy loading / code splitting is the main reason Webpack was created. Webpack supports dynamic import statements by default. If you are using Babel, you have to add another plugin to support the syntax... [like this plugin that does exactly that](https://github.com/airbnb/babel-plugin-dynamic-import-node). Standalone without Babel or Typescript, Webpack can read and understand the dynamic import statement. The above would actually create a separate bundle file that will only be loaded when the event occurs.

Q: Is there any tree shaking benefit over exporting individual functions instead of a class?

A: Short answer is yes. Methods on classes cannot be tree-shaken if they are not used. The instructor tends to favor a Functional over Object Oriented approach.

Q: How do you go about finding good [Webpack] plugins versus bad plugins?

A: [Webpack Contrib](https://github.com/webpack-contrib/) - contains 90 repos; mostly loaders.