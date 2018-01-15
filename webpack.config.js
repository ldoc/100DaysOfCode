const path = require('path'); // path module help us to access path routes
const SRC_DIR = path.resolve(__dirname, 'app/src'); // Source directory
const DIST_DIR = path.resolve(__dirname, 'app/dist'); // Distribution directory
const webpack = require('webpack');

module.exports = {
  entry: {
    client: SRC_DIR + '/index.js' // My entry file
  },
  // My output file
  output: { 
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx', 'css', 'svg']
  },
  module : {
    rules : [
      // Loader for JSX files  
      {           
        test : /\.jsx?/,
        exclude: /node_modules|libs/,                    
        include : SRC_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g)$/,  
        use: ['url-loader']
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader?limit=100000&name=./app/dist/imgs/[hash].[ext]'
      }
    
    ]
  },
  // Source mapping allow us to debug code from src files
  devtool: 'source-map',
  // Dev Server configuration
  devServer: { 
    contentBase: './app/',
    hot: true, // with hot reload
    historyApiFallback: true
  },
  plugins : [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};