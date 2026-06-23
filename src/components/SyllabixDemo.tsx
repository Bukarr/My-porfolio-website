/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, FolderOpen, CheckCircle, Search, Download, FileText, ChevronRight, GraduationCap } from 'lucide-react';

interface SyllabusCourse {
  code: string;
  title: string;
  units: number;
  description: string;
  topics: string[];
  materials: { title: string; type: 'Book' | 'Past Question' | 'Lecture Notes'; url: string }[];
}

const COMPUTER_SCIENCE_SYLLABUS: Record<string, SyllabusCourse[]> = {
  '100': [
    {
      code: 'CSC 101',
      title: 'Introduction to Computer Science',
      units: 3,
      description: 'Historical developmental highlights of computers, hardware structure, numbering system, algorithms, flowcharts and basic programming constructs.',
      topics: ['History of Computing', 'Binary & Hexadecimal Arithmetic', 'Introduction to Algorithms', 'Basic Flowcharts'],
      materials: [
        { title: 'Foundations of Computer Science (Aho & Ullman)', type: 'Book', url: '#' },
        { title: 'CSC 101 Past Questions Pack (2021-2024)', type: 'Past Question', url: '#' },
      ],
    },
    {
      code: 'CSC 102',
      title: 'Introduction to Programming (Python)',
      units: 3,
      description: 'Syntax and semantics of programming languages, variables, control flows, loops, functions, lists, dictionary and basic object concepts.',
      topics: ['Variables & Operators', 'Conditional Branching', 'Functions and Call Stacks', 'File I/O Operations'],
      materials: [
        { title: 'Python Crash Course (Eric Matthes)', type: 'Book', url: '#' },
        { title: 'CSC 102 Python Assignment Outlines', type: 'Lecture Notes', url: '#' },
      ],
    },
  ],
  '200': [
    {
      code: 'CSC 201',
      title: 'Computer Programming I (Java/C++)',
      units: 3,
      description: 'Object-oriented programming concepts including classes, objects, inheritance, polymorphism, encapsulation, and exception handling.',
      topics: ['Object Oriented Paradigm', 'Inheritance & Subtyping', 'Abstract Classes & Interfaces', 'Exception Handling Schemes'],
      materials: [
        { title: 'Java: The Complete Reference (Herbert Schildt)', type: 'Book', url: '#' },
        { title: 'OOP Concepts Cheat Sheet', type: 'Lecture Notes', url: '#' },
      ],
    },
    {
      code: 'CSC 202',
      title: 'Data Structures and Algorithms',
      units: 4,
      description: 'Analysis of algorithms, time and space complexity, arrays, lists, stacks, queues, trees, searching and sorting techniques.',
      topics: ['Big O Notation', 'Linked Lists & Dynamic Stacks', 'Binary Search Trees (BST)', 'Sorting Speed Benchmarks'],
      materials: [
        { title: 'Introduction to Algorithms (CLRS)', type: 'Book', url: '#' },
        { title: 'DSA past papers with explanations', type: 'Past Question', url: '#' },
      ],
    },
  ],
  '300': [
    {
      code: 'CSC 301',
      title: 'Systems Programming & Operating Systems',
      units: 3,
      description: 'Process management, processor scheduling, memory management, virtual memory, files and operating system structures.',
      topics: ['Processes & Threads', 'Scheduling Algorithms (SJF, RR)', 'Semaphore & Deadlocks', 'Paging & Memory Virtualization'],
      materials: [
        { title: 'Operating System Concepts (Silberschatz)', type: 'Book', url: '#' },
        { title: 'CSC 301 Midterm Practicum Papers', type: 'Past Question', url: '#' },
      ],
    },
    {
      code: 'CSC 305',
      title: 'Database Design & Management (SQL)',
      units: 3,
      description: 'Relational algebra, SQL syntax, normal forms, entity-relationship diagrams, transaction management and constraints.',
      topics: ['Entity Relationship Diagrams', '1NF, 2NF, 3NF Normalization', 'Advanced SQL Joins', 'ACID Transactions & Logs'],
      materials: [
        { title: 'Database System Concepts (Korth)', type: 'Book', url: '#' },
        { title: 'SQL Practical Lab workbook v2', type: 'Lecture Notes', url: '#' },
      ],
    },
  ],
};

const DEPARTMENTS = [
  { id: 'csc', name: 'Computer Science', icon: GraduationCap },
  { id: 'eee', name: 'Electrical Eng.', icon: BookOpen },
];

