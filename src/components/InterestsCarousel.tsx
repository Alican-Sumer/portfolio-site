import React, { useEffect, useState, useRef } from 'react';

const INTERESTS_BASE = '/Interests%20pictures';

// Only include files that exist in public/Interests pictures (use .jpg when available for faster load)
const INTERESTS_IMAGES = [
  'DSCN3764.JPG',
  'DSCN3769.JPG',
  'DSCN3770.JPG',
  'DSCN3785.JPG',
  'IMG_2442.jpg',
  'IMG_2505.jpg',
  'IMG_2709.jpg',
  'IMG_2729.jpg',
  'IMG_2869.jpg',
  'IMG_3512.jpg',
  'IMG_4326.jpg',
  'IMG_4965.jpg',
  'IMG_5104.jpg',
  'IMG_9061.jpg',
  'IMG_9492.jpg',
];

function isHeic(filename: string): boolean {
  return /\.heic$/i.test(filename);
}

function InterestImage({ filename }: { filename: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const blobUrlRef = useRef<string | null>(null);
  const path = `${INTERESTS_BASE}/${encodeURIComponent(filename)}`;
  const pathJpg = isHeic(filename)
    ? `${INTERESTS_BASE}/${encodeURIComponent(filename.replace(/\.heic$/i, '.jpg'))}`
    : path;

  useEffect(() => {
    if (!isHeic(filename)) {
      setSrc(path);
      return;
    }
    let cancelled = false;
    const loadHeic = async () => {
      try {
        // Prefer pre-converted .jpg if it exists (avoids heic2any in browser)
        const jpgRes = await fetch(pathJpg, { method: 'HEAD' });
        if (jpgRes.ok) {
          setSrc(pathJpg);
          return;
        }
        const mod = await import('heic2any');
        const heic2any = mod.default ?? (mod as { default?: (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]> }).default;
        if (typeof heic2any !== 'function') {
          setError(true);
          return;
        }
        const res = await fetch(path);
        const blob = await res.blob();
        const result = await heic2any({
          blob,
          toType: 'image/jpeg',
          quality: 0.9,
        });
        const blobOut = Array.isArray(result) ? result[0] : result;
        if (!cancelled && blobOut) {
          const url = URL.createObjectURL(blobOut);
          blobUrlRef.current = url;
          setSrc(url);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };
    loadHeic();
    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [filename, path, pathJpg]);

  if (error) return <div className="h-72 w-[432px] flex-shrink-0 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm">Error loading image</div>;
  if (!src) return <div className="h-72 w-[432px] flex-shrink-0 rounded-lg bg-gray-100 animate-pulse" />;
  return (
    <img
      src={src}
      alt=""
      className="h-72 w-[432px] flex-shrink-0 rounded-lg object-cover shadow-md"
    />
  );
}

const DEFAULT_INTRO =
  "Beyond code, I'm passionate about technology, leadership, and continuous learning. Here are some moments that reflect what I enjoy and care about.";

export const InterestsCarousel: React.FC<{ introParagraph?: string }> = ({
  introParagraph = DEFAULT_INTRO,
}) => {
  return (
    <div className="flex min-h-full w-full flex-col overflow-auto pt-12">
      <div className="flex-1 min-h-[2rem] shrink-0" aria-hidden />
      <div className="flex w-full flex-shrink-0 flex-col items-center">
        <p className="text-gray-700 mb-8 max-w-2xl text-center text-lg leading-relaxed tracking-tight">{introParagraph}</p>
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll-infinite">
            <div className="flex gap-4 pr-4">
              {INTERESTS_IMAGES.map((name) => (
                <InterestImage key={name} filename={name} />
              ))}
            </div>
            <div className="flex gap-4 pr-4 flex-shrink-0">
              {INTERESTS_IMAGES.map((name) => (
                <InterestImage key={`dup-${name}`} filename={name} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-[2rem] shrink-0" aria-hidden />
    </div>
  );
};
