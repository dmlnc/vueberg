<template>
  <button
    class="vueberg-button"
    :data-tooltip="label"
    :class="active ? activeClass : ''"
    v-html="content"
  ></button>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    activeClass: {
      type: String,
      required: false,
      default: "vueberg-button-active",
    },
    active: {
      type: Boolean,
    },
  },
};
</script>
