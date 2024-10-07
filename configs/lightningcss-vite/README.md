## Lightning CSS Config for Vite

This is a config for using Lightning CSS with Vite.

### Installation

```bash
bun install -d @canonical/lightningcss-config-vite vite
```

### Usage

#### Vite configuration
Create `vite.config.ts` in the root of your project.

##### Default config
```typescript
// vite.config.ts
import defaultConfig from "@canonical/lightningcss-config-vite";
import { defineConfig } from "vite";

export default defineConfig(defaultConfig);
```
    
##### Providing your own config
You can provide your own configuration, which will be merged with our default configuration, by calling the `getShareableLightningCssConfig()` function.
See the [Vite documentation](https://vitejs.dev/config/) for more information on what you can configure.

```typescript
// vite.config.ts
import { getShareableLightningCssConfig } from "@canonical/lightningcss-config-vite";
import { defineConfig } from "vite";

export default defineConfig(getShareableLightningCssConfig({
  // Your config here
}));
```

#### Browserslist settings
You can configure Vite to target browsers using [Browserslist](https://github.com/browserslist/browserslist).

This configuration will attempt to read your browserslist configuration from the `.browserslistrc` file and 
`browserslist` key in your `package.json` file. If neither of them are found, the browserslist defaults will be used.

See the [Browserslist documentation](https://github.com/browserslist/browserslist) for more information on setting up these files.