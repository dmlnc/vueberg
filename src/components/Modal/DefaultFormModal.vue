<template>
    <div class="vueberg-modal-layout">
        <div class="vueberg-modal-backdrop" @click="clickBackdrop"></div>
        <div class="vueberg-modal" :class="`vueberg-modal-${size}`">
            <div class="vueberg-modal-header" v-if="showHeader">
                <div class="vueberg-modal-header-title">
                    {{ title }}
                </div>
                <div class="vueberg-modal-header-close" v-if="closable" @click="hideModal">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                </div>
            </div>
            <div class="vueberg-modal-body">
              <div class="vueberg-form">
                <div 
                    class="vueberg-form-item"
                    v-for="(item, index) in form"
                    :key="index"
                >
                    <label :for="`vueberg-modal-input-${item.name}-${index}`">{{ item.label }}</label>
                    <input :id="`vueberg-modal-input-${item.name}-${index}`" :placeholder="item.placeholder" :autofocus="index == 0 ? true : false" class="vueberg-form-control" type="text" v-model="item.value">
                    <small v-if="item.text" v-html="item.text"></small>
                </div>
                <div class="vueberg-form-buttons">
                    <menu-button
                        class="vueberg-button-lg vueberg-button-secondary vueberg-button-text vueberg-button-text-only" 
                        @click.prevent="hideModal"
                        :content="cancelButton">
                    </menu-button>
                    <menu-button 
                        class="vueberg-button-lg vueberg-button-primary vueberg-button-text vueberg-button-text-only" 
                        @click.prevent="okHandler"
                        :content="okButton">
                    </menu-button>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { popModal, Modal } from 'jenesius-vue-modal';
import MenuButton from "@/components/UI/MenuButton.vue";

export default {
    name: 'DefaultModalLayout',
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
      size: {
        type: String,
        default: 'sm',
      },
      editor: {
        type: [Object, Function],
        required: true,
      },
      form: {
        type: [Object, Array],
        default: [],
      },
      okButton: {
        type: String,
        default: 'Ок',
      },
      cancelButton: {
        type: String,
        default: 'Отменить',
      },
    },
    components:{
      MenuButton
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
      okHandler(){
          this.$emit(Modal.EVENT_PROMPT, this.form);
      }
    }
};
</script>
