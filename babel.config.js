/** @format */

// prettier-ignore
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
                alias: {
                    'actions': './src/redux/actions',
                    'reducers': './src/redux/reducers',
                    'redux-types': './src/redux/types',
                    'redux-store': './src/redux/store.ts',
                    'redux-mocks': './src/redux/mocks.ts',
                    'assets': './src/assets',
                    'components': './src/components',
                    'middleware': './src/redux/middleware',
                    'navigation': './src/navigation',
                    'screens': './src/screens',
                    'utils': './src/utils',
                    'styles': './src/styles',
                    'types': './src/types',
                    'firebase': './src/firebase',
                    'translations': './src/translations',
                    'analytics': './src/analytics',
                    'api': './src/api',
                    'lib': './src/lib',
                },
            },
        ],
    ],
}
