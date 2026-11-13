import {
  Activity, Archive, Blocks, BookOpen, Bot, BrainCircuit,
  ChartNoAxesCombined, Cloud, CloudCog, CloudUpload, CodeXml, Compass,
  Container, Database, Earth, GitBranch, Globe2, HardDrive, KeyRound,
  Layers3, LockKeyhole, MessageSquare, Network, RadioTower, RefreshCw,
  Route, Scale, SearchCheck, Server, ServerCog, ShieldCheck, Sparkles,
  Workflow, type LucideIcon,
} from 'lucide-react';

const saaIcons: LucideIcon[] = [
  Compass, KeyRound, Server, HardDrive, Scale, Database, Globe2,
  Layers3, Archive, LockKeyhole, Earth, HardDrive, MessageSquare,
  Container, CloudCog, ChartNoAxesCombined, Activity, ShieldCheck,
  Network, RefreshCw, Blocks, SearchCheck,
];

const sapIcons: LucideIcon[] = [
  Compass, KeyRound, Cloud, LockKeyhole, Network, Globe2, RadioTower,
  ServerCog, Route, Archive, HardDrive, Database, Container, CodeXml,
  Workflow, Earth, ChartNoAxesCombined, ShieldCheck, BrainCircuit,
  Bot, Blocks, GitBranch, Activity, Scale, CloudUpload, RefreshCw,
  SearchCheck, BookOpen,
];

const accents = ['#d88a30', '#8363d6', '#148fb6', '#b660b4', '#159d86', '#dcaa37'];

export function architectureModuleTile(course: 'saa' | 'sap', id: string) {
  const index = Number(id);
  const icons = course === 'saa' ? saaIcons : sapIcons;
  return {Icon: icons[index] ?? Sparkles, accent: accents[index % accents.length]};
}
