import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  FileText, 
  RefreshCw, 
  Lightbulb,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  generateGeminiResponse, 
  getStoredApiKey, 
  setStoredApiKey, 
  getStoredCustomPrompt, 
  setStoredCustomPrompt 
} from '../../utils/geminiApi';

export const AIAssistantView: React.FC = () => {
  const { user, documents, skills, projects, internships, certifications, achievements, setPreviewDoc } = useApp();

  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);

  // Custom Gemini Prompt State
  const [customPrompt, setCustomPrompt] = useState(() => getStoredCustomPrompt());
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [promptSavedNotice, setPromptSavedNotice] = useState('');

  const handleSaveCustomPrompt = () => {
    setStoredCustomPrompt(customPrompt);
    setPromptSavedNotice('Custom Gemini Prompt saved successfully! Active for all AI responses.');
    setTimeout(() => setPromptSavedNotice(''), 3500);
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_init',
      sender: 'ai',
      text: `Hello ${user.name}! I am your MemoryVerse AI Placement & Career Growth Advisor. I have analyzed your complete academic & professional profile including your ${user.degree} degree at ${user.college} (Graduation: ${user.graduationYear}), ${certifications.length} verified certifications, ${internships.length} internships, and ${projects.length} engineering projects. How can I help boost your placement readiness today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'How do I prepare for Full Stack & IoT placement interviews?',
        'Analyze my career growth & target salary range.',
        'What questions will recruiters ask about my WhatsApp Agri IoT project?',
        'Suggest resume improvements for ECE & Full-Stack roles.',
        'Summarize my 9 certifications and 3 internships for recruiters.'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeModel, setActiveModel] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKey);
    setShowApiKeyInput(false);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    const contextData = { user, documents, skills, projects, certifications, internships };

    try {
      const response = await generateGeminiResponse(query, contextData, apiKey);
      
      const contextDocs = documents
        .filter(d => 
          query.toLowerCase().includes(d.category.toLowerCase()) || 
          d.skills?.some((s: string) => query.toLowerCase().includes(s.toLowerCase())) ||
          query.toLowerCase().includes(d.title.toLowerCase())
        )
        .slice(0, 3)
        .map(d => d.id);

      const aiMsg: ChatMessage = {
        id: 'msg_' + Date.now(),
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextDocIds: contextDocs.length > 0 ? contextDocs : documents.slice(0, 2).map(d => d.id)
      };

      setMessages(prev => [...prev, aiMsg]);
      if (response.isRealAi) {
        setActiveModel(response.modelUsed || 'Google Gemini 2.5');
      } else {
        setActiveModel(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col soft-3d-panel overflow-hidden animate-in fade-in duration-500">
      
      {/* Clean Top Header */}
      <div className="px-6 py-4 bg-[#080b11]/90 border-b border-white/10 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              MemoryVerse AI Assistant
            </h2>
            <p className="text-xs text-slate-400">Indexed {documents.length} credentials & {skills.length} extracted skills for {user.name}</p>
          </div>
        </div>
      </div>

      {/* Custom Prompt Drawer */}
      {showPromptEditor && (
        <div className="p-4 bg-purple-950/90 border-b border-purple-500/40 space-y-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-purple-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Gemini Agent Custom Prompt Editor
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Ready for your prompt
            </span>
          </div>

          <p className="text-xs text-purple-300">
            Paste or customize your prompt instructions below. When saved, Gemini will process all responses using your prompt guidelines:
          </p>

          {promptSavedNotice && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{promptSavedNotice}</span>
            </div>
          )}

          <textarea
            rows={4}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Paste your custom Gemini prompt instructions here..."
            className="w-full rounded-xl bg-slate-900 border border-purple-500/40 p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-400"
          />

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => { setCustomPrompt(''); setStoredCustomPrompt(''); setPromptSavedNotice('Custom prompt cleared. Default agent active.'); }}
              className="py-1.5 px-3 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
            >
              Clear Custom Prompt
            </button>
            <button
              onClick={handleSaveCustomPrompt}
              className="py-1.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold shadow-lg"
            >
              Save Custom Gemini Prompt
            </button>
          </div>
        </div>
      )}

      {/* API Key Modal / Drawer Bar */}
      {showApiKeyInput && (
        <div className="p-4 bg-indigo-950/90 border-b border-indigo-500/30 flex flex-wrap items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex-1 min-w-[280px]">
            <label className="block text-[11px] font-extrabold text-indigo-200 mb-1">
              Google Gemini API Key
            </label>
            <div className="relative flex items-center">
              <input
                type={showKeyText ? "text" : "password"}
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-[#080b11] text-white border border-indigo-500/40 rounded-xl px-3 py-2 pr-10 text-xs focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKeyText(!showKeyText)}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                {showKeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Key is stored securely in your local browser storage and used directly for Gemini 2.5 API requests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
            >
              Save Key
            </button>
            <button
              onClick={() => {
                setApiKey('');
                setStoredApiKey('');
              }}
              className="px-3 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 font-bold rounded-xl text-xs border border-red-500/30"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Chat Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-2.5 rounded-2xl shrink-0 ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40'
                : 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-2xl p-5 rounded-3xl text-xs leading-relaxed space-y-3 ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl'
                : 'soft-3d-card border border-white/10 text-slate-200 rounded-tl-none'
            }`}>
              
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Context Document Links */}
              {msg.contextDocIds && msg.contextDocIds.length > 0 && (
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider">Referenced Vault Items:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.contextDocIds.map(dId => {
                      const doc = documents.find(d => d.id === dId);
                      if (!doc) return null;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => setPreviewDoc(doc)}
                          className="text-[10px] px-2.5 py-1 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-mono transition-colors shadow-sm"
                        >
                          <FileText className="w-3 h-3" /> {doc.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Suggested Action Chips */}
              {msg.suggestedActions && (
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Quick Prompts:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {msg.suggestedActions.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="text-[11px] px-3 py-1.5 rounded-xl soft-3d-button-secondary text-indigo-300 font-semibold"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <span className="block text-[9px] text-slate-400 text-right font-mono">{msg.timestamp}</span>

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
              <Bot className="w-4 h-4 animate-spin text-purple-400" />
            </div>
            <div className="soft-3d-card p-3.5 rounded-2xl text-xs text-slate-400 animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-bounce" />
              {apiKey ? 'Generating response via Google Gemini API...' : 'Searching MemoryVerse RAG knowledge vault...'}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-[#080b11]/90 border-t border-white/10">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder={`Ask AI anything about ${user.name}'s skills, projects, certifications, or career advice...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 soft-3d-input rounded-2xl px-4 py-3 text-xs text-slate-200 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={isTyping}
            className="px-5 py-3 rounded-2xl soft-3d-button text-white text-xs font-extrabold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
