"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight, Mic2, RotateCcw, Volume2, VolumeX, WandSparkles } from "lucide-react";

const turns = [
  { who: "NEHAHR", kind: "agent", text: "Hi Aditi, I’m calling about your application. Is now a good time for a quick first chat?" },
  { who: "CANDIDATE", kind: "person", text: "Yes, I have a few minutes." },
  { who: "NEHAHR", kind: "agent", text: "Lovely. What kind of product problem do you most enjoy working on?" },
  { who: "CANDIDATE", kind: "person", text: "I like building tools that take repetitive work off people’s plates." },
  { who: "CALENDAR TOOL", kind: "tool", text: "Checked availability · found 3 interview slots" },
  { who: "NEHAHR", kind: "agent", text: "That sounds like a fit. Thursday at 11 works for the team. I’ll send the details over." },
];

const stations = [
  { title: "blue hour", subtitle: "soft focus · no rush", notes: [110, 164.81, 220] },
  { title: "late build", subtitle: "one more small fix", notes: [98, 146.83, 196] },
  { title: "clear signal", subtitle: "thinking out loud", notes: [130.81, 196, 261.63] },
];

type AudioState = { context: AudioContext; oscillators: OscillatorNode[]; gain: GainNode };

export function MoodRadio() {
  const [station, setStation] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<AudioState | null>(null);
  const current = stations[station];

  const stop = () => {
    const currentAudio = audio.current;
    if (!currentAudio) return;
    currentAudio.gain.gain.setTargetAtTime(0, currentAudio.context.currentTime, 0.08);
    window.setTimeout(() => {
      currentAudio.oscillators.forEach((oscillator) => { try { oscillator.stop(); } catch { /* already stopped */ } });
      void currentAudio.context.close();
    }, 350);
    audio.current = null;
    setPlaying(false);
  };

  const play = async (nextStation = station) => {
    const context = new AudioContext();
    await context.resume();
    const gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(context.destination);
    const oscillators = stations[nextStation].notes.map((frequency, index) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = index === 1 ? 0.27 : 0.19;
      oscillator.connect(voiceGain);
      voiceGain.connect(gain);
      oscillator.start();
      return oscillator;
    });
    gain.gain.setTargetAtTime(0.035, context.currentTime, 0.8);
    audio.current = { context, oscillators, gain };
    setPlaying(true);
  };

  const toggle = () => {
    if (playing) stop();
    else void play();
  };

  const changeStation = () => {
    const next = (station + 1) % stations.length;
    setStation(next);
    if (playing) {
      stop();
      window.setTimeout(() => void play(next), 380);
    }
  };

  useEffect(() => () => {
    if (audio.current) {
      audio.current.oscillators.forEach((oscillator) => { try { oscillator.stop(); } catch { /* already stopped */ } });
      void audio.current.context.close();
    }
  }, []);

  return (
    <aside className="mood-radio" aria-label="Ambient sound player">
      <div className="radio-art"><span>✳</span></div>
      <div className="radio-copy"><small>RADIO FOR THE MOOD</small><b>{current.title}</b><span>{current.subtitle}</span></div>
      <button className="radio-skip" onClick={changeStation} aria-label="Change station"><ChevronRight size={16}/></button>
      <div className={`radio-meter ${playing ? "is-playing" : ""}`} aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <button className="radio-toggle" onClick={toggle} aria-label={playing ? "Pause ambient tones" : "Play ambient tones"}>{playing ? <VolumeX size={15}/> : <Volume2 size={15}/>}<span>{playing ? "PAUSE" : "LISTEN"}</span></button>
      <span className="radio-caption">soft synth · generated here · off by default</span>
    </aside>
  );
}

