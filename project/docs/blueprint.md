# **App Name**: Quiniela Mundial 2026

## Core Features:

- Google Account Integration: Secure user authentication and session management via Google Sign-In (Firebase Auth), displaying user profile (name, photo).
- Interactive Match Schedule: A comprehensive display of all 2026 World Cup matches with filtering by phase, showing match details, real-time status, and countdowns from Firestore.
- Personalized Prediction Entry: Allow participants to submit and modify their score predictions for each match until the official start time, with automatic locking (data stored in Firestore).
- Live Ranking & User Dashboard: A dynamically updated leaderboard (Top 10 visible) showing participant rankings, and a personalized user dashboard with their points and next match, pulling data from Firestore.
- Admin Management Interface: A dedicated section for the administrator to create, edit, and delete matches, input official match results, and manage participant accounts, all updating Firestore.
- Automated Score Calculation System: Backend logic to automatically calculate points for participants based on prediction accuracy upon official result entry, and re-calculate global rankings using Firestore data.
- In-App Notification System: Provide contextual notifications to users regarding upcoming matches, status updates, or changes in their ranking position.

## Style Guidelines:

- Color scheme: Predominantly dark for a professional and modern aesthetic, complementing the requested FIFA World Cup theme.
- Primary color: A rich, deep blue (#264AB2) conveying professionalism, energy, and loyalty, inspired by 'azul oscuro'.
- Background color: A subtle, very dark blue-grey (#181C26) providing depth and contrast for text and interactive elements, desaturated from the primary blue hue.
- Accent color: A vibrant gold (#E4BE3E) to highlight important information, interactive elements, and represent prestige and success, per user request for 'dorado'.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, impactful, and tech-forward feel that grabs attention.
- Body font: 'Inter' (sans-serif) for optimal readability and a neutral, professional appearance across all textual content.
- Use a set of clean, minimalist outline icons for actions and navigation, related to sports, competition, and user management.
- Maintain a clean, organized, and responsive layout that prioritizes clear display of match information, predictions, and ranking tables, consistent with a professional sports application.
- Implement smooth and subtle animations for transitions between screens, interactive elements (like saving predictions), and updates in rankings, ensuring a polished user experience.