<template>
    <div class="vueberg-modal-layout">
        <div class="vueberg-modal-backdrop" @click="clickBackdrop"></div>
        <div class="vueberg-modal vueberg-modal-md vueberg-blocks-modal">
            <div class="vueberg-modal-header">
                <div class="vueberg-modal-header-title">
                    {{ titleLabel }}
                </div>
                <div class="vueberg-modal-header-close" @click="hideModal">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                </div>
            </div>
            <div class="vueberg-modal-body">
                <div class="vueberg-blocks-modal-group" v-for="(group, i) in blocks">
                    <div class="vueberg-blocks-modal-group-title">
                        {{ group.title }}
                    </div>
                    <div class="vueberg-blocks-modal-group-blocks">
                        <BlockItem
                            v-for="(item, j) in group.blocks"
                            class="vueberg-block-item--modal vueberg-block-item--clickable"
                            @click.prevent="selectBlock(item)"
                            :icon="item.icon"
                            :title="item.title"
                            :description="item.description"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { popModal } from 'jenesius-vue-modal';
import BlockItem from "@/components/UI/BlockItem.vue";
  

export default {
    name: 'BlocksModal',
    props: {
    removeFirstSymbol: {
        type: Boolean,
        default: false,
      },
      editor: {
        type: [Object, Function],
        required: true,
      },
    },
    components:{
        BlockItem
    },
    data(){
        return {
            titleLabel: this.editor.commands.getTranslation('extensions.Modal.BlocksModal.title'),
            blocks: this.editor.storage.vuebergBlocks.getAllowedBlocksByGroups(this.editor.storage.vuebergBlocks.currentNode, this.editor)
        }
    },
    methods: {
      clickBackdrop(){
        this.hideModal();
      },
      selectBlock(item){
        const editor = this.editor;
        editor
            .chain()
            .focus()
            .run();
        const range = {
            from: this.removeFirstSymbol ? editor.state.selection.from - 1 : editor.state.selection.from,
            to: editor.state.selection.to
        };
        item.insertCommand({ editor, range });
        this.hideModal()
      },
      hideModal(){
        this.editor.chain().focus().run();
        popModal();
      },
    }
};
</script>
<style lang="scss">
.vueberg-blocks-modal{
    &-group{
        margin-bottom: 20px;
        &-title{
            margin-bottom: 15px;
            font-size: 10px;
            text-transform: uppercase;
            color: var(--vueberg-color-muted)
        }
        &-blocks{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 5px;

        }
    }
}
</style>
  