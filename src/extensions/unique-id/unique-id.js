import { v4 as uuidv4 } from 'uuid';
import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';


export const UniqueId = Extension.create({
  name: 'uniqueId',

  addOptions() {
    return {
      types: [], // Типы блоков, для которых нужно добавлять уникальные ID
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types, // Добавьте нужные типы блоков
        attributes: {
          id: {
            default: null,
            parseHTML: element => element.getAttribute('data-id'),
            renderHTML: attributes => {
              if (!attributes.id) {
                return {};
              }
              return { 'data-id': attributes.id };
            },
            keepOnSplit: false,
          },
        },
      },
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (transactions, oldState, newState) => {
          const tr = newState.tr;
          let modified = false;

          newState.doc.descendants((node, pos) => {
            if (node.isBlock && !node.attrs.id) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                id: uuidv4(),
              });
              modified = true;
            }
          });

          return modified ? tr : null;
        },
      }),
    ];
  },
});