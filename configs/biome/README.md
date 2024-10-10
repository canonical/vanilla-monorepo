# @canonical/biome-config

## Install

```sh
bun i -d @canonical/biome-config
```

## Consume

Create `biome.json` in your project

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.2/schema.json",
  "extends": ["@canonical/biome-config"]
}
```

## JSX Runtime

This configuration sets the [JSX Runtime](https://biomejs.dev/reference/configuration/#javascriptjsxruntime) option to `"reactClassic"`. 
This is done to align with the `@canonical/typescript-config-react` package, which uses `"react"` for the `"jsx"` field. 

If this is not enabled, Biome will try to use type imports to import `React`, even though `.tsx` files need `React` imported.

```tsx
import React from 'react';
```
throws this Biome error:
```
 All these imports are only used as types.
  
  > 1 │ import React from "react";
      │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
    2 │ 
    3 │ import "./button.css";
  
  Importing the types with import type ensures that they are removed by the transpilers and avoids loading unnecessary modules.
```
with `--write` enabled, this is adjusted to:
```tsx
import type React from 'react';
```
This will then throw Typescript build errors like this:
```
src/ui/Button/Button.tsx(30,6): error TS1361: 'React' cannot be used as a value because it was imported using 'import type'.
```

To fix this, we use `"jsxRuntime": "reactClassic"` in `biome.json`, and `"jsx": "react"` in `tsconfig.json`.

If you are using `"jsx": "react-jsx"` in `tsconfig.json`, you should instead use `"jsxRuntime": "transparent"`.