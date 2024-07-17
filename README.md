# Ghibli Web Codex

Welcome to the Ghibli Web Codex! This project is a web application that provides information about Studio Ghibli films using the [Studio Ghibli API](https://ghibliapi.vercel.app). The application is built with React, Vite, TypeScript, and Tailwind CSS, and uses SWR for efficient data fetching.

## Features

- Display detailed information about Studio Ghibli films
- Fetch data efficiently using SWR
- Responsive design with Tailwind CSS

## Tech Stack

- **React**: A JavaScript library for building user interfaces
- **Vite**: A fast build tool for modern web projects
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development
- **SWR**: React Hooks library for data fetching

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/ghibli-web-codex.git
   cd ghibli-web-codex
   ```
   
2. **Install dependencies:**

   ```sh
   npm install
   yarn install
   ```
   
3. **Running the Development Server:**

	To start the development server, run:
    
   ```sh
   npm run dev
   yarn dev
   ```
   Open `http://localhost:3000` to view it in your browser. The page will reload when you make changes.

4. **Building for Production:**

	To create an optimized production build, run:
    
   ```sh
   npm run build
   yarn build
   ```
 
5. **API Integration**

	This project uses the Studio Ghibli API to fetch data about Studio Ghibli films.
    
6. **Example Fetch Using SWR:**

	Here is an example of how to fetch data using SWR:
   
     ````js
    import useSWR from 'swr';

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR('https://ghibliapi.vercel.app/films', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
      <div>
        {data.map((film: any) => (
          <div key={film.id}>
            <h2>{film.title}</h2>
            <p>{film.description}</p>
          </div>
        ))}
      </div>
    );
    ````

6. **Contributing**

	Contributions are welcome! Please open an issue or submit a pull request for any changes.
    
6. **License**

	This project is licensed under the MIT License. See the LICENSE file for details.
    
---
