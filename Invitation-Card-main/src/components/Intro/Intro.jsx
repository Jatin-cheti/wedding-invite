import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_START_AT_SECONDS = 2;
const INTRO_END_HOLD_SECONDS = 1.5;
const INTRO_PLAYBACK_RATE = 1.25;
const PORTRAIT_INTRO_QUERY = "(orientation: portrait)";
const LANDSCAPE_INTRO_VIDEO = "/AS_envelope_card_v3.mp4";
const PORTRAIT_INTRO_VIDEO = "/AS_envelope_card_phone_9x20.mp4";

export default function Intro({ envelopeOpened, onEnvelopeOpened }) {
  const videoRef = useRef(null);
  const onEnvelopeOpenedRef = useRef(onEnvelopeOpened);
  const introFinishedRef = useRef(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState(() => (
    window.matchMedia(PORTRAIT_INTRO_QUERY).matches ? PORTRAIT_INTRO_VIDEO : LANDSCAPE_INTRO_VIDEO
  ));

  const finishIntro = useCallback(() => {
    if (introFinishedRef.current) return;
    introFinishedRef.current = true;
    onEnvelopeOpenedRef.current?.();
  }, []);

  const handleVideoTimeUpdate = (event) => {
    const video = event.currentTarget;
    if (video.duration && video.currentTime >= video.duration - INTRO_END_HOLD_SECONDS) {
      video.pause();
      finishIntro();
    }
  };

  useEffect(() => {
    onEnvelopeOpenedRef.current = onEnvelopeOpened;
  }, [onEnvelopeOpened]);

  useEffect(() => {
    const portraitQuery = window.matchMedia(PORTRAIT_INTRO_QUERY);
    const updateVideoForViewport = () => {
      setVideoSrc(portraitQuery.matches ? PORTRAIT_INTRO_VIDEO : LANDSCAPE_INTRO_VIDEO);
    };

    portraitQuery.addEventListener("change", updateVideoForViewport);
    return () => portraitQuery.removeEventListener("change", updateVideoForViewport);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setVideoFailed(true);
    const startVideo = () => setShouldPlayVideo(true);

    video.addEventListener("error", handleError);
    startVideo();

    return () => {
      video.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (!shouldPlayVideo || envelopeOpened || !videoRef.current) return;

    const video = videoRef.current;
    const startPlayback = () => {
      video.playbackRate = INTRO_PLAYBACK_RATE;
      video.currentTime = Math.min(INTRO_START_AT_SECONDS, video.duration || INTRO_START_AT_SECONDS);
      video.play().catch(() => {
        setVideoFailed(true);
        finishIntro();
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      startPlayback();
      return;
    }

    video.addEventListener("loadedmetadata", startPlayback, { once: true });
    return () => video.removeEventListener("loadedmetadata", startPlayback);
  }, [envelopeOpened, finishIntro, shouldPlayVideo, videoSrc]);

  return (
    <div
      className={`fixed inset-0 z-[5] transition-opacity duration-1000 overflow-hidden bg-[#F8D6C9] ${envelopeOpened ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {videoFailed && (
        <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm tracking-[0.3em] uppercase">
          .
        </div>
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={finishIntro}
        className="intro-video absolute inset-0 h-full w-full pointer-events-none"
        style={{ objectPosition: '50% center' }}
      />
    </div>
  );
}
