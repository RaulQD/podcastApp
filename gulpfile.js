const { src, watch, dest, series } = require('gulp');

/*======= SASS Y CSS ======*/
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
/*====== IMG ======*/
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


/* ======= CSS ======*/
function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
    done();
}
/*====== IMAGE ======*/
function image() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))
}
/* ======== VERSION WEBP ========*/
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}
/* ======== VERSION AVIF ========*/
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));

}
/*====== IMAGEJS ====== */

/*====== SCROLLREVEAL =======*/

/*======  JS ===========*/
function js() {
    return src('src/js/*.js')
        .pipe(dest('build/js'));
}
/*===== VERIICA EL CAMBIO DEL CODIGO CSS =====*/
function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/*', image)
    watch('src/js/*.js', js);
}
exports.css = css;
exports.dev = dev;
exports.js = js;
exports.image = image;
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
exports.default = series(versionAvif, versionWebp, image, css, dev);