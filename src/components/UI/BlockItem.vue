<template>
    <div class="vueberg-block-item">
        <div class="vueberg-block-item-icon" v-html="icon">
        </div>
        <div class="vueberg-block-item-info">
            <div class="vueberg-block-item-info-title"> {{ title }} </div>
            <div v-if="description" class="vueberg-block-item-info-description">{{ description }}</div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        icon: {
            type: String,
            required: false,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        shotcut: {
            type: String,
            required: false,
        },
    },
  };
  </script>
  