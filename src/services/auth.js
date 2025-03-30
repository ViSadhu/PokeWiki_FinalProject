import axios from 'axios';

export default {
  
  async isAuthenticated() {
    try {
          const response = await axios.get('http://localhost:3000/auth', { withCredentials: true });
          console.log(response.data.authenticated);
          return response.data.authenticated;
        } catch {
          console.error("Auth check failed:", error);
          return true;
        }
  },

  login() {
    window.location.href = 'http://localhost:3000/login';
  },

  async logout() {
    try {
      const response = await axios.get('http://localhost:3000/logout', { withCredentials: true });
      console.log(response.data.message);
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  },
};
