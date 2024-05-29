<template>
    <div class="vueberg-toolbar">
      <div class="vueberg-button-group vueberg-button-group-separate">
        <div class="vueberg-button-group vueberg-button-group-column vueberg-toolbar-order ">
          <button
            @click.prevent="moveNode('UP')"
            :disabled="!canMoveNodeUp()"
            :data-tooltip="upLabel"
            class="vueberg-button--toolbar-order vueberg-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false" viewBox="6.5 8 11 5.6">
              <path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path>
            </svg>
          </button>
          <button
            @click.prevent="moveNode('DOWN')"
            :disabled="!canMoveNodeDown()"
            :data-tooltip="downLabel"
            class="vueberg-button--toolbar-order vueberg-button"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" viewBox="6.5 10.4 11 5.6">
            <path d="M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path>
          </svg>
          </button>
        </div>
        <div class="vueberg-button-group vueberg-button-group-separate" v-if="currentBlockTool?.icon && currentBlockTool?.name">
          <menu-item>
            <menu-button
              :label="currentBlockTool?.title"
              :content="currentBlockTool?.icon"
              :class="(currentBlockTool?.canBeConverted && canBeConvertedTo.length) ? 'vueberg-button-secondary' : ''"
            />
            <template #dropdown>
              <div class="vueberg-toolbar-transform-to">{{transformToLabel}}</div>
              <menu-button
                v-for="tool in canBeConvertedTo"
                :content="tool.icon + ' ' + tool.title"
                :key="tool.title"
                @click.prevent="runConvertCommand(tool)"
                class="vueberg-button-text vueberg-button-md"
              />
            </template>
          </menu-item>
        </div>
      </div>
      <div class="vueberg-button-group vueberg-button-group-separate" v-if="activeAlignmentTools.length">
        <menu-item
          v-for="(alignmentToolGroup, key) in activeAlignmentTools"
          :key="key"
        >
          <menu-button
            @click.prevent
            :label="getActiveAlignmentTool(alignmentToolGroup.tools).title"
            :content="getActiveAlignmentTool(alignmentToolGroup.tools).icon"
          />
          <template #dropdown>
            <menu-button
              class="vueberg-button-text vueberg-button-md"
              v-for="tool in alignmentToolGroup.tools"
              :key="tool.title"
              :content="tool.icon + ' ' + tool.title"
              @click.prevent="tool.command(editor)"
              :active="tool.isActiveTest(editor, currentBlockTool?.nodeType)"
            />
          </template>
        </menu-item>
      </div>
      <template v-for="group in firstMenuItems">
        <div v-if="group.condition"  :key="group.type" class="vueberg-button-group vueberg-button-group-separate">
          <menu-button
            v-for="(button, index) in group.buttons"
            :key="index"
            :content="button.icon"
            :label="button.label"
            :activeClass="button.activeClass"
            @click.prevent="button.click"
            :disabled="button.disabled"
            :active="button.active"
          ></menu-button>
        </div>
      </template>
      <div class="vueberg-button-group vueberg-button-group-separate" v-if="editor && remainingMenuItems.length">
        <menu-item align="right">
          <menu-button class="vueberg-button-secondary" @click.prevent :label="moreLabel" :content="moreIcon"></menu-button>
          <template #dropdown>
            <template v-for="group in remainingMenuItems">
              <menu-button
                v-if="group.condition"
                v-for="(button, index) in group.buttons"
                :key="index"
                class="vueberg-button-md vueberg-button-text"
                :content="button.icon + button.label"
                :activeClass="button.activeClass"
                @click.prevent="button.click"
                :disabled="button.disabled"
                :active="button.active"
              />
            </template>
          </template>
        </menu-item>
      </div>
    </div>
</template>


<script>
import MenuButton from "@/components/UI/MenuButton.vue";
import MenuItem from "@/components/UI/MenuItem.vue";

