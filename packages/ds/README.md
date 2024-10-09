# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Caveats

### TSConfig

#### Skip library check

We use [skipLibCheck](https://www.typescriptlang.org/tsconfig/#skipLibCheck) to skip type checking of declaration files. 
This is needed for compatibility with vite dependencies. If this option is not enabled, the following error occurs:


```
../../node_modules/@storybook/react/dist/index.d.ts(3,188): error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("storybook/internal/types")' call instead.
```

