# 🚀 Recruitment App (Frontend Assessment)

A polished recruitment web experience built with **Vite + React + TypeScript**.  
The app simulates a real-world talent discovery platform with candidate browsing, filtering, and profile management.

---

# 📸 Demo
> Add your deployed link here (Vercel / Netlify)

---

# 🧠 Features

## 🏠 Main Recruitment Page (/)
- Hero section with product intro + CTA
- Candidate grid (cards layout)
- Search candidates by name, skills, or headline
- Filters:
  - Location
  - Experience level
  - Status
- Sorting:
  - Highest score
  - Most experience
  - Recently updated
- Active filter chips with quick remove
- Reset all filters button
- Results count indicator

## 👤 Candidate Profile Page (/candidate/:id)
- Full candidate profile view
- About / Summary section
- Skills chips
- Experience / projects section
- Metadata (availability, score, updatedAt)
- Actions:
  - ⭐ Shortlist
  - ❌ Reject
- State persists between pages

---

# ⚙️ Tech Stack
- React (Vite)
- TypeScript
- React Router
- Context API (state management)
- LocalStorage (persistence)
- CSS (custom styling)

---

# 🏗️ Project Structure


---

# 🧠 State Management Approach
- Used React Context API to manage candidate actions (shortlist / reject)
- Each candidate action is stored by ID
- State is persisted using localStorage for refresh safety

---

# 💾 Data Approach
- Mock data stored in `/data/candidates.json`
- Simulated API behavior with local state handling
- No backend required

---

# 🎯 Key Technical Decisions

- Chose Context API for simplicity and fast state sharing
- Used localStorage to persist UI actions
- Implemented client-side filtering for performance and simplicity
- Separated UI components for reusability

---

# ⚖️ Tradeoffs

- No backend integration (mock-only data)
- No React Query (kept scope simple for assessment timebox)
- Filtering is client-side (not optimized for large datasets)

---

# 🚀 Future Improvements

- Add backend API (Node.js / Express)
- Add React Query for caching & fetching
- Add authentication system
- Improve accessibility (ARIA + keyboard navigation)
- Add unit tests (Vitest + React Testing Library)
- Improve UI animations (Framer Motion)

---

# 📦 Setup Instructions

```bash
npm install
npm run dev
