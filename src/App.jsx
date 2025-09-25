import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StudentWizard from './components/StudentWizard'
import Dashboard from './components/Dashboard'

export default function App(){
  const [view, setView] = useState('home')

  return (
    <div>
      <Navbar onNavigate={setView} />
      <main className="container" style={{paddingTop: 12, paddingBottom: 80}}>
        {view === 'home' && (
          <>
            <h1>Shiksha Setu</h1>
            <p className="muted">Understand the difference between Aadhaar-linked and DBT-enabled Aadhaar-seeded bank accounts.</p>
            <div style={{marginTop:16}}>
              <button onClick={() => setView('wizard')}>Check My Status</button>
              <button style={{marginLeft:8}} onClick={() => setView('dashboard')}>Open Dashboard</button>
            </div>
          </>
        )}
        {view === 'wizard' && <StudentWizard />}
        {view === 'dashboard' && <Dashboard />}
      </main>
      <Footer />
    </div>
  )
}
