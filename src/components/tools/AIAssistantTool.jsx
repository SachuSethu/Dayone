// src/components/tools/AIAssistantTool.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, HelpCircle, CheckCircle, Lightbulb, User } from 'lucide-react';

export default function AIAssistantTool({ 
  role, 
  missionData, 
  workspaceState,
  onApplyHint,
  onAskQuestion
}) {
  const aiLead = role.aiLead;

  const [messages, setMessages] = useState([
    {
      id: 'ai-init',
      sender: 'ai',
      text: `Hello! I'm ${aiLead.name}, your ${aiLead.title}. I'm here to provide guidance and review your work during this sprint. What's on your mind?`,
      timestamp: '14:00'
    }
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Context-aware intelligent responses based on role and current state
  const generateLeadResponse = (query) => {
    const q = query.toLowerCase();

    if (role.id === 'frontend') {
      if (q.includes('payment method') || q.includes('same response') || q.includes('return the same')) {
        return "Good question. What would you check to verify that? Inspect the network payload or examine how state updates in `checkoutApi.js`. In real production systems, you want to verify if switching payment methods resets the idempotency key or leaves unresolved promises in flight.";
      }
      if (q.includes('hint') || q.includes('next') || q.includes('help')) {
        return "Look at `src/services/checkoutApi.js`. When the server returns a 504 status, `fetch` doesn't reject automatically—it resolves with `response.ok = false`. You need to check `response.ok`, throw a custom error, and wrap the call in a retry loop (e.g., up to 3 retries). Also inspect `calculateCartTotal` for floating point rounding.";
      }
      if (q.includes('test') || q.includes('failing')) {
        return "You can run `npm test` in the Dev Terminal. It runs our Vitest suite. Once you add exponential backoff retry and handle non-200 HTTP responses in `checkoutApi.js`, all 4 test assertions will turn green.";
      }
      if (q.includes('review') || q.includes('progress')) {
        const isPatched = workspaceState?.feCodePatched;
        if (isPatched) {
          return "Great work! Your patch in `checkoutApi.js` resolved the 504 gateway timeout and added decimal precision. Make sure you run `git status` or use the Git tool to verify your changes, then submit the mission for final evaluation.";
        } else {
          return "I see the bug is still reproducible. Check line 7 in `checkoutApi.js`. You'll want to implement retry logic before we open the pull request.";
        }
      }
      return `Good question regarding our frontend architecture. Remember that in production checkout flows, idempotency and user feedback are essential. When you test in the Live Browser preview, watch how the UI reacts to network latency.`;
    } 
    
    else if (role.id === 'cybersecurity') {
      if (q.includes('hint') || q.includes('next') || q.includes('help')) {
        return "Run a query in the SIEM Log Analyzer for `status:401`. You'll notice a massive cluster of requests coming from subnet `185.220.101.0/24`. Jump into the SOC Bastion Shell and execute `iptables -A INPUT -s 185.220.101.0/24 -j DROP` to cut off their access.";
      }
      if (q.includes('firewall') || q.includes('iptables') || q.includes('drop')) {
        return "Use `iptables -A INPUT -s 185.220.101.0/24 -j DROP` or run `quarantine-ip 185.220.101.0/24`. Once executed, check the Network Telemetry dashboard—you should see RPS drop back to our safe baseline of 140 req/sec.";
      }
      if (q.includes('review') || q.includes('progress')) {
        const isContained = workspaceState?.threatContained;
        if (isContained) {
          return "Excellent triage! The rogue subnet 185.220.101.0/24 is blocked and network RPS has normalized. Now log the IOC in the Incident Ticket (#SEC-942) and submit your investigation.";
        } else {
          return "Containment is not yet complete. The brute-force botnet is still hitting `/api/v1/auth` at ~2,800 RPS. Check the SIEM logs to find the IP subnet and drop it via the terminal.";
        }
      }
      return `In incident triage, precision is key. Make sure we don't accidentally block legitimate customer subnets while neutralizing this credential stuffing attack.`;
    }

    else { // UI/UX Designer
      if (q.includes('hint') || q.includes('next') || q.includes('help')) {
        return "Look at the User Feedback tool. Over 80% of negative sentiment is caused by surprise shipping fees at Step 3 and tiny tap targets on mobile. On the Design Canvas, switch to Variant B to see how transparent fee estimation and 48px touch targets resolve WCAG AA compliance.";
      }
      if (q.includes('variant') || q.includes('canvas')) {
        return "Variant B introduces upfront fee transparency, sticky progress indicators, and WCAG AA contrast (5.8:1 ratio). Click 'Inspect Component' on the canvas to compare touch target dimensions against Variant A.";
      }
      if (q.includes('review') || q.includes('progress')) {
        const isVariantB = workspaceState?.activeLayoutVariant === 'variant_b';
        if (isVariantB) {
          return "Variant B is a huge leap forward! It directly addresses the customer complaints in our research notes. Submit this revision for design critique signoff.";
        } else {
          return "We are still on the legacy Variant A layout which has severe accessibility and friction flaws. Inspect the Design Canvas and toggle to Variant B.";
        }
      }
      return `Design systems thrive on empathy and data. Keep the mobile user persona in mind—they need clarity, high contrast, and frictionless touch feedback.`;
    }
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    if (onAskQuestion) {
      onAskQuestion(query);
    }

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const responseText = generateLeadResponse(query);
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="ai-lead-tool-container">
      {/* Lead Profile Banner */}
      <div className="lead-banner">
        <div className="lead-profile-bubble">{aiLead.avatar}</div>
        <div className="lead-details">
          <div className="lead-name-row">
            <h4>{aiLead.name}</h4>
            <span className="lead-role-tag">{aiLead.title}</span>
            <span className="online-indicator">Active Mentor</span>
          </div>
          <p className="lead-bio-snippet">{aiLead.personality}</p>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="quick-prompts-bar">
        <button 
          className="quick-prompt-pill"
          onClick={() => handleSend("Does the API return the same response when the payment method changes?")}
        >
          <HelpCircle size={13} className="text-cyan" />
          <span>Ask: "Does API return same response when payment method changes?"</span>
        </button>

        <button 
          className="quick-prompt-pill"
          onClick={() => handleSend("Can you give me a hint on what to investigate next?")}
        >
          <Lightbulb size={13} className="text-warning" />
          <span>Ask for Strategic Hint</span>
        </button>

        <button 
          className="quick-prompt-pill"
          onClick={() => handleSend("Can you review my current work and progress?")}
        >
          <CheckCircle size={13} className="text-success" />
          <span>Review Current Progress</span>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="lead-chat-stream">
        {messages.map(msg => (
          <div key={msg.id} className={`lead-chat-bubble ${msg.sender === 'ai' ? 'from-ai' : 'from-user'}`}>
            <div className="bubble-header">
              <span className="bubble-author">
                {msg.sender === 'ai' ? `${aiLead.name}` : 'You (Candidate)'}
              </span>
              <span className="bubble-time">{msg.timestamp}</span>
            </div>
            <div className="bubble-body">{msg.text}</div>
          </div>
        ))}
        {isThinking && (
          <div className="lead-chat-bubble from-ai thinking">
            <Sparkles size={16} className="animate-spin text-accent" />
            <span>{aiLead.name} is typing feedback...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input */}
      <form 
        className="lead-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="lead-input-wrapper">
          <input 
            type="text"
            placeholder={`Ask ${aiLead.name.split(' ')[0]} anything about the mission...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="lead-send-btn" disabled={!input.trim()}>
            <Send size={15} />
          </button>
        </div>
      </form>
    </div>
  );
}
