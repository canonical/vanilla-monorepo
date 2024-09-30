## React ESlint config

This package provides a central configuration for Canonical's React ESlint configuration.

### Installation

#### Bun
```bash
    bun add -d @canonical/eslint-config-base @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

#### NPM
```bash
    npm install --save-dev @canonical/eslint-config-base @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

#### Yarn
```bash
    yarn add --dev @canonical/eslint-config-base @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

### Configuration

#### in `package.json`
Add the following `eslintConfig` to your `package.json` file.

```json
{
    "eslintConfig": {
        "extends": "@canonical/react"
    }
}
```

#### in `.eslintrc`
Create a `.eslintrc` file in the root of your project and extend the configuration.

```json
{
    "extends": "@canonical/react"
}
```

#### in `.eslintrc.js`
Create a `.eslintrc.js` file in the root of your project and extend the configuration.

```js
module.exports = {
    extends: '@canonical/react',
};
```