import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div style={{ marginTop: '1rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ marginBottom: '16rem' }}>
                <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Login</h1>
                <form style={{ maxWidth: '24rem', margin: '0 auto' }} onSubmit={handleLoginSubmit}>
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
                        Login
                    </button>
                    <div style={{ textAlign: 'center', padding: '0.5rem 0', color: '#6b7280' }}>
                        Don't have an account yet? <Link style={{ textDecoration: 'underline', color: 'black' }} to={'/register/user'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}