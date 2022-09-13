import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

const commonjsOptions = {
  include: 'node_modules/**',
  exclude: ['node_modules/**', 'src/dev/**', 'src/dev/index.tsx', '**/__tests__', '**/*.test.ts', '**/dev/**'],
};

export default {
  input: 'src/daterange-picker/index.ts',
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
      tsconfigDefaults: {
        compilerOptions: {
          baseUrl: './src/daterange-picker',
          outDir: 'build',
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          noFallthroughCasesInSwitch: true,
          module: 'esnext',
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          downlevelIteration: true,
          sourceMap: true,
          declaration: true,
          noImplicitReturns: true,
          noImplicitThis: true,
          noImplicitAny: true,
          strictNullChecks: true,
        },
        include: ['src/daterange-picker'],
        exclude: ['node_modules', 'build', 'example', 'rollup.config.js', 'src/index.*', 'src/dev'],
      },
    }),
    terser(),
    copy({
      targets: [{ src: '../README.md', dest: 'build/' }],
    }),
  ],
};
