"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer").default || require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const fs = require("fs");
const path_fs = require("path");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const imageminModule = require("gulp-imagemin");
const imagemin = imageminModule.default || imageminModule;
const rename = require("gulp-rename");
const through = require("through2");
const replace = require("gulp-replace");

var path = {
  src: {
    html: "source/*.html",
    others: "source/*.+(php|ico|png)",
    htminc: "source/partials/**/*.htm",
    incdir: "source/partials/",
    plugins: "source/plugins/**/*.*",
    js: "source/js/*.js",
    scss: "source/scss/**/*.scss",
    images: "source/images/**/*.+(png|jpg|gif|svg|webp|jpeg)",
    sw: "source/sw.js",
    manifest: "manifest.json",
  },
  build: {
    dirBuild: "theme/",
    dirDev: "theme/",
  },
  isProduction: false,
};

// No-op stream for conditional pipes
const noop = () => through.obj();

// Set production mode
gulp.task("set-production", function (cb) {
  path.isProduction = true;
  cb();
});

// HTML
gulp.task("html:build", function () {
  let stream = gulp
    .src(path.src.html)
    .pipe(
      fileinclude({
        basepath: path.src.incdir,
      })
    );
  
  // Replace file references in production mode
  if (path.isProduction) {
    stream = stream
      .pipe(replace(/css\/style\.css/g, "css/style.min.css"))
      .pipe(replace(/js\/script\.js/g, "js/script.min.js"));
  }
  
  return stream
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// SCSS
gulp.task("scss:build", function () {
  return gulp
    .src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: path.isProduction ? "compressed" : "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(
      path.isProduction
        ? cleanCSS({
            compatibility: "ie8",
            level: 2,
          })
        : noop()
    )
    .pipe(
      path.isProduction
        ? rename({
            suffix: ".min",
          })
        : noop()
    )
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest(path.build.dirDev + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Javascript
gulp.task("js:build", function () {
  const stream = gulp.src(path.src.js);
  
  if (path.isProduction) {
    return stream
      .pipe(sourcemaps.init())
      .pipe(
        terser({
          compress: {
            drop_console: true,
          },
        })
      )
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write("/"))
      .pipe(gulp.dest(path.build.dirDev + "js/"))
      .pipe(
        bs.reload({
          stream: true,
        })
      );
  } else {
    return stream
      .pipe(gulp.dest(path.build.dirDev + "js/"))
      .pipe(
        bs.reload({
          stream: true,
        })
      );
  }
});

// Images
gulp.task("images:build", function () {
  const stream = gulp.src(path.src.images, { allowEmpty: true });
  
  if (path.isProduction) {
    return stream
      .pipe(
        imagemin([
          imageminModule.gifsicle({ interlaced: true }),
          imageminModule.mozjpeg({ quality: 85, progressive: true }),
          imageminModule.optipng({ optimizationLevel: 5 }),
          imageminModule.svgo({
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          }),
        ])
      )
      .pipe(gulp.dest(path.build.dirDev + "images/"))
      .pipe(
        bs.reload({
          stream: true,
        })
      );
  } else {
    return stream
      .pipe(gulp.dest(path.build.dirDev + "images/"))
      .pipe(
        bs.reload({
          stream: true,
        })
      );
  }
});

// Plugins
gulp.task("plugins:build", function () {
  return gulp
    .src(path.src.plugins)
    .pipe(gulp.dest(path.build.dirDev + "plugins/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Other files like favicon, php, apple-touch-icon on root directory
gulp.task("others:build", function () {
  return gulp.src(path.src.others).pipe(gulp.dest(path.build.dirDev));
});

// Manifest file
gulp.task("manifest:build", function () {
  return gulp.src(path.src.manifest).pipe(gulp.dest(path.build.dirDev));
});

// Service Worker
gulp.task("sw:build", function () {
  let stream = gulp.src(path.src.sw);
  
  // Replace file references in production mode
  if (path.isProduction) {
    stream = stream
      .pipe(replace(/css\/style\.css/g, "css/style.min.css"))
      .pipe(replace(/js\/script\.js/g, "js/script.min.js"));
  }
  
  return stream.pipe(gulp.dest(path.build.dirDev));
});

// Clean Build Folder
gulp.task("clean", function (cb) {
  if (fs.existsSync("./theme")) {
    fs.rmSync("./theme", { recursive: true, force: true });
  }
  cb();
});

// Watch Task
gulp.task("watch:build", function () {
  gulp.watch(path.src.html, gulp.series("html:build"));
  gulp.watch(path.src.htminc, gulp.series("html:build"));
  gulp.watch(path.src.scss, gulp.series("scss:build"));
  gulp.watch(path.src.js, gulp.series("js:build"));
  gulp.watch(path.src.images, gulp.series("images:build"));
  gulp.watch(path.src.plugins, gulp.series("plugins:build"));
});

// Dev Task
gulp.task(
  "default",
  gulp.series(
    "clean",
    "html:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "others:build",
    "sw:build",
    "manifest:build",
    gulp.parallel("watch:build", function () {
      bs.init({
        server: {
          baseDir: path.build.dirDev,
        },
      });
    })
  )
);

// Build Task (Development)
gulp.task(
  "build",
  gulp.series(
    "html:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "sw:build",
    "manifest:build"
  )
);

// Production Build Task
gulp.task(
  "build:prod",
  gulp.series(
    "set-production",
    "clean",
    "html:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "others:build",
    "sw:build",
    "manifest:build"
  )
);
