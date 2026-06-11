<script lang="ts">
  import { onMount } from "svelte";
  import { login } from "../js/auth.svelte.ts";
  import { getParam } from "../js/utils.mts";

  let {
    onSuccess = (path) => {
      window.location.href = path;
    },
  } = $props<{
    onSuccess?: (data: { email: string }) => void;
  }>();

  let email = $state("test@test.com");
  let password = $state("");
  let errorMessage = $state("");
  let redirectPath = "/";

  async function loginHandler(event: Event) {
    event.preventDefault();
    // Handle login logic here
    try {
      const results = await login(email, password);

      onSuccess(redirectPath);
    } catch (error: any) {
      console.log(error);
      errorMessage = error.message;
    }
  }

  onMount(() => {
    // we added the getParam function to utils in Team 5
    const param = getParam("redirect");
    if (param) {
      // if the redirect param exists use that
      redirectPath = param;
    } else if (document.referrer != window.location.href) {
      // otherwise send back to the referring page if set
      redirectPath = document.referrer;
    }
    // otherwise redirectPath will stay "/" (send home)
  });
</script>

<h2>Login</h2>
{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={loginHandler} class="login-form">
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>
  <button type="submit">Login</button>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>
