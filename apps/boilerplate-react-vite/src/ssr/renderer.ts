import React from "react";

import Entrypoint from "./Entrypoint.js";
import htmlString from "../../dist/client/index.html?raw";
// import { StaticRouter } from 'react-router-dom/server';
//
import { JSXRenderer } from "@canonical/react-ssr";

export const config = {
  supportsResponseStreaming: true,
};

const Renderer = new JSXRenderer(Entrypoint, {
  htmlString,
});

// const DemoComponent = ({ timeout=500 }) => {
//   const LazyButton = React.lazy(async () => {
//     await new Promise(resolve => setTimeout(resolve, timeout));
//
//     return {
//       default: () => <button>Click me</button>,
//     }
//   });
//
//   useEffect(() => {
//     console.log('mounted');
//   }, []);
//
//   return (
//     <div>
//       <React.Suspense fallback={<>Waitttt</>}>
//         <LazyButton onClick={() => alert('clicked')} />
//       </React.Suspense>
//     </div>
//   );
// }

export const handler = Renderer.render;
