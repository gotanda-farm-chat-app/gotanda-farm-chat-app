<script>
import List, {Item, Graphic, Separator} from '@smui/list';
import Card from '@smui/card';
import IconButton from '@smui/icon-button';
import Textfield from '@smui/textfield';

import ChatForm from './ChatForm.svelte';

import { userStore } from 'sveltefire';
import { db } from './firebase';
import { onMount } from 'svelte';

let user;
const unsubscribe = userStore().subscribe(u => user = u);

let posts = [];
let message = "";

function fetchMessage() {
  db.collection('posts')
    .orderBy('createdAt')
    .onSnapshot((querySnapShot) => {
      let allMessages = [];
      querySnapShot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        data.editingText = "";
        data.isEdit = false;
        allMessages.push(data);
      });
      posts = allMessages;
  });
}

function handleEdit(target) {
  posts = posts.map(post => {
    if (post.id === target.id) {
      post.isEdit = true;
      post.editingText = post.message;
    }
    return post;
  })
}

function deleteMessage(postId) {
  if(confirm('投稿を削除しますか？')) {
    db.collection('posts').doc(postId).delete();
  }
}

function postMessage(event) {
  message = event.detail.message;
  db.collection('posts').add({
    message,
    createdAt: new Date(),
    author: user.displayName,
    uid: user.uid,
    userIcon: user.photoURL,
  })
  message = '';
  scrollToBottom('.chat_content');
}

function editPost(target) {
  posts = posts.map(post => {
    if (post.id === target.id) {
      db.collection('posts').doc(post.id).update({
        message: post.editingText
      })
      post.isEdit = false;
    }
    return post;
  })
}

function editCancel(target) {
  posts = posts.map(post => {
    if (post.id === target.id) {
      post.isEdit = false;
    }
    return post;
  })
}

function scrollToBottom(selector) {
  const content = document.querySelector(selector)
  setTimeout(() => {
    content.scrollTop = content.scrollHeight;
  }, 500);
}

onMount(() => {
  fetchMessage();
  scrollToBottom('.chat_content');
})
</script>

<div class="container">
  <Card class="chat">
    <div class="chat_content">
      <List avatarList twoLine nonInteractive>
        {#each posts as post, index}
          <Item class="chat_item {post.uid === user.uid ? 'my-post' : ''}">
            <Graphic><img src={post.userIcon} alt="" class="thumbnail"></Graphic>
            <p class="chat_text">
              {#if post.isEdit}
                <span class="edit">
                  <Textfield class="edit_field" variant="outlined" bind:value={post.editingText}/>
                  <div class="edit_select">
                    <IconButton class="material-icons" on:click={() => editPost(post)}>save_alt</IconButton>
                    <IconButton class="material-icons" on:click={() => editCancel(post)}>cancel</IconButton>
                  </div>
                </span>
              {:else}
                { post.message }
              {/if}
            </p>
            {#if !post.isEdit && post.uid === user.uid}
              <span class="chat_option">
                <i class="material-icons chat_option-item" on:click={() => handleEdit(post)}>edit</i>
                <i class="material-icons chat_option-item" on:click={() => deleteMessage(post.id) }>close</i>
              </span>
            {/if}
          </Item>
          <Separator />
        {/each}
      </List>
    </div>
    <ChatForm {message} on:post={postMessage} />
  </Card>
</div>

<style>
* :global(.chat) {
  padding: 30px;
}

.chat_content {
  overflow: scroll;
  height: 55vh;
  margin-bottom: 24px;
}

* :global(.chat_item) {
  height: auto;
  padding: 24px 16px;
}

.chat_text {
  width: 100%;
  margin: 0;
  word-break: break-word;
}

.thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

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

.chat_option {
  position: absolute;
  right: 6px;
  top: 6px;
}

.chat_option-item {
  cursor: pointer;
  font-size: 1.25rem;
  color: #999;
}

.chat_option-item:not(:first-of-type) {
  margin-left: 6px;
}

.edit {
  display: flex;
  align-items: center;
}

* :global(.edit_field) {
  flex: 1;
}

.edit_select {
  margin-left: 6px;
}

* :global(.my-post) {
	background-color: rgba(135, 206, 235, .1);
}

* :global(.chat_item:hover .chat_option) {
  visibility: visible;
}

.chat_option {
  visibility: hidden;
  position: absolute;
  right: 6px;
  top: 6px;
}
</style>