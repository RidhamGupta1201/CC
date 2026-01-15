## Team Name: Innovexa

---

## 🧩 Problem Statement – Open Innovation

In modern educational institutions, students often struggle to find the *right peers* to collaborate with based on complementary skills, shared interests, or project goals.  
Despite having diverse talent pools, there is no intelligent, centralized platform that helps students discover **like‑minded peers**, collaborate efficiently, and grow together.

This problem falls under **Open Innovation**, where technology is used to break silos, foster collaboration, and enable smarter connections within communities.  
CampusConnect aims to solve this by leveraging AI and modern web technologies to create an intelligent peer‑matching ecosystem for campuses.
Not only restricted to this, our website also gives the users the information about the events, hackathons and various other programs ongoing or upcoming in their as well as other colleges of the globe. 
A smart and innovative Complaint algorithm is also instilled in the project which will be of much help.
---

## 📌 Project Name

**CampusConnect**

---

## 🎥 5‑Minute Demonstration & Explanation Video

🔗 *Video Link:*  
**(Add your Google Drive / YouTube / unlisted demo video link here)**

---

## 🚀 Project Overview

CampusConnect is a smart campus collaboration platform designed to help students:

- Discover peers with complementary skills
- Connect based on interests, strengths, and weaknesses
- Our strengths can help the people who are weak in them. We are ones who will connect such people
- Participate in campus activities and innovation
- Experience AI‑powered recommendations
- Smart complaint raising and solving structure. The problems will be raised by the students in problems and they would be solved by experts who have either dealt with such problems or have contacts with the concerned departments who can ease the problem swiftly.

The core highlight of the project is the **AI Peer Matching system**, powered by Google Gemini, which intelligently suggests peers based on user profiles and queries.

---

## ✨ Key Features

- 🔐 **Google Authentication**
  - Secure login using Google Sign‑In
- 🤝 **AI Peer Matching**
  - Suggests peers based on skills, hobbies, and interests
- 💬 **Interactive Chat Interface**
  - Users can refine peer suggestions using natural language
- 🎯 **Fallback Suggested Peers UI**
  - Ensures users always see meaningful recommendations
- 🌙 **Modern Dark UI**
  - Clean, professional blue‑black gradient design
- 📱 **Responsive Design**
  - Works smoothly across screen sizes

---

## 🗂️ Project Structure
```
.
Connectx/
│
├── public/
│ ├── index.html
│ ├── login.html
│ ├── dashboard.html
│ ├── peers.html
│ ├── features.html
│ ├── profile.html
│ ├── css/
│ │ └── dashboard.css
│ │ └── features.css
│ │ └── landing.css
│ │ └── login.css
│ │ └── peers.css
│ │ └── style.css
│ ├── js/
│ │ ├── firebase.js
│ │ └── peers.js
│ │ └── auth.js
│ │ └── dashboard.js
│ │ └── firebase.example.js
│ │ └── peers.js
│ │ └── landing.js
│ │ └── profile.js
│
├── backend/
│ ├── server.js
│ ├── package.json
│
├── firebase.json
├── .firebaserc
└── README.md

````

---

## 🧰 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Google Gemini API

### Database & Auth
- Firebase Authentication
- Firestore Database

---

## ☁️ Google Technologies Used

1. **Google Authentication**
   - Google Sign‑In via Firebase Authentication
   - Secure and seamless user onboarding

2. **Google Gemini**
   - Used for AI‑powered peer matching
   - Processes user queries and profile data
   - Generates intelligent peer recommendations

---

## ⚙️ Setup & Installation Instructions

### 1️⃣ Clone the Repository
- git clone https://github.com/your-username/campusconnect.git
- cd campusconnect

### 2️⃣ Backend Setup (Local)
- cd backend
- npm install

### Create a .env file:
GEMINI_API_KEY=AIzaSyCmFj_zCO-QCBqsHL_2JYCheIyz3pqxFSw

### Run the backend server:
node server.js

### Backend will run at:
http://localhost:5000

### 3️⃣ Frontend Setup (Local Hosting)
- Open the public folder in VS Code
- Use Live Server extension
- Open:
- http://127.0.0.1:5500/public/index.html

### 4️⃣ Deployed Frontend
- 🔗 Live Project URL
- https://campusconnect18208.web.app

## 🔮 Future Scope & Enhancements

CampusConnect is designed with scalability and continuous innovation in mind.  
Future enhancements aim to make the platform more interactive, intelligent, and impactful.

### Planned Enhancements
- 💬 **Live In‑App Chat System**
  - Matched peers will be able to chat directly within CampusConnect
  - Enables real‑time collaboration without switching platforms

- 🤖 **Advanced AI Peer Matching**
  - Improved Gemini prompt engineering
  - Skill‑weighting and relevance ranking
  - Smarter recommendations based on activity history

- 📢 **Community Events & Collaboration Hub**
  - Students can post, discover, and join campus events
  - AI‑based event recommendations

- 👍 **Enhanced Complaint & Feedback System**
  - Authority dashboards for resolving issues
  - Priority escalation based on number of likes
  - Real‑time updates using Firestore

- 🔐 **Role‑Based Access Control**
  - Student, Admin, and Coordinator roles
  - Secure moderation and approvals

- 📊 **Analytics & Insights**
  - Peer collaboration trends
  - Engagement metrics for campus activities

---

## ⚠️ Disclaimer

This project is developed **strictly for educational and hackathon purposes only**.

CampusConnect is a prototype created to demonstrate:
- AI integration
- Cloud technologies
- Full‑stack web development
- Open Innovation concepts

The platform is **not intended for commercial deployment** or production use without further security, scalability, and compliance enhancements.

---

## 📜 License

This project is developed for Hackathon and educational purposes.
