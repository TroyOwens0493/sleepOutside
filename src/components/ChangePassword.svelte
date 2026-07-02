<script lang="ts">
  import { changePassword } from "../js/auth.svelte.ts";

  let currentPassword = $state("");
  let newPassword = $state("");
  let confirmPassword = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");
  let isSubmitting = $state(false);

  async function changePasswordHandler(event: Event) {
    event.preventDefault();
    errorMessage = "";
    successMessage = "";

    if (newPassword !== confirmPassword) {
      errorMessage = "New passwords do not match";
      return;
    }

    isSubmitting = true;
    try {
      await changePassword(currentPassword, newPassword);
      currentPassword = "";
      newPassword = "";
      confirmPassword = "";
      successMessage = "Password updated successfully";
    } catch (error: any) {
      errorMessage = error.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class="password-card">
  <h2>Change Password</h2>
  {#if errorMessage}
    <p class="status status--error">{errorMessage}</p>
  {/if}
  {#if successMessage}
    <p class="status status--success">{successMessage}</p>
  {/if}
  <form onsubmit={changePasswordHandler} class="password-form">
    <label>
      Current Password:
      <input
        type="password"
        bind:value={currentPassword}
        autocomplete="current-password"
        required
      />
    </label>
    <label>
      New Password:
      <input
        type="password"
        bind:value={newPassword}
        autocomplete="new-password"
        required
        minlength="6"
      />
    </label>
    <label>
      Confirm New Password:
      <input
        type="password"
        bind:value={confirmPassword}
        autocomplete="new-password"
        required
        minlength="6"
      />
    </label>
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Updating..." : "Update Password"}
    </button>
  </form>
</section>

<style>
  .password-card {
    max-width: 360px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .password-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
  .status {
    text-align: center;
    font-weight: bold;
  }
  .status--error {
    color: red;
  }
  .status--success {
    color: green;
  }
</style>
