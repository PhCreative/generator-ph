var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.NamedBase.extend({
  constructor: function () {
    // Call super
    yeoman.generators.Base.apply(this, arguments);

    // Put an initial welcome text
    this.log(yosay( chalk.green("JS Creation") + "\n" + chalk.green("Lets create a JS file") ));
  },
  /**
  *  Prompt for a JS file name
  **/
  newFile: function () {
    var done = this.async();

    this.prompt({
      name: "file",
      type: "input",
      message: "Name your JS file? (Without the .js)"
    }, function (answers) {
      this.props = answers;

      done();
    }.bind(this));
  },
  /**
  *  Create file
  **/
  createFile: function () {
    if (this.props.answers !== "") {
      // Date
      this.year = new Date().getFullYear();

      // Create file
      this.template("_file.js", "javascripts/" + this.props.file + ".js");

      // Done!
      this.log(yosay( chalk.green("Done") + "\n" + chalk.green(this.props.file + ".js created") ));
    }
  }
});
