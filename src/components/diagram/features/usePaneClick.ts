import { useCallback } from 'react';
import { UngroupMenuProps } from '../components/ungroupMenu';


export default function usePaneClick (
  setNodeMenu: React.Dispatch<React.SetStateAction<any>>,
  setEdgeMenu: React.Dispatch<React.SetStateAction<any>>,
  setUngroupMenu: React.Dispatch<React.SetStateAction<UngroupMenuProps | null>>
) {
  const onPaneClick = useCallback(() => {
    setUngroupMenu(null), setNodeMenu(null), setEdgeMenu(null);
  }, [ setUngroupMenu, setNodeMenu, setEdgeMenu ]);
  
  return { onPaneClick };
}