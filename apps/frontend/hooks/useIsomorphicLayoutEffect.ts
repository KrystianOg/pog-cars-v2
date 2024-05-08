import {useEffect, useLayoutEffect} from 'react'

/**
 * When in browser it is called before screen repaint, on server is regular
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
