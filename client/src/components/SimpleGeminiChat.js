import React, { useState } from 'react';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const GEMINI_API_KEY = 'AIzaSyCU4Iy3ucYixSBzO79VjkvdHSZU1GIJk_c';

const SimpleGeminiChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setMessages([...messages, { role: 'user', text: input }, { role: 'gemini', text: reply }]);
      setInput('');
    } catch (err) {
      setError('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Simple Gemini Chat (Frontend Only)</h2>
      <div style={{ minHeight: 120, marginBottom: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <b>{msg.role === 'user' ? 'You' : 'Gemini'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '80%', padding: 8 }}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading || !input} style={{ padding: 8, marginLeft: 8 }}>
        Send
      </button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default SimpleGeminiChat;
