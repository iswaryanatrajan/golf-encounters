// Create a file named auth.js or authService.js

// Set the user's token in localStorage when they log in
export const setAuthToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  // Remove the user's token from localStorage when they log out
  export const removeAuthToken = () => {
    localStorage.removeItem("token");
  };
  
  // Check if the user is authenticated (logged in)
  export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if the token exists, indicating the user is authenticated
  };
  