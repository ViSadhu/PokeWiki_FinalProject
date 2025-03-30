<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h2 class="text-xl mb-4">Please Login</h2>
      <button @click="login" class="px-4 py-2 bg-blue-500 text-white rounded">
        Login with Google
      </button>
    </div>
  </template>
  
  <script setup>
  import authService from '../services/auth.js';
  
  const login = () => {
    authService.login();
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 20px;
  }
  </style>
  