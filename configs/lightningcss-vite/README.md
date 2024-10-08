## Lightning CSS Config for Vite

This is a config for using Lightning CSS with Vite.

### Installation

```bash
bun install -d @canonical/lightningcss-config-vite vite
```

### Usage
Create `vite.config.ts` in the root of your project.
    
```typescript
import { defineConfig } from 'vite'
import lightningcssVite from "@canonical/lightningcss-config-vite";

export default defineConfig({
    ...lightningcssVite,
    // Rest of your config here
})
```