<script setup>
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'

const open = ref(false)
const value = defineModel({
  type: Number,
  default: 0
})

</script>

<script>
import { fetchGenerations } from '../api/generation';

export default {
  name: 'GenerationsList',
  data() {
    return {
      generations: [],
      error: null,
    };
  },
  async mounted() {
    try {
      const fetchedGenerations = await fetchGenerations();
      this.generations = fetchedGenerations.map((element) => ({
        id: element.id,
        label: `${element.name} - ${element.region}`,
      }));
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ value
          ? generations.find((generation) => generation.id === value)?.label
          : "Select Generation" }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search generation" />
        <CommandEmpty>No generation found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="generation in generations"
              :key="generation.id"
              :value="generation.id"
              @select="(ev) => {
                if (typeof ev.detail.value === 'number') {
                  value = ev.detail.value
                }
                open = false
              }"
            >
              {{ generation.label }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  value === generation.id ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script>

</script>