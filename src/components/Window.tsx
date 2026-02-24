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
  zIndex?: number;
  onFocus?: () => void;
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
  isResizable = true,
  zIndex = 50,
  onFocus
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
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    if (e.target instanceof HTMLElement && (e.target.closest('.window-controls') || e.target.closest('.resize-handle'))) {
      return; // Don't start drag if clicking on window controls or resize handle
    }
    e.preventDefault();
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
  return (
    <div
      ref={windowRef}
      className="absolute overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl animate-window-enter"
      style={{
        left: position.x,
        top: position.y,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={`flex h-11 select-none items-center justify-between border-b border-black/5 px-4 ${isDraggable ? 'cursor-move' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold tracking-tight text-gray-800">{title}</span>
        <div className="window-controls flex items-center">
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-500/15 hover:text-red-600"
            aria-label="Close"
          >
            <XIcon size={18} />
          </button>
        </div>
      </div>
      {/* Content */}
      <div ref={contentRef} className="h-[calc(100%-2.75rem)] overflow-auto p-5">
        <div className="responsive-content h-full min-h-0 text-gray-700">{children}</div>
      </div>
      {/* Resize handles - minimal, only when resizable */}
      {isResizable && (
        <>
          <div className="resize-handle absolute top-0 left-0 right-0 h-2 cursor-ns-resize" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="resize-handle absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="resize-handle absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize" onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="resize-handle absolute top-0 left-0 bottom-0 w-2 cursor-ew-resize" onMouseDown={(e) => handleResizeStart(e, 'w')} />
          <div className="resize-handle absolute top-0 left-0 w-3 h-3 cursor-nwse-resize rounded-tl" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="resize-handle absolute top-0 right-0 w-3 h-3 cursor-nesw-resize rounded-tr" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="resize-handle absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize rounded-bl" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize rounded-br" onMouseDown={(e) => handleResizeStart(e, 'se')} />
        </>
      )}
    </div>
  );
};