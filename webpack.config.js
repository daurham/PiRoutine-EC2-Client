const path = require('path');

module.exports = {
    entry: {
        filepath: path.join(__dirname, 'client/src'),
        filename: 'index.jsx'
    },
    output: {
        filepath: path.join(__dirname, 'client/dist'),
        filename: 'bundle.js'
    }
}