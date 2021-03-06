const path = require('path');
const webpack = require('webpack');
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (pluginName) => () => {
	const config = {
		entry: './src/client/index.tsx',
		optimization: {
			minimize: true,
		},
		output: {
			path: path.resolve(process.cwd(), `dist/plugins/${pluginName}`),
			publicPath: `/plugins/${pluginName}/`,
			filename: '[name].js',
			chunkFilename: '[name].js',
		},
		externals: {
			react: 'React',
			'react-dom': 'ReactDOM',
			bootstrap: 'bootstrap',
			'core-js': 'coreJs',
			'react-bootstrap': 'ReactBootstrap',
			'react-container-query': 'ReactContainerQuery',
			tslib: 'tslib',
			'@emotion/core': 'EmotionCore',
			'@dash4/react-xterm': 'ReactXterm',
			'@dash4/ui': 'Dash4Ui',
			'@dash4/log': 'Dash4Log',
			'@dash4/log/build/browser': 'Dash4Log',
		},
		plugins: [
			new AssetConfigWebpackPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin(),
			new ScssConfigWebpackPlugin(),
			new TsConfigWebpackPlugin(),
			new webpack.EnvironmentPlugin({
				DEBUG: false,
			}),
		],
	};

	config.devtool = 'eval';

	if (process.env.NODE_ENV === 'development') {
		config.optimization.minimize = false;
	}

	if (process.env.ANALYZE_ENV === 'bundle') {
		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				generateStatsFile: true,
				openAnalyzer: true,
			})
		);
		config.optimization.minimize = true;
	}

	return config;
};
