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
      livereload: {
        files: ["*.html", "**/.*.cshtml"],
        options: {
          livereload: true
        }
      }
    },
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
        },
        ignores: ["javascripts/bootstrap/*js", "javascripts/plugins/*js", "javascripts/app.js", "javascripts/require.js"]
      },
      main: {
        files: {
          src: ["javascripts/*.js", "javascripts/**/*.js"]
        }
      }
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
    /**
    * Express server
    **/
    <% if (props.express) { %>
    , express: {
      dev: {
        options: {
          script: "server.js"
        }
      },
    },
    <% } %>
  });

  // Load grunt tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  <% if (props.express) { %>
  grunt.loadNpmTasks('grunt-express-server');
  <% } %>

  // Grunt tasks
  grunt.registerTask("default", [<% if (props.express) { %>"express:dev",<% } %> "watch"]);
  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("js", ["jshint"]);
};
