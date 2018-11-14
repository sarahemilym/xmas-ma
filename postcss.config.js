const path = require('path');

module.exports = {
  plugins: {
    'stylelint': {
      ignorePath: 'css/libs/'
    },
    'postcss-import': {},
    'precss': {},
    'css-mqpacker': {
      sort: true
    },
    'postcss-custom-media': {},
    'postcss-cssnext': {
      browsers: 'last 2 versions'
    },
    'postcss-assets': {
      cachebuster: true,
    },
    'cssnano': {}
  }
}