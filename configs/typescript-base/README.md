## Canonical Typescript Configuration

This package provides a central configuration for Canonical's TypeScript projects.

For React projects, see the [React configuration](https://www.npmjs.com/package/@canonical/typescript-config-react).

### Installation

#### Bun

```bash
    bun add -d @canonical/typescript-config-base
```

#### NPM

```bash
    npm install --save-dev @canonical/typescript-config-base
```

#### Yarn

```bash
    yarn add --dev @canonical/typescript-config-base
```

### Usage

Create a `tsconfig.json` file in the root of your project and extend the configuration.

```json
{
  "extends": "@canonical/typescript-config-base"
}
```

## Caveats

### NodeNext v Node module resolution

When using TypeScript's NodeNext module resolution, TypeScript expects files to follow Node.js's ES Module (ESM) resolution rules, which require explicit .js extensions for imports. This approach matches ESM conventions, where the index.js file must be specified. This differs from Node module resolution, which defaults to CommonJS and allows directory imports without specifying an index file.
Best Practices:

    Use Explicit File Extensions: With NodeNext, include file extensions (e.g., ./Button/index.js).
    Maintain an index.ts for Exports: Collect all exports in a single index.ts at the package root for easier imports.
    Consider the Module Type: Use Node resolution if CommonJS is preferred; otherwise, NodeNext for ESM compliance.

This approach maintains compatibility with both Node.js and bundlers.

In other words, by using NodeNext, we are aiming at compatibility with the ES Module specification, and this requires importing explicitly `mymodule/index.js` files instead of simply `mymodule/`
