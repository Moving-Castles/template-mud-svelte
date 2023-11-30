<script lang="ts">
  import { increment } from "../modules/action"
  import { localPlayer, leaderBoard } from "../modules/state"
  import {
    waitForTransaction,
    waitForCompletion,
    TransactionState,
  } from "../modules/action/actionSequencer/utils"

  let transactionState = TransactionState.READY

  const sendIncrement = async () => {
    transactionState = TransactionState.INITIATED
    const action = increment()
    transactionState = TransactionState.WAITING
    await waitForTransaction(action)
    transactionState = TransactionState.SENT
    await waitForCompletion(action)
    transactionState = TransactionState.READY
  }
</script>

<div class="game">
  <div class="split left">
    <button
      on:click={sendIncrement}
      class:disabled={transactionState !== TransactionState.READY}
    >
      {$localPlayer.counter}
    </button>
  </div>

  <div class="split right">
    <table>
      <tr>
        <th>Name</th>
        <th>Counter</th>
      </tr>
      {#each $leaderBoard as player}
        <tr>
          <td>{player.name}</td>
          <td>{player.counter}</td>
        </tr>
      {/each}
    </table>
  </div>
</div>

<style>
  .game {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
  }

  button {
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--font-size);
    padding: 20px 40px;
  }

  button.disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: default;
  }

  .split {
    width: 50%;
    height: 100%;
  }

  .split.left {
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .split.right {
    background: green;
    padding: 10px;
  }

  table {
    width: 100%;
  }

  th {
    text-align: left;
  }
</style>
