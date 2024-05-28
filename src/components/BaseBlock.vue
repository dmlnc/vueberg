<template>
  <node-view-wrapper
    class="gutentap-customblock" 
    :data-block-width="node.attrs.blockWidth"
    :class="{
      ['gutentap-customblock--' + (gutenTapBlock?.name || '')]: true,
      'gutentap-customblock--outline': isEditable,
      'gutentap-customblock--has-header': isEditable,
    }"
  >
    <div contenteditable="false" v-if="isEditable && gutenTapBlock?.name" class="gutentap-customblock-header">
      <div class="gutentap-customblock-header-title">
        <span class="gutentap-customblock-header-title-icon" v-html="gutenTapBlock?.icon "></span>
        {{ gutenTapBlock?.title }}
      </div>
      <div class="gutentap-customblock-header-mode" v-if="gutenTapBlock?.gutenTapBlock?.hasPreviewMode !== false ">
        <span @click="toggleMode">{{ isPreviewMode ? 'Редактировать' : 'Просмотр' }}</span>
      </div>
    </div>
    <div class="gutentap-customblock-body">
      <!-- {{ allowedBlocks }} -->
      <slot :isEditable="isEditable" :isPreviewMode="isPreviewModeComputed" :gutenTapBlock="gutenTapBlock"  />
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
      gutenTapBlock: this.editor.storage.gutentapBlocks.getBlockTool(this.node.type.name, false),
    }
  },
  mounted(){
   
    // this.gutenTapBlock = this.editor.storage.gutentapBlocks.getBlockTool(this.node.type.name);
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
