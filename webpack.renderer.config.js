const rules = require('./webpack.rules');
const path = require("path");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
{
  test: /\.(svg|png|jpg|gif)$/,
  include: [
    path.resolve(__dirname, "src/components/assets")
  ],
  type: "asset/inline"
}
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
