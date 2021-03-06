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
      name: "git",
      type: "input",
      message: "You need to set the BasePackageHTML git repo as public while you run this generator. Enter 'yes' once you have done this.",
      validate: function( value ) {
        var pass = value.match("yes");
        if (pass) {
          return true;
        } else {
          return "Please enter 'yes' when you have made the repo public";
        }
      }
    }, {
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
      name: "sass",
      type: "confirm",
      message: "Do you want to SASS? (Stylus is the alternative)",
      default: true
    }, {
      name: "fontawesome",
      type: "confirm",
      message: "Do you want to use Font Awesome?",
      default: true
    }, {
      name: 'coffee',
      type: 'confirm',
      message: 'Do you want to use CoffeeScript?',
      default: false
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
      name: "blogIsotope",
      type: "confirm",
      message: "Use isotope layout for blog listing?",
      default: false
    }, {
      name: "express",
      type: "confirm",
      message: "Want a basic static server? (Uses NodeJS)",
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
  *  Download BasepackageHTML files
  **/
  downloadStandardPages: function () {
      var done = this.async();

      this.remote("PhCreative", "BasepackageHTML", "master", function (err, remote) {
        if (err) throw err;

        // Copy to destination
        remote.directory("standard_pages", ".");

        done();
      }, true);
        
  },
  removeUnusedStandardPages: function () {
    var dest = this.destinationRoot();

    // Remove some unused files
    fs.unlinkSync(dest + "/index-menu.html");
    fs.unlinkSync(dest + "/landing-page.html");
  },
  /**
  * Download Footer
  **/
  downloadFooter: function () {
    var done = this.async();
    var self = this;
    this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/footers/footer-standard-elements.html', '.', function (cb) {
    fs.renameSync(self.destinationRoot() + "/footer-standard-elements.html", self.destinationRoot() + "/footer.html");
    done();
    });
  },
  /**
  * Download Header
  **/
  downloadHeader: function () {
    var done = this.async();
    var self = this;
    this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/headers-and-navs/header-standard.html', '.', function (cb) {
    fs.renameSync(self.destinationRoot() + "/header-standard.html", self.destinationRoot() + "/header.html");
    done();
    });
  },
  /**
  * Download Article pages
  **/
  downloadArticle: function () {
    var done = this.async();
    var self = this;
    this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/articles/two-col.html', '.', function (cb) {
    fs.renameSync(self.destinationRoot() + "/two-col.html", self.destinationRoot() + "/article.html");
    done();
    });
  }, 
   /**
  * Download Grid page
  **/
  downloadGrid: function () {
    var done = this.async();
    var self = this;
    this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/grids/grid.html', '.', function (cb) {
    done();
    });
  }, 
  /**
  * Download Blog pages
  **/
  downloadBlogAuthor: function () {
    var done = this.async();

    this.fetch("https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/blog/blog-author.html", ".", function (err) {
        if (err) throw err;
        done();
      });
  }, 
  downloadBlogAuthorList: function () {
    var done = this.async();

    this.fetch("https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/blog/blog-author-list.html", ".", function (err) {
        if (err) throw err;
        done();
      });
  },
  downloadBlogDetail: function () {
    var done = this.async();

    this.fetch("https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/blog/blog-detail.html", ".", function (err) {
        if (err) throw err;
        done();
      });
  },
  DownloadBlogListing: function () {
    if (this.props.blogIsotope) {      
      // download blog isotope listing
      var done = this.async();
      var self = this;
      this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/blog/blog-isotope.html', '.', function (cb) {
      fs.renameSync(self.destinationRoot() + "/blog-isotope.html", self.destinationRoot() + "/blog.html");
      done();
    });
    } else {
      // download blog listing
      var done = this.async();
      this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/blog/blog.html', '.', function (err) {
        if (err) throw err;
        done();
      });
    }
  },
  /**
  *  Download BasepackageHTML sass
  **/
  donwloadBasePackageSass: function () {
    if (this.props.sass) {
      var done = this.async();
      //var self = this;

      // Give a message
      this.log(yosay( chalk.magenta("Time to download BasePackage sass!") ));

      this.remote("PhCreative", "BasepackageHTML", "master", function (err, remote) {
        if (!err) {
          // Copy to destination
          
            remote.directory("css/skin", "stylesheets/skin");
            remote.directory("css/plugins", "stylesheets/plugins");
            remote.directory("css/mixins", "stylesheets/mixins");
          
        } else {
          throw err;
        }

        done();
      }, true);
    }
  },
  /**
  *  Download style sass
  **/
  donwloadBasePackageSassStyle: function () {
    var done = this.async();

    this.fetch("https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/css/style.scss", "stylesheets", function (err) {
        if (err) throw err;
        done();
      });
  },
  /**
  *  Download BasepackageHTML script plugins folder
  **/
  donwloadBasePackageJSPlugins: function () {
      var done = this.async();
      //var self = this;

      // Give a message
      this.log(yosay( chalk.magenta("Time to download BasePackage JS plugins!") ));

      this.remote("PhCreative", "BasepackageHTML", "master", function (err, remote) {
        if (!err) {
          // Copy to destination
          
            remote.directory("scripts/plugins", "javascripts/plugins");
          
        } else {
          throw err;
        }

        done();
      }, true); 
  },
  removerequireJS: function () {
    if (this.props.sass) {
      var dest = this.destinationRoot();

      // Remove some unused files
      fs.unlinkSync(dest + "/javascripts/plugins/require.js");
    }
  },
  /**
  * Fetch main JS file
  **/
  moveJsFile: function () {
    var done = this.async();
    this.year = new Date().getFullYear();

    // Copy file
    if (this.props.coffee) {
      this.template("_main.coffee", "javascripts/lib/main.coffee");
    } else {
      //this.template("_main.js", "javascripts/main.js");
      this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/scripts/main.js', './javascripts', function () {
      });
      done();
    }
  },
  /**
  *  Fetch app.js for requireJS
  **/
  createAppJs: function () {
    var done = this.async();
    if (this.props.require) {
      if (this.props.coffee) {
        //this.template("_app.coffee", "javascripts/lib/app.coffee");
      } else {
        //this.template("_app.js", "javascripts/app.js");
        this.fetch('https://raw.githubusercontent.com/PhCreative/BasepackageHTML/master/scripts/app.js', './javascripts', function () {
        });
        done();
      }
    }
  },
  /**
  *  Download bootstrap if required
  **/
  downloadBootstrap: function () {
    if (this.props.bootstrap) {
      var done = this.async();

      // Give a message
      this.log(yosay( chalk.magenta("Time to download Bootstrap!") ));

      if (this.props.sass) {
        this.remote("twbs", "bootstrap-sass", "master", function (err, remote) {
          if (err) throw err;

          // Copy to destination
          remote.directory("assets", ".");

          done();
        }, true);
      } else {
        // Stylus version
        this.remote('Acquisio', 'bootstrap-stylus', 'master', function (err, remote) {
          if (err) throw err;

          // Copy files
          remote.directory('bootstrap', 'stylesheets/bootstrap');
          remote.directory('js', 'javascripts/bootstrap');
          remote.directory('fonts', './fonts');

          done();
        }, true);
      }
    }
  },
  removeUnusedBootstrapFiles: function () {
    if (this.props.sass) {
      var dest = this.destinationRoot();

      // Remove some unused files
      fs.unlinkSync(dest + "/stylesheets/_bootstrap-compass.scss");
      fs.unlinkSync(dest + "/stylesheets/_bootstrap-mincer.scss");
      fs.unlinkSync(dest + "/stylesheets/_bootstrap-sprockets.scss");
      fs.unlinkSync(dest + "/javascripts/bootstrap.js");
      fs.unlinkSync(dest + "/javascripts/bootstrap-sprockets.js");
    }
  },
  /**
  *  Download font awesome
  **/
  donwloadFontAwesome: function () {
    if (this.props.fontawesome) {
      var done = this.async();
      var self = this;

      // Give a message
      this.log(yosay( chalk.magenta("Time to download Font Awesome!") ));

      var username = this.props.sass ? 'FortAwesome' : 'raulghm';
      var repoName = this.props.sass ? 'Font-Awesome' : 'Font-Awesome-Stylus';
      this.remote(username, repoName, "master", function (err, remote) {
        if (!err) {
          // Copy to destination
          if (self.props.sass) {
            remote.directory("scss", "stylesheets/fontawesome");
          } else {
            remote.directory("stylus", "stylesheets/fontawesome");
          }
          remote.directory("fonts", "./fonts");
        } else {
          throw err;
        }

        done();
      }, true);
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
      fs.renameSync(self.destinationRoot() + "/javascripts/plugins/" + jquery, self.destinationRoot() + "/javascripts/plugins/jquery.js");

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
      fs.renameSync(self.destinationRoot() + "/javascripts/plugins/modernizr.min.js", self.destinationRoot() + "/javascripts/plugins/modernizr.js");

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
        var filePath = remote.src["_options"].base + "/require.js";

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

      if (this.coffee) {
        this.spawnCommand('grunt', ['coffee']);
      }
    }.bind(this));
  }
});
