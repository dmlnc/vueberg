<template>
  <div class="gutentap-slash-menu">
    <div class="gutentap-slash-menu-body gutentap-block-item--column" v-if="items.length">
      <template v-for="(item, index) in items">
        <BlockItem
          class="gutentap-block-item--clickable"
          :class="selectedIndex == index ? 'gutentap-block-item--selected' : ''"
          @click.prevent="selectItem(index)"
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
        />
      </template>
    </div>
    <div class="gutentap-slash-menu-empty" v-else>{{ nothingFoundLabel }}</div>
    <div class="gutentap-slash-menu-show-all" v-if="hiddenItems > 0" @click="showAll">{{ showAllLabel }} <small>(+{{hiddenItems}})</small></div>
  </div>
</template>

<script>
import BlockItem from "@/components/UI/BlockItem.vue";
import BlocksModal from "@/components/Modal/BlocksModal.vue";


export default {
  components:{
    BlockItem
  },
  props: {
    editor: {
      type: [Function, Object],
    },
    onCloseMenu: {
      type: Function
    },
    items: {
      type: Array,
      required: true,
    },
    command: {
      type: Function,
      required: true,
    },
  },
  computed:{
    hiddenItems(){
      return this.editor.storage.gutentapBlocks.getAllowedBlocks(
        this.editor.storage.gutentapBlocks.currentNode, 
        this.editor.storage.gutentapBlocks.getFlatBlocks()
      ).length - this.items.length
    }
  },

  data() {
    return {
      selectedIndex: 0,
      nothingFoundLabel: this.editor.commands.getTranslation('extensions.SlashMenu.nothingFound'),
      showAllLabel: this.editor.commands.getTranslation('extensions.SlashMenu.showAll'),
    };
  },

  watch: {
    items() {
      this.selectedIndex = 0;
    },
  },

  methods: {
    showAll(){
      if (this.onCloseMenu) {
        this.onCloseMenu();
      }
      this.editor.commands.blur();

      this.editor.commands.openModal({removeFirstSymbol: true}, BlocksModal);
    },
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        this.upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        this.downHandler();
        return true;
      }

      if (event.key === "Enter") {
        this.enterHandler();
        return true;
      }
      return false;
    },

    upHandler() {
      this.selectedIndex =
        (this.selectedIndex + this.items.length - 1) % this.items.length;
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    },

    enterHandler() {
      this.selectItem(this.selectedIndex);
    },

    selectItem(index) {
      const item = this.items[index];
      if (item) {
        this.command(item);
      }
    },
  },
};
</script>
