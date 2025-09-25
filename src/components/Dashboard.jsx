import React from 'react'

export default function Dashboard(){
  return (
    <div style={{maxWidth:900, margin:'12px auto'}}>
      <h2>Dashboard</h2>
      <p style={{color:'#666'}}>Admin/Student summary and quick actions (skeleton). Implement lists, filters and analytics here.</p>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
        <div style={{padding:12, background:'#fff', borderRadius:8}}>Summary card (total students)</div>
        <div style={{padding:12, background:'#fff', borderRadius:8}}>Pending seeding</div>
      </div>
    </div>
  )
}
