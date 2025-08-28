const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'lightweight-html2pdf.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'LightweightHtml2Pdf',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  // No externals - bundle everything together
}; 