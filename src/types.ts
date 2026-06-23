/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  code: string;
  name: string;
  units: number;
  grade: string;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  year: string;
  highlights: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  rating: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  emoji: string;
}
