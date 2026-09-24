// src/components/tools/designer/ProjectBoardTool.jsx
import React, { useState } from 'react';
import { Kanban, Plus, ChevronRight, CheckCircle2, Clock, User } from 'lucide-react';

const INITIAL_BOARD = {
  todo: [
    { id: 'b1', title: 'Synthesize customer interview notes on hidden fees', points: '3 pts', tag: 'Research' }
  ],
  in_progress: [
    { id: 'b2', title: 'Audit WCAG AA color contrast on checkout form buttons', points: '5 pts', tag: 'Accessibility' },
    { id: 'b3', title: 'Iterate Variant B with 48px touch targets and upfront pricing', points: '8 pts', tag: 'Prototyping' }
  ],
  review: [
    { id: 'b4', title: 'Present redesign rationale to Elena Rostova (Design Lead)', points: '5 pts', tag: 'Critique' }
  ],
  done: [
    { id: 'b5', title: 'Export Figma token specs for Engineering sprint', points: '3 pts', tag: 'Handoff' }
  ]
};

export default function ProjectBoardTool() {
  const [board, setBoard] = useState(INITIAL_BOARD);

  const moveCard = (cardId, fromCol, toCol) => {
    const card = board[fromCol].find(c => c.id === cardId);
    if (!card) return;

    setBoard(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
      [toCol]: [...prev[toCol], card]
    }));
  };

  return (
    <div className="project-board-container">
      {/* Board Header */}
      <div className="board-header-bar">
        <div className="flex-row items-center gap-2">
          <Kanban size={20} className="text-accent" />
          <h3 className="board-title">Sprint 18 Design Board: Mobile Checkout Revamp</h3>
        </div>
        <span className="badge-pill-xs">Orbit UI Design System</span>
      </div>

      {/* Kanban Columns Grid */}
      <div className="kanban-grid">
        {/* Col 1: Discovery */}
        <div className="kanban-col">
          <div className="col-top">
            <span className="col-label">Discovery & Research</span>
            <span className="col-count">{board.todo.length}</span>
          </div>
          <div className="cards-stack">
            {board.todo.map(card => (
              <div key={card.id} className="kanban-card">
                <span className="card-tag">{card.tag}</span>
                <h5 className="card-title">{card.title}</h5>
                <div className="card-meta">
                  <span className="points font-mono">{card.points}</span>
                  <button 
                    className="move-btn"
                    onClick={() => moveCard(card.id, 'todo', 'in_progress')}
                    title="Move to In Progress"
                  >
                    <span>Start</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: In Progress */}
        <div className="kanban-col">
          <div className="col-top">
            <span className="col-label">Active Wireframing</span>
            <span className="col-count">{board.in_progress.length}</span>
          </div>
          <div className="cards-stack">
            {board.in_progress.map(card => (
              <div key={card.id} className="kanban-card in-progress-card">
                <span className="card-tag">{card.tag}</span>
                <h5 className="card-title">{card.title}</h5>
                <div className="card-meta">
                  <span className="points font-mono">{card.points}</span>
                  <button 
                    className="move-btn"
                    onClick={() => moveCard(card.id, 'in_progress', 'review')}
                    title="Move to Critique"
                  >
                    <span>Submit</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Review */}
        <div className="kanban-col">
          <div className="col-top">
            <span className="col-label">Design Critique</span>
            <span className="col-count">{board.review.length}</span>
          </div>
          <div className="cards-stack">
            {board.review.map(card => (
              <div key={card.id} className="kanban-card review-card">
                <span className="card-tag">{card.tag}</span>
                <h5 className="card-title">{card.title}</h5>
                <div className="card-meta">
                  <span className="points font-mono">{card.points}</span>
                  <button 
                    className="move-btn"
                    onClick={() => moveCard(card.id, 'review', 'done')}
                    title="Approve & Handoff"
                  >
                    <span>Approve</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Done */}
        <div className="kanban-col">
          <div className="col-top">
            <span className="col-label">Eng Handoff</span>
            <span className="col-count">{board.done.length}</span>
          </div>
          <div className="cards-stack">
            {board.done.map(card => (
              <div key={card.id} className="kanban-card done-card">
                <span className="card-tag">{card.tag}</span>
                <h5 className="card-title">{card.title}</h5>
                <div className="card-meta">
                  <span className="points font-mono">{card.points}</span>
                  <span className="text-success flex-row items-center gap-1 text-xs">
                    <CheckCircle2 size={13} />
                    <span>Completed</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
