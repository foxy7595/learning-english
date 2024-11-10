const path = require('path');

module.exports = {
    entry: './src/scripts/foreground.js',
    output: {
        filename: 'foreground.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production'
}; 