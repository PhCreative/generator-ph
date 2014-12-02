var yeoman = require('yeoman-generator'),
     yosay = require('yosay'),
     chalk = require('chalk'),
    minify = require('minify'),
        fs = require("fs");

// Export main module
module.exports = yeoman.generators.NamedBase.extend({
  /**
  *  Constructor method
  *  Called first
  **/
  constructor: function () {
    // Call super
    yeoman.generators.Base.apply(this, arguments);

    // Put an initial welcome text
    this.log(yosay( chalk.green("Hello world!") + "\n" + chalk.green("Its time to generate this project!") ));
  },
  /**
  *  Ask all the necessary prompts
  **/
  projectPrompts: function () {
    var done = this.async();

    // Create an array of prompts
    var prompts = [{
      name: "name",
      type: "input",
      message: "Project name",
      default: this.appname
    }, {
      name: "bootstrap",
      type: "confirm",
      message: "Do you want to use Bootstrap?",
      default: true
    }, {
      name: "fontawesome",
      type: "confirm",
      message: "Do you want to use Font Awesome?",
      default: true
    }, {
      name: "jquery",
      type: "confirm",
      message: "Use latest jQuery? (IE9+). Uses 2.1.1 as default.",
      default: true
    }, {
      name: "require",
      type: "confirm",
      message: "Use RequireJS?",
      default: true
    }, {
      name: "express",
      type: "confirm",
      message: "Want a basic static server? (Uses NodeJS)",
      default: false
    }];

    // Init prompts
    this.prompt(prompts, function (answers) {
      if (answers) {
        // Add answers to object
        this.props = answers;

        // Move over package.json
        this.template("_package.json", "package.json");

        done();
      }
    }.bind(this));
  },
  /**
  *  Download bootstrap if required
  **/
  downloadBootstrap: function () {
    if (this.props.bootstrap) {
      var done = this.async();

      // Give a message
      this.log(yosay( chalk.magenta("Time to download Bootstrap!") ));

      this.remote("twbs", "bootstrap-sass", "master", function (err, remote) {
        if (err) throw err;

        // Copy to destination
        remote.directory("assets", ".");

        done();
      }, true);
    }
  },
  reoveUnusedBootstrapFiles: function () {
    var dest = this.destinationRoot();

    // Remove some unused files
    fs.unlinkSync(dest + "\\stylesheets\\_bootstrap-compass.scss");
    fs.unlinkSync(dest + "\\stylesheets\\_bootstrap-mincer.scss");
    fs.unlinkSync(dest + "\\stylesheets\\_bootstrap-sprockets.scss");
    fs.unlinkSync(dest + "\\javascripts\\bootstrap.js");
    fs.unlinkSync(dest + "\\javascripts\\bootstrap-sprockets.js");
  },
  /**
  *  Download font awesome
  **/
  donwloadFontAwesome: function () {
    if (this.props.fontawesome) {
      var done = this.async();

      // Give a message
      this.log(yosay( chalk.magenta("Time to download Font Awesome!") ));

      this.remote("FortAwesome", "Font-Awesome", "master", function (err, remote) {
        if (!err) {
          // Copy to destination
          remote.directory("scss", "stylesheets/fontawesome");
          remote.directory("fonts", "./fonts");
        } else {
          throw err;
        }

        done();
      }, true);
    }
  },
  /**
  * Move main JS file
  **/
  moveJsFile: function () {
    this.year = new Date().getFullYear();

    // Copy file
    this.template("_main.js", "javascripts/main.js");
  },
  /**
  *  Move main sass file across
  **/
  moveSassFile: function () {
    // Move across the default style.scss for bootstrap
    this.template("_style.scss", "stylesheets/style.scss");

    if (this.props.bootstrap) {
      this.directory("partials", "stylesheets/" + this._.dasherize(this.props.name));
    }
  },
  /**
  *  Download jQuery
  **/
  downloadJquery: function () {
    var done = this.async();
    var self = this;
    var jquery = "jquery-1.11.1.min.js";

    if (this.props.jquery) {
      // Latest version
      jquery = "jquery-2.1.1.min.js";
    }

    // Download the file
    this.fetch("http://code.jquery.com/" + jquery, "./javascripts/plugins", function (cb) {
      fs.renameSync(self.destinationRoot() + "\\javascripts\\plugins\\" + jquery, self.destinationRoot() + "\\javascripts\\plugins\\jquery.js");

      done();
    });
  },
  /**
  * Download Modernizr
  **/
  downloadModernizr: function () {
    var done = this.async();
    var self = this;

    this.fetch("http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min.js", "./javascripts/plugins", function (cb) {
      fs.renameSync(self.destinationRoot() + "\\javascripts\\plugins\\modernizr.min.js", self.destinationRoot() + "\\javascripts\\plugins\\modernizr.js");

      done();
    });
  },
  /**
  *  Download RequireJS
  **/
  downloadRequire: function () {
    var done = this.async();
    var self = this;

    if (this.props.require) {
      this.remote("jrburke", "requirejs", "master", function (err, remote) {
        // Minify the file
        var filePath = remote.src["_options"].base + "\\require.js";

        minify.optimize(filePath, {
          callback: function (err, minData) {
            if (err) throw err;

            // Create file
            self.write("./javascripts/plugins/require.js", minData);

            done();
          }
        });
      });
    } else {
      done();
    }
  },
  /**
  * Download picture polyfil
  **/
  downloadPicture: function () {
    var done = this.async();
    this.fetch('http://cdnjs.cloudflare.com/ajax/libs/picturefill/2.2.0/picturefill.min.js', './javascripts/plugins', function () {
      done();
    });
  },
  /**
  *  Make app.js for requireJS
  **/
  createAppJs: function () {
    if (this.props.require) {
      this.template("_app.js", "javascripts/app.js");
    }
  },
  /**
  * ExpressJS server
  **/
  setupExpress: function () {
    if (this.props.express) {
      this.copy("server.js", "server.js");
    }
  },
  /**
  *  Create Gruntfile across
  **/
  createGrunt: function () {
    this.template("_Gruntfile.js", "Gruntfile.js");
  },
  /**
  * Copy extra files
  **/
  copyExtraFiles: function () {
    this.copy("index.html", "index.html");
    this.copy("mixins/_spread-value.scss", "stylesheets/mixins/_spread-value.scss");
  },
  /**
  * Rename folders
  **/
  renameFolders: function () {
    fs.renameSync('stylesheets', 'css');
    fs.renameSync('javascripts', 'scripts');
  },
  /**
  *  Install all dependancies for this project
  **/
  installDeps: function () {
    this.log(yosay( chalk.green("Hold on!") + "\n" + chalk.green("Installing all required modules...") ));

    // Install NPM deps
    this.npmInstall(null, null, function () {
      this.log(yosay( chalk.green("Almost!") + "\n" + chalk.green("Almost done, just one more thing!") ));

      // Run grunt command
      this.spawnCommand("grunt", ["css"]);
    }.bind(this));
  }
});
