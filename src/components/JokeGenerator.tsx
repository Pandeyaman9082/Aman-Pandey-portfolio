import React, { useState } from 'react';
import '../styles/JokeGenerator.css';

interface Joke {
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  error?: boolean;
}

const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data: Joke = await response.json();
      
      if (data.error) {
        throw new Error('No joke available');
      }

      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  const displayJoke = () => {
    if (!joke) return null;

    if (joke.type === 'twopart') {
      return (
        <div className="joke-content">
          <p className="setup">{joke.setup}</p>
          <p className="delivery">{joke.delivery}</p>
        </div>
      );
    }

    return (
      <div className="joke-content">
        <p className="single-joke">{joke.joke}</p>
      </div>
    );
  };

  return (
    <div className="joke-generator">
      <div className="joke-container">
        <h1>😂 Random Joke Generator</h1>
        <p className="subtitle">Click the button to get a random joke!</p>

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="joke-button"
        >
          {loading ? '⏳ Loading...' : '🎲 Get a Joke'}
        </button>

        {error && <div className="error-message">❌ {error}</div>}

        {joke && !error && (
          <div className="joke-box">
            {displayJoke()}
          </div>
        )}

        {!joke && !error && !loading && (
          <div className="placeholder">
            <p>Click the button to generate a random joke!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JokeGenerator;
