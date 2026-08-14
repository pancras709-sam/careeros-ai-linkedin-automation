import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, CheckCircle2, Award, Clock, Sparkles, Trophy, ArrowRight, Play, BookOpen, AlertCircle, RefreshCw, X, HelpCircle, FileText } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Aptitude' | 'Logical' | 'PseudoCode' | 'Coding';
}

interface CompanyTestPattern {
  id: string;
  name: string;
  logo: string;
  badgeColor: string;
  tagline: string;
  durationMinutes: number;
  totalQuestions: number;
  passPercentage: number;
  coinReward: number;
  xpReward: number;
  description: string;
  sections: string[];
  sampleQuestions: Question[];
}

const companyTestList: CompanyTestPattern[] = [
  {
    id: 'tcs-nqt',
    name: 'TCS NQT (National Qualifier Test)',
    logo: '🏢',
    badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    tagline: 'Foundation & Advanced Numerical, Verbal, Reasoning & Hands-on Coding',
    durationMinutes: 45,
    totalQuestions: 15,
    passPercentage: 75,
    coinReward: 150,
    xpReward: 300,
    description: 'Official TCS Ninja & Digital selection pattern covering Foundation Aptitude, Advanced Logical Reasoning, and Hands-on C/Python coding.',
    sections: ['Numerical Ability', 'Verbal Ability', 'Reasoning', 'Hands-on Coding'],
    sampleQuestions: [
      {
        id: 'tcs-q1',
        question: 'A train 150 meters long passes a telegraph post in 12 seconds. Find the speed of the train in km/hr.',
        options: ['45 km/hr', '50 km/hr', '54 km/hr', '60 km/hr'],
        correctIndex: 0,
        explanation: 'Speed = Distance / Time = 150 / 12 = 12.5 m/s. Convert to km/hr: 12.5 * (18 / 5) = 45 km/hr. Option A is 45 km/hr.',
        category: 'Aptitude',
      },
      {
        id: 'tcs-q2',
        question: 'What will be the output of the following C code snippet?\nint main() { int x = 5; printf("%d %d %d", ++x, x++, ++x); return 0; }',
        options: ['6 6 8', '7 6 6', 'Undefined Behavior due to sequence point', '8 6 6'],
        correctIndex: 2,
        explanation: 'Modifying a variable multiple times without an intervening sequence point results in Undefined Behavior in C standard.',
        category: 'PseudoCode',
      },
      {
        id: 'tcs-q3',
        question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
        options: ['125', '127', '128', '131'],
        correctIndex: 1,
        explanation: 'Each number is multiplied by 2 and added by 1: (63 * 2) + 1 = 127.',
        category: 'Logical',
      },
    ],
  },
  {
    id: 'cognizant-genc',
    name: 'Cognizant GenC & Elevate Assessment',
    logo: '💼',
    badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    tagline: 'Quantitative, Analytical & Automata Fix Debugging Test',
    durationMinutes: 40,
    totalQuestions: 12,
    passPercentage: 70,
    coinReward: 150,
    xpReward: 300,
    description: 'Cognizant campus hiring round evaluating Quantitative Aptitude, Automata Fix syntax debugging, and SQL queries.',
    sections: ['Quantitative Ability', 'English Usage', 'Automata Fix Debugging', 'SQL Queries'],
    sampleQuestions: [
      {
        id: 'cog-q1',
        question: 'Find the bug in this code snippet intended to find the sum of array elements:\nfor (int i=0; i<=n; i++) { sum += arr[i]; }',
        options: ['Loop index out of bounds (should be i < n)', 'sum is not returned', 'arr[i] should be arr[i+1]', 'Syntax error in for loop'],
        correctIndex: 0,
        explanation: 'Array indices range from 0 to n-1. Accessing arr[n] causes an out-of-bounds error.',
        category: 'PseudoCode',
      },
      {
        id: 'cog-q2',
        question: 'Which SQL statement selects all records from "Employees" where Department is "IT" and Salary > 50000?',
        options: [
          'SELECT * FROM Employees WHERE Department = "IT" AND Salary > 50000;',
          'GET * FROM Employees WHERE Department = IT;',
          'SELECT ALL Employees WHERE Salary OVER 50000;',
          'SEARCH Employees WHERE Department IS "IT";'
        ],
        correctIndex: 0,
        explanation: 'Standard SQL SELECT query with WHERE clause filtering multiple conditions.',
        category: 'Coding',
      },
    ],
  },
  {
    id: 'zoho-coding',
    name: 'Zoho Advanced Coding & Systems Round',
    logo: '🔴',
    badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    tagline: 'C/C++ Pointers, Memory Management, Recursion & Complex Algorithms',
    durationMinutes: 60,
    totalQuestions: 10,
    passPercentage: 80,
    coinReward: 200,
    xpReward: 400,
    description: 'Rigorous technical round tested by Zoho. Focuses on low-level pointer arithmetic, array manipulation without external libraries, and system logic.',
    sections: ['C/C++ Pointers', 'Recursion & Strings', 'Matrix Algorithms', 'Data Structure Design'],
    sampleQuestions: [
      {
        id: 'zoho-q1',
        question: 'What is the output of: char *p = "ZohoCorp"; printf("%c", *(p + 4));',
        options: ['C', 'o', 'r', 'p'],
        correctIndex: 0,
        explanation: 'In string "ZohoCorp", index 0 is Z, 1 is o, 2 is h, 3 is o, and 4 is C. Thus *(p + 4) evaluates to character "C".',
        category: 'PseudoCode',
      },
      {
        id: 'zoho-q2',
        question: 'What is the space complexity of an in-place Matrix Rotation (90 degrees clock-wise)?',
        options: ['O(1) Auxiliary Space', 'O(N^2)', 'O(N)', 'O(log N)'],
        correctIndex: 0,
        explanation: 'In-place matrix transpose followed by row reversal modifies the input 2D array directly using O(1) auxiliary space.',
        category: 'Coding',
      },
    ],
  },
  {
    id: 'accenture-tech',
    name: 'Accenture Cognitive & Technical Assessment',
    logo: '💜',
    badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    tagline: 'Cognitive Ability, Technical Pseudo Code, Cloud & Security Basics',
    durationMinutes: 35,
    totalQuestions: 12,
    passPercentage: 70,
    coinReward: 150,
    xpReward: 300,
    description: 'Multi-stage assessment covering Cognitive Ability, Pseudo Code evaluation, and Cloud/Network fundamentals.',
    sections: ['Cognitive Ability', 'Technical Pseudocode', 'Cloud Fundamentals', 'Network Security'],
    sampleQuestions: [
      {
        id: 'acc-q1',
        question: 'Evaluate Pseudocode:\nSet integer a = 12, b = 5\na = a XOR b\nb = a XOR b\na = a XOR b\nWhat are final values of (a, b)?',
        options: ['(5, 12)', '(12, 5)', '(17, 7)', '(0, 0)'],
        correctIndex: 0,
        explanation: 'Three consecutive XOR operations swap two variables without an extra temporary variable.',
        category: 'PseudoCode',
      },
      {
        id: 'acc-q2',
        question: 'Which HTTP response code indicates that a resource was successfully created on a server?',
        options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
        correctIndex: 1,
        explanation: 'HTTP status 201 Created signifies successful creation of a server resource.',
        category: 'Coding',
      },
    ],
  },
];

