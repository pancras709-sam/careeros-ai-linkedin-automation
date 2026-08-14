import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Linkedin, Sparkles, Copy, RefreshCw, Send, CheckCircle2, Share2, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const LinkedInAIView: React.FC = () => {
  const { addToast, addXP, triggerConfetti } = useApp();
  const [topic, setTopic] = useState('Building a high-throughput Express & React 19 app with Navricon Engine');
  const [postType, setPostType] = useState<'project_launch' | 'learning_milestone' | 'recruiter_inmail'>('project_launch');
  const [tone, setTone] = useState('Inspirational & Technical');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<string>(
    `🚀 Excited to launch Navricon — an integrated career ecosystem platform built for CS students, startups, colleges, and recruiters!\n\n💡 Key Highlights:\n• Dedicated Portals for Students, Startups, Colleges, and Recruiters\n• Resume Upload with Instant Comprehensive Summary & ATS Scoring\n• Audio & Video Mock Interview Studio\n\nCheck it out below 👇\n#Navricon #React #TypeScript #TechCareer`
  );

  const handleGenerateLinkedIn = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, postType, tone }),
      });
      const data = await res.json();
      const content = data.data?.content || data.postContent || (data.data?.postTitle ? `${data.data.postTitle}\n\n${data.data.content}` : null);
      if (content) {
        setGeneratedPost(content);
        triggerConfetti();
        addToast('Post Generated!', 'Viral LinkedIn content created.', 'success');
        addXP(150, 'Generated LinkedIn Content');
      }
    } catch {
      addToast('Error', 'Failed to generate post.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    addToast('Copied to Clipboard!', 'Ready to paste on LinkedIn.', 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
            Personal Branding Engine
          </span>
          <h1 className="text-3xl font-black mt-1">LinkedIn AI Post & Outreach Generator</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Turn your technical projects, hackathon wins, and learning milestones into high-converting viral LinkedIn posts.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <Linkedin className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (5 cols): Generator Controls */}
        <div className="lg:col-span-5 p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl space-y-4 text-xs">
          <div>
            <label className="text-zinc-400 uppercase font-bold text-[10px]">Content Format</label>
            <div className="grid grid-cols-1 gap-2 mt-1">
              <button
                onClick={() => setPostType('project_launch')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  postType === 'project_launch'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold'
                    : 'bg-zinc-900 border-white/5 text-zinc-400'
                }`}
              >
                🚀 Technical Project Launch
              </button>
              <button
                onClick={() => setPostType('learning_milestone')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  postType === 'learning_milestone'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold'
                    : 'bg-zinc-900 border-white/5 text-zinc-400'
                }`}
              >
                🎓 Learning Milestone / Course Completion
              </button>
              <button
                onClick={() => setPostType('recruiter_inmail')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  postType === 'recruiter_inmail'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold'
                    : 'bg-zinc-900 border-white/5 text-zinc-400'
                }`}
              >
                📩 Recruiter Cold Outreach InMail
              </button>
            </div>
          </div>

          <div>
            <label className="text-zinc-400 uppercase font-bold text-[10px]">Topic or Project Details</label>
            <textarea
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              placeholder="Mention core tech stack, metrics, github repo link..."
            />
          </div>

          <div>
            <label className="text-zinc-400 uppercase font-bold text-[10px]">Tone of Voice</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Inspirational & Technical">Inspirational & Technical</option>
              <option value="Concise & Professional">Concise & Professional</option>
              <option value="Storytelling & Humblebrag">Storytelling & Humblebrag</option>
            </select>
          </div>

          <button
            disabled={isGenerating}
            onClick={handleGenerateLinkedIn}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all mt-4"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 fill-white" />}
            {isGenerating ? 'Drafting Post...' : 'Generate Viral Post'}
          </button>
        </div>

        {/* Right (7 cols): Live Post Preview */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-zinc-950/90 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-sm">Generated LinkedIn Draft</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Copy className="w-4 h-4" /> Copy Post Text
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap">
            {generatedPost}
          </div>
        </div>
      </div>
    </div>
  );
};
