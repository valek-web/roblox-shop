const path = require('path')

module.exports = {
	apps: [
		{
			name: 'robux_shop',
			script: './index.js',
			watch: true,
			ignore_watch: [
				path.join(__dirname, 'node_modules'),
				path.join(__dirname, 'public'),
				path.join(__dirname, 'src'),
				path.join(__dirname, 'gulpfile.cjs'),
			],
			env_dev: {
				NODE_ENV: 'dev',
				HTTP_PORT: 3210,
				HTTPS_PORT: 3211,
				DOMAIN: 'https://localhost:3211',
			},
			env_prod: {
				NODE_ENV: 'prod',
				HTTP_PORT: 80,
				HTTPS_PORT: 443,
				DOMAIN: 'https://robuxshop.ru',
			},
		},
		{
			name: 'gulp_dev',
			script: './node_modules/gulp/bin/gulp.js',
			args: '-f gulpfile.cjs',
			autorestart: false,
		},
		{
			name: 'gulp_prod',
			script: './node_modules/gulp/bin/gulp.js',
			args: 'build -f gulpfile.cjs',
			autorestart: false,
		},
	],
}
