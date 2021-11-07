const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: path.resolve(__dirname, 'src/index.tsx')
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        proxy: {
            "/api": {
                "target": "http://localhost:5000",
                "pathRewrite": {
                    "^/api": ""
                },
                "changeOrigin": true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.scss$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.js', '.js', '.ts'],
        modules: ['src', 'node_modules'],
        alias: {
            components: path.resolve(__dirname, 'src', 'components/'),
            gql: path.resolve(__dirname, 'src', 'gql/'),
            hooks: path.resolve(__dirname, 'src', 'hooks/'),
            helpers: path.resolve(__dirname, 'src', 'helpers/'),
            state: path.resolve(__dirname, 'src', 'state/'),
            types: path.resolve(__dirname, 'src', 'types/'),
        }
    },
    plugins: [
        new miniCss(),
    ]
};