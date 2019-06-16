let path =require("path");
//单入口文件
module.exports = {
  //配置入口js文件
  entry: "./src/main.js",
  output: {
    filename:"build.js",//给打包后的js文件起的名字
    //配置打包后js文件的路径，必须给一个绝对路径
    //path:__dirname+"/dist",
    path:path.resolve("./dist")
  },
  module:{
    rules:[
      //将后缀是.js的文件去使用babel-loader解析,注意排除node_modules中的js文件
      {test:/\.js$/,use:["babel-loader"],exclude:/node_modules/},
      //将后缀是.css的文件去使用css-loader、style-loader解析,从右到左的顺序
      {test:/\.css$/,use:["style-loader","css-loader"]},
      {test:/\.less$/,use:["style-loader","css-loader","less-loader"]},
    ]
  }
}