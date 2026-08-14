import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Code, Trophy, Sparkles, Play, CheckCircle2, Flame, Award, ShoppingBag, Coins, RefreshCw, Terminal, Search, Star, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: string;
  coinReward: number;
  xpReward: number;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  initialCode: {
    javascript: string;
    python: string;
    cpp: string;
  };
  testCases: Array<{ input: string; expected: string }>;
}

const sampleProblems: Problem[] = [
  {
    id: 'lc-1',
    title: '1. Two Sum Target Index',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '49.2%',
    coinReward: 50,
    xpReward: 100,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input would have exactly one solution.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1, 2]' }
    ],
    initialCode: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def twoSum(nums, target):\n    prevMap = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[n] = i\n    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i=0; i<nums.size(); i++) {\n        int complement = target - nums[i];\n        if(mp.count(complement)) return {mp[complement], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`
    },
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]' },
      { input: '[3,2,4], 6', expected: '[1,2]' }
    ]
  },
  {
    id: 'lc-2',
    title: '53. Maximum Subarray Sum (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptanceRate: '50.4%',
    coinReward: 100,
    xpReward: 200,
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' }
    ],
    initialCode: {
      javascript: `function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}`,
      python: `def maxSubArray(nums):\n    maxSub = nums[0]\n    curSum = 0\n    for n in nums:\n        if curSum < 0:\n            curSum = 0\n        curSum += n\n        maxSub = max(maxSub, curSum)\n    return maxSub`,
      cpp: `int maxSubArray(vector<int>& nums) {\n    int maxSum = nums[0], curSum = 0;\n    for(int n : nums) {\n        if(curSum < 0) curSum = 0;\n        curSum += n;\n        maxSum = max(maxSum, curSum);\n    }\n    return maxSum;\n}`
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }
    ]
  },
  {
    id: 'lc-3',
    title: '146. LRU Cache Implementation',
    difficulty: 'Hard',
    category: 'System Design & Data Structures',
    acceptanceRate: '41.8%',
    coinReward: 200,
    xpReward: 350,
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with get and put operations in O(1) time complexity.',
    examples: [
      { input: 'LRUCache capacity = 2; put(1, 1); put(2, 2); get(1); // returns 1', output: 'Success (O(1) Hash Doubly LinkedList)' }
    ],
    initialCode: {
      javascript: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}`,
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            val = self.cache.pop(key)\n            self.cache[key] = val\n            return val\n        return -1\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.pop(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            first = next(iter(self.cache))\n            del self.cache[first]`,
      cpp: `// LRUCache C++ Implementation`
    },
    testCases: [
      { input: 'capacity=2, get(1), put(3,3)', expected: 'All Test Cases Passed [O(1)]' }
    ]
  }
];

const rewardsStore = [
  { id: 'r1', title: 'Top 1% LeetCoder Badge', cost: 300, icon: '🏆', category: 'Profile Badge' },
  { id: 'r2', title: 'Google Mock Interview Pass', cost: 500, icon: '🎟️', category: 'Interview Credit' },
  { id: 'r3', title: 'Resume Express Referral Boost', cost: 750, icon: '🚀', category: 'Placement Boost' },
];

