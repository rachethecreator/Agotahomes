const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './client/src/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {
              test : /\.jsx?/,
              exclude: [/node_modules/],
              loader: "babel-loader",
              options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
            {
              test : /\.s?css$/, use:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : './client/index.html'
        })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'client'),
      publicPath: '/dist/',
      
    },
}