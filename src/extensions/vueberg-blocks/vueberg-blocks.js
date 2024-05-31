import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { GetCurrentNode } from "@/utils/pm-utils";

// Плагин для контроля вставки
const controlInsertionPlugin = (allowedBlocks) => {
  return new Plugin({
    filterTransaction(transaction, state) {
      if(allowedBlocks === true){
        return true;
      }
      allowedBlocks.push('text')
      allowedBlocks.push('paragraph')

      const { doc, selection } = state;
      const { from, to } = selection;

      // Проверяем, если блоки, которые пытаются вставить, разрешены
      let allowInsertion = true;
      transaction.steps.forEach(step => {
        if (step.slice && step.slice.content) {
          step.slice.content.forEach(node => {
            if (!allowedBlocks.includes(node.type.name)) {
              allowInsertion = false;
            }
          });
        }
      });

      return allowInsertion;
    }
  });
};

export const VuebergBlocks = Extension.create({
  name: 'vuebergBlocks',

  addOptions() {
    return {
      blocks: []
    };
  },

  addCommands() {
    return {

      getNodeIndex: (currentNode) => ({ editor }) => {
        let nodeIndex = null;
        const state = editor.view.state;
        const doc = state.doc;
        doc.descendants((node, pos, parent, index) => {
          if (node.attrs.id === currentNode.attrs.id) {
            nodeIndex = index;
            return false; 
          }
        });

        return nodeIndex;
      },

      getCurrentNodeName: () => ({ editor }) => {
        let node = editor.commands.getCurrentNode();
        if(node == null){
          return null
        }

        // console.log(editor.state.selection.$head.parent)
        return node.type.name;
      },

      getCurrentNode: (cache = true) => ({ editor }) => {
        const node = GetCurrentNode(editor)
        
        // Пример использования функции для изменения разрешенных блоков
        // editor.commands.updateAllowedBlocks(['paragraph', 'bulletList']);
        if(cache == true){
          this.storage.currentNode = node;
        }
       
        return node;
      },
          
      // updateInsertionPlugin: (newBlocks) => ({ editor }) => {
      //   // this.options.allowedBlocks = newBlocks;
      //   // Обновляем состояние редактора, чтобы применить новые разрешенные блоки
      //   editor.view.updateState(editor.state.reconfigure({ plugins: editor.state.plugins }));
      // }
    }
  },

  onCreate() {
    this.options.blocks.forEach(group => {
      group.blocks.forEach(block => {
        block.extension = this.editor.extensionManager.extensions.find(ext => (ext.name === block.name && ext.type == 'node' ));
      });
    });

    const blockNames = this.options.blocks.flatMap(group => group.blocks.map(block => block.name));
    const duplicates = blockNames.filter((name, index, self) => self.indexOf(name) !== index);

    if (duplicates.length > 0) {
      console.warn(`[VuebergBlocks]: Duplicate block names found: ${[...new Set(duplicates)].join(', ')}`);
    }

    // Добавляем плагин для контроля вставки
    // this.editor.registerPlugin(controlInsertionPlugin(true));
  },

  addStorage() {
    return {
      flatBlocksCache: null,
      currentBlockTool: null,
      currentNode: null,
      allowedBlocks: true,

      getFlatBlocks: (transformFn = block => block) => {
        if (!this.flatBlocksCache) {
            this.flatBlocksCache = this.options.blocks.flatMap(group => group.blocks.map(transformFn));
        }
        return this.flatBlocksCache;
      },

      getBlockTool(currentNodeName) {
        if(this.currentBlockTool?.nodeType == currentNodeName){
          return this.currentBlockTool;
        }
        let block = this.getFlatBlocks().find(block => 
          block.name === currentNodeName ||
          (block.tools && block.tools.some(tool => tool.name === currentNodeName))
        );
        if(block != null){
          block.nodeType = currentNodeName
        } else{
          block = {
            nodeType: currentNodeName
          }
        }
        this.currentBlockTool = block;
        return block;
      },

      hasAllowedBlocks(currentNode, editor) {
        const allowedBlocks = this.getAllowedBlocks(currentNode, editor);
        return allowedBlocks.length > 0;
      },

      getAllowedBlocks(currentNode, editor) {
       
        if(typeof this.allowedBlocks == Object && this.allowedBlocks.node.attrs.id == currentNode.attrs.id){
          return this.allowedBlocks.blocks;
        }

        let blocks = this.loadAllowedBlocks(currentNode, this.getFlatBlocks())
        if (currentNode.parent == null) {
          blocks = blocks.filter((block) => {
              const blockNodeType = editor.schema.nodes[block.name];
              
              if (!blockNodeType) {
                  return false;
              }
              
              const $pos = editor.state.selection.$from;
              if($pos.node(-1)){
                return $pos.node(-1).canReplaceWith($pos.index(-1), $pos.indexAfter(-1), blockNodeType);

              }
              return false;
          });
        }

        this.allowedBlocks = {
          node: currentNode,
          blocks: blocks
        };
        
        // this.commands.updateInsertionPlugin(this.allowedBlocks.blocks);
        
        return this.allowedBlocks.blocks;
      },
      

      loadAllowedBlocks(currentNode, blocks) {

        const blockTool = this.getBlockByName(currentNode.type.name);
        const contentExpr = currentNode.type.spec.content;
        if (blockTool) {
          if (blockTool.settings?.allowedBlocks === false) {
            return [];
          } else if (typeof blockTool.settings?.allowedBlocks === 'object') {
            blocks = blocks.filter(block => blockTool.settings?.allowedBlocks[block.name]);
          }
        }
      
        // Если contentExpr позволяет любые блоки
        if (contentExpr === 'block+' || contentExpr.includes('block')) {
          return blocks;
        }

        if ((contentExpr.includes('text') || contentExpr.includes('inline'))) {
          if (currentNode.depth === 1 && (blockTool?.settings?.allowedBlocks === true || typeof blockTool?.settings?.allowedBlocks === 'object')) {
            return blocks;
          } else{
            return [];
          }
        } 

        if (!contentExpr.includes('text') && !contentExpr.includes('inline')){
          const allowedBlockNames = contentExpr.match(/[\w]+/g) || [];
          blocks = blocks.filter(block => allowedBlockNames.includes(block.name));
        }

        // Если contentExpr разрешает только конкретные блоки
       
        // Проверка разрешенных блоков у родителя, если depth > 1
        if (currentNode.depth > 1 && currentNode.parent) {
          return this.loadAllowedBlocks(currentNode.parent, blocks);
        }
      
        return blocks;
      },

      getAllowedBlocksByGroups(currentNode, editor) {
        const allBlocks = this.getAllBlocks();
        const allowedBlocks = this.getAllowedBlocks(currentNode, editor);
      
        const allowedBlockNames = new Set(allowedBlocks.map(block => block.name));
      
        // Создаем объект для группировки блоков
        const groups = [];
      
        allBlocks.forEach(group => {
          const filteredBlocks = group.blocks.filter(block => allowedBlockNames.has(block.name));
          if (filteredBlocks.length > 0) {
            groups.push({
              ...group,
              blocks: filteredBlocks
            });
          }
        });
      
        return groups;
      },
      

      
      
      getBlockByName(name){
        return this.getFlatBlocks().find(block => block.name === name);
      },

      getAllBlocksWithoutGroups(){
        return this.getFlatBlocks();
      },

      getAllBlocks: () => {
        return this.options.blocks;
      },
    };
  },
});
