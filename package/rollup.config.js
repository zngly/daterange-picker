import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const commonjsOptions = {
  include: 'node_modules/**',
  exclude: ['node_modules/**', 'src/dev/**', 'src/dev/index.tsx', '**/__tests__', '**/*.test.ts', '**/dev/**'],
};

export default {
  input: 'src/daterange-picker/main.ts',
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
    commonjs(commonjsOptions),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      exclude: commonjsOptions.exclude,
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    resolve(),
    typescript({
      clean: true,
      exclude: commonjsOptions.exclude,
    }),
    terser(),
  ],
};
