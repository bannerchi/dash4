const path = require('path');
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = (libraryName) => {
	const config = {
		entry: './src/index.tsx',
		output: {
			path: path.join(process.cwd(), '/lib'),
			filename: `${libraryName}.js`,
			library: libraryName,
			libraryTarget: 'umd',
			umdNamedDefine: true,
			globalObject: "typeof self !== 'undefined' ? self : this",
		},
		plugins: [
			// File loader configuration for .woff and .woff2 files
			// File loader configuration for .gif .jpg .jpeg .png and .svg files
			// https://github.com/namics/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin
			new AssetConfigWebpackPlugin(),
			// Cleans the dist folder before the build starts
			new CleanWebpackPlugin(),
			// SCSS Configuration for .css .module.css and .scss .module.scss files
			// see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
			new ScssConfigWebpackPlugin(),
			// Multi threading typescript loader configuration with caching for .ts and .tsx files
			// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
			new TsConfigWebpackPlugin(),
		],
	};

	return config;
};