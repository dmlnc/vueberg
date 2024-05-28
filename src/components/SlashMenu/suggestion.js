import { VueRenderer } from "@tiptap/vue-3";
import tippy from "tippy.js";

import SlashMenu from "./SlashMenu.vue";

export default function (count) {
  return {
    items: ({ query, editor }) => { 
      const allowedBlocks = editor.storage.gutentapBlocks.getAllowedBlocks(
        editor.storage.gutentapBlocks.currentNode, 
        editor.storage.gutentapBlocks.getFlatBlocks()
      )

      return allowedBlocks.filter(block => { 
        if (!query) {
          if(allowedBlocks.length > count){
            return block?.isDefaultCommand && !block?.hideCommand;
          } else{
            return !block?.hideCommand;
          }
        } else {
          const lowerCaseQuery = query.toLowerCase();
          const matchesTitle = block.title.toLowerCase().startsWith(lowerCaseQuery);
          const matchesKeywords = block.keywords && block.keywords.some(keyword => keyword.toLowerCase().startsWith(lowerCaseQuery));
          
          return (matchesTitle || matchesKeywords) && !block?.hideCommand; 
        } 
      }).slice(0, count); 
    },   

    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {

          const hasAllowedBlocks = props.editor.storage.gutentapBlocks.hasAllowedBlocks(props.editor.storage.gutentapBlocks.currentNode)
          if(!hasAllowedBlocks){
            return false;
          }
          
          component = new VueRenderer(SlashMenu, {
            // using vue 2:
            // parent: this,
            // propsData: props,
            props: {
              ...props,
              onCloseMenu: () => {
                popup[0].hide();
                popup[0].destroy();
                component.destroy();
              }
            },
            editor: props.editor,
            // props,
            // editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => component.editor.view.dom.parentNode.parentNode,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
            onCreate: (instance) =>
              instance.popper.classList.add('gutentap-slash-menu-wrapper'),
          });
        },

        onUpdate(props) {
          if (!component) {
            return;
          }

          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            if (popup) {
              popup[0].hide();
            }

            return true;
          }

          return component?.ref?.onKeyDown(props);
        },

        onExit() {
          if (popup) {
            popup[0].destroy();
          }
          if (component) {
            component.destroy();
          }
        },
      };
    },
  };
}
