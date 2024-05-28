<template>
  <div class="gutentap-modal-layout">
      <div class="gutentap-modal-backdrop" @click="clickBackdrop"></div>
      <div class="gutentap-modal" :class="`gutentap-modal-${size}`">
          <div class="gutentap-modal-header" v-if="showHeader">
              <div class="gutentap-modal-header-title">
                  {{ title }}
              </div>
              <div class="gutentap-modal-header-close" v-if="closable" @click="hideModal">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
              </div>
          </div>
          <div class="gutentap-modal-body" v-if="content" v-html="content"></div>
      </div>
  </div>
</template>

<script>
import { popModal } from 'jenesius-vue-modal';

export default {
  name: 'DefaultContentLayout',
  props: {
    closeOnBackdropClick: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      default: null,
    },
    size: {
      type: String,
      default: 'sm',
    },
    editor: {
      type: [Object, Function],
      required: true,
    },
  },
  methods: {
    clickBackdrop(){
      if(!this.closable){
        return false;
      }
      if(!this.closeOnBackdropClick) {
        return false;
      }
      this.hideModal();
    },
    hideModal(){
      popModal();
    },
  }
};
</script>
