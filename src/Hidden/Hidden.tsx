import React from 'react'
import {ResponsiveValue} from '../hooks/useResponsiveValue'
import {getBreakpointDeclarations} from '../utils/getBreakpointDeclarations'
import Box from '../Box'

type Viewport = 'narrow' | 'regular' | 'wide'

export type HiddenProps = {
  on: Array<Viewport> | Viewport
  children: React.ReactNode
}
/* Normalize the value that is received from the prop `on`.
 * For array types : ['narrow', 'wide'] -> {narrow: true, wide: true}
 * For string types: 'narrow' -> {narrow: true}
 */
function normalize(hiddenViewports: Array<Viewport> | Viewport): ResponsiveValue<boolean> | null {
  // For array types
  if (Array.isArray(hiddenViewports)) {
    const breakpoints: ResponsiveValue<boolean> = {}
    // ['narrow', 'wide'] -> {narrow: true, wide: true}
    for (const breakpoint of hiddenViewports) {
      breakpoints[breakpoint] = true
    }
    return breakpoints
  }
  // For string types
  // 'narrow' -> {narrow: true}
  return {
    [hiddenViewports]: true,
  }
}

export const Hidden = ({on, children}: HiddenProps) => {
  // Get breakpoint declarations for the normalized ResponsiveValue object
  const styles = getBreakpointDeclarations(normalize(on), 'display', () => 'none')
  // Render the children with the styles
  return styles ? <Box sx={styles}>{children}</Box> : null
}

Hidden.displayName = 'Hidden'
