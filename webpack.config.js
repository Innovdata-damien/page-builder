const HtmlWebPackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const CompressionPlugin = require('compression-webpack-plugin');

const BUILD = process.env.BUILD;
const TYPE = process.env.TYPE;
const banner = `${packageJson.prodName} v.${packageJson.version}`;
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = (env, argv) => {

    //FONT RULES
    const fontRules = (argv.mode === 'production' ? 
        [
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    }
                }
            }
        ] : 
        [
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
            } 
        ]
    );

    const pageBuilderCssRules = (argv.mode === 'production' ? [
        {
            test: path.resolve('src/styles/pagebuilder.css'),
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
    ]:
    [
        {
            test: path.resolve('src/styles/pagebuilder.css'),
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }
    ]);

    return {
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        entry: path.resolve(
            __dirname,
            'src/index'
        ),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: argv.mode === 'production' ? `${packageJson.prodName + (BUILD === 'min' ? '.' + BUILD : '')}.js` : `${packageJson.prodName}.js`,
            library: packageJson.prodName,
            libraryExport: 'default',
            libraryTarget: 'umd',
            globalObject: 'this',
            publicPath: ASSET_PATH
        },
        module: {
            rules: [
                ...fontRules,
                ...pageBuilderCssRules,
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|otf)$/,
                    use: 'url-loader'
                },
                {
                    test: /\.global\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                insert: (element) => {

                                    if(!window.pageBuilderCss)
                                        window.pageBuilderCss = [];

                                    window.pageBuilderCss.push(element);

                                },
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
                ,
                // {
                //     test: /^((?!\.global).)*\.css$/,
                //     use: [
                //         {
                //             loader: 'style-loader'
                //         },
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 modules: {
                //                     localIdentName: '[name]__[local]__[hash:base64:5]'
                //                 },
                //                 sourceMap: true
                //             }
                //         }
                //     ]
                // }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: `${packageJson.prodName + (BUILD === 'min' ? '.' + BUILD : '')}.css`
            }),
            new webpack.BannerPlugin(banner),
            new webpack.DefinePlugin({
                'process.env': {
                    VERSION: `"${packageJson.version}"`
                },
            }),
            new TypedCssModulesPlugin({
                globPattern: 'src/**/*.css',
            }),
            //new CompressionPlugin()
        ],
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})],
            minimize: BUILD === 'min'
        },
        devServer: {
            contentBase: path.resolve(__dirname, './'),
            publicPath: '/dist/',
            openPage: 'index.html',
            watchContentBase: true,
            inline: true,
            hot: true
        }
    };
}