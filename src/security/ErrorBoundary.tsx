import React from 'react';
import { Link } from 'react-router-dom';
export class ErrorBoundary extends React.Component<React.PropsWithChildren,{hasError:boolean}> {
  state={hasError:false}; static getDerivedStateFromError(){return {hasError:true}};
  componentDidCatch(error:unknown){console.error('Application rendering error',error)}
  render(){if(!this.state.hasError)return this.props.children;return <div className="min-h-screen grid place-items-center bg-[#f6f8fc] p-6"><div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm"><h1 className="text-2xl font-extrabold text-[#0d0a64]">Something went wrong</h1><p className="mt-3 text-sm text-slate-500">The page could not be displayed safely. Return home and try again.</p><Link to="/" className="inline-flex mt-6 px-5 py-3 rounded-xl bg-[#e7020b] text-white text-sm font-bold">Return to website</Link></div></div>}
}
