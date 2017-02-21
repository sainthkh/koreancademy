"use strict";

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: 'inline-sourcemap',
	entry: path.join(__dirname, '..', 'app', 'frontend'),
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
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loaders: [
				'style?sourceMap',
				'css?modules&importLoaders=1&localIdentName=[path]__[name]__[local]__[hash:base64:5]'
			]
		}]
	},
	plugins:[] 
};
