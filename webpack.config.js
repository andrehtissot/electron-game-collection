const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

module.exports = (env, argv) => {
    process.env.NODE_ENV = argv.mode
    const isDev = argv.mode === 'development'
    const srcPath = (subdir) => path.join(__dirname, 'src', subdir)

    return {
        entry: srcPath('index.tsx'),
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'dist'),
            chunkFilename: 'bundle.[id].js',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: {
                components: srcPath('components'),
                configs: srcPath('configs'),
                contexts: srcPath('contexts'),
                helpers: srcPath('helpers'),
                screens: srcPath('screens'),
                storage: srcPath('storage'),
                interfaces: srcPath('interfaces'),
                routes: srcPath('routes'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.worker\.ts$/,
                    use: {
                        loader: 'worker-loader',
                        options: {
                            filename: 'workers/[name].js',
                            chunkFilename: 'workers/[id].js',
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /node_modules/,
                },
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDev,
                            },
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: isDev ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
            }),
            new EnvironmentPlugin(['NODE_ENV']),
            new HtmlWebpackPlugin({
                template: srcPath('index.ejs.html'),
            }),
            new CopyPlugin({
                patterns: [{ from: 'res/app-icon/48x48.ico', to: 'favicon.ico' }],
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    }
}
