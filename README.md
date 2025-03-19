# Spotify Clone with Chat Functionality

## Table of Contents

-   [Overview](#overview)
-   [Frontend](#frontend)
    -   [Technologies Used](#technologies-used)
    -   [Folder Structure](#folder-structure)
    -   [Components](#components)
    -   [Pages](#pages)
    -   [Providers](#providers)
    -   [Stores](#stores)
-   [Backend](#backend)
    -   [Technologies Used](#technologies-used-1)
    -   [Folder Structure](#folder-structure-1)
    -   [Controllers](#controllers)
    -   [Middlewares](#middlewares)
    -   [Models](#models)
    -   [Routes](#routes)
-   [Database](#database)
-   [Getting Started](#getting-started)

## Overview

This is a Spotify clone with chat functionality built using React (Next.js), TypeScript, Zustand, React Query, and Shadcn UI on the frontend, and Express with Mongoose on the backend. The application allows users to stream music, create playlists, and chat with other users in real-time. The chat feature includes user authentication, real-time messaging, and message persistence.

## Frontend

### Technologies Used

-   React (Next.js)
-   TypeScript
-   Zustand
-   React Query
-   Shadcn UI

### Folder Structure

-   `components`: Reusable UI components
-   `layout`: Main layout components
-   `pages`: Page-level components
-   `providers`: Context providers for authentication and chat
-   `store`: Zustand stores for managing state
-   `types`: Type definitions for TypeScript
-   `utils`: Utility functions for formatting and validation

### Components

-   `Button`: A reusable button component
-   `Input`: A reusable input component
-   `ScrollArea`: A reusable scroll area component
-   `Slider`: A reusable slider component
-   `Tabs`: A reusable tab component
-   `Topbar`: A reusable topbar component
-   `ChatMessage`: A component for displaying chat messages
-   `MusicPlayer`: A component for playing music
-   `Playlist`: A component for displaying playlists

### Pages

-   `Home`: The main homepage
-   `Album`: A page for displaying album information
-   `Chat`: A page for real-time chat
-   `Admin`: A page for administrators
-   `NotFound`: A page for 404 errors
-   `Playlist`: A page for displaying playlists
-   `Search`: A page for searching music

### Providers

-   `AuthProvider`: A context provider for authentication
-   `ChatProvider`: A context provider for chat functionality

### Stores

-   `useAuthStore`: A Zustand store for managing authentication state
-   `useChatStore`: A Zustand store for managing chat state
-   `useMusicStore`: A Zustand store for managing music state
-   `usePlayerStore`: A Zustand store for managing player state
-   `usePlaylistStore`: A Zustand store for managing playlist state

## Backend

### Technologies Used

-   Express
-   Mongoose

### Folder Structure

-   `controllers`: Controller functions for handling API requests
-   `middlewares`: Middleware functions for handling authentication and errors
-   `models`: Mongoose models for database schema
-   `routes`: API routes for handling requests
-   `types`: Type definitions for TypeScript
-   `utils`: Utility functions for formatting and validation

### Controllers

-   `admin.controller.js`: Controller functions for administrator actions
-   `album.controller.js`: Controller functions for album actions
-   `auth.controller.js`: Controller functions for authentication actions
-   `song.controller.js`: Controller functions for song actions
-   `user.controller.js`: Controller functions for user actions
-   `chat.controller.js`: Controller functions for chat actions

### Middlewares

-   `auth.middleware.js`: Middleware functions for authentication
-   `error.middleware.js`: Middleware functions for error handling

### Models

-   `album.model.js`: Mongoose model for album schema
-   `song.model.js`: Mongoose model for song schema
-   `user.model.js`: Mongoose model for user schema
-   `chat.model.js`: Mongoose model for chat schema

### Routes

-   `admin.route.js`: API routes for administrator actions
-   `album.route.js`: API routes for album actions
-   `auth.route.js`: API routes for authentication actions
-   `song.route.js`: API routes for song actions
-   `user.route.js`: API routes for user actions
-   `chat.route.js`: API routes for chat actions

## Database

-   Mongoose is used for database schema and interactions

## Getting Started

1. Clone the repository
2. Install dependencies using `npm install` or `yarn install`
3. Start the frontend using `npm run dev` or `yarn dev`
4. Start the backend using `npm run start` or `yarn start`
5. Open `http://localhost:3000` in
