<template>
  <Spin :indicator="indicator" class="loading" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { Spin } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'LoadingComponent',
  components: {
    Spin,
  },
  setup() {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '50px',
      },
      spin: true,
    });

    return {
      indicator,
    };
  },
});
</script>

<style>
.loading {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
