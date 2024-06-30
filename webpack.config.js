module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/, // This rule applies to all JavaScript files
          exclude: /node_modules/, // Exclude files from the node_modules folder
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };
  