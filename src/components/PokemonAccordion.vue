<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ref, onMounted } from 'vue';
import { fetchPokemons } from '../api/pokemon';

const defaultValue = '1';
const pokemons = ref([]);
const error = ref(null);
const isLoading = ref(true);

// Fetch the Pokémon data when the component is mounted
onMounted(async () => {
  try {
    pokemons.value = await fetchPokemons();
    isLoading.value = false;
  } catch (err) {
    error.value = err.message;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="mx-10">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center p-4 text-gray-500">
      Loading Pokémon...
    </div>

    <!-- Error message -->
    <div v-if="error" class="text-center p-4 text-red-500">
      Error: {{ error }}
    </div>

    <!-- No Pokémon message -->
    <div v-if="!isLoading && pokemons.length === 0" class="text-center p-4 text-gray-500">
      No Pokémon added yet. Try adding some!
    </div>

    <!-- Pokémon accordion list -->
    <Accordion v-if="!isLoading && pokemons.length > 0" type="single" class="w-full" collapsible :default-value="defaultValue">
      <AccordionItem v-for="pokemon in pokemons" :key="pokemon.id" :value="pokemon.name">
        <AccordionTrigger>{{ pokemon.name }}</AccordionTrigger>
        <AccordionContent>
          <div class="sm:grid-cols-2 p-2">
            <div class="sm:columns-2">
              <p><strong>Name:</strong> {{ pokemon.name }}</p>
              <p><strong>Description:</strong> {{ pokemon.description }}</p>
            </div>
            <div class="sm:columns-2">
              <p><strong>Generation:</strong> {{ pokemon.generation.name }}</p>
              <p><strong>Type:</strong> {{ pokemon.type.name }}</p>
            </div>
            <div class="sm:columns-2">
              <p><strong>Region:</strong> {{ pokemon.generation.region }}</p>
              <p><strong>Date Added:</strong> {{ pokemon.date }}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.text-gray-500 {
  color: #6b7280;
}
.text-red-500 {
  color: #ef4444;
}
</style>
