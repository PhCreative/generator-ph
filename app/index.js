var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

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
    this.log(yosay( chalk.green("Hello world!") + "\n" + chalk.green("Its time to generator this project!") ));
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
      message: "Use latest jQuery? (IE9+). Uses 1.11.1 as default.",
      default: false
    }, {
      name: "require",
      type: "confirm",
      message: "Use RequireJS?",
      default: true
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
        // Copy to destination
        remote.directory("assets", ".");

        done();
      }, true);
    }
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
        // Copy to destination
        remote.directory("scss", "stylesheets/fontawesome");
        remote.directory("fonts", "./fonts");

        done();
      }, true);
    }
  },
  /**
  *  Move main sass file across
  **/
  moveSassFile: function () {
    // Move across the default style.scss for bootstrap
    this.template("_style.scss", "stylesheets/style.scss");
  },
  /**
  *  Download jQuery
  **/
  downloadJquery: function () {
    var done = this.async();
    var jquery = "http://code.jquery.com/jquery-1.11.1.min.js";

    if (this.props.jquery) {
      // Latest version
      jquery = "http://code.jquery.com/jquery-2.1.1.min.js";
    }

    // Download the file
    this.fetch(jquery, "./javascripts", function (cb) {
      done();
    });
  },
  /**
  *  Download RequireJS
  **/
  downloadRequire: function () {
    var done = this.async();

    if (this.props.require) {
      this.remote("jrburke", "requirejs", "master", function (err, remote) {
        // Copy to destination
        remote.copy("require.js", "javascripts/require.js");

        done();
      });
    } else {
      done();
    }
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
  *  Create Gruntfile across
  **/
  createGrunt: function () {
    this.template("_Gruntfile.js", "Gruntfile.js");
  },
  /**
  *  Install all dependancies for this project
  **/
  installDeps: function () {
    this.log(yosay( chalk.green("Hold on!") + "\n" + chalk.green("Installing all required modules...") ));

    // Install NPM deps
    this.npmInstall();
  }
});
