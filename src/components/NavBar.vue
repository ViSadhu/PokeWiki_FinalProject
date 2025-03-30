<script setup>
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { ref, onMounted } from 'vue';
import authService from '../services/auth.js';

const isAuthenticated = ref(false);

onMounted(async () => {
    try {
        isAuthenticated.value = await authService.isAuthenticated();
        console.log("Authenticated:", isAuthenticated.value);
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
});

const login = async () => {
    authService.login();
};

const logout = async () => {
    await authService.logout();
    isAuthenticated.value = false;
};

</script>

<template>
    <div class="flex justify-center w-screen">
        <NavigationMenu class="flex justify-center items-center w-screen my-3 px-2">
            <div class="auto-cols-fr">
                <NavigationMenuList>
                    <div class="columns-2 sm:columns-4 sm:justify-evenly sm:text-center">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/add-pokemon" :class="navigationMenuTriggerStyle()">
                                Add Pokémon
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/my-pokemon" :class="navigationMenuTriggerStyle()">
                                My Pokémon
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <button 
                                @click="isAuthenticated ? logout() : login()" 
                                :class="navigationMenuTriggerStyle()" 
                                class="px-4 py-2 rounded">
                                {{ isAuthenticated ? 'Logout' : 'Login' }}
                            </button>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    </div>

    <hr />
</template>