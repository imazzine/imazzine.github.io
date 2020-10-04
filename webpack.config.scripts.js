const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  target: 'node',
  node: {
    // fs: 'empty',
    __dirname: true,
    __filename: true,
	},
  entry: './_src/scripts/types.ts',
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
    filename: 'types.js',
    path: path.resolve(__dirname, '_scripts'),
  },
};
