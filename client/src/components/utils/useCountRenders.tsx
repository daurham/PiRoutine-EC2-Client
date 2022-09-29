import { useRef } from 'react';

/**
 * This component is for testing when preventing unnecessary rerenders.
 * useMemo and useCallback are to be looked into.  
 */
export default function useCountRenders() {
  const renders = useRef(0);
  console.log(`Renders: ${renders.current += 1}`);
}
