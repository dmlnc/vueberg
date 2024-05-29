<template>
    <BaseBlock v-bind="$props">
      <template v-slot="{ isPreviewMode }">
        <div class="vuebergBlock-notification" :data-variant="node.attrs.variant">
            <div class="vuebergBlock-notification-settings" contenteditable="false" v-if="!isPreviewMode">
                <div 
                    v-for="style in variants" 
                    :class="{'vuebergBlock-notification-settings--active': variant == style.key}" 
                    @click.prevent="setVariant(style.key)" 
                    :style="`background-color:${style.color}`">
                </div>
            </div>
            <node-view-content class="vuebergBlock-notification-content" />
        </div>
      </template>
    </BaseBlock>
</template>
  
<script>
import BaseBlock from '@/components/BaseBlock.vue'
import { NodeViewContent, nodeViewProps } from "@tiptap/vue-3";
  

export default {
  props: nodeViewProps,

  components: {
      BaseBlock,
      NodeViewContent,
  },
  data(){
    return {
        variants: [
            {
                key: 'default',
                color: '#cfe2ff',
            },
            {
                key: 'secondary',
                color: '#e2e3e5',
            },
            {
                key: 'warning',
                color: '#fff3cd',
            },
            {
                key: 'danger',
                color: '#f8d7da',
            },
        ]
    }
  },
  computed:{
    variant(){
        return this.node.attrs.variant;
    }
  },
  methods:{
    setVariant(key){
        this.updateAttributes({
            variant: key,
          });
          return false;
    }
  },
}
</script>
  
<style lang="scss">
.vuebergBlock-notification{
   
    position: relative;
    padding: 1rem 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
    & p, & h1, & h2, & h3, & h4, & h5, & h6{
        color: #084298;
        &:last-child{
            margin-bottom: 0;
        }
    }

    &[data-variant="default"]{
        color: #084298;
        background-color: #cfe2ff;
        border-color: #b6d4fe;
        & p, & h1, & h2, & h3, & h4, & h5, & h6{
            color: #084298;
        }
    }

    &[data-variant="secondary"]{
        color: #41464b;
        background-color: #e2e3e5;
        border-color: #d3d6d8;
        & p, & h1, & h2, & h3, & h4, & h5, & h6{
            color: #41464b;
        }
    }

    &[data-variant="warning"]{
        color: #664d03;
        background-color: #fff3cd;
        border-color: #ffecb5;
        & p, & h1, & h2, & h3, & h4, & h5, & h6{
            color: #664d03;
        }
    }
    &[data-variant="danger"]{
        color: #842029;
        background-color: #f8d7da;
        border-color: #f5c2c7;
        & p, & h1, & h2, & h3, & h4, & h5, & h6{
            color: #842029;
        }
    }

    &-settings{
        display: flex;
        gap: 5px;
        margin-bottom: 10px;
        justify-content: flex-end;
        &>div{
            cursor: pointer;
            width: 15px;
            height: 15px;
            flex: 0 0 15px;
            border: 2px solid var(--vueberg-color-secondary);
            border-radius: 50%;
            &.vuebergBlock-notification-settings--active{
                border: 2px solid #fff;
            }
        }
    }
    
}

</style>
  