import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { DownloadIcon } from 'lucide-react';
import '@react-pdf-viewer/core/lib/styles/index.css';

const RESUME_URL = '/Alican Sumer Resume.pdf';
const PDF_WORKER = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

interface ResumeViewerProps {
  onDownload: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ onDownload }) => {
  return (
    <div className="flex flex-col h-full relative">
      <button
        type="button"
        className="absolute z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
        style={{
          top: '10px',
          left: '10px',
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 2px 12px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}
        onClick={onDownload}
        title="Download Resume"
        aria-label="Download Resume"
      >
        <DownloadIcon size={16} className="text-gray-700" />
      </button>
      <div className="flex-1 min-h-0 border border-gray-300 rounded overflow-hidden bg-gray-100">
        <Worker workerUrl={PDF_WORKER}>
          <Viewer fileUrl={RESUME_URL} />
        </Worker>
      </div>
    </div>
  );
};