export default function SyllabixDemo() {
  const [selectedDept, setSelectedDept] = useState('csc');
  const [selectedLevel, setSelectedLevel] = useState('200');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTopics, setCompletedTopics] = useState<string[]>(['History of Computing', 'Variables & Operators']);
  const [activeCourseCode, setActiveCourseCode] = useState<string | null>('CSC 202');

  const toggleTopic = (topic: string) => {
    if (completedTopics.includes(topic)) {
      setCompletedTopics(completedTopics.filter(t => t !== topic));
    } else {
      setCompletedTopics([...completedTopics, topic]);
    }
  };

  const levels = ['100', '200', '300'];

  const courses = COMPUTER_SCIENCE_SYLLABUS[selectedLevel] || [];
  const filteredCourses = courses.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCourseDetails = courses.find(c => c.code === activeCourseCode) || filteredCourses[0] || courses[0];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl w-full p-4 md:p-6 overflow-hidden backdrop-blur-md glass-panel emerald-card-glow transition-all duration-300" id="syllabix-module">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            <h3 className="text-xl font-display font-bold text-white tracking-wide">Syllabix Study Companion</h3>
          </div>
          <p className="text-xs text-slate-400">
            Interactive student curriculum portal featuring syllabus analytics and resource index sheets
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search syllabus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input rounded-lg text-xs py-2 pl-9 pr-4 focus:outline-none text-white font-sans"
            id="syllabix-search"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar selection controls */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Department Select */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f0a0] block mb-2">
              School / major
            </span>
            <div className="flex flex-col gap-2">
              {DEPARTMENTS.map(d => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDept(d.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                      selectedDept === d.id
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-[#00f0a0]'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10'
                    }`}
                    id={`dept-tab-${d.id}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{d.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Selection Tabs */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f0a0] block mb-2">
              Level Bracket
            </span>
            <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
              {levels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    const list = COMPUTER_SCIENCE_SYLLABUS[lvl] || [];
                    if (list.length > 0) {
                      setActiveCourseCode(list[0].code);
                    }
                  }}
                  className={`py-2 px-1 rounded-lg text-2xs font-mono font-medium tracking-wider transition-all text-center cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-emerald-500/20 text-[#00f0a0] border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                  id={`level-button-${lvl}`}
                >
                  {lvl} LVL
                </button>
              ))}
            </div>
          </div>

          {/* Course List within level */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f0a0] block mb-2">
              Active Curriculum Courses
            </span>
            <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1 text-slate-300">
              {filteredCourses.map(c => (
                <button
                  key={c.code}
                  onClick={() => setActiveCourseCode(c.code)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    (activeCourseCode === c.code || (!activeCourseCode && selectedCourseDetails?.code === c.code))
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-[#00f0a0]'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/10'
                  }`}
                  id={`course-tab-${c.code}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-2xs font-bold">{c.code}</span>
                    <span className="text-3xs bg-white/5 border border-white/5 text-slate-400 px-1.5 py-0.5 rounded">
                      {c.units} Units
                    </span>
                  </div>
                  <div className="text-3xs truncate font-medium text-slate-400 group-hover:text-slate-200">
                    {c.title}
                  </div>
                </button>
              ))}
              {filteredCourses.length === 0 && (
                <div className="text-center py-4 text-3xs text-slate-500 bg-white/2 rounded-lg border border-dashed border-white/10">
                  No courses match your query
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Details Panel representing dynamic detail viewing of selected course syllabus */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {selectedCourseDetails ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col gap-4 h-full backdrop-blur-sm">
              
              {/* Header Title Information */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs bg-emerald-555/20 text-[#00f0a0] border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                      {selectedCourseDetails.code}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      • Core Compulsory Syllabus
                    </span>
                  </div>
                  <h4 className="text-base font-display font-bold text-white">
                    {selectedCourseDetails.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-3xs text-slate-400 font-mono bg-white/5 border border-white/10 px-2 py-1.5 rounded">
                    {selectedCourseDetails.units} Academic Units
                  </span>
                  <button
                    onClick={() => alert(`Beginning mock download for outline of ${selectedCourseDetails.code}...`)}
                    className="p-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-emerald-400 text-slate-400 transition-all cursor-pointer"
                    title="Download Course Outline (PDF)"
                    id="download-syllabix-pdf"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Description body */}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#00f0a0] block mb-1.5">
                  Course Description & Objectives
                </span>
                <p className="text-2xs leading-relaxed text-slate-300">
                  {selectedCourseDetails.description}
                </p>
              </div>

              {/* Syllabus Topic Checksheet (Simulation of syllabus coverage tracker) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00f0a0] block">
                    Interactive Curriculum Progress Coverage
                  </span>
                  <span className="text-[9px] text-[#00f0a0] font-mono">
                    {Math.round((selectedCourseDetails.topics.filter(t => completedTopics.includes(t)).length / selectedCourseDetails.topics.length) * 100)}% covered
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#020502]/40 border border-white/10 p-2.5 rounded-xl">
                  {selectedCourseDetails.topics.map(topic => {
                    const isChecked = completedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`p-2 rounded-lg border text-left text-2xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-580/20 border-emerald-500/30 text-emerald-305'
                            : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300 hover:border-white/5'
                        }`}
                        id={`topic-toggle-${topic.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <span className="truncate">{topic}</span>
                        <CheckCircle className={`h-3.5 w-3.5 shrink-0 ${isChecked ? 'text-emerald-400' : 'text-slate-800'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Reading list download section */}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#00f0a0] block mb-2">
                  Archived Study Materials & Past Papers
                </span>
                <div className="flex flex-col gap-2">
                  {selectedCourseDetails.materials.map((mat, i) => (
                    <div 
                      key={i} 
                      className="p-2 border border-white/5 bg-[#020502]/40 rounded-lg flex items-center justify-between text-2xs cursor-pointer hover:border-white/10 hover:bg-white/5 transition-all font-sans"
                      onClick={() => alert(`Opening resource: ${mat.title}`)}
                      id={`material-resource-${i}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 truncate">{mat.title}</span>
                      </div>
                      <span className="text-3xs bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 px-2 py-0.5 rounded shrink-0">
                        {mat.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <FolderOpen className="h-8 w-8 text-slate-655 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Pick a course from the curriculum on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
