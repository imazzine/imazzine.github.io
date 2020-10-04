const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  target: 'web',
  entry: './_src/viewer/viewer.ts',
  // devtool: 'inline-source-map',
  // mode: 'development',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        }
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    })
  ],
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'viewer.js',
    path: path.resolve(__dirname, 'public/js'),
  },
};
