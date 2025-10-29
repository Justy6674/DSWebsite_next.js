'use client';

import React, { useEffect, useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { useParams } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';

export default function VideoPlayerPage() {
  const params = useParams<{ playbackId: string }>();
  const playbackId = params.playbackId;
  const [src, setSrc] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const run = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || '');
      const res = await fetch(`/api/mux/sign-playback?playbackId=${playbackId}`);
      const json = await res.json();
      setSrc(json.url);
    };
    run();
  }, [playbackId]);

  useEffect(() => {
    // Load mux-player web component from CDN
    if (!document.getElementById('mux-player-script')) {
      const s = document.createElement('script');
      s.id = 'mux-player-script';
      s.src = 'https://cdn.jsdelivr.net/npm/@mux/mux-player';
      document.body.appendChild(s);
    }
  }, []);

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-black rounded-lg overflow-hidden">
          {src ? (
            // @ts-ignore - mux-player custom element
            <mux-player
              style={{ width: '100%', height: '60vh' }}
              stream-type="on-demand"
              playback-id={playbackId}
              src={src}
              controls
              muted
              preload="auto"
            />
          ) : (
            <div className="text-center text-slate-400 p-8">Preparing secure stream…</div>
          )}
          {/* Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3">
            <div className="text-[10px] text-white/70 bg-black/30 px-2 py-1 rounded">
              {userEmail} · {new Date().toLocaleString('en-AU')}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}


