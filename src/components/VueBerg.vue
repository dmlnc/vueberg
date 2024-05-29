<template>
  <div class="vueberg" style="position: relative;" ref="vueberg">
    <widget-container-modal />

    <bubble-menu
      pluginKey="mainMenu"
      :should-show="shouldShowMainToolbar"
      :updateDelay="250"
      v-if="editor"
      :editor="editor"
      :class="{
        'vueberg-bubble-menu-hidden': isTyping,
      }"
      class="vueberg-bubble-menu"
      :tippy-options="{
        delay: [0, 300], 
        duration: [300, 400],
        maxWidth: 'none',
        placement: 'top-start',
        getReferenceClientRect: getMenuCoords,
        onCreate: (instance) =>
          instance.popper.classList.add('vueberg-toolbar-wrapper'),
      }"
    >
      <Toolbar
        v-if="currentBlockTool?.nodeType !== undefined"
        :editor="editor"
        :currentBlockTool="currentBlockTool"
        :settings="mergedSettings"
        :inlineTools="allInlineTools"
        :alignmentTools="allAlignmentTools"
        :vuebergWidth="vuebergWidth"
      />
    </bubble-menu>


    <floating-menu 
      v-if="currentBlockTool" 
      :updateDelay="1000"
      :should-show="shouldShowFloatingMenu"
      :editor="editor" 
      :tippy-options="{ 
        delay: [0, 0], 
        duration: [100, 100],
        getReferenceClientRect: getBlockEndCoords,
      }"
    >
      <menu-button
        @click="openBlocksModal"
        class="vueberg-button-primary vueberg-button-text-only  vueberg-button-blocks"
        content="+"
      />
    </floating-menu>

    <editor-content
      @keydown="isTyping = true"
      @keydown.esc="isTyping = false"
      @keyup.esc="isTyping = false"
      ref="editor"
      :editor="editor"
    />
    
  </div>
</template>

<script>
import MenuButton from "@/components/UI/MenuButton.vue";
import MenuItem from "@/components/UI/MenuItem.vue";
import Toolbar from "./Toolbar.vue";
import { BubbleMenu, Editor, EditorContent, FloatingMenu } from "@tiptap/vue-3";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { container as WidgetContainerModal } from "jenesius-vue-modal";
import { GetCurrentBlockCoords, GetCurrentBlockEndCoords, GetCurrentNode } from "../utils/pm-utils.js";
import { mergeArrays } from "../utils/utils.js";
import BlockWidth from "../extensions/block-width/index.js";
import VuebergBlocks from "../extensions/vueberg-blocks/index.js";
import { ModalExtension } from "./Modal/modal.js";
import Variants from "../extensions/variants/index";
import defaultBlockTools from "../tools/block-tools.js";
import defaultExtensions from "../extensions/default-extensions.js";
import defaultInlineTools from "../tools/inline-tools.js";
import defaultAlignmentTools from "../tools/alignment-tools.js";
import BlocksModal from "@/components/Modal/BlocksModal.vue";

