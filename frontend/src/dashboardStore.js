import { writable } from 'svelte/store';

export const pwdDashboardState = writable({
  isOpen: true,
  currentView: 'profile'
});

export const countyDashboardState = writable({
  isOpen: true,
  currentSection: 'overview'
});

export const healthDashboardState = writable({
  isOpen: true,
  currentSection: 'assessments'
});
