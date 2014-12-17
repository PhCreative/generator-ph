# Ph.Creative Generator

At [Ph.Creative](http://www.ph-creative.com/) we like to make things quicker and easier to start new projects. [Yeoman](http://yeoman.io/) seemed the perfect tool for this. By creating a generator we could decide what tasks we always do at the start of a project and then create a process that automatically downloads all the files we need.

Most, if not all, projects we do now are based on [Bootstrap](http://getbootstrap.com/). Instead of pulling down Bootstraps CSS and then overriding as needed. We looked at using the SASS version. This always to override a few variables to match company colours yet still gives us the power of Bootstraps grid.

## Whats included in this

As a base it asks a few questions:

- Is Bootstrap needed?
- [SASS](http://sass-lang.com/) or [Stylus](http://learnboost.github.io/stylus/)?
- Is [Font Awesome](http://fortawesome.github.io/Font-Awesome/) needed?
- Use [CoffeeScript](http://coffeescript.org/)?
- jQuery version. Defaults to 2.1 to get rid of IE8 support!
- Use [RequireJS](http://requirejs.org/)?
- Use a simple express server?

## Why

### Why express and not connect?

This is just a preference. I prefer how express is. Also, in some projects, the server file has been updated to automatically include the header and footer on every page. This is so that we can keep the header and footer templates seperate yet still see how the effect other pages.

### Stylus or SASS?

They obviously both do the same. SASS is the preferred choice yet Stylus has been looked into. Stylus is awesome and is lightning quick because it is built on Node.

### jQuery version

We have dropped support for IE8, yet some clients still ask for this support. So instead of saying no, this gives the option to choose the correct version.

### RequireJS

RequireJS allows us to split our files up into modules and then 'require' these modules on different pages. We also require modules based on the elements on the page. ie. Do we really need to load the slider module in if no sliders are present on the page? Also, because this is also done async we aren't slowing down the page loading times.
