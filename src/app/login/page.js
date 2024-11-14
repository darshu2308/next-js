"use client"; 

import { useState } from 'react';
import emailjs from 'emailjs-com';


const serviceId = 'service_qw02in8';
const templateId = 'template_cndhamj';
const userId = 'JmeV9mQ9eX2x-d7Yg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  async function sendWelcomeEmail(email) {
    try {
      const templateParams = {
        to_email: email,
        from_name: 'My App',
        message: 'Welcome back to our app!'
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      console.log(`Sent welcome email to ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  async function handleLogin() {
    setError(''); 
    setSuccess(''); 
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);

      if (!user) {
        throw new Error('Invalid email or password. If you forgot your password, an email can be sent to reset it.');
      }

      await sendWelcomeEmail(email); 
      setSuccess('Login successful!'); 
      setEmail(''); 
      setPassword(''); 
    } catch (error) {
      setError(error.message); 
      console.error('Error logging in user:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/login/registration" className="text-blue-500">Register here</a>
        </p>
      </div>
    </div>
  );
}