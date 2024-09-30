## Canonical Typescript Configuration

This package provides a central configuration for Canonical's TypeScript projects.

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
    "extends": "@canonical/typescript-config"
}
```
