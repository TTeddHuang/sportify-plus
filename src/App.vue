<script setup></script>

<template>
<div id="app">
  <h1>Vue</h1>
  <br>
  <button type="button" class="btn btn-primary-100 mx-2">Primary</button>
  <button type="button" class="btn btn-secondary-100 mx-2">Secondary</button>
  <button type="button" class="btn btn-success mx-2">Success</button>
  <button type="button" class="btn btn-danger mx-2">Danger</button>
  <button type="button" class="btn btn-warning mx-2">Warning</button>
  <button type="button" class="btn btn-info mx-2">Info</button>
  <button type="button" class="btn btn-light mx-2">Light</button>
  <button type="button" class="btn btn-dark mx-2">Dark</button>

  <button type="button" class="btn btn-link mx-2">Link</button>
  <br>
  <br>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped></style>
