<script>
import Drawer, {Scrim, Content, Header, Title} from '@smui/drawer';
import List, {Item, Graphic, Separator, Text} from '@smui/list';
import { drawerOpen } from './store.js';
import { googleProvider } from './firebase';
import { User } from 'sveltefire';
import { push } from 'svelte-spa-router'

function pageTransition(url) {
  drawerOpen.set(false);
  push(url);
}

function logout(auth) {
  auth.signOut().then(() => {
    drawerOpen.set(false)
  })
}

function login(auth) {
  auth.signInWithPopup(googleProvider).then(() => {
    drawerOpen.set(false)
  })
}
</script>

<div class="drawer-menu">
  <Drawer variant="modal" style="top: 0" bind:open={$drawerOpen}>
    <Header>
      <Title>Menu</Title>
    </Header>
    <Content>
      <User let:auth let:user>
        <List>
          <Item href="javascript:void(0)" on:click={() => pageTransition(`/`)}>
            <Graphic class="material-icons" aria-hidden="true">chat</Graphic>
            <Text>トップ</Text>
          </Item>
          <Item href="javascript:void(0)" on:click={() => pageTransition(`/profile/${user.uid}`)}>
            <Graphic class="material-icons" aria-hidden="true">account_circle</Graphic>
            <Text>プロフィール</Text>
          </Item>
          <Separator nav />
          <Item href="javascript:void(0)" on:click={() => logout(auth)}>
            <Graphic class="material-icons" aria-hidden="true">highlight_off</Graphic>
            <Text>ログアウト</Text>
          </Item>
        </List>
        <div slot="signed-out">
          <List>
            <Item href="javascript:void(0)" on:click={() => login(auth)}>
              <Graphic class="material-icons" aria-hidden="true">exit_to_app</Graphic>
              <Text>ログイン</Text>
            </Item>
          </List>
        </div>
      </User>
    </Content>
  </Drawer>
  <Scrim />
</div>