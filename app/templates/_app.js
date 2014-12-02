require.config({
  baseUrl: "/scripts",
  paths: {
    "jquery": "plugins/jquery",
    "modernizr": "plugins/modernizr",
    <% if (props.bootstrap) { %>
    "affix": "bootstrap/affix",
    "alert": "bootstrap/alert",
    "button": "bootstrap/button",
    "collapse": "bootstrap/collapse",
    "dropdown": "bootstrap/dropdown",
    "modal": "bootstrap/modal",
    "popover": "bootstrap/popover",
    "scrollspy": "bootstrap/scrollspy",
    "tab": "bootstrap/tab",
    "tooltip": "bootstrap/tooltip",
    "transition": "bootstrap/transition"
    <% } %>
  },
  shim: {
    "jquery": {
      "exports": "$"
    },
    "main": {
      "deps": ["jquery"]
    },
    //JSInsertLeaveAsIs
    <% if (props.bootstrap) { %>
    "affix": {
      "deps": ["jquery"]
    },
    "alert": {
      "deps": ["jquery"]
    },
    "button": {
      "deps": ["jquery"]
    },
    "collapse": {
      "deps": ["jquery", "transition"]
    },
    "dropdown": {
      "deps": ["jquery"]
    },
    "modal": {
      "deps": ["jquery"]
    },
    "popover": {
      "deps": ["jquery", "tooltip"]
    },
    "scrollspy": {
      "deps": ["jquery"]
    },
    "tab": {
      "deps": ["jquery"]
    },
    "tooltip": {
      "deps": ["jquery"]
    },
    "transition": {
      "deps": ["jquery"]
    }
    <% } %>
  }
});

// Require main.js
require(["modernizr", "main"]);
