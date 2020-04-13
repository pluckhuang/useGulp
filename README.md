# useGulp

使用 gulp 调优：

- 安装插件说明：

	gulp-util: Used by some plugins to output information to the terminal, such as errors and diagnostic information.

	del: Deletes files and folders. Useful for when we want to perform “clean” builds that involve deleting the distribution folder and building from scratch.

	gulp-livereload: Automatically reloads the browser when you change files. This involves installing the LiveReload plugin for your browser, which we’ll cover when we finish writing the build system.

	gulp-ext-replace: Allows us to specify a different file extension for the destination output than what exists in the source input. When we convert our PNG and JPEG files to WebP by using imagemin-webp, you’ll need this to save files with a .webp extension.

	gulp-less: Compiles LESS into CSS

	gulp-postcss: A library that transforms CSS. PostCSS accomplishes tons of tasks via plugins in the PostCSS ecosystem.

	autoprefixer: PostCSS plugin that automatically adds vendor prefixes to CSS. Useful for backward compatibility without using LESS/SASS mixins, or awful copy/paste workflows.

	autorem: Another PostCSS plugin that converts px units into rem units

	cssnano: A PostCSS plugin that minifies and makes many focused optimizations that results in a lower file size.

	gulp-uglify: Uglifies JavaScript files. If you’re not familiar with uglification, it’s like minification in that it removes all unnecessary whitespace from a JavaScript file, but also shortens code, while preserving functionality, to yield even smaller file sizes.

	gulp-concat: Concatenates JavaScript files. While concatenation is a no-no with HTTP/2 connections, you can easily generate a concatenated version of site scripts that can be conditionally used for HTTP/1 connections.

	gulp-imagemin: Provides the base imagemin functionality.

	imagemin-webp: convert images into WebP, which are usually smaller than their PNG and JPG counterparts.

- npm install。
安装 mozjpeg、optipng-bin 时注意 sudo。