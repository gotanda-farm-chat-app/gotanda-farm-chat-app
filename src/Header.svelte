<script>
import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
import IconButton from '@smui/icon-button';
import { drawerOpen } from './store.js';
</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      <IconButton class="material-icons" on:click={() => drawerOpen.set(true)}>menu</IconButton>
      <a class="title" href="/">
        <Title>Svelte Chat App</Title>
      </a>
    </Section>
  </Row>
</TopAppBar>

<style>
.title {
  color: #fff;
  text-decoration: none;
}
</style>