export const CodingContestView: React.FC = () => {
  const { studentProfile, addCoins, addXP, addToast, triggerConfetti } = useApp();

  const [activeTab, setActiveTab] = useState<'arena' | 'store' | 'leaderboard'>('arena');
  const [selectedProblem, setSelectedProblem] = useState<Problem>(sampleProblems[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const [code, setCode] = useState(sampleProblems[0].initialCode.javascript);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>(['lc-1']);

  const handleSelectProblem = (prob: Problem) => {
    setSelectedProblem(prob);
    setCode(prob.initialCode[selectedLanguage]);
    setConsoleOutput(null);
  };

  const handleLanguageChange = (lang: 'javascript' | 'python' | 'cpp') => {
    setSelectedLanguage(lang);
    setCode(selectedProblem.initialCode[lang]);
  };

  const handleRunCode = () => {
    setIsRunningTests(true);
    setConsoleOutput('Executing solution against test cases...');

    setTimeout(() => {
      setIsRunningTests(false);
      setConsoleOutput(`[INFO] Compiling code with V8 Node.js Runtime...\n\n[SUCCESS] Test Case 1 Passed! (2ms)\n[SUCCESS] Test Case 2 Passed! (1ms)\n\nRuntime: Beats 94.8% of submissions.\nMemory Usage: 42.1 MB.`);
      addToast('Test Cases Passed!', 'Your solution produces correct outputs.', 'success');
    }, 1200);
  };

  const handleSubmitSolution = () => {
    setIsRunningTests(true);
    setConsoleOutput('Submitting solution to LeetCode Contest Judge...');

    setTimeout(() => {
      setIsRunningTests(false);
      setConsoleOutput(`[ACCEPTED] All 48/48 Hidden Test Cases Passed!\n\nRuntime: 54 ms (Beats 98.2%)\nMemory: 44.2 MB\nCoins Earned: +${selectedProblem.coinReward} Coins 🪙`);

      if (!solvedProblemIds.includes(selectedProblem.id)) {
        setSolvedProblemIds((prev) => [...prev, selectedProblem.id]);
        addCoins(selectedProblem.coinReward, `Accepted Solution for ${selectedProblem.title}`);
        addXP(selectedProblem.xpReward, `Solved ${selectedProblem.difficulty} Problem`);
        triggerConfetti();
      } else {
        addToast('Already Solved', 'You re-submitted a solved problem.', 'info');
      }
    }, 1500);
  };

  const handlePurchaseReward = (item: typeof rewardsStore[0]) => {
    if (studentProfile.coins < item.cost) {
      addToast('Insufficient Coins', `You need ${item.cost} Coins. Current: ${studentProfile.coins}`, 'warning');
      return;
    }

    addCoins(-item.cost, `Redeemed ${item.title}`);
    triggerConfetti();
    addToast('Reward Redeemed! 🎉', `Unlocked ${item.title}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-10">
      {/* View Header with Coin Balance */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> Weekly LeetCode Arena & Contests
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Solve LeetCode Problems & Earn Contest Coins
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Write code in JavaScript, Python, or C++. Pass test cases, rank on global leaderboards, and redeem your coins for mock interview passes & referral badges.
          </p>
        </div>

        {/* User Coin Display Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-zinc-900 border border-amber-500/30 flex items-center gap-4 shrink-0 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
            🪙
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase block">Your Coin Balance</span>
            <span className="text-2xl font-black text-amber-400">{studentProfile.coins || 0} Coins</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('arena')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'arena'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4 text-blue-400" />
          <span>Coding Arena</span>
        </button>

        <button
          onClick={() => setActiveTab('store')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'store'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Coins Store & Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-purple-400" />
          <span>Contest Leaderboard</span>
        </button>
      </div>

      {/* TAB 1: CODING ARENA */}
      {activeTab === 'arena' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Problem Selector List (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
              Contest Problem Set ({sampleProblems.length})
            </h3>

            <div className="space-y-3">
              {sampleProblems.map((prob) => {
                const isSelected = selectedProblem.id === prob.id;
                const isSolved = solvedProblemIds.includes(prob.id);

                return (
                  <button
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all space-y-2 relative overflow-hidden ${
                      isSelected
                        ? 'bg-zinc-900 border-blue-500 shadow-xl'
                        : 'bg-zinc-950/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        prob.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        prob.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {prob.difficulty}
                      </span>

                      {isSolved && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{prob.title}</h4>
                    
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                      <span>{prob.category}</span>
                      <span className="text-amber-400 font-bold">🪙 +{prob.coinReward} Coins</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Code Workspace (Right 8 cols) */}
          <div className="lg:col-span-8 space-y-6 bg-zinc-950/90 p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
            {/* Header / Language selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                  {selectedProblem.category}
                </span>
                <h2 className="text-xl font-black mt-0.5">{selectedProblem.title}</h2>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900 border border-white/10">
                {(['javascript', 'python', 'cpp'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                      selectedLanguage === lang ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-4">
              <p className="text-xs text-zinc-300 leading-relaxed">{selectedProblem.description}</p>

              {/* Examples */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Sample Example</span>
                {(selectedProblem?.examples || []).map((ex, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs font-mono space-y-1">
                    <div><span className="text-zinc-500">Input:</span> <span className="text-zinc-200">{ex.input}</span></div>
                    <div><span className="text-zinc-500">Output:</span> <span className="text-emerald-400 font-bold">{ex.output}</span></div>
                    {ex.explanation && <div><span className="text-zinc-500">Explanation:</span> <span className="text-zinc-400">{ex.explanation}</span></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Editor Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Interactive Editor ({selectedLanguage})</span>
                </span>
                <span className="text-amber-400 font-bold">Reward: +{selectedProblem.coinReward} Coins</span>
              </div>

              <textarea
                rows={10}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-white/10 text-xs font-mono text-emerald-300 focus:outline-none focus:border-blue-500 shadow-inner"
              />
            </div>

            {/* Controls: Run & Submit */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleRunCode}
                disabled={isRunningTests}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-bold text-white flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
                <span>Run Test Cases</span>
              </button>

              <button
                onClick={handleSubmitSolution}
                disabled={isRunningTests}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-black text-xs text-white flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Submit Solution</span>
              </button>
            </div>

            {/* Console Output Window */}
            {consoleOutput && (
              <div className="p-4 rounded-2xl bg-black border border-white/10 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed shadow-2xl">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-white/10 pb-2 mb-2 font-bold uppercase">
                  <span>Judge Output Console</span>
                  <span className="text-emerald-400">V8 Sandbox Active</span>
                </div>
                {consoleOutput}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COIN STORE & REWARDS */}
      {activeTab === 'store' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewardsStore.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl border border-amber-500/30 bg-zinc-950/80 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-amber-400"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{item.title}</h3>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-base font-black text-amber-400">🪙 {item.cost} Coins</span>
                  <button
                    onClick={() => handlePurchaseReward(item)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20"
                  >
                    Redeem Reward
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTEST LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl space-y-6 shadow-2xl">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Global LeetCode Contest Leaderboard</span>
          </h2>

          <div className="space-y-3">
            {[
              { rank: 1, name: 'Alex Chen', university: 'Stanford / IIT Delhi', coins: 1450, solved: 42, badge: '🥇 Winner' },
              { rank: 2, name: 'Priya Sharma', university: 'BITS Pilani', coins: 1200, solved: 38, badge: '🥈 Rank 2' },
              { rank: 3, name: 'Rohan Mehta', university: 'IIT Bombay', coins: 980, solved: 31, badge: '🥉 Rank 3' },
              { rank: 4, name: 'Sarah Jenkins', university: 'MIT', coins: 850, solved: 27, badge: 'Top 10' },
            ].map((user) => (
              <div
                key={user.rank}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 font-mono font-bold text-amber-400 text-base">#{user.rank}</span>
                  <div>
                    <span className="font-bold text-white text-sm block">{user.name}</span>
                    <span className="text-zinc-400 text-[11px]">{user.university}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-zinc-400 font-mono">{user.solved} Solved</span>
                  <span className="font-black text-amber-400 font-mono text-sm">🪙 {user.coins} Coins</span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                    {user.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
