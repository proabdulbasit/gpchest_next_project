import { useContext, useRef, useEffect } from "react";
import { PlayContext, setWelcomeNotify } from "../store/store";

const Sound = () => {
  const { play, setPlay } = useContext(PlayContext);
  const { notify, setNotify } = useContext(setWelcomeNotify);
  const audioRef = useRef();

  useEffect(() => {
    if (play) {
      audioRef.current.play();
      setPlay(false);
      setNotify(false);
    }
  }, [play]);
  return (
    <audio
      ref={audioRef}
      style={{ display: "none" }}
      controls
      src="/audio/tone.wav"
    ></audio>
  );
};

export default Sound;
