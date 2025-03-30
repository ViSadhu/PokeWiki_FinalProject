<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import Dropdown from '@/components/dropdown.vue'

import { toTypedSchema } from '@vee-validate/zod'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import { ref } from 'vue'

const formSchema = toTypedSchema(z.object({
    name: z.string().min(1, "Name must be at least 1 characters").max(50, "Name must be at most 50 characters"),
    type: z.string().min(1, "Type must be at least 1 characters").max(50, "Type must be at most 50 characters"),
    description: z.string().optional(),
    generation: z.number().min(1, { message: "Please select a generation" }),
    type: z.string().nonempty("Type is required")
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const formData = ref({
    name: '',
    type: '',
    description: null,
    generation: null
})

import { addPokemon } from '../api/pokemon.js'

const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    try {
        const result = await addPokemon(values)
        console.log('Submitted successfully:', result);
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <form class="mx-10 space-y-6" @submit="onSubmit">

        <div class="grid-cols-4 grid-rows-3">
            <div class="columns-1 sm:columns-2">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Pokémon Name" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            This is the name of your Pokémon
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="type">
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Pokémon Type" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            This is the type of your Pokémon (can be custom)
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <br />

            <FormField v-slot="{ componentField }" name="description">
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Description" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        This is the description of your Pokémon (optional)
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <br />


            <FormField v-slot="{ componentField }" name="generation">
                <FormItem>
                    <FormLabel class="mr-5">Generation</FormLabel>
                    <FormControl>
                        <Dropdown v-bind="componentField" v-model="formData.generation" />
                    </FormControl>
                </FormItem>
            </FormField>

            <br />

            <Button type="submit">
                Submit
            </Button>
        </div>
    </form>
</template>