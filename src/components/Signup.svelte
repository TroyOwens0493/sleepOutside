<script lang="ts">
  import { login, register } from "../js/auth.svelte.ts";

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let errorMessage = $state("");
  let isSubmitting = $state(false);

  async function signupHandler(event: Event) {
    event.preventDefault();
    errorMessage = "";
    isSubmitting = true;

    try {
      await register(name, email, password);
      await login(email, password);
      window.location.href = "/profile";
    } catch (error: any) {
      errorMessage = error.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<h2>Create an Account</h2>
{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={signupHandler} class="account-form">
  <label>
    Name:
    <input type="text" bind:value={name} autocomplete="name" required minlength="2" />
  </label>
  <label>
    Email:
    <input type="email" bind:value={email} autocomplete="email" required />
  </label>
  <label>
    Password:
    <input
      type="password"
      bind:value={password}
      autocomplete="new-password"
      required
      minlength="6"
    />
  </label>
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Creating Account..." : "Create Account"}
  </button>
</form>
<p class="account-link">
  Already have an account? <a href="/login">Login</a>
</p>

<style>
  .account-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 320px;
    margin: 2rem auto 1rem;
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
  button:disabled {
    cursor: wait;
    opacity: 0.7;
  }
  .account-link,
  .error {
    text-align: center;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>
