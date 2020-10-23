// webpack 은 node가 돌려 주므로  import로 불가능 반드시 const!!
const path = require('path') // node에서 경로 쉽게 조작 하게 
const webpack = require('webpack') 

module.exports = {
    name : 'wordrelay-setting',
    mode: 'development', // 실서비스 : production,
    devtool : 'eval',  // 빠르게 하겠다
    resolve : {
        extensions : ['.js', '.jsx']
    },
    entry : {
        app :  ['./client'],
    }, // 입력
    module: {
        rules:[{
            test: /\.jsx?/,
            loader:'babel-loader',
            options : {
                presets : [
                    ['@babel/preset-env',{
                    targets : {
                        browsers : ['> 1% in KR']  // browserslist
                    },
                    debug:true,
                }], 
                '@babel/preset-react'
            ],
            plugins : [
                '@babel/plugin-proposal-class-properties',
                // 'react-hot-loader/babel'
            ],
            }
        }],
    },
    plugins : [new webpack.LoaderOptionsPlugin({debug:true})],
    output : {
        path : path.join(__dirname, 'dist'),
        filename: 'app.js',
        // pulicPath:'/dist/'
    } //출력

}