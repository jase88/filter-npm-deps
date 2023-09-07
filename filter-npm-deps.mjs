#!/usr/bin/env node

import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { log, error } from 'node:console';
import { cwd, exit } from 'node:process';
import { createRequire } from 'node:module';

const {
  values: { deps, help },
} = parseArgs({
  options: {
    deps: {
      short: 'd',
      type: 'string',
    },
    help: {
      type: 'boolean',
      short: 'h',
    },
  },
});

const dependenciesToKeep = deps?.split(',') ?? [];

if (dependenciesToKeep.length === 0 || help) {
  log(`Usage: filter-npm-deps [options]

Options:
  -h, --help   Show this help message and exit.
  -d, --deps   A list of comma-separated NPM packages to filter for within package.json`);
  exit(0);
}

const require = createRequire(import.meta.url);
const packageJsonFileName = './package.json';

let packageJSON;

try {
  packageJSON = require(packageJsonFileName);
} catch {
  error(
    `Couldn't find a package.json in '${cwd()}'. Please make sure you run the command in a directory containing a package.json file.`
  );
  exit(-1);
}

const { optionalDependencies, devDependencies, dependencies } = packageJSON;
const filterDeps = (object) =>
  Object.fromEntries(
    Object.entries(object ?? {}).filter(([key]) =>
      dependenciesToKeep.includes(key)
    )
  );

const newPackageJSON = {
  ...packageJSON,
  optionalDependencies: filterDeps(optionalDependencies),
  devDependencies: filterDeps(devDependencies),
  dependencies: filterDeps(dependencies),
};

writeFileSync(packageJsonFileName, JSON.stringify(newPackageJSON), 'utf8');
