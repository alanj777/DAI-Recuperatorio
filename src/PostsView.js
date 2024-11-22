import React, { useState, useEffect } from 'react';

const PostsView = ({ navigateToHome }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // Estado para controlar el post que se está editando
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  // Función para eliminar un post
  const handleDelete = (id) => {
    const updatedData = data.filter((post) => post.id !== id);
    setData(updatedData); // Actualiza la lista de posts
  };

  // Función para editar un post
  const handleEdit = (post) => {
    setEditingPost(post.id); // Marca el post como el que se está editando
    setEditedTitle(post.title); // Pre-carga el título del post en el campo de edición
    setEditedBody(post.body); // Pre-carga el cuerpo del post en el campo de edición
  };

  // Función para guardar los cambios editados
  const handleSaveEdit = (id) => {
    const updatedData = data.map((post) =>
      post.id === id ? { ...post, title: editedTitle, body: editedBody } : post
    );
    setData(updatedData);
    setEditingPost(null); // Deja de editar después de guardar
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="spinner" style={styles.spinner}></div>
        <p>Loading...</p>
        <button onClick={navigateToHome} style={styles.button}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Posts</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} style={styles.item}>
            {editingPost === item.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={styles.input}
                />
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  style={styles.textarea}
                />
                <button onClick={() => handleSaveEdit(item.id)} style={styles.saveButton}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <button onClick={() => handleEdit(item)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={navigateToHome} style={styles.button}>Back to Home</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    position: 'relative',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
    margin: '0 auto',
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
  editButton: {
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule('@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }', styleSheet.cssRules.length);

export default PostsView;
