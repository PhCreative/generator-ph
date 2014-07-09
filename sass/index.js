var yeoman = require('yeoman-generator'),
     yosay = require('yosay'),
     chalk = require('chalk'),
   replace = "//SassInsertLeaveAsIs";

module.exports = yeoman.generators.NamedBase.extend({
  constructor: function () {
    // Call super
    yeoman.generators.Base.apply(this, arguments);

    // Put an initial welcome text
    this.log(yosay( chalk.green("SASS Creation") + "\n" + chalk.green("Lets create a SASS file") ));
  },
  /**
  *  Prompt for a JS file name
  **/
  newFile: function () {
    var done = this.async();

    this.prompt({
      name: "file",
      type: "input",
      message: "Name your SASS file? (Without the .scss)"
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
      var pkg = JSON.parse(this.readFileAsString("package.json"));

      // Create file
      this.template("_file.scss", "stylesheets/" + this.props.file + ".scss");

      // Upload app.js to specify the deps on this file
      var file = this.readFileAsString("stylesheets/style.scss");

      var add = "@import \"" + pkg.name + "/" + this.props.file + "\";\n" + replace;

      this.write("stylesheets/style.scss", file.replace(replace, add));

      // Done!
      this.log(yosay( chalk.green("Done") + "\n" + chalk.green(this.props.file + ".scss created") ));
    }
  }
});
