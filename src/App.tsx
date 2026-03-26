import React, { useState } from 'react';
import { Sparkles, FileText, Code, Mail, ChevronRight, Loader2, RefreshCw, ArrowLeft, Send } from 'lucide-react';

const TASKS = [
  {
    id: 'email',
    title: 'Marketing Email',
    icon: Mail,
    description: 'Write high-converting emails without knowing copywriting.',
    fields: [
      { id: 'audience', label: 'Who is this for?', placeholder: 'e.g., Busy small business owners' },
      { id: 'product', label: 'What are you selling?', placeholder: 'e.g., A time-tracking app' },
      { id: 'tone', label: 'Desired tone?', placeholder: 'e.g., Professional but friendly' }
    ]
  },
  {
    id: 'code',
    title: 'Code Refactor',
    icon: Code,
    description: 'Optimize your code without crafting complex prompts.',
    fields: [
      { id: 'lang', label: 'Programming Language', placeholder: 'e.g., TypeScript' },
      { id: 'focus', label: 'Main Goal', placeholder: 'e.g., Improve readability and add comments' }
    ]
  },
  {
    id: 'blog',
    title: 'Blog Post',
    icon: FileText,
    description: 'Generate engaging articles structure and content.',
    fields: [
      { id: 'topic', label: 'Topic', placeholder: 'e.g., The future of remote work' },
      { id: 'takeaway', label: 'Key Takeaway', placeholder: 'e.g., Hybrid models are here to stay' }
    ]
  }
];

export default function App() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [result, setResult] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
    setAnswers({});
    setStep(0);
    setStatus('idle');
    setChatHistory([]);
  };

  const handleNext = () => {
    if (step < selectedTask.fields.length - 1) {
      setStep(step + 1);
    } else {
      submitTask();
    }
  };

  const submitTask = () => {
    setStatus('processing');
    setTimeout(() => {
      const simulatedResult = "# Your Optimized Result\n\nBased on your inputs, here is the generated content tailored exactly to your needs.\n\n**Key Focus:** " + (answers.focus || answers.topic || answers.audience || 'General Optimization') + "\n\nHere is the perfectly engineered response dynamically created from our advanced backend prompt translation. It skips the guesswork and gives you a direct, high-quality output immediately. \n\nYou didn't need to specify system instructions, negative constraints, or format tokens - ClearPath AI handled all of that complexity automatically.";
      setResult(simulatedResult);
      setChatHistory([{ role: 'assistant', content: "I've generated your result! Need any adjustments? Just let me know below." }]);
      setStatus('complete');
    }, 2000);
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const newChat = [...chatHistory, { role: 'user', content: chatInput }];
    setChatHistory(newChat);
    setChatInput('');
    
    setTimeout(() => {
      setChatHistory([...newChat, { role: 'assistant', content: "I've updated the result based on your feedback. The prompt was automatically re-engineered and applied." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-sans selection:bg-emerald-500/30">
      <nav className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Sparkles className="w-5 h-5 text-gray-950" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            ClearPath AI
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {!selectedTask ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-white">
                AI Results.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Without the Guesswork.</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Select a goal below. We'll ask a few simple questions and engineer the perfect prompt behind the scenes to get you exactly what you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {TASKS.map(task => {
                const Icon = task.icon;
                return (
                  <button
                    key={task.id}
                    onClick={() => handleTaskSelect(task)}
                    className="group relative text-left p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-100">{task.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {task.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : status === 'idle' ? (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
            <button
              onClick={() => setSelectedTask(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Goals
            </button>
            
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 ease-out"
                  style={{ width: (((step + 1) / selectedTask.fields.length) * 100) + '%' }}
                />
              </div>
              
              <div className="mb-10 mt-2">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <selectedTask.icon className="w-6 h-6" />
                  <span className="font-medium text-lg tracking-wide uppercase">{selectedTask.title}</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Step {step + 1} of {selectedTask.fields.length}</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-xl font-medium text-gray-200 mb-4">
                    {selectedTask.fields[step].label}
                  </label>
                  <input
                    autoFocus
                    type="text"
                    value={answers[selectedTask.fields[step].id] || ''}
                    onChange={e => setAnswers({ ...answers, [selectedTask.fields[step].id]: e.target.value })}
                    placeholder={selectedTask.fields[step].placeholder}
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-600"
                    onKeyDown={e => e.key === 'Enter' && answers[selectedTask.fields[step].id] && handleNext()}
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNext}
                    disabled={!answers[selectedTask.fields[step].id]}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-8 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    {step < selectedTask.fields.length - 1 ? 'Next Step' : 'Generate Output'}
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : status === 'processing' ? (
          <div className="flex flex-col items-center justify-center py-32 animate-in fade-in">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-emerald-500 blur-[40px] opacity-20 rounded-full animate-pulse" />
              <Loader2 className="w-20 h-20 text-emerald-500 animate-spin relative z-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Engineering the perfect prompt...</h2>
            <p className="text-xl text-gray-400 text-center max-w-md">
              Translating your simple answers into a complex expert-level AI instruction set.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
                  <Sparkles className="w-8 h-8 text-emerald-500" />
                  Your Result
                </h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-300 transition-all font-medium"
                >
                  <RefreshCw className="w-4 h-4" /> Start New Task
                </button>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl relative">
                <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-[600px] sticky top-24">
                <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                  <h3 className="font-bold flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    AI Assistant
                  </h3>
                  <p className="text-sm text-gray-400">Need tweaks? Just ask.</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                  <div className="flex items-center gap-2 bg-gray-950 border border-gray-700 rounded-xl p-1 pr-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleChatSubmit()}
                      placeholder="e.g., Make it shorter..."
                      className="flex-1 bg-transparent border-none px-3 py-2 text-sm focus:outline-none focus:ring-0 text-white placeholder:text-gray-500"
                    />
                    <button
                      onClick={handleChatSubmit}
                      disabled={!chatInput.trim()}
                      className="p-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
