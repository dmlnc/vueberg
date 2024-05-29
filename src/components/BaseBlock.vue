<template>
  <node-view-wrapper
    class="vueberg-customblock" 
    :data-block-width="node.attrs.blockWidth"
    :class="{
      ['vueberg-customblock--' + (vueBergBlock?.name || '')]: true,
      'vueberg-customblock--outline': isEditable,
      'vueberg-customblock--has-header': isEditable,
    }"
  >
    <div contenteditable="false" v-if="isEditable && vueBergBlock?.name" class="vueberg-customblock-header">
      <div class="vueberg-customblock-header-title">
        <span class="vueberg-customblock-header-title-icon" v-html="vueBergBlock?.icon "></span>
        {{ vueBergBlock?.title }}
      </div>
      <div class="vueberg-customblock-header-mode" v-if="vueBergBlock?.vueBergBlock?.hasPreviewMode !== false ">
        <span @click="toggleMode">{{ isPreviewMode ? 'Редактировать' : 'Просмотр' }}</span>
      </div>
    </div>
    <div class="vueberg-customblock-body">
      <!-- {{ allowedBlocks }} -->
      <slot :isEditable="isEditable" :isPreviewMode="isPreviewModeComputed" :vueBergBlock="vueBergBlock"  />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { TextSelection } from 'prosemirror-state';

export default {
  props: nodeViewProps,

  components: {
    NodeViewWrapper,
    // NodeViewContent,
  },
  data() {
    return {
      isPreviewMode: false,
      isEditable: this.editor.isEditable,
      vueBergBlock: this.editor.storage.vuebergBlocks.getBlockTool(this.node.type.name, false),
    }
  },
  mounted(){
   
    // this.vueBergBlock = this.editor.storage.vuebergBlocks.getBlockTool(this.node.type.name);
  },
  computed:{
    isPreviewModeComputed(){
      if(!this.isEditable){
        return true;
      }
      return this.isPreviewMode
    }
  },
  methods: {
    toggleMode() {
      this.isPreviewMode = !this.isPreviewMode;
    },
  },
}
</script>

<style scoped>
.editable-wrapper {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}
.editable-wrapper.preview {
  background-color: #f9f9f9;
}
.wrapper-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
</style>
