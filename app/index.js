var yeoman = require('yeoman-generator');

// Export main module
module.exports = yeoman.generators.NamedBase.extend({
  /**
  *  Constructor method
  *  Called first
  **/
  constructor: function () {
    // Call super
    yeoman.generators.Base.apply(this, arguments);
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
      message: "Do you want to Bootstrap?",
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

      this.remote("twbs", "bootstrap-sass", "master", function(err, remote) {
        // Copy to destination
        remote.directory("assets", ".");

        done();
      }, true);
    }
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
    this.fetch("http://code.jquery.com/jquery-1.11.1.min.js", "./javascripts", function (cb) {
      done();
    });
  }
});
