// Minimal mock helpers. Replace with real firebase config & exports.
export const firebaseMock = {
  async saveStudent(student) {
    await new Promise(r => setTimeout(r, 200));
    return { id: 'mock_stud_' + Math.floor(Math.random()*90000 + 10000) };
  },
  async createRequest(req) {
    await new Promise(r => setTimeout(r, 200));
    return { id: 'mock_req_' + Math.floor(Math.random()*90000 + 10000) };
  }
};
