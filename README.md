# filter-npm-deps
![npm](https://img.shields.io/npm/v/filter-npm-deps?style=flat-square)

filter-npm-deps is a convenient Node.js CLI script designed to filter a given list of dependencies from your `package.json`.

It supports filtering dependencies from all three commonly used dependency fields: *dependencies*, *devDependencies*, and *optionalDependencies*.

## 🚀 Usage

To use filter-npm-deps, you can easily invoke it with npx as follows:

```bash
npx filter-npm-deps -d [dependencies]
```

For example, if you want to only keep "lodash" and "axios" with the given version from your package.json, you can run:

```bash
npx filter-npm-deps -d "lodash, axios"
```


## 💡 Alternatives

While filter-npm-deps serves as a simple solution for filtering dependencies, there are other tools available that you might find useful:

- [jq](https://jqlang.github.io/jq/manual/) is a powerful command-line tool for processing JSON data. It can be used to filter for nested properties, but it requires explicit handling of all three dependency fields.
- [install-subset](https://github.com/tabrindle/install-subset) offers a different approach by enabling you to define specific subsets of npm dependencies that should be installed. This allows you to have more fine-grained control over your project's dependencies.
