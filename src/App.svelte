<script>
import firebase from 'firebase/app';
import { googleProvider } from './firebase';
import { FirebaseApp, User } from 'sveltefire';
import Button , { Label } from '@smui/button';
import Chat from './Chat.svelte';
import Header from './Header.svelte';
import DrawerMenu from './DrawerMenu.svelte';

import Router from 'svelte-spa-router';
import routes from './router';
</script>

<FirebaseApp {firebase}>
  <nav>
    <Header />
    <DrawerMenu />
  </nav>
  <main>
    <User let:auth let:user>
      <div slot="signed-out">
        <div>Googleアカウントでログインしてください。</div>
        <Button on:click={() => auth.signInWithPopup(googleProvider)}><Label>ログイン</Label></Button>
      </div>
      <Router {routes} />
    </User>
  </main>
</FirebaseApp>

<style>
main {
  max-width: 980px;
  margin: 0 auto;
  padding: 30px;
}
</style>