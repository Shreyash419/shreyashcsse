import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key-for-development'
});

// In-memory chat history (use a database in production)
const chatHistory: Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }> = [];

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Add user message to history
      chatHistory.push({ role: 'user', content: message, timestamp: new Date() });

      // If OpenAI API key is not set, use mock response
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'mock-key-for-development') {
        const mockResponse = generateMockResponse(message);
        chatHistory.push({
          role: 'assistant',
          content: mockResponse,
          timestamp: new Date()
        });
        return res.json({ response: mockResponse });
      }

      // Use OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are Aurora AI, an intelligent assistant for college society management. Help users with event planning, society management, member engagement, and provide data-driven insights. Be concise, friendly, and professional.'
          },
          ...chatHistory.slice(-10).map((msg) => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 300
      });

      const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not process that.';
      chatHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      });

      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Chat error:', error);
      const mockResponse = generateMockResponse(req.body.message || '');
      res.json({ response: mockResponse });
    }
  },

  getHistory(req: Request, res: Response) {
    res.json({ history: chatHistory.slice(-50) });
  }
};

function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('upcoming') || lowerMessage.includes('coming up') || lowerMessage.includes('what events') || lowerMessage.includes('list events') || lowerMessage.includes('event calendar')) {
    return `Here are the upcoming events on our campus:

**Live now**
• Midnight Acoustic Sessions – Crescendo Music Collective, Today 9:00 PM, Amphitheatre (198/220 capacity)

**Upcoming**
• RoboFest 2026: Autonomous Arena – Aurora Robotics Society, Tomorrow 5:30 PM, Main Auditorium (261/320 capacity)
• Inter-College Basketball Finals – Vanguard Sports League, Friday 7:00 PM, Sports Complex (412/500 capacity)
• AI for Campus Operations Workshop – Quantum Computing Circle, Sunday 11:00 AM, Innovation Lab (94/120 capacity)

You can view full details on the Events page. Would you like help planning your own event?`;
  }

  if (lowerMessage.includes('event') || lowerMessage.includes('plan') || lowerMessage.includes('schedule')) {
    return "I can help you plan an event! Based on your data, Friday evenings (7-10 PM) show the highest engagement. Would you like me to suggest optimal timing, venue, or collaboration opportunities? Use the Create event button on the Dashboard to add a new event.";
  }

  if (lowerMessage.includes('society') && (lowerMessage.includes('list') || lowerMessage.includes('what') || lowerMessage.includes('which') || lowerMessage.includes('all'))) {
    return `Here are the societies on the platform:

• Aurora Robotics Society (Technical) – 184 members
• Crescendo Music Collective (Cultural) – 312 members
• Spectrum Arts Guild (Arts) – 129 members
• Vanguard Sports League (Sports) – 267 members
• LensCraft Photography Club (Arts) – 201 members
• Quantum Computing Circle (Technical) – 96 members
• Dramatics Ensemble (Cultural) – 178 members
• Data Science Forum (Technical) – 142 members

Browse them on the Societies page. Need info on a specific society?`;
  }

  if (lowerMessage.includes('society') || lowerMessage.includes('member')) {
    return "Your societies are performing well! The Cultural societies have the highest engagement. Would you like insights on member growth strategies or inter-society collaborations? Visit the Societies page to see details.";
  }

  if (lowerMessage.includes('dashboard') || lowerMessage.includes('stat') || lowerMessage.includes('overview')) {
    return "Your dashboard shows 46 active societies, 128 events this month, and 2,312 unique attendees. Engagement is up 12% from last month. Would you like a detailed breakdown?";
  }

  if (lowerMessage.includes('recommendation') || lowerMessage.includes('suggest') || lowerMessage.includes('ai recommendation')) {
    return "I recommend scheduling a Tech × Arts collaboration event. Historical data shows a 34% engagement uplift for cross-category events. Check the AI Studio page for a detailed playbook.";
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm Aurora AI, your intelligent assistant for the College Society Management platform. I can help with events, societies, event planning, and insights. What would you like to know?";
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    return "I can help with:\n• Upcoming events and schedules\n• Societies and members\n• Event planning tips\n• Dashboard stats\n• AI recommendations\n\nJust ask in plain language!";
  }

  if (lowerMessage.includes('robo') || lowerMessage.includes('robotics')) {
    return "RoboFest 2026: Autonomous Arena is happening tomorrow at 5:30 PM in the Main Auditorium. It's organised by Aurora Robotics Society. Capacity: 320, with 261 sign-ups so far. Head to the Events page for more.";
  }

  if (lowerMessage.includes('music') || lowerMessage.includes('acoustic')) {
    return "Midnight Acoustic Sessions is live today at 9:00 PM at the Amphitheatre, by Crescendo Music Collective. 198 of 220 spots filled. Check the Events page for details.";
  }

  return "I can help with events, societies, and the College Society platform. Try asking: \"What events are coming up?\", \"List societies\", or \"Help me plan an event\". What would you like to explore?";
}
