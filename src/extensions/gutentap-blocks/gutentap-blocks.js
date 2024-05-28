import { Extension } from '@tiptap/core';
import { GetCurrentNode } from "../../utils/pm-utils"


export const GutentapBlocks = Extension.create({
  name: 'gutentapBlocks',

  addOptions() {
    return {
      blocks: [],
    };
  },

  addCommands() {
    return {
      getCurrentNodeName: () => ({ editor }) => {
        let node = editor.commands.getCurrentNode();
        return node.type.name;
      },

      getCurrentNode: (cache = true) => ({ editor }) => {
        const node = GetCurrentNode(editor)

        if(cache == true){
          this.storage.currentNode = node;
        }
       
        return node;
      }
          
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
      console.warn(`[GutentapBlocks]: Duplicate block names found: ${[...new Set(duplicates)].join(', ')}`);
    }
  },

  addStorage() {
    return {
      flatBlocksCache: null,
      currentBlockTool: null,
      currentNode: null,

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

      hasAllowedBlocks(currentNode) {
        const allowedBlocks = this.getAllowedBlocks(currentNode, this.getFlatBlocks());
        return allowedBlocks.length > 0;
      },
      

      getAllowedBlocks(currentNode, blocks) {

        const blockTool = this.getBlockByName(currentNode.type.name);
        const contentExpr = currentNode.type.spec.content;
        if (blockTool) {
          if (blockTool.allowedBlocks === false) {
            return [];
          } else if (typeof blockTool.allowedBlocks === 'object') {
            blocks = blocks.filter(block => blockTool.allowedBlocks[block.name]);
          }
        }
      
        // Если contentExpr позволяет любые блоки
        if (contentExpr === 'block+' || contentExpr.includes('block')) {
          return blocks;
        }

        if ((contentExpr.includes('text') || contentExpr.includes('inline'))) {
          if (currentNode.depth === 1 && (blockTool?.allowedBlocks === true || typeof blockTool?.allowedBlocks === 'object')) {
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
          return this.getAllowedBlocks(currentNode.parent, blocks);
        }
      
        return blocks;
      },

      getAllowedBlocksByGroups(currentNode) {
        const allBlocks = this.getAllBlocks();
        const allowedBlocks = this.getAllowedBlocks(currentNode, this.getFlatBlocks());
      
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