export default {
  props: {
    modelValue: {},
    editable: {
      default: true,
    },
    mode: {
      type: String,
      default: "html",
    },
    settings: {
      type: Object,
      default: () => ({
        defaultExtensions: {}
      }),
    },
   
    // TODO:
    placeholder: {
      type: String,
      default: "Начните писать",
    },


   
    extensions: {
      type: Array,
      default: () => [],
    },

    blockTools: {
      type: Array,
      default: () => [],
    },
    inlineTools: {
      type: [Array, Boolean],
      default: () => [],
    },
    alignmentTools: {
      type: [Array, Boolean],
      default: () => [],
    },

  },

  components: {
    BubbleMenu,
    EditorContent,
    MenuButton,
    MenuItem,
    FloatingMenu,
    WidgetContainerModal,
    Toolbar,
    BlocksModal
  },

  data() {
    return {
      vuebergWidth: 0,
      editor: null,
      defaultSettings: {
        defaultExtensions: {},
      },
      allDefaultExtensions: defaultExtensions(),
      allBlockTools: mergeArrays(defaultBlockTools(), this.blockTools),
      allInlineTools: mergeArrays(defaultInlineTools(), this.inlineTools),
      allAlignmentTools: mergeArrays(defaultAlignmentTools(), this.alignmentTools),
      isTyping: false,
      showMainToolbar: false,
      // EventListners
      handleMouseMove: null,
      handleResize: null,

      currentBlockTool: null,
    };
  },

  created() {
    this.handleMouseMove = this.cancelTyping.bind(this);
    this.handleResize = this.updateVuebergWidth.bind(this);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
  },

  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.updateVuebergWidth();
    this.initializeEditor();
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  watch: {
    editable(newValue) {
      this.editor.setEditable(newValue);
    },
  },

  computed: {
    mergedSettings() {
      return { ...this.defaultSettings, ...this.settings };
    },
    blocksWithVariant() {
      return this.filterBlocks(block => block?.settings?.variants);
    },
    blocksWithBlockWidth() {
      return this.filterBlocks(block => 
        (block.settings?.blockWidth === true));
    },
    blocksWithTextAlign() {
      return this.filterBlocks(block => 
        (block.settings?.textAlign === true));
    },
  },

  methods: {
    openBlocksModal(){
      this.editor.commands.openModal({}, BlocksModal);
    },
    filterBlocks(predicate) {
      return this.allBlockTools
        .flatMap(category => category.blocks)
        .filter(predicate)
        .map(block => block.name);
    },
    initializeEditor() {
      const enabledExtensions = this.getEnabledExtensions();
      const allBlockToolsFiltered = this.allBlockTools
        .map(category => {
          const filteredBlocks = category.blocks.filter(block => block.insertCommand);
          return filteredBlocks.length > 0 ? { ...category, blocks: filteredBlocks } : null;
        })
        .filter(category => category !== null);

      this.editor = new Editor({
        extensions: [
          ...enabledExtensions,
          VuebergBlocks.configure({ blocks: allBlockToolsFiltered }),
          Placeholder.configure({ considerAnyAsEmpty: true, placeholder: this.placeholder }),
          BlockWidth.configure({ types: this.blocksWithBlockWidth }),
          Variants.configure({ types: this.blocksWithVariant }),
          TextAlign.configure({ types: this.blocksWithTextAlign }),
          ModalExtension,
          ...this.extensions,
        ],
        content: this.mode === "json" ? { type: "doc", content: this.modelValue } : this.modelValue,
        editable: this.editable,
        onUpdate: this.handleEditorUpdate,
        onSelectionUpdate: this.updateCurrentBlockTool,
      });
    },
    handleEditorUpdate() {
      this.updateCurrentBlockTool();
      this.$emit(
        "update:modelValue",
        this.mode == "json" ? this.editor.getJSON().content : this.editor.getHTML()
      );
    },
    getEnabledExtensions() {
      const enabledExtensions = [];
      this.allDefaultExtensions.forEach(({ name, extension, methods, options }) => {
        const userSetting = this.mergedSettings.defaultExtensions[name];
        let configuredExtension = extension;
        if (userSetting === undefined || userSetting === true || (typeof userSetting === 'object' && userSetting.enabled !== false)) {
          if (typeof userSetting === 'object' && userSetting.options) {
            if (userSetting.options?.configure) {
              configuredExtension = configuredExtension.configure(userSetting.options?.configure);
            }
            if (userSetting.options?.extend) {
              configuredExtension = configuredExtension.extend(userSetting.options?.extend);
            }
          }
          enabledExtensions.push(configuredExtension);
        }
      });

      return enabledExtensions;
    },
    updateVuebergWidth() {
      const vuebergRef = this.$refs.vueberg;
      if (vuebergRef) {
        this.vuebergWidth = vuebergRef.clientWidth;
      }
    },
    cancelTyping() {
      this.$nextTick(() => {
        this.isTyping = false;
      });
    },
    shouldShowMainToolbar({editor, state, view}) {
      // const node = GetCurrentNode(editor);
      // this.currentBlockTool = this.editor.storage.vuebergBlocks.getBlockTool(node.type.name);
      return this.editable && view.hasFocus() && editor.isActive() && this.modelValue;
    },
    shouldShowFloatingMenu({editor, state, view}){
      
      const { selection } = state
      const { $anchor, empty } = selection
      const isEmptyTextBlock = $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent

      if (
        !view.hasFocus()
        || !empty
        || !isEmptyTextBlock
        || !this.editor.isEditable
      ) {
        return false
      }
      const node = GetCurrentNode(editor);
      const hasAllowedBlocks = editor.storage.vuebergBlocks.hasAllowedBlocks(node)

      return hasAllowedBlocks;
      
    },
    updateCurrentBlockTool() {
      this.currentBlockTool = this.editor.storage.vuebergBlocks.getBlockTool(this.editor.commands.getCurrentNodeName());
    },
    getMenuCoords() {
      return GetCurrentBlockCoords(this.editor);
    },
    getBlockEndCoords() {
      return GetCurrentBlockEndCoords(this.editor);
    },
  },
};
</script>

<style lang="scss">
@import "@/style.scss";
// @import "@/style.css";
</style>