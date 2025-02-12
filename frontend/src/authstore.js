import { writable } from 'svelte/store';

// Initialize store with data from localStorage if it exists
const storedUser = localStorage.getItem('user');
export const user = writable(storedUser ? JSON.parse(storedUser) : null);

// Enhanced login with session management
export const login = (userData) => {
  user.set(userData);
  localStorage.setItem('user', JSON.stringify(userData));
  return true;
};

// Enhanced logout with cleanup
export const logout = () => {
  user.set(null);
  localStorage.removeItem('user');
  return true;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  let currentUser;
  user.subscribe(value => currentUser = value)();
  return !!currentUser;
};

// Get user role
export const getUserRole = () => {
  let currentUser;
  user.subscribe(value => currentUser = value)();
  // @ts-ignore
  return currentUser?.type || null;
};
