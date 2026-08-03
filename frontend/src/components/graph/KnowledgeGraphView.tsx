import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GraphNode, GraphEdge, NodeType } from '../../types';
import { 
  Network, 
  Sparkles, 
  FileText, 
  Cpu, 
  Briefcase, 
  Building2, 
  Award, 
  Trophy, 
  ExternalLink, 
  Filter, 
  ZoomIn, 
  ZoomOut,
  Layers
} from 'lucide-react';

export const KnowledgeGraphView: React.FC = () => {
  const { nodes, edges, documents, setPreviewDoc } = useApp();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(nodes[0] || null);
  const [filterType, setFilterType] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [animFrame, setAnimFrame] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Color Palette
  const nodeColors: Record<NodeType, { inner: string; outer: string; glow: string }> = {
    document: { inner: '#60a5fa', outer: '#1d4ed8', glow: 'rgba(59, 130, 246, 0.4)' },
    skill: { inner: '#fde047', outer: '#ca8a04', glow: 'rgba(234, 179, 8, 0.4)' },
    project: { inner: '#c084fc', outer: '#7e22ce', glow: 'rgba(168, 85, 247, 0.4)' },
    internship: { inner: '#67e8f9', outer: '#0e7490', glow: 'rgba(6, 182, 212, 0.4)' },
    certificate: { inner: '#6ee7b7', outer: '#047857', glow: 'rgba(16, 185, 129, 0.4)' },
    achievement: { inner: '#f472b6', outer: '#be185d', glow: 'rgba(236, 72, 153, 0.4)' }
  };

  const filteredNodes = nodes.filter(n => filterType === 'All' || n.type === filterType.toLowerCase() || n.category === filterType);

  // Animation Loop for 3D Flowing Connection Particles
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setAnimFrame(prev => (prev + 1) % 100);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Render 3D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.save();
    ctx.scale(zoomLevel, zoomLevel);

    // Draw 3D Edges & Flow Particles
    edges.forEach(edge => {
      const sourceNode = filteredNodes.find(n => n.id === edge.source);
      const targetNode = filteredNodes.find(n => n.id === edge.target);

      if (sourceNode && targetNode && sourceNode.x && sourceNode.y && targetNode.x && targetNode.y) {
        // Line gradient
        const lineGrad = ctx.createLinearGradient(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y);
        lineGrad.addColorStop(0, 'rgba(129, 140, 248, 0.35)');
        lineGrad.addColorStop(1, 'rgba(192, 132, 252, 0.35)');

        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        // 3D Flow particle along edge
        const t = ((animFrame / 100) + (sourceNode.x % 10) / 10) % 1;
        const px = sourceNode.x + (targetNode.x - sourceNode.x) * t;
        const py = sourceNode.y + (targetNode.y - sourceNode.y) * t;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#818cf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Edge label badge
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.75)';
        ctx.textAlign = 'center';
        ctx.fillText(edge.relationship.replace(/_/g, ' '), midX, midY - 4);
      }
    });

    // Draw 3D Shaded Sphere Nodes
    filteredNodes.forEach(node => {
      if (!node.x || !node.y) return;

      const isSelected = selectedNode?.id === node.id;
      const palette = nodeColors[node.type] || { inner: '#818cf8', outer: '#4338ca', glow: 'rgba(99, 102, 241, 0.4)' };
      const radius = isSelected ? 24 : 19;

      // Glow Ring for Selected Node
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 12, 0, Math.PI * 2);
        ctx.fillStyle = palette.glow;
        ctx.fill();
      }

      // 3D Sphere Radial Shading
      const grad = ctx.createRadialGradient(
        node.x - radius * 0.3,
        node.y - radius * 0.3,
        radius * 0.1,
        node.x,
        node.y,
        radius
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, palette.inner);
      grad.addColorStop(1, palette.outer);

      // Node Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 6;

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Node Text Label
      ctx.font = `${isSelected ? 'bold 11px' : '500 10px'} Plus Jakarta Sans, sans-serif`;
      ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + radius + 15);
    });

    ctx.restore();

  }, [filteredNodes, edges, selectedNode, zoomLevel, animFrame]);

  // Click handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / zoomLevel;
    const clickY = (e.clientY - rect.top) / zoomLevel;

    const clicked = filteredNodes.find(node => {
      if (!node.x || !node.y) return false;
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      return Math.sqrt(dx * dx + dy * dy) <= 26;
    });

    if (clicked) {
      setSelectedNode(clicked);
    }
  };

  const connectedEdges = selectedNode ? edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id) : [];
  const connectedNodeIds = connectedEdges.map(e => e.source === selectedNode?.id ? e.target : e.source);
  const connectedNodes = nodes.filter(n => connectedNodeIds.includes(n.id));

  const linkedDoc = selectedNode?.docId ? documents.find(d => d.id === selectedNode.docId) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-indigo-400" /> 3D Knowledge Relationship Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Volumetric entity graph connecting Certificates ➔ Skills ➔ Projects ➔ Internships ➔ Career Pathway
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl soft-3d-panel">
          <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Filter:
          </span>
          {['All', 'Document', 'Skill', 'Project', 'Internship', 'Certificate', 'Achievement'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                filterType === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Canvas (8 Cols) & Sidebar (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Canvas Area (8 Cols) */}
        <div className="lg:col-span-8 soft-3d-panel rounded-3xl relative overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Controls Overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-xl">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
              className="p-2 rounded-xl soft-3d-button-secondary text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))}
              className="p-2 rounded-xl soft-3d-button-secondary text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2 rounded-xl soft-3d-button-secondary text-xs font-bold text-slate-300 px-3"
            >
              Reset
            </button>
          </div>

          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full min-h-[500px] cursor-crosshair bg-slate-950/60"
          />
        </div>

        {/* Selected Node Details Sidebar (4 Cols) */}
        <div className="lg:col-span-4 soft-3d-panel p-6 rounded-3xl space-y-5">
          {selectedNode ? (
            <div className="space-y-5 animate-in fade-in">
              
              <div className="pb-4 border-b border-white/10">
                <span className="text-[10px] px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold border border-indigo-500/30">
                  {selectedNode.type.toUpperCase()}
                </span>
                <h3 className="text-xl font-black text-white mt-2">{selectedNode.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedNode.details}</p>
              </div>

              {/* Connected Entity Links */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  Connected Graph Nodes ({connectedNodes.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {connectedNodes.map(cNode => (
                    <div
                      key={cNode.id}
                      onClick={() => setSelectedNode(cNode)}
                      className="p-3 rounded-2xl soft-3d-card cursor-pointer flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-100">{cNode.label}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 font-semibold border border-slate-700">
                        {cNode.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Document Proof */}
              {linkedDoc && (
                <div className="p-4 rounded-2xl soft-3d-card border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-400" /> Source Proof Document
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">{linkedDoc.fileType.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-white font-bold">{linkedDoc.title}</p>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{linkedDoc.extractedMetadata.summary}</p>
                  <button
                    onClick={() => setPreviewDoc(linkedDoc)}
                    className="w-full py-2.5 mt-2 rounded-xl soft-3d-button text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Inspect Extracted Metadata</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Network className="w-12 h-12 mx-auto text-indigo-400 mb-3 animate-pulse" />
              <p className="text-sm font-bold text-white">Click any node on the graph</p>
              <p className="text-xs text-slate-400 mt-1">Inspect connected certificates, skills & internship letters</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
