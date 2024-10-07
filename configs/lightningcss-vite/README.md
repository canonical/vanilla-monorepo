## Lightning CSS Config for Vite

This is a config for using Lightning CSS with Vite.

### Installation

```bash
bun install -d @canonical/lightningcss-config-vite vite
```

### Usage
Create `vite.config.ts` in the root of your project.

#### Default config
```typescript
// vite.config.ts
import defaultConfig from "@canonical/lightningcss-config-vite";
import { defineConfig } from "vite";

export default defineConfig(defaultConfig);
```
    
#### Providing your own config
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