const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = () => {
    const result = dotenv.config({ path: path.resolve(__dirname, '../.env')})
    let envKeys
	if (!result.error) {
		const env = result.parsed
		envKeys = Object.keys(env).reduce((prev, next) => {
			prev[`process.env.${next}`] = JSON.stringify(env[next])
			return prev
		}, {})
		console.log('Loading of file .env')
	}

	let plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
	]
	if(envKeys){
		plugins.push(new webpack.DefinePlugin(envKeys))
	}
    return {
        context: path.resolve(__dirname, '../src'),
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, '../../server/public'),
            filename: '[name].[contenthash].bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    include: path.resolve(__dirname, '..'),
                    use: ['babel-loader']
                }
            ]
        },
        plugins,
        optimization: {
            runtimeChunk: 'single'
        },
        resolve: {
            symlinks: false
        },
        performance: {
            maxEntrypointSize: 700000,
            maxAssetSize: 700000
        }
    }
}