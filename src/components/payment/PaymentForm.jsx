import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const AllStripeSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      // const stripe = require('stripe')('sk_test_51PBH1RGfCaPJBtru0fuyrSojJ8nlHs9Vnufmi2JPk5BbxsiYPo4wyX7qW0lP8OvlzTsVxv9BlTeXMzZOPL2UxDJi00S166RaoB');
      const sessions = await stripe.checkout.sessions.list({
        limit: 200,
      });
        setSessions(sessions.data);
        setLoading(false);
  
    };

    fetchSessions();
  }, []);

  return (
    <div>
      <h2>All Stripe Sessions</h2>
      {loading ? (
        <p>Loading sessions...</p>
      ) : (
        <ul>
          {sessions.map(session => (
            <li key={session.id}>
              <p>Session ID: {session.id}</p>
              <p>Payment status: {session.payment_status}</p>
              <p>Subscription status: {session.subscription_status}</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllStripeSessions;