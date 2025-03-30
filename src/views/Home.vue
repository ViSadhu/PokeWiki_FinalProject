<script setup>
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <NavBar />

  <section class="homepage">
    <h1 class="title">The Custom Pokémon Project</h1>
    <p class="description">
      Welcome to the Custom Pokémon Manager! Use this app to create and manage your own Pokémon entries.
    </p>
    <div class="navigation">
      <router-link to="/add-pokemon" class="nav-button">Add Pokémon</router-link>
      <router-link to="/my-pokemon" class="nav-button">My Pokémon</router-link>
    </div>
  </section>

</template>

<style scoped>
.homepage {
  text-align: center;
  margin: 2rem;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.nav-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: hsl(217.2 91.2% 59.8%);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.nav-button:hover {
  background-color: #45a049;
}
</style>