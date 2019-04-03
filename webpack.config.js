const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/i,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|gif|jpeg|png|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-a.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/i,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ]
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        // open: true,
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
    config.module.rules.push({
        test: /\.styl/i,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    });
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkHash:8].js'
    config.module.rules.push({
        test: /\.styl/i,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2, maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    };
    config.plugins.push(new ExtractPlugin('styles.[chunkHash:8].css'));
}

module.exports = config