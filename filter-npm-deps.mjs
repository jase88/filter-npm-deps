#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { log } from 'node:console';
import { cwd, exit } from 'node:process';

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

const packageJsonFileName = 'package.json';
const currentPath = cwd();

if (!existsSync(packageJsonFileName)) {
  throw new Error(
    `Couldn't find a package.json in ${currentPath}.
    Please make sure you run the command in a directory containing a package.json file.`,
  );
}

let packageJSON = {};

try {
  packageJSON = JSON.parse(readFileSync(packageJsonFileName, 'utf8'));
} catch (error) {
  throw new Error(
    `Could not parse the content of package.json in ${currentPath}.
    Error: ${error}`,
  );
}

const { optionalDependencies, devDependencies, dependencies } = packageJSON;
const filterDeps = (object) =>
  Object.fromEntries(
    Object.entries(object ?? {}).filter(([key]) =>
      dependenciesToKeep.includes(key),
    ),
  );

const newPackageJSON = {
  ...packageJSON,
  optionalDependencies: filterDeps(optionalDependencies),
  devDependencies: filterDeps(devDependencies),
  dependencies: filterDeps(dependencies),
};

writeFileSync(packageJsonFileName, JSON.stringify(newPackageJSON), 'utf8');
