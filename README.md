# Formly.ai

Formly.ai is a web application that provides real-time feedback on exercise form by analyzing uploaded images using computer vision and AI.

![Demo GIF](public/formly_video.gif)

## Overview

Formly.ai allows users to upload images of themselves performing exercises and receive immediate feedback on their form. The application leverages the OpenAI API and Google Cloud Vision to analyze images and provide actionable feedback to help users improve their exercise technique and reduce the risk of injury.

## Features

- **Image Upload**: Upload photos of exercise form through an intuitive interface
- **AI Analysis**: Get real-time feedback on posture, positioning, and technique
- **Responsive Design**: Works on mobile devices for easy gym use
- **Typewriter Effect**: Displays analysis with a smooth typewriter animation

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **AI/ML**: OpenAI GPT-4o API
- **Database**: MySQL
- **Other**: Multer (file handling), Google Cloud Vision

## Project Structure

```
├── backend/                # Backend Express server
│   ├── db.js               # Database connection
│   ├── server.js           # Main server file with API endpoints
│   └── package.json        # Backend dependencies
│
├── src/                    # Frontend React application
│   ├── pages/              # Application pages
│   │   └── responsePage/   # Main page for image uploads and analysis
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
│
├── public/                 # Public assets
├── package.json            # Frontend dependencies
└── vite.config.ts          # Vite configuration
```

## Setup and Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MySQL database
- OpenAI API key
- Google Cloud Vision API key (optional if using only OpenAI)

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=form_app
```

### Database Setup

1. Create a MySQL database named `form_app`
2. Create a table for storing analysis results:

```sql
CREATE TABLE analyses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  analysis_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Installation Steps

1. Clone the repository:

```
git clone https://github.com/yourusername/formly-ai.git
cd formly-ai
```

2. Install frontend dependencies:

```
npm install
```

3. Install backend dependencies:

```
cd backend
npm install
```

4. Start the backend server:

```
npm start
```

5. In a new terminal, start the frontend development server:

```
cd ..
npm run dev
```

6. Open your browser and navigate to http://localhost:5173

## Usage

1. Click on the upload area to select an image of your exercise form
2. Click "Analyze Form" to submit the image for analysis
3. Wait for the AI to process your image
4. Read the feedback provided about your form and posture
5. Make adjustments to your exercise technique based on the feedback

## API Endpoints

- `POST /analyze-image`: Analyzes an uploaded image and returns form feedback

## Disclaimer

Formly.ai is designed to provide general feedback on exercise form and is not a replacement for professional coaching or medical advice. Users should exercise at their own risk and consult with fitness professionals for personalized guidance.
