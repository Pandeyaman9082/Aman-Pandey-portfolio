import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google Gen AI client with appropriate safety defaults
const aiApiKey = process.env.GEMINI_API_KEY || "";
const aiClient = aiApiKey
  ? new GoogleGenAI({
      apiKey: aiApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

app.use(express.json());

// In-memory or file-backed storage for contact messages
const MESSAGES_FILE = path.join(process.cwd(), "data-messages.json");

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
}

function getMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to read messages file:", error);
  }
  return [];
}

function saveMessage(message: ContactMessage) {
  try {
    const messages = getMessages();
    messages.push(message);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write message:", error);
  }
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// Submit contact form
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const newMessage: ContactMessage = {
    id: Math.random().toString(36).substring(2, 11),
    name,
    email,
    phone: phone || "",
    message,
    timestamp: new Date().toISOString(),
  };

  saveMessage(newMessage);

  return res.status(201).json({
    success: true,
    message: "Thank you! Your message has been received successfully.",
    data: newMessage,
  });
});

// Retrieve message logs (for guestbook or live-updating portfolio review section)
app.get("/api/messages", (req, res) => {
  const messages = getMessages();
  // Return only safe details (or all if requested, we can filter for public layout)
  const publicMessages = messages.map((m) => ({
    name: m.name,
    message: m.message,
    timestamp: m.timestamp,
  }));
  res.json(publicMessages.slice(-10).reverse()); // Return the last 10 submissions
});

// AI chat assistant proxy using @google/genai SDK
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message prompt is required." });
  }

  if (!aiClient) {
    return res.json({
      reply: "Hi there! I am Aman's Virtual Assistant. Aman is currently setting up my AI backend. In the meantime, you can contact him directly at pandeyaman5283@gmail.com or +91 9082115064!",
    });
  }

  try {
    // Standard system instructions to feed the model context about Aman Pandey
    const systemInstruction = `You are "Aman-Bot", a friendly, highly professional, and enthusiastic Virtual Portfolio Assistant for Aman Pandey.
Aman is a dedicated Computer Science Engineering (Diploma) student at Ambikeswar Group of Institute.
He is passionate about Web Development and is actively looking for Frontend Developer, MERN Stack Developer, or Full Stack Engineer internships, junior positions, and freelance gigs.

Maintain a polite, corporate, yet approachable developer tone. Answer questions briefly and highlight Aman's credentials when appropriate.

Aman's Contact Details:
- Email: pandeyaman5283@gmail.com
- Phone: +91 9082115064
- College: Ambikeswar Group of Institute
- LinkedIn/GitHub links are present on his webpage.

Aman's Tech Stack & Skills:
- Frontend: HTML5, CSS3, JavaScript, React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Programming Languages: C, Python, JavaScript
- Tools & Principles: Git, GitHub, Responsive Design, REST APIs, VS Code, Agile learning.

Aman's Services:
1. Frontend Development (Building high fidelity, responsive, pixel-perfect user interfaces).
2. Responsive Website Design (Ensuring cross-browser compatibility and seamless mobile layouts).
3. MERN Stack Development (Full stack applications with Node, Express, MongoDB, and React).
4. Website UI Design (Creating clean, modern glassmorphism aesthetic layouts with custom micro-interactions).

Aman's Key Projects:
1. Personal Portfolio Website: An award-winning, premium animated showcase with glassmorphic grids, custom cursors, light/dark modes, and an AI chat interface. (Built with React, Tailwind, Framer Motion).
2. Student Management System: A MERN stack application allowing school authorities to handle profiles, register records, and perform complete CRUD operations dynamically.
3. Weather App: Live forecast tracking using modern JS and Geolocation + OpenWeather API integrations.
4. Calculator: A sleek web application that is highly accessible, offering scientific and normal math utilities with custom responsive layouts.
5. Todo App: An interactive client-side planner supporting advanced task categorizing, filtering, local storage caching, and neat micro-animations.
6. MERN Blog Website: A production-ready blog with dynamic content creation, administrative features, and interactive comments powered by Node/MongoDB.

If a visitor asks about salary expectations, location, or interview, state that Aman is highly flexible, open to relocate, and excited to join dynamic teams. Provide his email and phone number and encourage them to schedule a meeting! Keep responses within 2-3 short, highly readable paragraphs or bullet points.`;

    // Map client-side chat history to Google GenAI content parts structure
    const formattedHistory = Array.isArray(history)
      ? history.map((h: { role: string; text: string }) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        }))
      : [];

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, I couldn't process that query. Please try emailing Aman directly at pandeyaman5283@gmail.com!";
    return res.json({ reply });
  } catch (error) {
    console.error("Gemini AI API Error:", error);
    return res.status(500).json({
      error: "Failed to communicate with AI Assistant",
      reply: "Oops! My neural nodes got slightly tangled. Feel free to contact Aman at pandeyaman5283@gmail.com while I reboot!",
    });
  }
});

// -------------------------------------------------------------
// VITE OR STATIC ASSETS SERVING MIDDLEWARE
// -------------------------------------------------------------
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamic import to avoid loading Vite dependencies in production bundle
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server successfully initialized on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
