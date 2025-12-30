"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type UserMediaStatus = "loading" | "ready" | "denied";

export type UseUserMediaOptions = {
  audio?: boolean;
  video?: boolean;
};

export function useUserMedia(options: UseUserMediaOptions = {}) {
  const { audio = true, video = true } = options;

  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<UserMediaStatus>("loading");
  const [error, setError] = useState<unknown>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const stop = useCallback(() => {
    const current = streamRef.current;
    if (!current) return;
    current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError(null);

    const init = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({ audio, video });
        if (cancelled) {
          media.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = media;
        setStream(media);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setError(err);
        setStream(null);
        setStatus("denied");
      }
    };

    void init();

    return () => {
      cancelled = true;
      stop();
    };
  }, [audio, video, stop]);

  useEffect(() => {
    const current = streamRef.current;
    if (!current) return;
    const [track] = current.getAudioTracks();
    if (!track) return;
    track.enabled = !isMicMuted;
  }, [isMicMuted, stream]);

  useEffect(() => {
    const current = streamRef.current;
    if (!current) return;
    const [track] = current.getVideoTracks();
    if (!track) return;
    track.enabled = !isCameraOff;
  }, [isCameraOff, stream]);

  const toggleMic = useCallback(() => setIsMicMuted((v) => !v), []);
  const toggleCamera = useCallback(() => setIsCameraOff((v) => !v), []);

  return {
    stream,
    status,
    error,
    isMicMuted,
    isCameraOff,
    toggleMic,
    toggleCamera,
    stop
  };
}

