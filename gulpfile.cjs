const { src, dest, parallel, series, watch } = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify-es').default
const del = require('del')
// const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const notify = require('gulp-notify')
const svgSprite = require('gulp-svg-sprite')
const webpackStream = require('webpack-stream')
const ttf2woff2 = require('gulp-ttf2woff2')
const fs = require('fs')
const tiny = require('gulp-tinypng-compress')
const rev = require('gulp-rev')
const revdel = require('gulp-rev-delete-original')

const svgSprites = () => {
	return src('./src/img/svg/**.svg')
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../sprite.svg',
					},
				},
			})
		)
		.pipe(dest('./public/img'))
}

// Функция преобразования картинок:
const imgToApp = () => {
	return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
		'./src/img/*.svg',
		'./src/img/*.webp',
		'./src/img/*.gif',
	]).pipe(dest('./public/img'))
}

const resources = () => {
	return src('./src/resources/**').pipe(dest('./public/'))
}

const pdf = () => {
	return src('./src/pdf/**').pipe(dest('./public/pdf'))
}

// Функция преобразования шрифтов:
const fonts = () => {
	return src('./src/fonts/**').pipe(ttf2woff2()).pipe(dest('./public/fonts'))
}

// Маска для выгрузки шрифтов
const checkWeight = (fontname) => {
	let weight = 400
	switch (true) {
		case /Thin/.test(fontname):
			weight = 100
			break
		case /ExtraLight/.test(fontname):
			weight = 200
			break
		case /Light/.test(fontname):
			weight = 300
			break
		case /Regular/.test(fontname):
			weight = 400
			break
		case /Medium/.test(fontname):
			weight = 500
			break
		case /SemiBold/.test(fontname):
			weight = 600
			break
		case /Semi/.test(fontname):
			weight = 600
			break
		case /Bold/.test(fontname):
			weight = 700
			break
		case /ExtraBold/.test(fontname):
			weight = 800
			break
		case /Heavy/.test(fontname):
			weight = 700
			break
		case /Black/.test(fontname):
			weight = 900
			break
		default:
			weight = 400
	}
	return weight
}

// Маска миксина для шрифтов
const cb = () => {}

let srcFonts = './src/scss/_fonts.scss'
let appFonts = './public/fonts/'

const fontsStyle = (done) => {
	fs.writeFile(srcFonts, '', cb)
	fs.readdir(appFonts, function (err, items) {
		if (items) {
			let c_fontname
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.')
				fontname = fontname[0]
				let font = fontname.split('-')[0]
				let weight = checkWeight(fontname)

				if (c_fontname != fontname) {
					fs.appendFile(
						srcFonts,
						'@include font-face("' +
							font +
							'", "' +
							fontname +
							'", ' +
							weight +
							');\r\n',
						cb
					)
				}
				c_fontname = fontname
			}
		}
	})

	done()
}

// Функция преобразования scss в css:
const styles = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'expanded',
			}).on('error', notify.onError())
		)
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(
			cleanCSS({
				level: 2,
			})
		)
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./public/css/'))
	// .pipe(browserSync.stream())
}

// Функция преобразования scipt-ов:
const scripts = () => {
	return (
		src('./src/js/main.js')
			.pipe(
				webpackStream({
					mode: 'development',
					output: {
						filename: 'main.js',
					},
					module: {
						rules: [
							{
								test: /\.m?js$/,
								exclude: /(node_modules|bower_components)/,
								// use: {
								//   loader: 'babel-loader',
								//   options: {
								//     presets: ['@babel/preset-env']
								//   }
								// }
							},
						],
					},
				})
			)
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			// Если допустили ошибку в sctipts, показывает что она есть
			.on('error', function (err) {
				console.error('WEBPACK ERROR', err)
				this.emit('end') // Don't stop the rest of the task
			})

			.pipe(sourcemaps.init())
			.pipe(uglify().on('error', notify.onError()))
			.pipe(sourcemaps.write('.'))
			.pipe(dest('./public/js'))
	)
}

// Функция отслеживаня изменений в файлах:
const watchFiles = () => {
	watch('./src/scss/**/*.scss', styles)
	watch('./src/js/**/*.js', scripts)
	watch('./src/img/**.jpg', imgToApp)
	watch('./src/img/**.jpeg', imgToApp)
	watch('./src/img/**.png', imgToApp)
	watch('./src/img/svg/**.svg', svgSprites)
	watch('./src/fonts/**', fonts)
	watch('./src/fonts/**', fontsStyle)
	watch('./src/resources/**', resources)
	watch('./src/pdf/**', pdf)
}

// Функция удаления ненужных файлов:
const clean = () => {
	return del(['public/*'])
}

// Создание тасков:
exports.styles = styles
exports.scripts = scripts
exports.watchFiles = watchFiles
exports.fonts = fonts
exports.fontsStyle = fontsStyle

// Обычная сборка проекта:
exports.default = series(
	clean,
	parallel(scripts, fonts, imgToApp, svgSprites, resources, pdf),
	fontsStyle,
	styles,
	watchFiles
)

// BUILD

// Функция, сжимающая картинки:
const tinypng = () => {
	return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
		.pipe(
			tiny({
				key: 'HkdjDW01hVL5Db6HXSYlnHMk9HCvQfDT',
				sigFile: './public/img/.tinypng-sigs',
				parallel: true,
				parallelMax: 50,
				log: true,
			})
		)
		.pipe(dest('./public/img'))
}

// Функция преобразования scss в css (без ненужных файлов, таких как map и т.д.):
const stylesBuild = () => {
	return src('./src/scss/**/*.scss')
		.pipe(
			sass({
				outputStyle: 'expanded',
			}).on('error', notify.onError())
		)
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(
			cleanCSS({
				level: 2,
			})
		)
		.pipe(dest('./public/css/'))
}

// Функция преобразования script-ов (без ненужных файлов, таких как map и т.д.):
const scriptsBuild = () => {
	return (
		src('./src/js/main.js')
			.pipe(
				webpackStream({
					mode: 'development',
					output: {
						filename: 'main.js',
					},
					module: {
						rules: [
							{
								test: /\.m?js$/,
								exclude: /(node_modules|bower_components)/,
							},
						],
					},
				})
			)
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			// Если допустили ошибку в sctipts, показывает что она есть
			.on('error', function (err) {
				console.error('WEBPACK ERROR', err)
				this.emit('end') // Don't stop the rest of the task
			})
			.pipe(uglify().on('error', notify.onError()))
			.pipe(dest('./public/js'))
	)
}

// Функция игнорирующая кэш (добавления в название файлов специальных символов):
const cache = () => {
	return src('public/**/*.{css,js,svg,png,jpg,jpeg,woff2}', {
		base: 'public',
	})
		.pipe(rev())
		.pipe(revdel())
		.pipe(dest('public'))
		.pipe(rev.manifest('rev.json'))
		.pipe(dest('public'))
}

exports.cache = series(cache)

// Полная сборка проекта:
exports.build = series(
	clean,
	parallel(scriptsBuild, fonts, resources, imgToApp, svgSprites, pdf),
	fontsStyle,
	stylesBuild
)
