import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Notification from './Notification.vue'

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
        tag: 'div[data-vueberg-block="notification"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-vueberg-block': 'notification', class: 'vuebergBlock-notification' }), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Notification)
  },
  
})
