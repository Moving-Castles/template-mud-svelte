<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { spawn } from "../modules/action"
  import {
    waitForTransaction,
    waitForCompletion,
    TransactionState,
  } from "../modules/action/actionSequencer/utils"

  const dispatch = createEventDispatcher()

  let name = ""
  let transactionState = TransactionState.READY

  const onSubmit = async () => {
    transactionState = TransactionState.INITIATED
    const action = spawn(name)
    transactionState = TransactionState.WAITING
    await waitForTransaction(action)
    transactionState = TransactionState.SENT
    await waitForCompletion(action)
    transactionState = TransactionState.DONE
    await new Promise(resolve => setTimeout(resolve, 1000))
    dispatch("done")
  }
</script>

<div class="spawn">
  {#if transactionState === TransactionState.READY}
    <form on:submit|preventDefault={onSubmit}>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="text"
        autofocus
        required
        placeholder="Name"
        bind:value={name}
      />
      <button type="submit">Spawn</button>
    </form>
  {:else}
    <div>
      {TransactionState[transactionState]}
    </div>
  {/if}
</div>

<style>
  .spawn {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin: 0;
    padding: 0;
  }

  form {
    display: block;
  }

  input {
    font-family: var(--font-family);
    font-size: var(--font-size);
    padding: 10px;
  }

  button {
    font-family: var(--font-family);
    font-size: var(--font-size);
    padding: 10px;
  }
</style>
