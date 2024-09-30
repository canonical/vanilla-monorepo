## Base ESlint config

This package provides a central configuration for Canonical's ESlint configuration.

### Installation

#### Bun
```bash
    bun add -d @canonical/eslint-config-base @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import
```

#### NPM
```bash
    npm install --save-dev @canonical/eslint-config-base @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import
```

#### Yarn
```bash
    yarn add --dev @canonical/eslint-config-base @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import
```

### Configuration

#### in `package.json`
Add the following `eslintConfig` to your `package.json` file.

```json
{
    "eslintConfig": {
        "extends": "@canonical/base"
    }
}
```

#### in `.eslintrc`
Create a `.eslintrc` file in the root of your project and extend the configuration.

```json
{
    "extends": "@canonical/base"
}
```

#### in `.eslintrc.js`
Create a `.eslintrc.js` file in the root of your project and extend the configuration.

```js
module.exports = {
    extends: '@canonical/base',
};
```