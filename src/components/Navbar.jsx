import React from 'react'

export default function Navbar({ onNavigate }) {
  return (
    <header style={{background:'#fff', borderBottom:'1px solid #eee', position:'sticky', top:0, zIndex:100}}>
      <div className="container" style={{display:'flex', alignItems:'center', gap:12, padding:12}}>
        <div style={{fontWeight:700, color:'#0b2336'}}>Shiksha Setu</div>
        <nav style={{marginLeft:'auto', display:'flex', gap:8}}>
          <button onClick={() => onNavigate('home')} style={{background:'transparent', color:'#0b2336'}}>Home</button>
          <button onClick={() => onNavigate('wizard')} style={{background:'transparent', color:'#0b2336'}}>Check</button>
          <button onClick={() => onNavigate('dashboard')} style={{background:'transparent', color:'#0b2336'}}>Dashboard</button>
        </nav>
      </div>
    </header>
  )
}
