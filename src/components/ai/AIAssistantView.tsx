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
  Lightbulb
} from 'lucide-react';

export const AIAssistantView: React.FC = () => {
  const { user, documents, skills, projects, internships, certifications, achievements, setPreviewDoc } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_init',
      sender: 'ai',
      text: `Hello ${user.name}! I am your MemoryVerse AI Knowledge Assistant. I have indexed your complete academic & professional vault including your VSB Engineering College ECE degree, Infosys Springboard & NPTEL certifications, 3 internships, and IoT & Full-Stack projects. What would you like to explore or generate today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'What are my strongest skills?',
        'Show my IoT & WhatsApp Agriculture project.',
        'Which internships have I completed?',
        'Summarize my academic journey & certifications.',
        'Suggest resume improvements for Full-Stack ECE role.',
        'Generate my professional summary.'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
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

    // Context-aware RAG Engine for Dineshkumar M
    setTimeout(() => {
      let responseText = '';
      let contextDocs: string[] = [];
      const lower = query.toLowerCase();

      if (lower.includes('skill') || lower.includes('strongest')) {
        responseText = `Based on your verified credentials and project reports, your top competencies are:\n\n` +
          `• **Full Stack Web Development**: Angular, Node.js, Express.js, MySQL, HTML5, CSS3, JavaScript (Verified via Infosys Springboard & Neuro Global Internship)\n` +
          `• **Embedded Systems & IoT**: Embedded C, Arduino IDE, Microcontrollers, Sensors Interfacing, MATLAB (Verified via Manfree Technologies & WhatsApp Agriculture Project)\n` +
          `• **Data Analytics & Programming**: Python, C, C++, Java, Data Analytics (Verified via NPTEL IIT Madras Certification)`;
        contextDocs = ['doc_cert_infosys_01', 'doc_cert_nptel_py', 'doc_intern_neuro'];
      } else if (lower.includes('agri') || lower.includes('whatsapp') || lower.includes('iot') || lower.includes('project')) {
        responseText = `Here are your major engineering projects:\n\n` + 
          `1. **WhatsApp Agriculture Monitoring System**: Developed an Arduino-based smart agriculture IoT project integrated with a WhatsApp bot for automated land moisture updates and smart farming efficiency.\n\n` +
          `2. **SkillBridge NGO Platform**: Web platform connecting volunteers with NGOs for opportunity matching and social event tracking.\n\n` +
          `3. **CAREER BRIDGE WEB APPLICATION**: Centralized Student Record Management System built with Angular, Node.js, Express.js, and MySQL.`;
        contextDocs = ['doc_proj_agri', 'doc_proj_cb'];
      } else if (lower.includes('intern') || lower.includes('tneb') || lower.includes('manfree') || lower.includes('neuro')) {
        responseText = `You have completed 3 practical internships:\n\n` +
          `1. **Neuro Global (Online Internship)**: 1-Month Full Stack Development creating responsive web applications with Angular, Express.js, and MySQL.\n` +
          `2. **Manfree Technologies – Coimbatore**: Practical training in Embedded C, Arduino, sensors interfacing, and circuit design.\n` +
          `3. **Tamil Nadu Electricity Board (TNEB) - Karur**: In-plant training in substation electrical operations, power distribution, and transformer systems.`;
        contextDocs = ['doc_intern_neuro', 'doc_intern_manfree', 'doc_intern_tneb'];
      } else if (lower.includes('academic') || lower.includes('cert') || lower.includes('nptel') || lower.includes('infosys')) {
        responseText = `**Academic & Certification Profile for Dineshkumar M**:\n\n` +
          `• **Degree**: B.E. Electronics & Communication Engineering at VSB Engineering College, Karur (CGPA: 7.7)\n` +
          `• **Certifications**:\n` +
          `  - Infosys Springboard: Angular Full Stack Certification\n` +
          `  - NPTEL / IIT Madras: Data Analytics with Python\n` +
          `  - NPTEL / IIT Kharagpur: Computer Networks and Internet Protocol\n` +
          `• **Achievements**: 1st Place in Inter-College Ideathon, 3rd Prize in Hackathon, State Level NCSC Participant.`;
        contextDocs = ['doc_res_dinesh', 'doc_cert_infosys_01', 'doc_cert_nptel_py', 'doc_cert_nptel_cn'];
      } else if (lower.includes('resume') || lower.includes('improvement')) {
        responseText = `**Resume Optimization Recommendations for Dineshkumar M**:\n\n` +
          `✅ **Key Strengths**: Unique dual-domain expertise bridging ECE Embedded Systems (Arduino/IoT) with Full-Stack Web Development (Angular/Node/MySQL).\n\n` +
          `💡 **Enhancement Tips**:\n` +
          `1. Highlight your 1st Place Inter-College Ideathon win at the top of your achievements.\n` +
          `2. Mention live GitHub demo links for CareerBridge and WhatsApp Agriculture Monitoring bot.\n` +
          `3. Target roles in IoT Full-Stack Development, Embedded Software Engineering, or Frontend Angular Development.`;
      } else {
        responseText = `I searched Dineshkumar M's vault across ${documents.length} verified documents, ${skills.length} extracted skills, and ${projects.length} projects.\n\nYour profile demonstrates high proficiency in Angular, Embedded C, Node.js, Python, and IoT systems. You hold 3 certifications (Infosys & NPTEL) and 3 completed internships.`;
        contextDocs = documents.slice(0, 3).map(d => d.id);
      }

      const aiMsg: ChatMessage = {
        id: 'msg_' + Date.now(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextDocIds: contextDocs
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col soft-3d-panel overflow-hidden animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="px-6 py-4 bg-[#080b11]/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              MemoryVerse AI RAG Knowledge Assistant <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Verified Dineshkumar Vault</span>
            </h2>
            <p className="text-xs text-slate-400">Indexed over {documents.length} credentials & {skills.length} extracted skills</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2.5 rounded-2xl soft-3d-button-secondary text-slate-400 hover:text-white"
          title="Reset Chat Session"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

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
                  <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider">Referenced Credentials:</span>
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
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="soft-3d-card p-3.5 rounded-2xl text-xs text-slate-400 animate-pulse">
              Searching Dineshkumar M's credential vectors...
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
            placeholder="Ask AI anything about Dineshkumar M's projects, certifications, or internships..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 soft-3d-input rounded-2xl px-4 py-3 text-xs text-slate-200 placeholder-slate-400"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl soft-3d-button text-white text-xs font-extrabold shadow-lg flex items-center gap-2"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
