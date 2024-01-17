import { useCallback } from 'react';
import { Node } from 'reactflow';
import { UngroupMenuProps } from '../components/ungroupMenu';


export default function useUngroupMenu (
  reactFlowRef: React.RefObject<HTMLInputElement>, 
  setUngroupMenu: React.Dispatch<React.SetStateAction<UngroupMenuProps | null>>) {
  const onNodeContextMenu = useCallback(
    (event: { preventDefault: () => void, clientY: number, clientX: number }, node: Node) => {
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      if (!reactFlowRef.current) return; 

      const pane = reactFlowRef.current.getBoundingClientRect() ?? 0;
      if (reactFlowRef.current) {
        setUngroupMenu({
          node: node,
          top: event.clientY < pane.height - 200 && event.clientY - 70,
          left: event.clientX < pane.width - 200 && event.clientX,
          right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom:
            event.clientY >= pane.height - 200 && pane.height - event.clientY,
        });
      }
    },
    [ setUngroupMenu ]
  );


  return { onNodeContextMenu };

}