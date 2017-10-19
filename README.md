[![pipeline status](https://gitlab.com/tripetto/forms/examples/angular/badges/master/pipeline.svg)](https://gitlab.com/tripetto/forms/examples/angular/commits/master)
[![docs](https://img.shields.io/badge/docs-website-blue.svg)](https://forms.tripetto.community/collector)
[![chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/tripetto/forms)

**Simple demo for implementing the [Tripetto Forms collector](https://www.npmjs.com/package/@tripetto/forms-collector) using Angular.**

Tripetto Forms bring a new way of creating and deploying forms in websites and applications. You use its intuitive graphical [editor](https://www.npmjs.com/package/@tripetto/forms-editor) to build and edit smart forms with logic and conditional flows in 2D on a self-organizing drawing board. In any modern browser. Mouse, touch or pen.

And you deploy these smart forms in websites and applications using the supplementary [collector](https://www.npmjs.com/package/@tripetto/forms-collector) library. Anything you build in the editor, the collector will simply run. You just focus on the visuals of the embedded form.

*This demo shows how to implement the collector for some basic form input controls using [Angular](https://angular.io/) and [Bootstrap](http://getbootstrap.com/). The goal is to show you how to implement the collector with minimal code footprint so you get a good understanding of the principles.*

# How to run
1. [Download](https://gitlab.com/tripetto/forms/examples/angular/repository/master/archive.zip) or clone the [repository](https://gitlab.com/tripetto/forms/examples/angular) to your local machine:
```bash
$ git clone git@gitlab.com:tripetto/forms/examples/angular.git
```

2. Run `npm install` inside the downloaded/cloned folder:
```bash
$ npm install
```

3. Start the dev server by running the command below. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
```bash
$ npm start
```

4. Open another terminal/command prompt and start the editor (this will open an example definition file located at `./src/assets/form.json`):
```bash
$ npm run tripetto
```

This last command will probably automatically open your default browser with the URL http://localhost:3333. If not, open the browser of your choice and navigate to this URL.

When you have changed your form, click the `Save` button at the right top of the editor. Then, refresh the form collector to run the altered form.

# Documentation
The complete Tripetto Forms documentation can be found at: [https://forms.tripetto.community](https://forms.tripetto.community).

The detailed collector documentation can be found [here](https://forms.tripetto.community/collector/).

# Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

# Issues
Run into issues using this demo code? Report them [here](https://gitlab.com/tripetto/forms/examples/angular/issues).

Problems using the collector? Report bugs and issues [here](https://gitlab.com/tripetto/forms/collector/issues).

Problems using the editor? Report bugs and issues [here](https://gitlab.com/tripetto/forms/editor/issues).

# Support
For general support contact us at support@tripetto.com.

# About us
If you want to learn more about Tripetto or contribute in any way to our ambitions, visit us at [Tripetto.com](https://tripetto.com/).
