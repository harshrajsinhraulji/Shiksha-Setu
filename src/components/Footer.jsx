import React from 'react'

export default function Footer(){
  return (
    <footer style={{position:'fixed', bottom:0, left:0, right:0, background:'#fff', borderTop:'1px solid #eee'}}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', padding:12}}>
        <small>© {new Date().getFullYear()} Shiksha Setu</small>
        <small style={{color:'#666'}}>Privacy | Contact</small>
      </div>
    </footer>
  )
}
