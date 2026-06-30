export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "Full Stack" | "Frontend" | "Utility";
  demoUrl: string;
  githubUrl: string;
  image: string; // Tailwind gradients or local placeholders
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "Frontend" | "Backend" | "Database" | "Programming" | "Other";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Name of Lucide icon to render dynamically
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
}

export interface MessageLog {
  name: string;
  message: string;
  timestamp: string;
}
