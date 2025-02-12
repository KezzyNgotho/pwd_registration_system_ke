import { Router, Link, Route } from 'svelte-routing';
import PwdDashboard from '../src/PWDDashboard.svelte';
import CountyDashboard from '../src/CountyDashboard.svelte';
import HealthDashboard from '../src/HealthOfficerDashboard.svelte';

export const routes = [
  {
    path: '/pwd-dashboard',
    component: PwdDashboard,
    protected: true,
    role: 'pwd'
  },
  {
    path: '/county-dashboard',
    component: CountyDashboard,
    protected: true,
    role: 'county'
  },
  {
    path: '/health-dashboard',
    component: HealthDashboard,
    protected: true,
    role: 'health'
  }
];
