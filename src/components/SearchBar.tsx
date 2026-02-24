import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, LoaderIcon } from 'lucide-react';

/** Renders response text with **bold** and newlines as actual formatting. */
function formatResponseText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const i = remaining.indexOf('**');
    if (i === -1) {
      parts.push(
        ...remaining.split('\n').flatMap((line, j) => (j === 0 ? [line] : [<br key={`${key++}`} />, line]))
      );
      break;
    }
    const before = remaining.slice(0, i);
    remaining = remaining.slice(i + 2);
    const end = remaining.indexOf('**');
    if (end === -1) {
      parts.push(before, '**', remaining);
      break;
    }
    const boldContent = remaining.slice(0, end);
    remaining = remaining.slice(end + 2);
    if (before) {
      parts.push(
        ...before.split('\n').flatMap((line, j) => (j === 0 ? [line] : [<br key={`${key++}`} />, line]))
      );
    }
    parts.push(<strong key={`${key++}`}>{boldContent}</strong>);
  }
  return <>{parts}</>;
}

interface SearchBarProps {
  onSearch?: (query: string) => Promise<string>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !onSearch || isLoading) return;

    setIsLoading(true);
    setShowResponse(false);
    
    try {
      const result = await onSearch(query.trim());
      setResponse(result);
      setShowResponse(true);
    } catch (error) {
      console.error('Search error:', error);
      setResponse('Sorry, I encountered an error while processing your question. Please try again.');
      setShowResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResponse(false);
      inputRef.current?.blur();
    }
  };

  // Close response when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        responseRef.current &&
        !responseRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResponse(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            relative w-80 h-8 rounded-full transition-all duration-200 ease-out
            backdrop-blur-[20px] border bg-white/90
            ${isFocused 
              ? 'border-blue-500/60 shadow-lg scale-[1.02]' 
              : 'border-white/30 shadow-md hover:scale-[1.01]'
            }
          `}
          style={{
            boxShadow: isFocused 
              ? '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Search Icon */}
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {isLoading ? (
              <LoaderIcon size={14} className="text-black/60 animate-spin" />
            ) : (
              <SearchIcon size={14} className="text-black/60" />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about my experience..."
            disabled={isLoading}
            className={`
              w-full h-full pl-9 pr-3 bg-transparent border-none outline-none
              text-xs text-black placeholder-black/60
              font-normal transition-all duration-200
              ${isLoading ? 'cursor-not-allowed' : 'cursor-text'}
            `}
            style={{
              fontFamily: 'Segoe UI, system-ui, -apple-system, sans-serif'
            }}
          />
        </div>
      </form>

      {/* Response Popup */}
      {showResponse && response && (
        <div
          ref={responseRef}
          className={`
            absolute bottom-12 left-0 w-80 max-w-md z-[100]
            bg-white/95 backdrop-blur-[20px] border border-white/20
            rounded-2xl shadow-xl p-4 transition-all duration-300 ease-out
            animate-in slide-in-from-top-2
          `}
          style={{
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-semibold text-black/80">
              AI Assistant Response
            </h3>
            <button
              onClick={() => setShowResponse(false)}
              className="text-black/50 hover:text-black/80 transition-colors"
              aria-label="Close response"
            >
              ×
            </button>
          </div>
          
          <div className="text-sm text-black/80 leading-relaxed whitespace-pre-wrap">
            {formatResponseText(response)}
          </div>
          
          <div className="mt-3 pt-3 border-t border-black/10">
            <p className="text-xs text-black/50">
              Ask another question or feel free to close me!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
