<template>
  <div class="">
    <div class="" style="min-height: 300px; max-width: 1000px; margin: 50px auto;  padding: 15px; border: 1px solid #000; margin-top: 100px;">
        <button
          @click.prevent="editable = !editable"
          v-text="editable ? 'Editable' : 'Read only'"
        />
        <vueberg
          v-model="content"
          :defaultContent="[{ type: 'heading',attrs:{level: 1} },{ type: 'paragraph' }]"
          :editable="editable"
          mode="json"
          :blockTools="blockTools"
          :alignmentTools="false"
          :inlineTools="[]"
          :customTools="false"
          :extensions="extensions"
          :settings="{
            toolbar:{
              style: 'default',
              showOrder: true,
              showCurrentBlock: true,
              showDeleteButton: true,
            },
            floatingMenu: true,
            editor: {
              autofocus: true,
            },
            defaultExtensions: {
              SlashMenu: true,
              Document: {
                    options:{
                      extend: {
                        content: 'heading block+',
                      }
                    }
              },
              Placeholder: {
                    options:{
                      configure: {
                        considerAnyAsEmpty: true, 
                        showOnlyCurrent: true,
                        placeholder: ({ node, editor }) => {
                            let nodeIndex = null;
                            const currentNode = node;
                            const doc = editor.view.state.doc;
                            doc.descendants((node, pos, parent, index) => {
                              if (node.attrs.id === currentNode.attrs.id) {
                                nodeIndex = index;
                                return false; 
                              }
                            });
                            if (node.type.name === 'heading' && nodeIndex == 0) {
                              return 'What’s the title?'
                            }
                            return 'Can you add some further context?'
                        }
                      }
                    }
              },
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
        />
      </div>
      <textarea style="min-height: 200px; width: 100%">
        {{ content }}
      </textarea>
  </div>
</template>

<script>

import Vueberg from "./components/VueBerg.vue";
import sampleContent from "./content.json";
import Notification from "./vueberg-blocks/notification";


export default {
  name: "App",
  components: {
    Vueberg,
  },
  data() {
    return {
      showContent: false,
      extensions: [Notification],
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
        {
          name: 'media',
          blocks: [
            {
              title: "Notification",
              name: "notification",

              description: 'Описание',
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="0" stroke="currentColor" fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
              
              insertCommand: ({ editor, range }) => {

                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .insertContent('<div data-vueberg-block="notification"><p></p></div>')
                  .run();
              },
              isActiveTest: (editor) => editor.isActive("notification"),

              settings: {
                allowedBlocks: {
                  paragraph: true,
                  heading: true,
                },
                isDefaultCommand: true,
                variants: true,
                blockWidth: true,
                textAlign: true,
              },

              toolbar: {
                inlineTools: true, 
                alignTools: {
                  textAlign: true,
                  blockWidth: true,
                },
                canBeConverted: false,
              },

              vueBergBlock:{
                hasPreviewMode: true
              }
            },
          ]
        }
      ],
      content: null,

      // content: [{"type": "paragraph"}],
      // content: sampleContent,

    };
  },
};
</script>

<style lang="scss">
@import "@/style.scss";
// @import "@/style.css";
</style>
