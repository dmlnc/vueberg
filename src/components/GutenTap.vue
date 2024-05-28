<template>
  <div class="gutentap" style="position: relative;" ref="gutentap">
    <widget-container-modal />

    

    <bubble-menu
      pluginKey="mainMenu"
      :should-show="shouldShowMainToolbar"
      :updateDelay="0"
      v-if="editor"
      :editor="editor"
      :class="{
        'gutentap-bubble-menu-hidden': isTyping,
      }"
      class="gutentap-bubble-menu"
      :tippy-options="{
        delay: [0, 300], 
        duration: [300, 400],
        maxWidth: 'none',
        placement: 'top-start',
        getReferenceClientRect: getMenuCoords,
        onCreate: (instance) =>
          instance.popper.classList.add('gutentap-toolbar-wrapper'),
      }"
    >
      <Toolbar
        v-if="currentBlockTool?.nodeType !== undefined"
        :editor="editor"
        :settings="mergedSettings"
        :inlineTools="allInlineTools"
        :alignmentTools="allAlignmentTools"
        :gutentapWidth="gutentapWidth"
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
        class="gutentap-button-primary gutentap-button-text-only  gutentap-button-blocks"
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
import { mergeArrays } from "../utils/utils";
import BlockWidth from "../extensions/block-width";
import GutentapBlocks from "../extensions/gutentap-blocks";
import { ModalExtension } from "./Modal/modal.js";
import Variants from "../extensions/variants";
import SlashMenu from "./SlashMenu/slash-menu.js";
import slashMenuSuggestion from "./SlashMenu/suggestion.js";
import defaultBlockTools from "../tools/block-tools";
import defaultExtensions from "../tools/default-extensions";
import defaultInlineTools from "../tools/inline-tools";
import defaultAlignmentTools from "../tools/alignment-tools";
import BlocksModal from "@/components/Modal/BlocksModal.vue";
// import "@gocapsule/column-extension/src/index.css";



export default {
  props: {
    modelValue: {},
    settings: {
      type: Object,
      default: () => ({}),
    },
    editable: {
      default: true,
    },
    placeholder: {
      type: String,
      default: "Начните писать",
    },
    mode: {
      type: String,
      default: "html",
    },
    extensions: {
      type: Array,
      default: () => [],
    },
    
    slashMenu: {
      type: [Array, Boolean],
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
      gutentapWidth: 0,
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
    };
  },

  created() {
    this.handleMouseMove = this.cancelTyping.bind(this);
    this.handleResize = this.updateGutentapWidth.bind(this);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
  },

  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.updateGutentapWidth();
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
    currentBlockTool(){
      if(!this.editor){
        return null;
      }
      return this.editor.storage.gutentapBlocks.currentBlockTool
    },
    mergedSettings() {
      return { ...this.defaultSettings, ...this.settings };
    },
    blocksWithVariant() {
      return this.filterBlocks(block => block?.variants);
    },
    blocksWithBlockWidth() {
      return this.filterBlocks(block => 
        (typeof block.alignTools === 'object' && block.alignTools.blockWidth) || block.alignTools);
    },
    blocksWithTextAlign() {
      return this.filterBlocks(block => 
        (typeof block.alignTools === 'object' && block.alignTools.textAlign) || block.alignTools);
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
          GutentapBlocks.configure({ blocks: allBlockToolsFiltered }),
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

      // this.editor.commands.setContent(
      //   this.mode == "json" ? { type: "doc", content: this.modelValue } : this.modelValue
      // );

      // this.editor.setEditable(this.editable);
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

      if (this.slashMenu !== false) {
        enabledExtensions.push(SlashMenu.configure({
          suggestion: slashMenuSuggestion(5),
        }));
      }

      return enabledExtensions;
    },
    updateGutentapWidth() {
      const gutentapRef = this.$refs.gutentap;
      if (gutentapRef) {
        this.gutentapWidth = gutentapRef.clientWidth;
      }
    },
    cancelTyping() {
      this.$nextTick(() => {
        this.isTyping = false;
      });
    },
    shouldShowMainToolbar({editor, state, view}) {

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
      const hasAllowedBlocks = editor.storage.gutentapBlocks.hasAllowedBlocks(node)

      return hasAllowedBlocks;
      
    },
    updateCurrentBlockTool() {
      this.editor.storage.gutentapBlocks.getBlockTool(this.editor.commands.getCurrentNodeName());
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
@import "@/style.css";
</style>
