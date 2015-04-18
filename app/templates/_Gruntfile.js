module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Init grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /**
    * Watch files for changes
    **/
    watch: {
      css: {
        files: ['css/*.scss', 'css/**/*.scss'],
      <% if (props.sass) { %>
        tasks: ['sass', 'autoprefixer', 'cssmin'],
      <% } else { %>
        tasks: ['stylus'],
      <% } %>
        options: {
          livereload: true
        }
      },
    <% if (props.coffee) { %>
      coffee: {
        files: ['scripts/lib/*.coffee'],
        tasks: ['coffee'],
        options: {
          livereload: true
        }
      },
    <% } else { %>
      js: {
        files: ['scripts/*.js', 'scripts/**/*.js', '!scripts/app.min.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
    <% } %>
      bootlint: {
        files: ['*.html'],
        tasks: ['bootlint'],
        options: {
          livereload: true
        }
      }
    },
  <% if (!props.coffee) { %>
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
        ignores: ['scripts/bootstrap/*js', 'scripts/plugins/*js', 'scripts/app.js', 'scripts/require.js', 'scripts/plugins/require.js', 'scripts/bootstrap.min.js']
      },
      main: {
        files: {
          src: ['scripts/*.js', 'scripts/**/*.js']
        }
      }
    },
  <% } else { %>
    coffee: {
      compile: {
        expand: true,
        flatten: true,
        cwd: 'scripts/lib',
        src: ['*.coffee'],
        dest: 'scripts/',
        ext: '.js'
      }
    },
  <% } %>
  <% if (props.sass) { %>
    /**
    * Run node-sass
    **/
    sass: {
      dist: {
        options: {

        },
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
  <% } else { %>
    stylus: {
      compile: {
        options: {
          compressed: true
        },
        files: {
          'css/style.css': 'css/style.styl'
        }
      }
    },
  <% } %>
    cssmin: {
      dist: {
        files: {
          'css/style.css': ['css/style.css']
        }
      }
    },
    autoprefixer: {
      css: {
        options: {
            browsers: ['last 3 versions', 'ie 9']
        },
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    }
  <% if (props.express) { %>
    /**
    * Express server
    **/
    ,express: {
      dev: {
        options: {
          script: 'server.js'
        }
      },
    }
  <% } %>
  <% if (props.bootstrap) { %>
    ,bootlint:{
      options: {
        relaxerror: ['W005']
      },
      files: ['*.html']
    }
  <% } %>
  });

  // Grunt tasks
  grunt.registerTask('default', [<% if (props.express) { %>'express:dev',<% } %> 'watch']);
  grunt.registerTask('css', [<% if (props.sass) { %>'sass', 'autoprefixer', 'cssmin'<% } else { %>'stylus'<% } %>]);
<% if (!props.coffee) { %>
  grunt.registerTask('js', ['jshint']);
<% } %>
};
