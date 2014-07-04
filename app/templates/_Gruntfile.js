module.exports = function(grunt) {
  // Init grunt
  grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
    /**
    * Watch files for changes
    **/
    watch: {
      sass: {
        files: ["stylesheets/*.scss", "stylesheets/**/*.scss"],
        tasks: ["sass"],
        options: {
          livereload: true
        }
      },
      js: {
        files: ["javascripts/*.js", "javascripts/**/*.js", "!javascripts/app.min.js"],
        tasks: ["jshint"],
        options: {
          livereload: true
        }
      },
      <% if (props.require) { %>
        appJs: {
          files: "javascripts/app.js",
          tasks: ["requirejs"],
          options: {
            livereload: true
          }
        },
      <% } %>
      livereload: {
        files: "<%%= pkg.files %>",
        options: {
          livereload: true
        }
      }
    },
    <% if (props.require) { %>
      /**
      *  r.js build command
      **/
      requirejs: {
        compile: {
          options: {
            baseUrl: "javascripts",
            mainConfigFile: "javascripts/build.js"
          }
        }
      },
    <% } %>
    /**
    *  JSHint
    **/
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          require: true,
          define: true
        }
      },
      all: ["javascripts/*.js", "javascripts/**/*.js", "!javascripts/app.js", "!javascripts/app.min.js"]
    },
    /**
    * Run node-sass
    **/
    sass: {
      dist: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "stylesheets/style.css": "stylesheets/style.scss"
        }
      }
    }
  });

  // Load grunt tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  <% if (props.require) { %>
    grunt.loadNpmTasks("grunt-contrib-requirejs");
  <% } %>

  // Grunt tasks
  grunt.registerTask("default", ["watch"]);
};
