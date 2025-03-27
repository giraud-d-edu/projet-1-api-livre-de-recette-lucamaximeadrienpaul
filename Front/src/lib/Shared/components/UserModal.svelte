<script>
    export let isOpen = false;
    export let onClose;
  </script>
  
  {#if isOpen}
    <div class="overlay" role="button" tabindex="0" on:click={onClose} on:keydown={(e) => e.key === 'Enter' && onClose()}>
      <div class="modal" role="dialog" aria-modal="true" tabindex="0" on:click|stopPropagation on:keydown={(e) => e.key === 'Escape' && onClose()}>
        <slot></slot>
        <button class="close-btn" on:click={onClose}>Fermer</button>
      </div>
    </div>
  {/if}
  
    <style>
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      min-width: 300px;
      max-width: 500px;
      text-align: center;
    }
    .close-btn {
      margin-top: 10px;
      background: red;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>