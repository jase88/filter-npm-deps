#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import console from 'node:console';
import process from 'node:process';

const {
  values: { filterDependencies, filterScripts, help },
} = parseArgs({
  options: {
    filterDependencies: {
      type: 'string',
    },
    filterScripts: {
      type: 'string',
    },
    help: {
      type: 'boolean',
      short: 'h',
    },
  },
});

// if (help) {
//   console.log('help');
//   process.exit(0);
// }

const currentPath = process.cwd();
const dependenciesToKeep = filterDependencies?.split(',') ?? [];
const scriptsToKeep = filterScripts?.split(',') ?? [];
const packageJsonFileName = 'package.json';

if (!existsSync(packageJsonFileName)) {
  throw new Error(
    `Couldn't find a package.json in ${currentPath}.\nPlease make sure you run the command in a directory containing a package.json file.`,
  );
}

let packageJSON = {};

try {
  packageJSON = JSON.parse(readFileSync(packageJsonFileName, 'utf8'));
} catch (error) {
  throw new Error(
    `Could not parse the content of package.json in ${currentPath}.\nError: ${error}`,
  );
}

if (dependenciesToKeep.length === 0 && scriptsToKeep.length === 0) {
  console.warn('nothing to filter for');
}

const { optionalDependencies, devDependencies, dependencies, scripts } =
  packageJSON;
const filterObjectByKeys = (object, keys) =>
  Object.fromEntries(
    Object.entries(object ?? {}).filter(([key]) => keys.includes(key)),
  );

const newPackageJSON = {
  ...packageJSON,
  scripts: filterObjectByKeys(scripts, scriptsToKeep),
  optionalDependencies: filterObjectByKeys(
    optionalDependencies,
    dependenciesToKeep,
  ),
  devDependencies: filterObjectByKeys(devDependencies, dependenciesToKeep),
  dependencies: filterObjectByKeys(dependencies, dependenciesToKeep),
};

writeFileSync(packageJsonFileName, JSON.stringify(newPackageJSON), 'utf8');
