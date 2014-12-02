module.exports = function(grunt) {
  // Init grunt
  grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
    /**
    * Watch files for changes
    **/
    watch: {
      sass: {
        files: ["css/*.scss", "css/**/*.scss"],
        tasks: ["sass"],
        options: {
          livereload: true
        }
      },
      js: {
        files: ["scripts/*.js", "scripts/**/*.js", "!scripts/app.min.js"],
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
        ignores: ["scripts/bootstrap/*js", "scripts/plugins/*js", "scripts/app.js", "scripts/require.js"]
      },
      main: {
        files: {
          src: ["scripts/*.js", "scripts/**/*.js"]
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
          "css/style.css": "css/style.scss"
        }
      }
    }
    <% if (props.express) { %>
    /**
    * Express server
    **/
    , express: {
      dev: {
        options: {
          script: "server.js"
        }
      },
    },
    <% } %>
    <% if (props.bootstrap) { %>
    , bootlint:{
      options: {
        relaxerror: ['W005']
      }
      files: ['*.html']
    }
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
