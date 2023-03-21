// NodeJS Code Here!
const path = require('path')

module.exports = {
    entry: './index.ts', //путь до файла с которого начинается приложение
    output: {
        filename: 'bundle.js', //название файл сборки
        path: path.resolve(__dirname, 'dist'), //указать путь сборки
        clean: true, //для очистки папки
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        extensionAlias: {
            '.ts': ['.js', '.ts'],
            '.cts': ['.cjs', '.cts'],
            '.mts': ['.mjs', '.mts']
        }
    }
}