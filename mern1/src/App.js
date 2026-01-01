import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const apiURL = process.env.REACT_APP_API_URL || "http://localhost:3000";
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', interest: '' });
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = () => {
    fetch(`${apiURL}/user`)
      .then(response => response.json())
      .then(data => setUsers(data)) 
      .catch(err => console.error("Could not load users", err));
  };
  const saveUser = () => {
    fetch(`${apiURL}/add-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then(() => {
      alert("Saved to MongoDB!");
      loadUsers(); 
    })
    .catch((error) => console.error("Failed to update Data", error));
  };
  const deleteUsername = (name) => {
    if (window.confirm(`Are you sure you wish to delete ${name}?`)) {
      fetch(`${apiURL}/delete-user/${name}`, {
        method: "DELETE"
      })
      .then(() => {
        alert("Deletion Successful");
        loadUsers();
      })
      .catch((err) => console.error("Deletion error", err));
    }
  };
  const clearForm = () => {
    setFormData({ name: '', age: '', interest: '' });
  };
  return (
    <div className="App">
      <nav className="crumbs">
        <ul>
          <li className="crumbs"><button className="btn">About Us</button></li>
        </ul>
      </nav>
      <div className="container">
        <p>Helping People Progress...</p>
        <button className="favourite styled" id="btn">Say Hi</button>
        <br />
        <label htmlFor="story">Tell us your story...</label>
      </div>

      <div className="text">
        <textarea id="story" rows="5" cols="33">So The Story Goes....</textarea>
      </div>

      <div className="name">
        <label htmlFor="name">Tell us your name</label>
        <br />
        <input type="text" id="name" size="10" />
      </div>
      <table>
        <caption><h1>CURRENT PROFILES</h1></caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Interest</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {}
          {users.map((user, index) => (
            <tr key={index}
            className="fade-in-row" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
              <td>{user.name}</td>
              <td>{user.interest}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => deleteUsername(user.name)} style={{}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="form-container">
        <h3>Enter Your Bio</h3>
        <input 
          type="text" 
          placeholder="Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Interest" 
          value={formData.interest}
          onChange={(e) => setFormData({...formData, interest: e.target.value})}
        />
        <button onClick={saveUser}>Save Profile</button>
        <button onClick={clearForm} style={{backgroundColor: '#f44336', color:'white'}}>Clear</button>
      </div>
    </div>
  );
}

export default App;