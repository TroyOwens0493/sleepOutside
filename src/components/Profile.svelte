<script lang="ts">
  import {userStore, logout } from "../js/auth.svelte";
  import { onMount } from "svelte";
  const baseURL = import.meta.env.PUBLIC_SERVER_URL;
  let profile = $state("");

  async function getProfile() {
    const res = await fetch(`${baseURL}users/protected`, {
      method: "GET",
      headers: {
        
        Authorization: `Bearer ${userStore.token}`
      }
    });
    if (res.ok) {
      return res.json();
    } else {
    
      logout();
    }
  }
  
  async function init() {
    profile = await getProfile();
  }
  onMount(init);
</script>

{#if userStore.isLoggedIn}
  <p>{profile.message}</p>
{:else}
  <p>You must login to see this page</p>
{/if}