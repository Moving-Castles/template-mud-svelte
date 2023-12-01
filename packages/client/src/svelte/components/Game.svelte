<script lang="ts">
  import { toastMessage } from "../modules/ui/toast"
  import { increment } from "../modules/action"
  import { playSound } from "../modules/sound"
  import { localPlayer, leaderBoard } from "../modules/state"
  import {
    waitForCompletion,
    TransactionState,
  } from "../modules/action/actionSequencer/utils"

  const GLYPHS = ["/", "–", "\\", "|"]
  let transactionState = TransactionState.READY
  let spinner = "|"

  function loadingSpinner(index: number) {
    playSound("snd", "progress")
    spinner = GLYPHS[index % GLYPHS.length]
  }

  const sendIncrement = async () => {
    try {
      playSound("snd", "click")
      transactionState = TransactionState.SENDING
      const action = increment()
      await waitForCompletion(action, loadingSpinner)
      playSound("snd", "success")
      transactionState = TransactionState.READY
    } catch (error) {
      playSound("snd", "failure")
      toastMessage(String(error), {
        type: "error",
        disappear: false,
      })
      transactionState = TransactionState.READY
    }
  }
</script>

<div class="game">
  <div class="split left">
    <button
      on:click={sendIncrement}
      class:disabled={transactionState !== TransactionState.READY}
    >
      {#if transactionState === TransactionState.READY}
        {$localPlayer.counter}
      {:else if transactionState === TransactionState.SENDING}
        {@html spinner}
      {/if}
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
    width: 12ch;
    height: 6ch;
    user-select: none;
    border-style: double;
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
    background: seagreen;
    padding: 10px;
  }

  table {
    width: 100%;
  }

  th {
    text-align: left;
  }
</style>
