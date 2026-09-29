import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { restoreAdminSession, signOut } from '../lib/supabaseAuth';
import { SECURITY } from './runtime';
import { PageLoader } from '../components/PageLoader';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [state, setState] = useState<'loading'|'allowed'|'denied'>('loading');
  useEffect(() => { let active=true; restoreAdminSession().then(s=>active&&setState(s?'allowed':'denied')).catch(()=>active&&setState('denied')); return()=>{active=false}; }, []);
  useEffect(() => {
    if (state !== 'allowed') return;
    let lastActivity=Date.now(); const touch=()=>{lastActivity=Date.now()};
    const check=async()=>{if(Date.now()-lastActivity>SECURITY.adminSessionTimeoutMs){await signOut();window.location.replace(`/admin/login?expired=1&returnTo=${encodeURIComponent(location.pathname)}`)}};
    ['click','keydown','pointerdown','touchstart'].forEach(e=>window.addEventListener(e,touch,{passive:true})); const timer=window.setInterval(check,30000);
    return()=>{['click','keydown','pointerdown','touchstart'].forEach(e=>window.removeEventListener(e,touch));window.clearInterval(timer)};
  },[state,location.pathname]);
  if(state==='loading') return <PageLoader label="Verifying secure session"/>;
  if(state==='denied') return <Navigate to="/admin/login" replace state={{from:location.pathname}}/>;
  return <>{children}</>;
};
