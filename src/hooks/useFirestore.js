// Simple wrapper around firebaseMock. Replace with real Firestore SDK calls later.
import { firebaseMock } from '../firebase'

export function useFirestore(){
  async function saveStudent(student){
    return firebaseMock.saveStudent(student)
  }
  async function createRequest(req){
    return firebaseMock.createRequest(req)
  }
  return { saveStudent, createRequest }
}
