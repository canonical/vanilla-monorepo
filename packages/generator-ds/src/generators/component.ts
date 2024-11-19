import {
  createDir,
  defineGenerators,
  renderTemplate,
} from "@canonical/generator-lib";

export default defineGenerators({
  scenarios: {
    component: {
      args: {
        name: {
          description: "The name of the React component",
          required: true,
          transform: (name: string) => name,
        },
        module: {
          description: "The module name where the component should go",
          defaultValue: "core",
          transform: (name: string) => name.toLowerCase(),
        },
      },
      execute: async (args, transformedArgs) => {
        const { name } = transformedArgs;
        const { module } = args;
        const componentDir = `./src/components/${name}`;
        const moduleDir = `./src/modules/${module}`;

        console.log(`Generating React component: ${name}`);

        // Create directories for the component and module
        createDir(componentDir);
        createDir(moduleDir);

        // Copy the template for the React component and adjust it
        renderTemplate(
          "./templates/index.tsx",
          `${componentDir}/index.tsx`,
          transformedArgs,
        );

        // Log the successful generation
        console.log(`${name} component has been generated in ${componentDir}`);
      },
    },
  },
});
