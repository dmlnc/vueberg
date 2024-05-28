import { Extension } from '@tiptap/core';

export const Localize = Extension.create({
  name: 'localize',

  addOptions() {
    return {
      translations: {}, // Здесь будет храниться ваш JSON с переводами
    };
  },

  addCommands() {
    return {
      getTranslation:  (key) => ({  }) => { 
        const translations = this.options.translations;
        const keys = key.split('.');
        let result = translations;

        for (let i = 0; i < keys.length; i++) {
          result = result[keys[i]];
          if (!result) break;
        }

        return result || key;
      },
    };
  },
});
