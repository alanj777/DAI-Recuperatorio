import React from 'react';

const HomeView = ({ navigateToPosts }) => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home View</h1>
      <p>Click below to view the posts</p>
      <button onClick={navigateToPosts} style={styles.button}>
        Click Me
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

export default HomeView;
