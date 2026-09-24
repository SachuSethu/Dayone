// src/components/tools/SlackTool.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, Hash, Lock, Bot, AtSign, Smile, Paperclip } from 'lucide-react';

export default function SlackTool({ role, simulationEvents = [], onSendMessage }) {
  const [channels, setChannels] = useState(() => {
    if (role.id === 'frontend') {
      return [
        { id: 'fe-sprint', name: 'frontend-sprint', isPrivate: false, unread: 0 },
        { id: 'incidents', name: 'incidents-prod', isPrivate: false, unread: 1 },
        { id: 'dm-lead', name: 'sarah-lin (Lead)', isPrivate: true, unread: 0 }
      ];
    } else if (role.id === 'cybersecurity') {
      return [
        { id: 'soc-war', name: 'soc-war-room', isPrivate: false, unread: 1 },
        { id: 'sec-ops', name: 'sec-ops', isPrivate: false, unread: 0 },
        { id: 'dm-lead', name: 'marcus-reyes (CISO)', isPrivate: true, unread: 0 }
      ];
    } else {
      return [
        { id: 'design-crit', name: 'design-critique', isPrivate: false, unread: 1 },
        { id: 'voc', name: 'voice-of-customer', isPrivate: false, unread: 0 },
        { id: 'dm-lead', name: 'elena-rostova (Lead)', isPrivate: true, unread: 0 }
      ];
    }
  });

  const [activeChannelId, setActiveChannelId] = useState(channels[0].id);
  const [inputMessage, setInputMessage] = useState('');
  
  // Messages per channel
  const [messages, setMessages] = useState(() => {
    const initial = {};
    channels.forEach(ch => {
      initial[ch.id] = [
        {
          id: `m-init-${ch.id}`,
          sender: { name: role.aiLead.name, avatar: role.aiLead.avatar, role: role.aiLead.title },
          timestamp: '14:00',
          text: ch.isPrivate 
            ? `Direct channel opened with ${role.aiLead.name}. Reach out here or in AI Lead tool anytime you need unblocking.`
            : `Sprint thread initiated for ${role.name} simulation. Keep all status updates synced here.`
        }
      ];
    });
    return initial;
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannelId]);

  // Ingest simulation events into messages
  useEffect(() => {
    if (!simulationEvents.length) return;
    const latestEvent = simulationEvents[simulationEvents.length - 1];
    
    // Add to appropriate channel
    const targetChannel = channels.find(c => latestEvent.channel?.includes(c.name.split('-')[0])) || channels[0];
    
    const newMsg = {
      id: `evt-${Date.now()}`,
      sender: latestEvent.sender || { name: 'System Bot', avatar: '🤖', role: 'Alert Webhook' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: latestEvent.content,
      badge: latestEvent.badge
    };

    setMessages(prev => ({
      ...prev,
      [targetChannel.id]: [...(prev[targetChannel.id] || []), newMsg]
    }));
  }, [simulationEvents]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: { name: 'You (Candidate)', avatar: '👤', role: role.shortName },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputMessage
    };

    setMessages(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), userMsg]
    }));

    if (onSendMessage) {
      onSendMessage(inputMessage, activeChannelId);
    }

    setInputMessage('');

    // Simulated quick teammate reaction or reply
    setTimeout(() => {
      const activeChannel = channels.find(c => c.id === activeChannelId);
      const isLeadChannel = activeChannel?.isPrivate;

      const replyMsg = {
        id: `reply-${Date.now()}`,
        sender: isLeadChannel 
          ? { name: role.aiLead.name, avatar: role.aiLead.avatar, role: role.aiLead.title }
          : { name: 'Teammate Kai', avatar: '👨‍💼', role: 'Team Member' },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: isLeadChannel 
          ? `Acknowledged. Focus on verifying your solution with the automated checks before opening the PR.`
          : `Thanks for the update. Monitoring the dashboards on my end.`
      };

      setMessages(prev => ({
        ...prev,
        [activeChannelId]: [...(prev[activeChannelId] || []), replyMsg]
      }));
    }, 1500);
  };

  const currentChannel = channels.find(c => c.id === activeChannelId) || channels[0];
  const activeMessages = messages[activeChannelId] || [];

  return (
    <div className="slack-container">
      {/* Slack Sidebar */}
      <div className="slack-sidebar">
        <div className="slack-team-header">
          <div className="team-avatar">D1</div>
          <div className="team-meta">
            <span className="team-name">DayOne Workspace</span>
            <span className="team-status">● {role.shortName} Sprint</span>
          </div>
        </div>

        <div className="slack-nav-section">
          <span className="section-title">Channels</span>
          <div className="channels-list">
            {channels.filter(c => !c.isPrivate).map(ch => (
              <button 
                key={ch.id}
                className={`slack-channel-btn ${activeChannelId === ch.id ? 'active' : ''}`}
                onClick={() => setActiveChannelId(ch.id)}
              >
                <Hash size={14} />
                <span>{ch.name}</span>
                {ch.unread > 0 && <span className="unread-dot"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="slack-nav-section">
          <span className="section-title">Direct Messages</span>
          <div className="channels-list">
            {channels.filter(c => c.isPrivate).map(ch => (
              <button 
                key={ch.id}
                className={`slack-channel-btn ${activeChannelId === ch.id ? 'active' : ''}`}
                onClick={() => setActiveChannelId(ch.id)}
              >
                <span className="channel-avatar-sm">{role.aiLead.avatar}</span>
                <span>{ch.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slack Chat Area */}
      <div className="slack-chat-area">
        {/* Channel Header */}
        <div className="slack-chat-header">
          <div className="flex-row items-center gap-2">
            {currentChannel.isPrivate ? <Lock size={16} /> : <Hash size={16} />}
            <span className="channel-title-text">{currentChannel.name}</span>
          </div>
          <span className="channel-topic-text">
            Topic: {role.name} incident mitigation & sprint coordination
          </span>
        </div>

        {/* Message Stream */}
        <div className="slack-messages-stream">
          {activeMessages.map(msg => (
            <div key={msg.id} className="slack-msg-row">
              <div className="slack-msg-avatar">{msg.sender.avatar}</div>
              <div className="slack-msg-body">
                <div className="slack-msg-meta">
                  <span className="slack-msg-author">{msg.sender.name}</span>
                  <span className="slack-msg-role">{msg.sender.role}</span>
                  <span className="slack-msg-time">{msg.timestamp}</span>
                  {msg.badge && <span className="slack-msg-badge">{msg.badge}</span>}
                </div>
                <div className="slack-msg-text">{msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Slack Input Box */}
        <form className="slack-input-form" onSubmit={handleSend}>
          <div className="slack-input-wrapper">
            <input 
              type="text"
              placeholder={`Message #${currentChannel.name}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="slack-send-btn" disabled={!inputMessage.trim()}>
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
