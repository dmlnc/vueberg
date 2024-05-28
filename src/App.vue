<template>
  <div class="">
    <div class="" style="min-height: 300px; max-width: 1000px; margin: 50px auto;  padding: 15px; border: 1px solid #000; margin-top: 100px">
       
        <button
          @click.prevent="editable = !editable"
          v-text="editable ? 'Editable' : 'Read only'"
          class="rounded-full border-2 py-2 px-4"
        />

        <gutentap
          v-model="content"
          :editable="editable"
          mode="json"
          :blockTools="blockTools"
          :alignmentTools="[]"
          :inlineTools="[]"
          :extensions="extensions"
          :settings="{
            defaultExtensions: {
              Heading: {
                enabled: true,
                options:{
                  configure: {
                    levels: [1,2,3],
                  }
                }
              },
              Localize: {
                enabled: true,
                options:{
                  configure: {
                    translations: {

                    }
                  }
                }
              }
            }
          }"
          :slashMenu="[]"
        />
      </div>
     
      
  </div>
</template>

<script>
import { extensions, useEditor } from "@tiptap/vue-3";
import Gutentap from "./components/GutenTap.vue";
import sampleContent from "./content.json";
import VueComponent from "./extensions/vue-component";
import Notification from "./extensions/notification";


export default {
  name: "App",
  components: {
    Gutentap,
  },
  data() {
    return {
      showContent: false,
      extensions: [VueComponent, Notification],
      editable: true,
      // alignmentTools: [
      //   [
      //     {
      //       title: "Sidebar",
      //       icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" x="0" y="0" enable-background="new 0 0 24 24" version="1.1" viewBox="0 0 24 24"><path d="M14.7 9v6h5.9V9h-5.9zm2.6-2.9H5.1v1.5h12.3V6.1zM5.1 17.9h11.7v-1.5H5.1v1.5zm8-6.6h-8v1.5h8v-1.5z"/></svg>',
      //       command: (editor) => {
      //         editor.chain().focus().setBlockWidth("full").run();
      //       },
      //       isActiveTest: (editor, topLevelNodeType) =>
      //         editor.isActive(topLevelNodeType, {
      //           blockWidth: "full",
      //         }),
      //     },
      //   ],
      // ],

      blockTools: [
      // daa: [
      // {
      //     name: "paragraph",
      //     title: "123",
      // },
        {
          name: 'media',
          blocks: [
            {
              title: "Notification",
              description: 'Описание',
              name: "notification",
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="0" stroke="currentColor" fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
              insertCommand: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .insertContent('<div data-gutentap-block="notification"><p></p></div>')
                  // .insertContent('<div><notification type="0"></notification></div>')
                  .run();
              },
              inlineTools: true, 
              alignTools: true,
              variants: true,
              allowedBlocks: {
                paragraph: true,
                heading: true,
              },
              variants: true,
              canBeConverted: false,
              isActiveTest: (editor) => editor.isActive("notification"),
              gutenTapBlock:{
                hasPreviewMode: false
              }
            },
            {
              title: "Sample Vue component",
              description: 'Описание',
              name: "vueComponent",
              icon: '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32"><path d="M24.3,4h-4.8L16,9.6L13,4H2l14,24L30,4L24.3,4z M5.5,6h3.4L16,18.4L23.1,6h3.4L16,24L5.5,6z"/></svg>',
              insertCommand: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .insertContent(
                    '<div><vue-component count="0"></vue-component></div>'
                  )
                  .run();
              },
              inlineTools: false,
              alignTools: {
                blockWidth: true
              },
              variants: false,
              canBeConverted: false,
              isActiveTest: (editor) => editor.isActive("vueComponent"),
            },
          ]
        }
      ],
      content: sampleContent,
    };
  },
};
</script>

<style>
/* @tailwind base; */
</style>
