import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

// import eslint from 'rollup-plugin-eslint';


import pkg from './package.json';

const commonjsOptions = {
  include: 'node_modules/**',
};

export default {
  input: 'src/main.ts',
  // output commonJs and ES module versions
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [/@babel\/runtime/],
  plugins: [
    peerDepsExternal(),
    url({ exclude: ['**/*.svg'] }),
    resolve(),
    commonjs(commonjsOptions),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    typescript({
      clean: true,
    }),
    postcss(),
    terser()
  ],
};
