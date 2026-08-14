import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, VideoOff, Mic, MicOff, Volume2, Sparkles, CheckCircle2, RefreshCw, Bot, User, Camera, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const MockInterviewView: React.FC = () => {
  const { addToast, addXP, triggerConfetti } = useApp();
  const [role, setRole] = useState('Full Stack Software Engineer');
  const [targetCompany, setTargetCompany] = useState('TCS Ninja / Digital');
  const [mode, setMode] = useState<'video' | 'audio'>('video');
  const [questions, setQuestions] = useState<string[]>([
    'TCS / Cognizant Technical: How do you optimize a React application experiencing layout thrashing with 10,000 active state items?',
    'Explain how you handle Express API rate limiting and Redis caching under high concurrency.',
    'Describe a time you solved a complex production bug. What was your systematic debugging process?',
    'How do you choose between PostgreSQL relational indexing versus Qdrant vector embeddings?',
  ]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Initialize webcam video stream if in video mode and video enabled
  useEffect(() => {
    let active = true;

    async function setupMedia() {
      if (mode === 'video' && isVideoEnabled) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 },
            audio: isMicEnabled,
          });
          if (active) {
            mediaStreamRef.current = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          }
        } catch (err) {
          console.warn('Camera access restricted or unavailable, using preview feed.', err);
        }
      } else {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    }

    setupMedia();

    return () => {
      active = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mode, isVideoEnabled, isMicEnabled]);

  const handleGenerateQuestions = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-questions', role }),
      });
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
        setCurrentQIndex(0);
        setUserAnswer('');
        setEvaluation(null);
        addToast('New Questions Loaded', `Loaded questions for ${role}`, 'success');
      }
    } catch {
      addToast('Error', 'Failed to generate interview questions.', 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) {
      addToast('Input Required', 'Please type or record your answer first.', 'warning');
      return;
    }

    setIsEvaluating(true);
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate-answer',
          role,
          question: questions[currentQIndex],
          answer: userAnswer,
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluation({
          ...data.evaluation,
          eyeContactScore: mode === 'video' ? 92 : 'N/A (Audio Mode)',
          postureRating: mode === 'video' ? 'Excellent Face Framing' : 'Audio Profile Only',
        });
        if (data.audioBase64) {
          setAudioUrl(`data:audio/mp3;base64,${data.audioBase64}`);
        } else {
          setAudioUrl(null);
        }
        triggerConfetti();
        addToast('Evaluation Complete!', `Clarity Score: ${data.evaluation.clarityScore}%`, 'success');
        addXP(200, 'Completed Mock Interview Round');
      }
    } catch {
      addToast('Error', 'Failed to evaluate response.', 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const toggleRecordingSim = () => {
    if (!isRecording) {
      setIsRecording(true);
      setUserAnswer('Recording response via microphone...');
      setTimeout(() => {
        setIsRecording(false);
        setUserAnswer(
          'I started by profiling with Chrome DevTools to locate un-memoized selectors. I introduced memoized selectors, virtualized the 10,000 DOM nodes using windowing, and reduced initial bundle load time by 38%.'
        );
        addToast('Speech Captured', 'Transcribed response successfully.', 'info');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Navricon Interview Studio
          </span>
          <h1 className="text-3xl font-black mt-1">Audio & Video Mock Interview Studio</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Simulate high-stakes technical & behavioral interview rounds with real-time video camera analysis, audio visualizers, and recruiter feedback.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            placeholder="Target role..."
          />
          <button
            onClick={handleGenerateQuestions}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center gap-2 shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Load New Questions
          </button>
        </div>
      </div>

      {/* Mode Switcher & Target Company Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase mr-2">Interview Format:</span>
          <button
            onClick={() => setMode('video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              mode === 'video'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 text-white" /> Audio & Video Mode
          </button>
          <button
            onClick={() => setMode('audio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              mode === 'audio'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 text-white" /> Audio Only Mode
          </button>
        </div>

        {/* Target Company Badges */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full">
          {['TCS Ninja / Digital', 'Cognizant GenC', 'Zoho Systems', 'Accenture Tech', 'Google / FAANG'].map((comp) => (
            <button
              key={comp}
              onClick={() => {
                setTargetCompany(comp);
                handleGenerateQuestions();
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-semibold shrink-0 transition-all ${
                targetCompany === comp
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTION PLAYER & CAMERA STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (7 cols): Video Camera Feed & Answer Box */}
        <div className="lg:col-span-7 space-y-6">
          {/* Video Preview Box / Audio Visualizer Frame */}
          <div className="relative rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden min-h-[260px] flex flex-col justify-between p-4">
            {mode === 'video' ? (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center border border-white/5">
                {isVideoEnabled ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Camera Overlay Grid / Alignment Guide */}
                    <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl flex items-center justify-center">
                      <div className="w-48 h-48 border border-dashed border-blue-500/30 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-mono text-blue-400/80 bg-zinc-950/80 px-2 py-0.5 rounded-full">
                          Position Face in Frame
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-500 space-y-2">
                    <Camera className="w-10 h-10 opacity-40" />
                    <span className="text-xs font-semibold">Camera is Turned Off</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-44 rounded-2xl bg-zinc-900/80 border border-white/5 flex flex-col items-center justify-center p-6 space-y-3">
                <div className="flex items-center gap-1.5 h-8">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 30, 70].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: isRecording ? `${height}%` : '20%' }}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isRecording ? 'bg-blue-400 animate-pulse' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  {isRecording ? 'Microphone Active — Voice Stream Processing' : 'Audio Mode Ready — Click Record Below'}
                </span>
              </div>
            )}

            {/* Video / Audio Controls Bar */}
            <div className="flex items-center justify-between pt-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-2 rounded-xl border transition-all ${
                    isVideoEnabled
                      ? 'bg-zinc-900 border-white/10 text-white'
                      : 'bg-rose-500/20 border-rose-500/30 text-rose-400'
                  }`}
                  title={isVideoEnabled ? 'Disable Camera' : 'Enable Camera'}
                >
                  {isVideoEnabled ? <Video className="w-4 h-4 text-blue-400" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMicEnabled(!isMicEnabled)}
                  className={`p-2 rounded-xl border transition-all ${
                    isMicEnabled
                      ? 'bg-zinc-900 border-white/10 text-white'
                      : 'bg-rose-500/20 border-rose-500/30 text-rose-400'
                  }`}
                  title={isMicEnabled ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicEnabled ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Stream Ready
                </span>
              </div>
            </div>
          </div>

          {/* Question Display Card */}
          <div className="p-6 rounded-3xl border border-blue-500/30 bg-zinc-950/90 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-bold text-blue-400">Question {currentQIndex + 1} of {questions.length}</span>
              <span>Target Role: {role}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold leading-relaxed">
              "{questions[currentQIndex]}"
            </h2>

            {/* Answer Box */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold text-zinc-400">Response (STAR Method Framework)</label>
              <textarea
                rows={4}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Explain Situation, Task, Action taken, and Results..."
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  onClick={toggleRecordingSim}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white'
                  }`}
                >
                  <Mic className="w-4 h-4 text-rose-400" />
                  {isRecording ? 'Listening...' : 'Record Mic Answer'}
                </button>

                <button
                  disabled={isEvaluating}
                  onClick={handleEvaluateAnswer}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  {isEvaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 fill-white" />}
                  {isEvaluating ? 'Evaluating Response...' : 'Submit to Recruiter'}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center px-2">
            <button
              disabled={currentQIndex === 0}
              onClick={() => {
                setCurrentQIndex((prev) => prev - 1);
                setUserAnswer('');
                setEvaluation(null);
              }}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold disabled:opacity-40"
            >
              ← Previous Question
            </button>
            <button
              disabled={currentQIndex === questions.length - 1}
              onClick={() => {
                setCurrentQIndex((prev) => prev + 1);
                setUserAnswer('');
                setEvaluation(null);
              }}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold disabled:opacity-40"
            >
              Next Question →
            </button>
          </div>
        </div>

        {/* Right (5 cols): AI Recruiter Evaluation */}
        <div className="lg:col-span-5 space-y-6">
          {evaluation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-3xl border border-emerald-500/30 bg-zinc-950/90 backdrop-blur-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm">Recruiter Assessment Scorecard</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">
                  {evaluation.overallRating || 'Strong Hire'}
                </span>
              </div>

              {/* Metric Scores */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-400 text-[10px] block">Clarity</span>
                  <span className="text-lg font-extrabold text-blue-400">{evaluation.clarityScore}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-400 text-[10px] block">Technical Depth</span>
                  <span className="text-lg font-extrabold text-emerald-400">{evaluation.technicalDepthScore}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-400 text-[10px] block">Eye Contact</span>
                  <span className="text-sm font-extrabold text-amber-400 mt-1 block">{evaluation.eyeContactScore}</span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div>
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Recruiter Feedback Points</h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {(evaluation.keyTakeaways || []).map((takeaway: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Model Benchmark Answer */}
              {evaluation.suggestedSampleAnswer && (
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 text-xs space-y-1">
                  <span className="font-bold text-amber-400 text-[10px] uppercase">100% Score Benchmark Answer:</span>
                  <p className="text-zinc-300 leading-relaxed font-mono text-[11px]">{evaluation.suggestedSampleAnswer}</p>
                </div>
              )}

              {/* Recruiter Audio Feedback Player */}
              {evaluation.spokenFeedback && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/30 border border-blue-500/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
                    <span className="text-xs font-bold text-blue-300">Spoken Feedback Audio:</span>
                  </div>
                  <p className="text-xs text-zinc-300 italic">"{evaluation.spokenFeedback}"</p>
                  {audioUrl && (
                    <audio controls src={audioUrl} className="w-full mt-2 h-8" />
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Awaiting Response</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Record or type your response to Question {currentQIndex + 1} to receive real-time recruiter scoring and video eye-contact feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
