import { useState, useCallback, useEffect } from 'react';

type Position = {
  source: number;
  target: number;
};

type DragAndDropResult<T> = {
  items: T[];
  isDragging: boolean;
  draggedItem: T | null;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent) => void;
};

export function useDragAndDrop<T>(initialItems: T[]): DragAndDropResult<T> {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<T | null>(null);
  const [sourceIndex, setSourceIndex] = useState<number | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragStart = useCallback((index: number) => {
    setIsDragging(true);
    setDraggedItem(items[index]);
    setSourceIndex(index);
  }, [items]);

  const handleDragEnter = useCallback((targetIndex: number) => {
    if (sourceIndex === null || sourceIndex === targetIndex) return;

    setItems(prevItems => {
      const newItems = [...prevItems];
      const [draggedItem] = newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);
      setSourceIndex(targetIndex);
      return newItems;
    });
  }, [sourceIndex]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDraggedItem(null);
    setSourceIndex(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return {
    items,
    isDragging,
    draggedItem,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
  };
}