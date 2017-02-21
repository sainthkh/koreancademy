"use strict";

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: null,
	entry: path.join(__dirname, '..', 'app', 'frontend'),
	devServer: {
		inline: true,
		port: 3334,
		contentBase: "../app/static/",
		historyApiFallback: {
			index: '/index-static.html'
		}
	},
	output: {
		path: path.join(__dirname, '..', 'static', 'css'),
		publicPath: "/css/",
		filename: 'frontend.css'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				notExtractLoader: 'style-loader',
				loader: 'css?modules&importLoaders=1&localIdentName=[path]__[name]__[local]__[hash:base64:5]!resolve-url!postcss',
			})
		}]
	},
	plugins: debug ? [] : [
		new ExtractTextPlugin({
			filename: 'app.css',
			allChunks: true
		}),
	]
};
