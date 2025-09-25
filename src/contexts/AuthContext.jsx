import React, { createContext, useContext, useState, useEffect } from 'react'

// Minimal AuthContext: replace with Firebase Auth integration
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // in production, attach Firebase auth listener
    // For now, keep user null (guest) or set a mock admin for testing
    // setUser({ uid: 'admin1', phone: '+9198xxxx0000', role: 'admin' })
  }, [])

  function loginMock(role='student'){
    setUser({ uid: 'mock_' + role, role, phone: 'mock' })
  }

  function logout(){ setUser(null) }

  return (
    <AuthContext.Provider value={{ user, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){ return useContext(AuthContext) }
