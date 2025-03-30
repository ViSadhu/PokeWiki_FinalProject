import axios from 'axios';

export default {
  
  /**
   * Checks if the user is authenticated by making a GET request to the server.
   *
   * If the request is successful and the server responds with an 'authenticated' property set to true, the promise resolves to true.
   * If the request fails or the server responds with an 'authenticated' property set to false, the promise resolves to false.
   * If an error occurs during the request, the promise resolves to true and logs the error to the console.
   */
  async isAuthenticated() {
    try {
      const response = await axios.get('http://localhost:3000/auth', { withCredentials: true });
      console.log(response.data.authenticated);
      return response.data.authenticated;
    } catch (error) {
      console.error("Auth check failed:", error);
      return true;
    }
  },


  /**
   * Redirects the user to the login page by changing the window's location.
   *
   * This function is used to initiate the login process by redirecting the user to the server's login page.
   * When the user successfully authenticates, they will be redirected back to the application.
   *
   * @returns {void} This function does not return any value.
   */
  login() {
    window.location.href = 'http://localhost:3000/login';
  },

  /**
   * Performs a logout by making a GET request to the server and then redirects the user to the home page.
   *
   * This function is used to log out the current user by making a GET request to the server's logout endpoint.
   * If the request is successful, the user will be redirected to the home page.
   * If an error occurs during the request, an error message will be logged to the console and an alert will be displayed to the user.
   *
   * @returns {void} This function does not return any value.
   */
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
