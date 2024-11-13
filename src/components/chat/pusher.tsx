import Pusher from 'pusher-js';
import { API_ENDPOINTS } from '../../appConfig';

export const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY || '', {
  cluster: process.env.REACT_APP_CLUSTER || '',
  forceTLS: true,
  channelAuthorization: {
    endpoint: API_ENDPOINTS.PUSHERAUTH,
    transport:'ajax',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
        "X-CSRF-Token": "SOME_CSRF_TOKEN" 
      }
  },
});

