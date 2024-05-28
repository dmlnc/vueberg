import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Notification from './Notification.vue'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export default Node.create({
  name: 'notification',
  
  group: 'block',
  
  content: 'block+',

  isolating: true,

  selectable: true,

  allowGapCursor: false,

  // addAttributes() {
  //   return {
  //     type: {
  //       default: 0,
  //     },
  //   };
  // },

  

  parseHTML() {
    return [
      {
        tag: 'div[data-gutentap-block="notification"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-gutentap-block': 'notification', class: 'gutentapBlock-notification' }), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Notification)
  },
  
})
