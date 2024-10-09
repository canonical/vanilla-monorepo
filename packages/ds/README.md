# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Caveat

### TSConfig

### Module resolution

We use `NodeNext` for `tsconfig` `module`.
When one uses `EsNext` for `module` and doesn't define `moduleResolution`, the following error occurs:


```
src/stories/Page.stories.ts:1:37 - error TS2792: Cannot find module '@storybook/react'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

1 import type { Meta, StoryObj } from "@storybook/react";
                                      ~~~~~~~~~~~~~~~~~~

src/stories/Page.stories.ts:2:43 - error TS2792: Cannot find module '@storybook/test'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

2 import { expect, userEvent, within } from "@storybook/test";
                                            ~~~~~~~~~~~~~~~~~

src/stories/Page.stories.ts:22:18 - error TS7031: Binding element 'canvasElement' implicitly has an 'any' type.
```

So, we use `NodeNext` for `module` instead, which causes the Typescript compiler to infer `NodeNext` for `moduleResolution` as well. This eliminates the error.

See [StackOverflow article](https://stackoverflow.com/questions/71463698/why-we-need-nodenext-typescript-compiler-option-when-we-have-esnext) for more information on the differences between these options.

### Skip library check

We use [skipLibCheck](https://www.typescriptlang.org/tsconfig/#skipLibCheck) to skip type checking of declaration files. 
This is needed for compatibility with vite dependencies. If this option is not enabled, the following error occurs:


```
../../node_modules/@storybook/react/dist/index.d.ts(3,188): error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("storybook/internal/types")' call instead.
```

