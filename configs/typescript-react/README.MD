## Canonical Typescript Configuration

This package provides a central configuration for Canonical's React TypeScript projects.

### Installation

#### Bun

```bash
    bun add -d @canonical/typescript-config-react
```

#### NPM

```bash
    npm install --save-dev @canonical/typescript-config-react
```

#### Yarn

```bash
    yarn add --dev @canonical/typescript-config-react
```

### Usage

Create a `tsconfig.json` file in the root of your project and extend the configuration.

```json
{
  "extends": "@canonical/typescript-config-react"
}
```
