# 🛍️ TradeShift - Modern E-Commerce & Trade Management Platform

TradeShift is a feature-rich, fully responsive e-commerce web platform designed to streamline online shopping and trade management. It provides a seamless user experience where users can explore products, manage their personal imports/exports, and handle account details securely. Built with performance and accessibility in mind, TradeShift bridges the gap between everyday consumers and trade managers.

🌐 **Live Site URL:** [https://react-tract-shift-client.vercel.app/](https://react-tract-shift-client.vercel.app/)

---

## 🖥️ preview
![TradeShift Backend Screenshot](./623677370-92eaddb9-e219-4df9-8fec-704dac80f2b4.png)

---

## ✨ Key Features

- **One-Click Import (My Imports):** Import any product into your personal *My Imports* page with a single click. Smart quantity validation prevents over-importing, and available stock updates automatically.
- **Full Export Management (My Exports):** Complete CRUD functionality. Add, update, and delete export products directly from the UI. Features prefilled modal forms for effortless editing.
- **Secure Authentication & Private Routes:** Firebase-powered email/password and Google login. User sessions persist on reload without annoying forced redirects.
- **Advanced Search, Filters & Pagination:** Fast search functionality on the *All Products* page by name. The homepage automatically highlights the 6 latest products (`sorted by createdAt: -1`).
- **Dark / Light Mode Toggle:** Theme persistence using `localStorage` ensures the user's preference is saved, combined with fully accessible contrast and keyboard navigation.
- **Dynamic UX:** Polished UI animations with Framer Motion and dynamic page titles that update automatically based on the current route.

---

## ⚙️ Technologies Used

### Frontend
- **Core:** React.js (Hooks, Context API, Router)
- **Styling & UI:** Tailwind CSS, DaisyUI
- **Animations:** Framer Motion
- **Icons:** React Icons

### Backend & Database
- **Server Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Firebase Authentication

### Hosting & Deployment
- **Client:** Vercel
- **Server:** Render

---

## 📦 Project Dependencies

Backend Dependencies
```json
{
  "express": "^4.19.x",
  "mongodb": "^6.x",
  "mongoose": "^8.x",
  "cors": "^2.8.x",
  "dotenv": "^16.x"
}