export default function VoiceShowcase() {
  const [turn, setTurn] = useState(0);
  const visibleTurns = turns.slice(0, turn + 1);
  const isEnd = turn === turns.length - 1;

  return (
    <section className="voice-lab section-pad" id="voice">
      <div className="section-label"><span>02 / VOICE SYSTEMS</span><span>LISTEN · REASON · DO</span></div>
      <div className="voice-heading">
        <div><p className="voice-kicker"><span className="voice-signal"/> THE VOICE AGENT BUILDER</p><h2>Make it sound<br/>like <em>someone’s there.</em></h2></div>
        <p className="voice-intro">A great voice agent doesn’t just talk. It listens for what matters, does the useful thing, and knows when to bring a human in.</p>
      </div>

      <div className="voice-stage">
        <div className="call-device">
          <div className="call-topline"><div className="call-brand"><span className="call-brand-icon"><Mic2 size={14}/></span><span>NEHAHR <small>OUTBOUND SCREEN</small></span></div><span className="call-live"><i/> SAMPLE FLOW</span></div>
          <div className="call-recipient"><span className="recipient-avatar">A</span><div><small>CALLING ABOUT</small><b>Product Engineer · Cairn Labs</b><span>Candidate first conversation</span></div><span className="phone-badge">↗</span></div>
          <div className={`call-wave ${turn > 0 ? "wave-active" : ""}`} aria-label="Illustrative voice activity waveform">{Array.from({length: 52}, (_, i)=><i key={i} style={{ height: `${10 + ((i * 29 + 7) % 35)}px`, animationDelay: `${(i % 11) * -0.08}s` }}/>)}</div>
          <div className="call-transcript" aria-live="polite" aria-relevant="additions text">
            <div className="transcript-heading"><span>CONVERSATION WALKTHROUGH</span><span>{String(turn + 1).padStart(2,"0")} / {String(turns.length).padStart(2,"0")}</span></div>
            {visibleTurns.map((item, i)=><div className={`transcript-turn turn-${item.kind}`} key={item.who + i}><span className="turn-label">{item.kind === "agent" ? <WandSparkles size={12}/> : item.kind === "tool" ? <Check size={12}/> : <span className="person-dot"/>}{item.who}</span><p>{item.text}</p></div>)}
          </div>
          <div className="call-controls"><button className="advance-call" onClick={() => setTurn(isEnd ? 0 : turn + 1)}>{isEnd ? <><RotateCcw size={15}/> REPLAY FLOW</> : <>NEXT TURN <ArrowRight size={15}/></>}</button><span>illustrative conversation · no audio recorded</span></div>
          <div className="call-bottom"><span>NEHAHR <b>·</b> SCREENING ASSISTANT</span><span>BUILT FOR THE NEXT STEP</span></div>
        </div>

        <div className="voice-side-notes">
          <div className="voice-architecture"><div className="side-label"><span>THE CONVERSATION LOOP</span><span>01 — 04</span></div><h3>Every turn has<br/>a little choreography.</h3><div className="voice-loop">{[["01","Listen","Speech + intent"],["02","Understand","Context + state"],["03","Take action","Tools + checks"],["04","Respond","Voice + handoff"]].map(([n, title, detail], i)=><div className="loop-step" key={n}><span className="loop-number">{n}</span><span className="loop-copy"><b>{title}</b><small>{detail}</small></span>{i < 3 && <ArrowDown className="loop-arrow" size={14}/>}</div>)}</div><div className="loop-footer"><span>FAST, GROUNDED, INTERRUPTIBLE</span><span>↗</span></div></div>
          <div className="sticky-note"><span className="sticky-pin"/><span className="sticky-label">FIELD NOTE · 01</span><p>A pause is part of the conversation.<br/><em>Don’t rush to fill it.</em></p><div className="sticky-footer"><span>TURN TAKING &gt; TALKING</span><span>✳</span></div></div>
        </div>
      </div>

      <div className="voice-principles"><div className="principles-title"><span>MY BUILD CHECKLIST</span><p>Voice is unforgiving. I design for the awkward bits, too.</p></div><div className="principles-grid"><article><span>01</span><h3>Respond with purpose</h3><p>Get to a useful first response quickly. Keep context focused and let slow tools work without leaving dead air.</p><small><Check size={12}/> LATENCY IS A UX DECISION</small></article><article><span>02</span><h3>Let people interrupt</h3><p>Support natural turn-taking, corrections, and restarts. A caller should never have to wait for a monologue to finish.</p><small><Check size={12}/> THE USER OWNS THE FLOOR</small></article><article><span>03</span><h3>Prove the outcome</h3><p>Check the tool result before confirming a booking or action. Make failure clear, recover cleanly, and offer a human path.</p><small><Check size={12}/> MEASURE TASKS, NOT JUST CHAT</small></article></div></div>

      <div className="voice-work-strip"><span>BUILT ACROSS REAL WORK</span><div><b>Telephony builder</b><small>Tredence · client-facing, end to end</small></div><div><b>NehaHR</b><small>Outbound screening + interview scheduling</small></div><div><b>Meeting agent</b><small>SalesCode.ai · live voice + video</small></div><a href="#work">SEE THE PROJECTS <ArrowRight size={14}/></a></div>
    </section>
  );
}
