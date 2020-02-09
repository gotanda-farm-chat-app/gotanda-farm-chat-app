import Chat from './Chat.svelte';
import Profile from './Profile.svelte';

const routes = {
  '/': Chat,
  '/profile/:id': Profile,
  '*': Chat
}

export default routes