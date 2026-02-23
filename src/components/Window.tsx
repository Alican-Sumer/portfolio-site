import React, { useEffect, useState, useRef } from 'react';
import { XIcon } from 'lucide-react';
interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: {
    x: number;
    y: number;
  };
  initialSize?: {
    width: number;
    height: number;
  };
  isDraggable?: boolean;
  isResizable?: boolean;
}
export const Window: React.FC<WindowProps> = ({
  title,
  children,
  onClose,
  initialPosition = {
    x: 100,
    y: 100
  },
  initialSize = {
    width: 600,
    height: 420
  },
  isDraggable = true,
  isResizable = true
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0
  });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0
  });
  const [wordCount, setWordCount] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    if (e.target instanceof HTMLElement && (e.target.closest('.window-controls') || e.target.closest('.resize-handle'))) {
      return; // Don't start drag if clicking on window controls or resize handle
    }
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (!isResizable) return;
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y
    });
  };
  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing && resizeDirection) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.posX;
        let newY = resizeStart.posY;
        // Handle width changes
        if (resizeDirection.includes('e')) {
          // East - right side
          newWidth = Math.max(300, resizeStart.width + deltaX);
        } else if (resizeDirection.includes('w')) {
          // West - left side
          const possibleWidth = Math.max(300, resizeStart.width - deltaX);
          newX = resizeStart.posX - (possibleWidth - resizeStart.width);
          newWidth = possibleWidth;
        }
        // Handle height changes
        if (resizeDirection.includes('s')) {
          // South - bottom side
          newHeight = Math.max(200, resizeStart.height + deltaY);
        } else if (resizeDirection.includes('n')) {
          // North - top side
          const possibleHeight = Math.max(200, resizeStart.height - deltaY);
          newY = resizeStart.posY - (possibleHeight - resizeStart.height);
          newHeight = possibleHeight;
        }
        setSize({
          width: newWidth,
          height: newHeight
        });
        setPosition({
          x: newX,
          y: newY
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, resizeDirection]);
  // Calculate word count
  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.textContent || '';
      const words = text.trim().split(/\s+/);
      const filteredWords = words.filter(word => word.length > 0);
      setWordCount(filteredWords.length);
    }
  }, [children]);
  return <div ref={windowRef} className="absolute bg-gray-100 rounded shadow-xl border border-gray-300 overflow-hidden" style={{
    left: position.x,
    top: position.y,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex: 50
  }}>
      {/* Window title bar - reduced height */}
      <div className={`bg-blue-600 text-white px-3 py-1 flex items-center justify-between ${isDraggable ? 'cursor-move' : ''}`} onMouseDown={handleMouseDown}>
        <div className="font-medium text-sm">{title}</div>
        <div className="window-controls flex items-center">
          <button onClick={onClose} className="p-0.5 hover:bg-red-500 rounded transition-colors">
            <XIcon size={16} />
          </button>
        </div>
      </div>
      {/* Window content */}
      <div ref={contentRef} className="p-4 h-[calc(100%-36px-20px)] overflow-auto">
        <div className="responsive-content">{children}</div>
      </div>
      {/* Status bar with word count */}
      <div className="h-5 bg-gray-200 border-t border-gray-300 text-xs text-gray-600 px-2 flex items-center justify-between">
        <span>
          Window size: {size.width}×{size.height}
        </span>
        <span>Word count: {wordCount}</span>
      </div>
      {/* Resize handles - only render if window is resizable */}
      {isResizable && <>
          {/* Top */}
          <div className="resize-handle absolute top-0 left-0 right-0 h-1 cursor-ns-resize" onMouseDown={e => handleResizeStart(e, 'n')} />
          {/* Right */}
          <div className="resize-handle absolute top-0 right-0 bottom-0 w-1 cursor-ew-resize" onMouseDown={e => handleResizeStart(e, 'e')} />
          {/* Bottom */}
          <div className="resize-handle absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize" onMouseDown={e => handleResizeStart(e, 's')} />
          {/* Left */}
          <div className="resize-handle absolute top-0 left-0 bottom-0 w-1 cursor-ew-resize" onMouseDown={e => handleResizeStart(e, 'w')} />
          {/* Top-Left */}
          <div className="resize-handle absolute top-0 left-0 w-4 h-4 cursor-nwse-resize" onMouseDown={e => handleResizeStart(e, 'nw')} />
          {/* Top-Right */}
          <div className="resize-handle absolute top-0 right-0 w-4 h-4 cursor-nesw-resize" onMouseDown={e => handleResizeStart(e, 'ne')} />
          {/* Bottom-Left */}
          <div className="resize-handle absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize" onMouseDown={e => handleResizeStart(e, 'sw')} />
          {/* Bottom-Right with visible indicator */}
          <div className="resize-handle absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize flex items-center justify-center" onMouseDown={e => handleResizeStart(e, 'se')}>
            <div size={14} className="text-gray-500" />
          </div>
        </>}
    </div>;
};