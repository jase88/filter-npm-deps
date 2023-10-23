# filter-npm-deps

![npm](https://img.shields.io/npm/v/filter-npm-deps?style=flat-square)

filter-npm-deps is a convenient Node.js CLI script designed to filter a given list of dependencies from your `package.json`.

It supports filtering dependencies from the commonly used dependency fields:
 - [dependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies)
 - [devDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devdependencies)
 - [optionalDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#optionaldependencies)
 - [peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)
 - [bundleDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bundledependencies)

## 🎯 Motivation

In many projects, the `package.json` file contains numerous dependencies serving different purposes.
However, certain scenarios, like CI jobs, demand only specific dependencies in particular versions.
Therefore `filter-npm-deps` can reduce or prune your package.json, to only contain the dependencies that you need.

## 🚀 Usage

To use filter-npm-deps, you can easily invoke it with npx as follows:

```bash
npx filter-npm-deps -d [dependencies]
```

## 🧰 Requirements

- node.js 18 or higher

## 📝Example

Given the following package.json:

```json
{
  "name": "my-app",
  "description": "...",
  "dependencies": {
    "axios": "1.4.0",
    "lodash-es": "4.17.21"
  },
  "devDependencies": {
    "typescript": "5.1.6"
  },
  "optionalDependencies": {
    "playwright": "1.36.1"
  }
}
```

If you want to only keep `playwright` and `lodash-es` with the given version from your package.json, you can run:

```bash
npx filter-npm-deps -d "playwright,lodash-es"
```

which would result in:

```json
{
  "name": "my-app",
  "description": "...",
  "dependencies": {
    "lodash-es": "4.17.21"
  },
  "devDependencies": {},
  "optionalDependencies": {
    "playwright": "1.36.1"
  }
}
```

Afterward you can install your dependencies with your package manager of choice.

For example with npm:
`npm ci`

## 💡 Alternatives

While filter-npm-deps serves as a simple solution for filtering dependencies, there are other tools available that you might find useful:

- [jq](https://jqlang.github.io/jq/manual/) is a powerful command-line tool for processing JSON data. It can be used to filter for nested properties, but it requires explicit handling of all three dependency fields.
- [install-subset](https://github.com/tabrindle/install-subset) offers a different approach by enabling you to define specific subsets of npm dependencies that should be installed.
