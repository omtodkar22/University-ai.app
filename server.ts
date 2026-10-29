import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for Google Search Grounded Standards & Intelligence
app.post('/api/search-grounding', async (req, res) => {
  try {
    const { query, category } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Valid query string is required' });
    }

    const isCyber = category === 'cyber';
    const systemPrompt = isCyber
      ? `You are an expert cybernetic security analyst and distributed systems researcher. Query: "${query}". Search the live web to find verified, up-to-date cryptographic standards, zero-knowledge research, hardware enclave specs (SGX/AMD SEV/Nitro), CVEs, or protocol invariants. Provide a concise, highly technical analysis with cited facts.`
      : `You are an authoritative engineering curriculum and accreditation director. Query: "${query}". Search the live web to find current 2026-2027 ABET EAC criteria, IEEE/ACM computing curriculum guidelines, CEAB accreditation policies, or assessment rubrics. Provide a structured, compliance-focused brief with concrete criteria citations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No response generated from search grounding.';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract web source URLs and titles
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || chunk.web.uri,
        uri: chunk.web.uri,
      }));

    res.json({
      text,
      sources,
      timestamp: new Date().toISOString(),
      model: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Gemini Search Grounding error:', error);
    res.status(500).json({
      error: error.message || 'Failed to execute search grounding',
    });
  }
});

// Development vs Production serving
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