import {
  MoveNode,
} from "../utils/pm-utils.js";
export default {
  props: {
    editor: {
      type: [Object, Function],
      required: true,
    },
    vuebergWidth: {
      required: true,
    },
    // currentBlockTool: {
    //   type: Object,
    //   required: true,
    // },
    inlineTools: {
      type: Array,
      default: () => [],
    },
    alignmentTools: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    MenuButton,
    MenuItem,
  },

  data() {
    return {
      transformToLabel: this.editor.commands.getTranslation('toolbar.transformTo'),
      deleteLabel: this.editor.commands.getTranslation('control.delete'),
      moreLabel: this.editor.commands.getTranslation('toolbar.more'),
      upLabel: this.editor.commands.getTranslation('toolbar.up'),
      downLabel: this.editor.commands.getTranslation('toolbar.down'),

      moreIcon:
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>',
      deleteIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -3 30 30" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>',
    };
  },

  

  mounted() {
  },

  watch: {
  },

  computed: {
    
    currentBlockTool(){
      if(!this.editor){
        return null;
      }
      return this.editor.storage.vuebergBlocks.currentBlockTool
    },
    currentNode(){
      if(!this.editor){
        return null;
      }
      return this.editor.storage.vuebergBlocks.currentNode
    },

    canBeConvertedTo(){
      if (this.currentBlockTool?.canBeConverted === false) {
        return [];
      }

      return this.editor.storage.vuebergBlocks.getFlatBlocks().filter(tool => {
        return this.currentBlockTool?.canBeConverted[tool.name] && tool.convertCommand;
      });
    },

    activeAlignmentTools() {
      if (!this.currentBlockTool?.alignTools) {
        return [];
      }

      // Фильтрация инструментов выравнивания на основе allowNested
      const filterAlignmentTools = (alignmentToolGroup) => {
        if (this.currentNode?.depth > 1) {
          // Если глубина узла больше 0, проверяем allowNested
          return alignmentToolGroup.allowNested;
        }
        return true;
      };

      if (this.currentBlockTool.alignTools === true) {
        return this.alignmentTools
          .filter(filterAlignmentTools)
          .filter((alignmentToolGroup) =>
            alignmentToolGroup.tools.find((tool) =>
              tool.isActiveTest(this.editor, this.currentBlockTool.name)
            )
          );
      }

      if (typeof this.currentBlockTool.alignTools === 'object') {
        return this.alignmentTools
          .filter(filterAlignmentTools)
          .filter((alignmentToolGroup) => this.currentBlockTool.alignTools[alignmentToolGroup.name])
          .filter((alignmentToolGroup) => alignmentToolGroup.tools.length > 0);
      }

      return [];
    },

    firstMenuItems() {
      if (!this.currentBlockTool) {
        return [];
      }
      let count = this.menuCount;
      return this.menuItems.map(group => {
        if (count <= 0) {
          return { ...group, buttons: [] };
        }
        if(!group.buttons){
          return { ...group, buttons: [] };
        }
        if (group.buttons.length <= count) {
          count -= group.buttons.length;
          return group;
        } else {
          const buttons = group.buttons.slice(0, count);
          count = 0;
          return { ...group, buttons };
        }
      }).filter(group => group && group.buttons && group?.buttons?.length > 0);
    },

    remainingMenuItems() {
      if (!this.currentBlockTool) {
        return [];
      }
      let count = this.menuCount;
      return this.menuItems.map(group => {
        if (count <= 0) {
          return group;
        }
        if(!group.buttons){
          return group;
        }
        if (group.buttons.length <= count) {
          count -= group.buttons.length;
          return { ...group, buttons: [] };
        } else {
          const buttons = group.buttons.slice(count);
          count = 0;
          return { ...group, buttons };
        }
      }).filter(group => group && group.buttons && group?.buttons?.length > 0);
    },

    menuCount() {
      // Получаем ширину контейнера, в котором будут располагаться кнопки
      let width = this.vuebergWidth > 700 ? 700 : this.vuebergWidth;
      // Получаем значения CSS-переменных
      const buttonSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vueberg-button-size')) || 30;
      const buttonGroupGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vueberg-toolbar-gap')) || 2;
      const buttonGroupMargin = 2 * ( parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vueberg-toolbar-group-margin')) || 10 );
      const separatorWidth = 1; // Ширина разделителя между группами кнопок
      // Отступ от краев
      width -= 15; 
      // Учитываем ширину кнопок ордера и текущего блока
      width -= 2 * buttonSize;
      width -= buttonGroupGap;
      width -= buttonGroupMargin + separatorWidth;

      // Учитываем кнопки выравнивания
      width -= (this.activeAlignmentTools.length * buttonSize);
      width -= (buttonGroupGap * (this.activeAlignmentTools.length ? this.activeAlignmentTools.length - 1 : 0));
      width -= buttonGroupMargin + separatorWidth;

      const currentBlockToolButtons = this.currentBlockTool?.tools?.length;
      let count = 0;
      let currentBlockToolButtonsWidth = 0;
      
      if(this.currentBlockTool?.tools?.length){
        currentBlockToolButtonsWidth = buttonSize * currentBlockToolButtons
        currentBlockToolButtonsWidth += buttonGroupGap * (currentBlockToolButtons ? currentBlockToolButtons - 1 : 0);
      }

      if(width < currentBlockToolButtonsWidth + buttonGroupMargin + separatorWidth){
        return Math.floor(( (width - buttonGroupMargin - separatorWidth)  / ( buttonSize + buttonGroupGap)))
      } else{
        count = this.currentBlockTool?.tools?.length
        width -= currentBlockToolButtonsWidth
        width -= buttonGroupMargin
        width -= separatorWidth 
      }
      if(count == undefined){
        count = 0;
      }
      // Рассчитываем количество кнопок, которые поместятся в оставшуюся ширину
      return Math.floor(width / ( buttonGroupGap + buttonSize)) + count;
    },

    menuItems() {
      if(!this.currentBlockTool){
        return [];
      }
      return [
        {
          type: 'currentBlockTools',
          condition: this.currentBlockTool?.tools?.length,
          buttons: this.currentBlockTool?.tools?.map(tool => ({
            click: () => tool.command.call(0, this.editor),
            icon: tool.icon,
            label: tool.title,
            activeClass: tool.isActiveClass,
            disabled: tool.isDisabledTest?.call(0, this.editor),
            active: tool.isActiveTest?.call(0, this.editor)
          }))
        },
        {
          type: 'inlineTools',
          condition: this.currentBlockTool?.inlineTools,
          buttons: (() => {
            const inlineTools = this.currentBlockTool?.inlineTools;

            if (inlineTools === true) {
              // Возвращаем все инструменты, если inlineTools равно true
              return this.inlineTools.map(tool => ({
                click: () => tool.command(this.editor),
                icon: tool.icon,
                label: tool.title,
                activeClass: tool.isActiveClass,
                disabled: false,
                active: tool.isActiveTest(this.editor),
              }));
            } else if (typeof inlineTools === 'object') {
              // Получаем ключи из inlineTools в порядке их определения
              const toolKeys = Object.keys(inlineTools).filter(key => inlineTools[key]);

              // Фильтруем и упорядочиваем инструменты в соответствии с toolKeys
              return toolKeys
                .map(toolKey => this.inlineTools.find(tool => tool.name === toolKey))
                .filter(tool => tool) // Исключаем возможные undefined значения
                .map(tool => ({
                  click: () => tool.command(this.editor),
                  icon: tool.icon,
                  label: tool.title,
                  activeClass: tool.isActiveClass,
                  disabled: false,
                  active: tool.isActiveTest(this.editor),
                }));
            }
            // Если ни одно из условий не выполняется, возвращаем пустой массив
            return [];
          })()
        },
        {
          type: 'control',
          condition: this.editor.can().deleteNode(this.currentBlockTool?.nodeType),
          buttons: [
            {
              click: () => this.deleteNode(this.currentBlockTool?.nodeType),
              icon: this.deleteIcon,
              label: this.deleteLabel,
              activeClass: 'vueberg-button-text-danger',
              disabled: false,
              active: true
            }
          ]
        }
      ];
    }
  },

  methods: {

    getActiveAlignmentTool(tools) {
      const activeTool = tools.find(tool =>
        tool.isActiveTest(this.editor, this.currentBlockTool?.nodeType)
      );
      return activeTool ? activeTool : tools[0];
    },

    deleteNode(node) {
      this.editor.chain().deleteNode(node).blur().run();
    },

    runConvertCommand(tool){
      tool.convertCommand(this.editor);
      this.editor.storage.vuebergBlocks.getBlockTool(this.editor.commands.getCurrentNodeName());
    },

    moveNode(dir = "UP") {
      MoveNode({
        view: this.editor.view,
        dir: dir,
        currentResolved: this.editor.view.state.selection.$from,
      });
    },

    canMoveNodeDown() {
      const selectionStart = this.editor.view.state.selection.$from;
      return selectionStart.index(0) < selectionStart.node(0).childCount - 1;
    },

    canMoveNodeUp() {
      const selectionStart = this.editor.view.state.selection.$from;
      return selectionStart.index(0) > 0;
    },
  },
};
</script>

<style lang="scss">
// @import "@/style.scss";


</style>
