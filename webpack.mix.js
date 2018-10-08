let mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.disableSuccessNotifications();

//execute this only once and include it in front-libs-script.js , because it's not working with mix.babel and boobtstrap is not working with mix.js
//mix.js('public/assets/js/require-libs.js', 'public/assets/js/require-libs-compiled.js');
//mix.js('public/assets/js/helper.js', 'public/assets/js/helper-compiled.js');
mix.js('public/assets/js/index.js', 'public/assets/js/index-compiled.js');

/* ===== PUBLIC =====*/
mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'public/assets/libs/combobox/combobox.css',
    'public/assets/libs/font-awesome/css/font-awesome.min.css'
], 'public/dist/css/front-libs-style.css');

mix.styles([
    'public/assets/css/style.css'
], 'public/dist/css/front-style.css');

mix.babel([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootbox.js/bootbox.min.js',
    'public/assets/libs/combobox/combobox.js',
    'public/assets/js/require-libs-compiled.js'
], 'public/dist/js/front-libs-script.js');

/*mix.babel([
    'public/assets/js/basic.js',
    'public/assets/js/index.js'
], 'public/dist/js/front-script.js');*/


if(mix.inProduction()) {
    mix.version();
    mix.webpackConfig({
        module: {
            rules: [{
                test: /\.js?$/,
                exclude: /(bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: mix.config.babel()
                }]
            }]
        }
    });
}
/* ===== /PUBLIC =====*/

/* ===== ADMIN =====*/


/* ===== /ADMIN =====*/

