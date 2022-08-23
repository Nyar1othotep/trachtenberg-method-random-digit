const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

let mode = "development";
process.env.NODE_ENV === 'production' ? mode = 'production' : mode = 'development';
console.log(mode + 'mode');

module.exports = {
    mode: mode,
    entry: {
        scripts: './src/index.js',
        //   user: '...',
    },
    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    devServer: {
        open: true,
        static: {
            directory: './src',
            watch: true
        }
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.pug"
        }),
        // 	  new CopyPlugin({
        // 		patterns: [{
        // 			 from: "./src/favicon",
        // 			 to: "assets/favicon"
        // 		}]
        //   }),
    ],
    module: {
        rules: [{
                test: /\.html$/i,
                loader: "html-loader",
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    //   {
                    //       loader: 'css-loader',
                    //       options: {
                    //           modules: {
                    //               importLoaders: 1,
                    //               localIdentName: '[name]__[local]___[hash:base64:5]'
                    //           }
                    //       }
                    //   },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                    //   {
                    //       loader: "sass-loader",
                    //       options: {
                    //           importLoaders: 1,
                    //           modules: {
                    //               localIdentName: '[name]__[local]___[hash:base64:5]'
                    //           }
                    //       }
                    //   }
                ],
                //  exclude: /\.module.(sa|sc|c)ss$/
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                },
                use: [{
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 70
                        },
                        pngquant: {
                            quality: [0.40, 0.50],
                            speed: 4
                        },
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]'
                },
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/svg/[hash][ext][query]'
                },
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    }
}