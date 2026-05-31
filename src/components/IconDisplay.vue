<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: { type: String, default: '' },
  size: { type: [String, Number], default: null },
  alt: { type: String, default: '' },
})

const isUrl = computed(() => /^https?:\/\//.test(props.icon))
</script>

<template>
  <img
    v-if="isUrl"
    :src="icon"
    :style="size ? { width: size + 'px', height: size + 'px' } : {}"
    class="icon-img"
    :alt="alt"
  />
  <i v-else-if="icon" :class="icon" :style="size ? { fontSize: size + 'px' } : {}"></i>
</template>

<style scoped>
.icon-img {
  display: block;
  object-fit: contain;
}
</style>
