#!/usr/bin/env node

const path = require('path');
const glob = require('fast-glob');
const Runner = require('jscodeshift/src/Runner.js');

const pathGlob = process.argv[2];

const defaultCodeshiftOptions = {
  transform: './codemod.ts',
  verbose: 0,
  dry: false,
  print: false,
  babel: true,
  extensions: 'js',
  ignorePattern: [],
  ignoreConfig: [],
  runInBand: false,
  silent: false,
  parser: 'babel',
  failOnError: false,
  stdin: false,
};

const paths = glob.sync(pathGlob, { ignore: ['**/node_modules/**', '*.d.ts'] });

Runner.run(
  path.resolve(__dirname, defaultCodeshiftOptions.transform),
  paths,
  defaultCodeshiftOptions,
);
