"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: debug ? 'inline-sourcemap' : null,
	entry: path.join(__dirname, '..', 'app', 'frontend', 'client.js'),
	devServer: {
		inline: true,
		port: 3333,
		contentBase: "../app/static/",
		historyApiFallback: {
			index: '/index-static.html'
		}
	},
	output: {
		path: path.join(__dirname, '..', 'app', 'static', 'js'),
		publicPath: "/js/",
		filename: 'frontend.js'
	},
	module: {
		loaders: [{
			test: path.join(__dirname, '..', 'app'),
			loader: ['babel-loader'],
			query: {
				cacheDirectory: './temp/babel_cache',
				presets: debug ? ['react', 'es2015'] : ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loaders: [
				'style?sourceMap',
				'css?modules&importLoaders=1&localIdentName=[path]__[name]__[local]__[hash:base64:5]'
			]
		}]
	},
	plugins: debug ? [] : [
		new ExtractTextPlugin({
			filename: 'app.css',
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			mangle: true,
			sourcemap: false,
			beautify: false,
			dead_code: true
		}),
	]
};
