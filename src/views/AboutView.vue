<template>
  <div class="about">
    <h1>This is an about page</h1>


    <a-button type="primary" size="small" @click="counter.increment()">Loading</a-button>
    <div> {{counter.count}}</div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
counter.increment();
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
