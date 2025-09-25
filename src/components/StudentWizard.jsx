import React, { useState } from 'react'
import { firebaseMock } from '../firebase'

export default function StudentWizard(){
  const [step, setStep] = useState(1)
  const [identity, setIdentity] = useState({ name:'', phone:'' })
  const [bank, setBank] = useState({ bankName:'', accountLast4:'', aadharLast4:'', aadhaarLinked:false })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function validateStep1(){
    if(!identity.name || !identity.phone) return 'Enter name and phone'
    return ''
  }
  function validateStep2(){
    if(bank.aadharLast4.length !== 4 || bank.accountLast4.length !== 4) return 'Enter last 4 digits for Aadhaar and account'
    return ''
  }

  async function next(){
    setError('')
    if(step === 1){
      const e = validateStep1(); if(e){ setError(e); return }
      setStep(2); return
    }
    if(step === 2){
      const e = validateStep2(); if(e){ setError(e); return }
      // run check
      setLoading(true)
      try {
        // Create a request record (mock)
        const req = await firebaseMock.createRequest({ student: identity, bank })
        // Quick heuristic result (mock)
        let status = 'unknown'
        if(bank.aadhaarLinked && Math.random() > 0.35) status = 'dbt_enabled'
        else if(bank.aadhaarLinked) status = 'linked_not_dbt'
        else status = 'not_linked'
        setResult({ status, reqId: req.id })
        setStep(3)
      } catch(err){
        setError('Server error')
      } finally { setLoading(false) }
    }
  }

  function back(){ setError(''); setStep(s => Math.max(1, s-1)) }

  function bookHelp(){
    // In production: create appointment record. Here: simple flow
    alert('Booked help. Volunteer will contact you.')
  }

  function downloadChecklist(){
    const text = `Checklist for seeding Aadhaar:
Name: ${identity.name}
Phone: ${identity.phone}
Aadhaar (last4): ${bank.aadharLast4}
Bank account (last4): ${bank.accountLast4}
Bring original Aadhaar and bank passbook.
`
    const blob = new Blob([text], {type:'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'checklist.txt'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div style={{maxWidth:560, margin:'12px auto', paddingBottom:40}}>
      <h2>Student Status Wizard</h2>
      <div style={{marginTop:8}}>
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <div style={{flex:1, height:8, background:'#eee', borderRadius:6, overflow:'hidden'}}><div style={{width: `${(step/3)*100}%`, height:'100%', background:'#1f8ef1'}}/></div>
        </div>

        {step === 1 && (
          <div>
            <label>Name</label>
            <input value={identity.name} onChange={e => setIdentity({...identity, name: e.target.value})} />
            <label>Phone</label>
            <input value={identity.phone} onChange={e => setIdentity({...identity, phone: e.target.value})} />
            <div style={{fontSize:13, color:'#666'}}>OTP-based login will replace this input in production.</div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Bank name</label>
            <input value={bank.bankName} onChange={e => setBank({...bank, bankName: e.target.value})} />
            <label>Account last 4 digits</label>
            <input value={bank.accountLast4} inputMode="numeric" onChange={e => setBank({...bank, accountLast4: e.target.value.replace(/\D/g,'').slice(0,4)})} />
            <label>Aadhaar last 4 digits</label>
            <input value={bank.aadharLast4} inputMode="numeric" onChange={e => setBank({...bank, aadharLast4: e.target.value.replace(/\D/g,'').slice(0,4)})} />
            <div style={{marginTop:6}}>
              <label><input type="checkbox" checked={bank.aadhaarLinked} onChange={e => setBank({...bank, aadhaarLinked: e.target.checked})} /> Aadhaar is currently linked to this account</label>
            </div>
            <div style={{fontSize:12, color:'#666'}}>We only store last 4 digits (masked) for privacy.</div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Result</h3>
            {loading && <p>Checking status...</p>}
            {!loading && result && (
              <div>
                {result.status === 'dbt_enabled' && <div style={{border:'1px solid #0a0', padding:12}}> <strong>DBT enabled</strong><p>Your account looks DBT-enabled. You should receive scholarship transfers.</p></div>}
                {result.status === 'linked_not_dbt' && <div style={{border:'1px solid #e68a00', padding:12}}> <strong>Aadhaar linked but DBT not enabled</strong><p>Action: go to branch or book help.</p><div style={{marginTop:8}}><button onClick={bookHelp}>Book Help</button><button onClick={downloadChecklist} style={{marginLeft:8}}>Download Checklist</button></div></div>}
                {result.status === 'not_linked' && <div style={{border:'1px solid #c00', padding:12}}> <strong>Aadhaar not linked</strong><p>Action: link Aadhaar with bank then seed for DBT. Book help if unsure.</p><div style={{marginTop:8}}><button onClick={bookHelp}>Book Help</button><button onClick={downloadChecklist} style={{marginLeft:8}}>Download Checklist</button></div></div>}
                {result.status === 'unknown' && <p>Could not determine. Book help.</p>}
              </div>
            )}
          </div>
        )}

        <div style={{display:'flex', gap:8, marginTop:12}}>
          {step > 1 && <button onClick={back} style={{background:'#eee', color:'#000'}}>Back</button>}
          {step < 3 && <button onClick={next}>{step === 2 ? (loading ? 'Checking...' : 'Check Status') : 'Next'}</button>}
        </div>

        {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
      </div>
    </div>
  )
}
