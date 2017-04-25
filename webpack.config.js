const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// File Entry for the bundle
	entry: path.join(__dirname, '/client/src/index.js'),

	// output Bundle file in this
	output: {
		path: path.join(__dirname, '/client/dist/js'),
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				include: path.join(__dirname, '/client/src'),
				// exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ["react", "es2015"]
				}
			},
			{ 	
				test: /\.(png|jpg)$/, 
				loader: 'url-loader?limit=8192' 
			}
		]
	},
	// Start webpack in a watch mode, so webpack will rebuild the bundle on changes
	watch: true
};