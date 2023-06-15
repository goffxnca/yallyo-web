//TODO: Sound effect will be used later
const SessionSoundEffects = () => {
  const playJoinAudio = () => {
    const joinAudio = document.getElementById("join-audio") as HTMLAudioElement;
    joinAudio.play();
  };

  const playLeaveAudio = () => {
    const leaveAudio = document.getElementById(
      "leave-audio"
    ) as HTMLAudioElement;
    leaveAudio.play();
  };

  return (
    <div>
      <audio
        autoPlay={true}
        controls
        src="/audios/join.mp3"
        className="absolute left-0 bottom-0"
        id="join-audio"
      >
        <source src=""></source>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <audio
        autoPlay={false}
        src="/audios/leave2.mp3"
        className="absolute left-0 bottom-0"
        id="leave-audio"
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};

export default SessionSoundEffects;
