<script>
import IconButton from '@smui/icon-button';
import Textfield from '@smui/textfield';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function postMessage(event) {
  event.preventDefault();
  dispatch('post', {
    message
  })
}

export let message;
</script>

<form class="chat-form">
  <Textfield class="chat-form_input" variant="outlined" bind:value={message} label="Please enter your message"/>
  <IconButton class="material-icons chat-form_post" on:click={postMessage}>send</IconButton>
</form>

<style>
.chat-form {
  display: flex;
  align-items: center;
}

* :global(.chat-form_input) {
  flex: 1;
}

* :global(.chat-form_post) {
  margin-left: 6px;
}
</style>