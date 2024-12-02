/* <%= pkg %> <%= version %> */
import React from 'react'
import type { <%= componentName %>Props } from './types.js'

<% if (includeStyles) { %>
import './<%= componentName %>.css'
<% } %>
  
/**
 * description of the <%= componentName %> component
 * @returns {React.ReactElement} - Rendered <%= componentName %>
 */
export default function <%= componentName %>({
  children,
  className,
  ...props
}: React.FC<<%= componentName %>Props>) {
  return (
    <div
      className={
        [
          "<%= namespace %>",
          "<%= componentName.toLowerCase() %>",
          className
        ].filter(Boolean)
      }
      {...props}
    >
      {children}
    </div>
  )
}