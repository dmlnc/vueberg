import { VueRenderer } from "@tiptap/vue-3";
import tippy from "tippy.js";

import SlashMenu from "./SlashMenu.vue";

export default function (count) {
  return {
    items: ({ query, editor }) => {
      const allowedBlocks = editor.storage.vuebergBlocks.getAllowedBlocks(
        editor.storage.vuebergBlocks.currentNode, 
        editor.storage.vuebergBlocks.getFlatBlocks()
      );
    
      let filteredBlocks = allowedBlocks.filter(block => !block.hideCommand);
    
      if (!query) {
        let defaultBlocks = filteredBlocks.filter(block => block.isDefaultCommand);
        if (defaultBlocks.length >= count) {
          filteredBlocks = defaultBlocks;
        } else {
          let additionalBlocks = filteredBlocks.filter(block => !block.isDefaultCommand);
          filteredBlocks = defaultBlocks.concat(additionalBlocks).slice(0, count);
        }
      } else {
        const lowerCaseQuery = query.toLowerCase();
        filteredBlocks = filteredBlocks.filter(block => {
          const matchesTitle = block.title.toLowerCase().startsWith(lowerCaseQuery);
          const matchesKeywords = block.keywords && block.keywords.some(keyword => keyword.toLowerCase().startsWith(lowerCaseQuery));
          return matchesTitle || matchesKeywords;
        });
      }
    
      return filteredBlocks.slice(0, count);
    },

    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {

          const hasAllowedBlocks = props.editor.storage.vuebergBlocks.hasAllowedBlocks(props.editor.storage.vuebergBlocks.currentNode)
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
          // console.log(props)

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
              instance.popper.classList.add('vueberg-slash-menu-wrapper'),
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

          console.log('onKeyDown', props);
          return component?.ref?.onKeyDown(props);
        },

        onExit() {
          console.log('onExit');

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
