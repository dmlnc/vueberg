<template>
    <div class="gutentap-block-item">
        <div class="gutentap-block-item-icon" v-html="icon">
        </div>
        <div class="gutentap-block-item-info">
            <div class="gutentap-block-item-info-title"> {{ title }} </div>
            <div v-if="description" class="gutentap-block-item-info-description">{{ description }}</div>
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
  