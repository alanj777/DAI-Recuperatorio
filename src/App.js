import React, { useState } from 'react';
import HomeView from './HomeView';
import PostsView from './PostsView';

export default function App() {
  const [view, setView] = useState('home'); // Estado para controlar la vista actual

  const navigateToPosts = () => {
    setView('posts'); // Navegar a la vista de posts
  };

  const navigateToHome = () => {
    setView('home'); // Volver a la vista de inicio
  };

  return (
    <div style={styles.container}>
      {view === 'home' ? (
        <HomeView navigateToPosts={navigateToPosts} />
      ) : (
        <PostsView navigateToHome={navigateToHome} />
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
};
