# 🎤 Hackathon Demo Script (5 Minutes)

## Setup Checklist (Before Demo)
- [ ] Clear browser cache
- [ ] Test chatbot with 2-3 queries
- [ ] Check database has properties
- [ ] Open homepage in one tab
- [ ] Open admin panel in another tab
- [ ] Have backup slides ready

---

## Script with Timing

### **[0:00 - 0:45] Opening Hook**

**Say:**
"Hi everyone! Imagine you're a student in Malaysia looking for a rental room, but all the property websites are in English and you're more comfortable in Malay. Or you're an expat trying to navigate local property listings. That's the problem we're solving.

I'm presenting **Klang Valley HomeRent** - Malaysia's first AI-powered rental platform with fully bilingual support."

**Action:** Show homepage

---

### **[0:45 - 2:00] English Chat Demo**

**Say:**
"Let me show you our AI assistant. Watch how it understands natural English."

**Action:** Click chatbot button

**Type:** `"I need a 3 bedroom apartment in KLCC under RM3000"`

**Say:**
"Notice how the AI doesn't just respond with generic text - it understands my criteria and generates a direct search link."

**Action:** Click the search link that appears

**Say:**
"And boom - I'm immediately at filtered results matching exactly what I asked for. No multiple dropdowns, no complicated forms."

---

### **[2:00 - 3:15] Bahasa Melayu Demo**

**Say:**
"Now here's what makes us special. Watch this."

**Action:** Switch language to Bahasa Melayu in header

**Type:** `"Saya nak cari rumah sewa murah dekat Petaling Jaya"`

**Say:**
"I just asked in Malay: 'I want to find cheap rental near Petaling Jaya.' The AI automatically detects the language and responds completely in Bahasa Melayu."

**Action:** Show the Malay response

**Type:** `"Ada tak bilik 2, fully furnished, area Shah Alam"`

**Say:**
"Notice I'm mixing languages naturally - 'bilik 2' is Malay, 'fully furnished' is English. This is how Malaysians actually speak. Our AI understands this code-switching."

**Action:** Click search link

---

### **[3:15 - 4:00] Technical Deep Dive**

**Say:**
"Let me quickly show you what's under the hood."

**Action:** Switch to admin tab (`/admin`)

**Say:**
"We have a full admin panel where property managers can create, edit, and delete listings in real-time."

**Action:** Show property table

**Say:**
"Everything is backed by a PostgreSQL database with 100 real properties across Klang Valley. We're also integrated with JamAI Base - that's a generative AI platform - for advanced RAG-based recommendations."

**Action:** Point to sync button (don't click)

---

### **[4:00 - 4:45] Tech Stack & Impact**

**Say:**
"Our tech stack includes:
- Next.js 16 and React 19 for the frontend
- Vercel AI SDK with OpenAI GPT-4o-mini for the chat
- Neon PostgreSQL for our database
- JamAI Base for generative AI features

We're targeting Klang Valley's 7 million residents - students, expats, young professionals. The rental market here is massive and currently underserved when it comes to intelligent, accessible search tools."

---

### **[4:45 - 5:00] Closing**

**Say:**
"To summarize: we've built Malaysia's first bilingual AI property assistant that understands natural language in both English and Bahasa Melayu, generates smart search results, and is backed by real data. This is production-ready and scalable to all of Malaysia.

Thank you! Happy to answer questions."

**Action:** Return to homepage with chatbot open

---

## Backup Responses for Q&A

**Q: "Why did you choose these specific AI technologies?"**
A: "We chose OpenAI GPT-4o-mini for cost-effectiveness and speed - it's perfect for conversational AI. JamAI Base gives us RAG capabilities for future features like semantic search across property descriptions."

**Q: "How do you handle Malay language variations?"**
A: "Great question. We use context-aware prompts that understand Malaysian English, code-switching, and local terminology like 'LRT', 'condo', 'mamak' etc."

**Q: "What's your monetization strategy?"**
A: "Three revenue streams: listing fees for landlords, featured placement charges, and eventually booking commissions. We can also offer premium AI features."

**Q: "How accurate is the property data?"**
A: "Currently we have 100 verified properties. In production, we'd integrate with property management APIs and require landlord verification."

**Q: "Can this scale?"**
A: "Absolutely. Our infrastructure on Vercel and Neon auto-scales. The AI costs are predictable at about $0.001 per conversation. We can easily expand to other Malaysian cities."

---

## Emergency Backup Plans

### If AI is slow/down:
"In the interest of time, let me show you a pre-recorded interaction..." (have screenshots ready)

### If database is empty:
"Let me show you the admin panel where we can add properties in real-time..." (create one property live)

### If nothing works:
Have a PDF slideshow explaining the concept with screenshots as backup

---

**You've got this! 🚀**
