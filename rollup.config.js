import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/DropdownSelect.jsx',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.es.js',
            format: 'es'
        }
    ],
    plugins: [
        external(),
        resolve(),
        postcss({
            modules: true,
            extract: false
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        })
    ],
    external: ['react', 'react-dom'],
};
