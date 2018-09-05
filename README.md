# WP Boilerplate

A custom WordPress theme development boilerplate using Timber, Barba.js, Anime.js, Tachyons, and Webpack.

### Features

- CSS minified using cssnano and autoprefixed
- Scripts bundled using Webpack and Babel
- Browser & device detection
- Transition reducer for managing dynamic Barba transitions
- Barba and window resize events propogated through app and views
- Track FPS using stats util for development

### Getting Started

#### Set up a local instance of WordPress using something like [MAMP](https://www.mamp.info/en/)

> ❗The only requirement for the local WordPress environment is that the server must follow symbolic links as we will use one to link the generated `build` directory to the `wp-content/themes` directory in WordPress.

#### Install [Timber](https://www.upstatement.com/timber/)

#### I'd also highly recommend the following plugins for custom theme development

1. [Advanced Custom Fields Pro](advancedcustomfields.com)
2. [Custom Post Type UI](https://pluginize.com/plugins/custom-post-type-ui/)
3. [Admin Menu Editor](https://wordpress.org/plugins/admin-menu-editor/)

#### Install dependencies from NPM

```
npm i
```

#### Run the build command to generate the `build` directory containing our compiled theme

```
npm run build
```

#### Create a symlink from the `build` directory to `wp-content/themes` in your local WordPress installation

Example:

```sh
ln -s ~/path/to/repo/build ~/path/to/your-wordpress-installation/wp-content/themes/wp-boilerplate
```

> 💡I keep all of my WordPress installations at `~/Documents/Sites` and then keep theme repositories on my `~/Desktop`

#### Open `config/webpack.development.js` in your text editor of choice and edit the value of `proxy` to match the url of your local WordPress installation

#### Start the development server

```
npm start
```

The project will be launched at http://localhost:3000/