export const CompanyTestsView: React.FC = () => {
  const { addToast, addXP, addCoins, triggerConfetti } = useApp();

  const [selectedTest, setSelectedTest] = useState<CompanyTestPattern | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; percentage: number; passed: boolean } | null>(null);

  const handleStartTest = (test: CompanyTestPattern) => {
    setSelectedTest(test);
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const handleAnswerSelect = (qId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitTest = () => {
    if (!selectedTest) return;

    let correctCount = 0;
    selectedTest.sampleQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / selectedTest.sampleQuestions.length) * 100);
    const passed = percentage >= selectedTest.passPercentage;

    setScoreResult({ score: correctCount, percentage, passed });
    setIsSubmitted(true);

    if (passed) {
      triggerConfetti();
      addCoins(selectedTest.coinReward, `Passed ${selectedTest.name}!`);
      addXP(selectedTest.xpReward, `Completed Company Assessment`);
      addToast('Assessment Passed! 🎉', `Score: ${percentage}%. Earned ${selectedTest.coinReward} Coins!`, 'success');
    } else {
      addToast('Assessment Submitted', `Score: ${percentage}%. Try again to earn coins!`, 'warning');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-10">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Company Hiring Practice Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Company-Specific Placement Tests (TCS, Cognizant, Zoho, Accenture)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Practice actual aptitude, pseudo-code, C/C++ pointers, and technical debugging patterns used by top recruitment drives. Pass tests to earn LeetCode Coins & XP!
          </p>
        </div>
      </div>

      {/* Grid of Company Tests */}
      {!selectedTest && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyTestList.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-3xl border border-white/10 bg-zinc-950/70 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                      {test.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">
                        {test.name}
                      </h3>
                      <p className="text-xs text-zinc-400">{test.tagline}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{test.description}</p>

                {/* Section Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {test.sections.map((sec, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-300 text-[10px] font-mono">
                      • {sec}
                    </span>
                  ))}
                </div>

                {/* Meta stats */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs text-center">
                    <span className="text-[10px] text-zinc-500 block font-mono">Time</span>
                    <span className="font-bold text-white">{test.durationMinutes} mins</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs text-center">
                    <span className="text-[10px] text-zinc-500 block font-mono">Reward</span>
                    <span className="font-bold text-amber-400">🪙 {test.coinReward} Coins</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs text-center">
                    <span className="text-[10px] text-zinc-500 block font-mono">Cutoff</span>
                    <span className="font-bold text-emerald-400">{test.passPercentage}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartTest(test)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 font-extrabold text-xs text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Start Practice Assessment</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ACTIVE TEST SIMULATOR */}
      {selectedTest && (
        <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl space-y-8 relative shadow-2xl">
          <button
            onClick={() => setSelectedTest(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Test Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${selectedTest.badgeColor}`}>
                {selectedTest.name} Assessment Mode
              </span>
              <h2 className="text-2xl font-black mt-1">{selectedTest.name}</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-amber-400 font-mono font-bold">
                <Clock className="w-4 h-4" />
                <span>{selectedTest.durationMinutes}:00 Remaining</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-bold">
                <span>🪙 +{selectedTest.coinReward} Coins on Passing</span>
              </div>
            </div>
          </div>

          {/* Question Stepper */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(selectedTest?.sampleQuestions || []).map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeQuestionIndex === idx
                      ? 'bg-amber-500 text-black'
                      : isAnswered
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/30'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white'
                  }`}
                >
                  Q{idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Box */}
          {selectedTest.sampleQuestions[activeQuestionIndex] && (
            <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                  {selectedTest.sampleQuestions[activeQuestionIndex].category} Section
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Question {activeQuestionIndex + 1} of {selectedTest.sampleQuestions.length}
                </span>
              </div>

              <h3 className="text-base font-bold text-white whitespace-pre-wrap leading-relaxed">
                {selectedTest.sampleQuestions[activeQuestionIndex].question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {(selectedTest.sampleQuestions[activeQuestionIndex]?.options || []).map((opt, optIdx) => {
                  const qId = selectedTest.sampleQuestions[activeQuestionIndex]?.id;
                  const isSelected = selectedAnswers[qId] === optIdx;
                  const isCorrect = selectedTest.sampleQuestions[activeQuestionIndex]?.correctIndex === optIdx;

                  let optStyle = 'bg-zinc-900 border-white/10 hover:border-amber-500/50 text-zinc-300';
                  if (isSelected) {
                    optStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold';
                  }
                  if (isSubmitted) {
                    if (isCorrect) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswerSelect(qId, optIdx)}
                      disabled={isSubmitted}
                      className={`p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/5 font-mono text-[10px] flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/30 text-xs space-y-1">
                  <span className="font-bold text-amber-400 block font-mono">💡 Official Solution Explanation</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedTest.sampleQuestions[activeQuestionIndex].explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Test Navigation & Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-xs font-bold text-zinc-400 disabled:opacity-40"
            >
              ← Previous Question
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-extrabold text-xs text-white shadow-lg shadow-emerald-500/20 transition-all"
              >
                Submit Complete Assessment
              </button>
            ) : (
              <button
                onClick={() => setSelectedTest(null)}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 font-bold text-xs text-white"
              >
                Back to Tests Overview
              </button>
            )}

            <button
              onClick={() => setActiveQuestionIndex((prev) => Math.min(selectedTest.sampleQuestions.length - 1, prev + 1))}
              disabled={activeQuestionIndex === selectedTest.sampleQuestions.length - 1}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-xs font-bold text-zinc-400 disabled:opacity-40"
            >
              Next Question →
            </button>
          </div>

          {/* Score Result Banner */}
          {scoreResult && (
            <div className={`p-6 rounded-2xl border text-center space-y-2 ${
              scoreResult.passed ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-rose-950/40 border-rose-500/40'
            }`}>
              <h3 className="text-2xl font-black">
                {scoreResult.passed ? '🎉 Assessment Passed!' : 'Needs Improvement'}
              </h3>
              <p className="text-xs text-zinc-300">
                You scored {scoreResult.score} / {selectedTest.sampleQuestions.length} ({scoreResult.percentage}%).
              </p>
              {scoreResult.passed && (
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                  🪙 +{selectedTest.coinReward} LeetCode Coins Credited to Account!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
