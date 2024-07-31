import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }
  return (
    <div style={{ marginTop: '1rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <div style={{ marginBottom: '16rem' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Register</h1>
        <form style={{ maxWidth: '24rem', margin: '0 auto' }} onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <button style={{ backgroundColor: '#3490dc', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Register
          </button>
          <div style={{ textAlign: 'center', padding: '0.5rem 0', color: '#6b7280' }}>
            Already a member? <Link style={{ textDecoration: 'underline', color: 'black' }} to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}