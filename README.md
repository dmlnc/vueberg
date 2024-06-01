# VueBerg

VueBerg is a Vue 3 UI component for the Tiptap editor, inspired by the WordPress editor, Gutenberg. It has been extended from [Gutentap by johnpuddephatt](https://github.com/johnpuddephatt/gutentap) and is based on [Tiptap](https://tiptap.dev), but with additional functionalities and configurations suitable for several usage scenarios.

## Project Setup

Install VueBerg using npm:

```
npm install vueberg
```

Import and use VueBerg in your Vue 3 project:

```
import { VueBerg } from 'vueberg';
import 'vueberg/style.css';

<VueBerg v-model="content" mode="json" />
```

## Key Features

VueBerg integrates a variety of extensions and features:
- **Block Management**: Dynamically manage content blocks through the `vueberg-blocks` extension.
- **Localization**: Initially setup in Russian, but customizable for any language.
- **Modals**: Uses `jenesius-vue-modal` for modal interactions.

## Props

VueBerg accepts several props to customize its behavior:

- **modelValue** (`Object | String`): The content of the editor, expected in HTML or JSON format based on the `mode`.
- **editable** (`Boolean`): Enables or disables editing capabilities. Defaults to `true`.
- **mode** (`String`): Determines the format of the `modelValue`. Can be either `html` or `json`.
- **settings** (`Object`): Configuration for extensions and other features.
- **extensions** (`Array`): Custom extensions to be added to the editor.
- **blockTools** (`Array | Boolean`): Definitions of blocks used within the editor.
- **inlineTools** (`Array | Boolean`): Tools for inline formatting like bold or italic.
- **alignmentTools** (`Array | Boolean`): Tools for text alignment.

## Examples

### Custom Block Example
### Check vueberg-blocks/notification

Here's how you can add a custom block, such as a notification block:

```
import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import Notification from './Notification.vue';

export default Node.create({
  name: 'notification',
  group: 'block',
  content: 'block+',
  isolating: true,
  selectable: true,
  allowGapCursor: false,

  parseHTML() {
    return [
      {
        tag: 'div[data-vueberg-block="notification"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-vueberg-block': 'notification' }), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Notification);
  },
});
```

In your Vue component:

```
<template>
  <BaseVueBergBlock v-bind="$props">
    <template v-slot="{ isPreviewMode }">
      <div class="vuebergBlock-notification" :data-variant="node.attrs.variant">
        <div class="vuebergBlock-notification-settings" contenteditable="false" v-if="!isPreviewMode">
          <div 
            v-for="style in variants" 
            :class="{'vuebergBlock-notification-settings--active': variant == style.key}" 
            @click.prevent="setVariant(style.key)" 
            :style="`background-color:${style.color}`">
          </div>
        </div>
        <node-view-content class="vuebergBlock-notification-content" />
      </div>
    </template>
  </BaseVueBergBlock>
</template>
<script>
  import { BaseVueBergBlock } from 'vueberg';
</script
```

### Inline Tool Example
### Check tools/inline-tools.js

```
{
    name: "bold",
    title: "Bold",
    icon: '<svg...></svg>',
    command: (editor) => {
      editor.chain().focus().toggleBold().run();
    },
    isActiveTest: (editor) => editor.isActive("bold"),
}
```

### Alignment Tool Example
### Check tools/alignment-tools.js
```
{
  name: "textAlign",
  tools: [
    {
      name: "textAlignLeft",
      title: "Text align left",
      icon: '<svg...></svg>',
      command: (editor) => {
        editor.chain().focus().setTextAlign("left").run();
      },
      isActiveTest: (editor) => editor.isActive({ textAlign: "left" }),
    }
  ]
}
```

## Settings + Extend or configure extention example(Localization)
### Check extensions/default-extensions.js

Toolbar has 2 styles: default - gutenberg style, and sticky - just sticky toolbar
You can aalso enabe autofous
To localize VueBerg, adjust the language settings in the `settings` prop. This example shows how to configure the localization settings:

```
settings: {
  toolbar:{
    style: "default" || "sticky"
  },
  editor: {
    autofocus: Boolean
  }
  defaultExtensions: {
    ExtensionName: Boolean,
    ExtensionName: {
      options: {
        configure: Function || Object,
        extend: Function || Object,
      }
    },
    Localize: { 
      enabled: Boolean,
      options: {
        configure: {
          translations: {
            control: {
                'save': 'Save',
                'cancel': 'Cancel', 
                'delete': 'Delete'
            },
            extensions:{
                SlashMenu: {
                  nothingFound: 'Nothing Found',
                  showAll: 'All blocks'
                },
                Modal: {
                  BlocksModal: {
                    title: 'All blocks'
                  }
                }
            },
            toolbar: {
                more: 'Mode',
                up: 'Up',
                down: 'Down',
                transformTo: 'Transform to:'
            }
          }
        }
      }
    }
  }
}
```

## Future Enhancements

- [ ] Add table support.
- [ ] Add blockquote support.
- [ ] Implement a control insertion plugin for advanced layout management.

## Known Bugs

- [ ] HR selection and behvior quite strange. Create custom HR extension
- [ ] Toolbar don`t show delete icon on HR - tiptap .can().deleteNode() return false
- [ ] [[Bug]: Cannot parse generated html from YouTube extension #4089](https://github.com/ueberdosis/tiptap/issues/4089)

## CSS Variables

```
  --vueberg-font-size: 14px;
  --vueberg-placeholder-color: #8C8C8C;
  --vueberg-color-primary: #1890FF;
  --vueberg-color-muted: #8C8C8C;
  --vueberg-color-secondary: #F5F5F5;

  --vueberg-block-default-width: 600px;
  --vueberg-block-wide-width: 800px;
  --vueberg-block-full-width: none;
  --vueberg-block-full-width-padding-right: 0;
  --vueberg-block-full-width-padding-left: 0;
  
  --vueberg-block-padding-right: 0.5rem;
  --vueberg-block-padding-left: 0.5rem;
  --vueberg-border-radius: 5px;

  --vueberg-tooltip-max-width: 150px;
  --vueberg-tooltip-font-size: 12px;
  --vueberg-tooltip-padding: 5px 10px;
  --vueberg-tooltip-color: #fff;
  --vueberg-tooltip-background: rgba(0, 0, 0, 0.8);
  --vueberg-tooltip-z-index: 999;
  
  --vueberg-dropdown-background: #fff;
  --vueberg-dropdown-z-index: 10;
  --vueberg-dropdown-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
  --vueberg-dropdown-max-width: 250px;
  --vueberg-dropdown-max-height: 400px;
  --vueberg-dropdown-button-border-bottom: 1px solid #595959;
  --vueberg-dropdown-border: 1px solid #595959;
  --vueberg-dropdown-padding: 8px;

  --vueberg-button-padding: 2px;
  --vueberg-button-text-color: #434343;
  --vueberg-button-icon-color: #1F1F1F;
  --vueberg-button-active-background: #1F1F1F;
  --vueberg-button-active-icon-color: #fff;
  --vueberg-button-active-text-color: #fff;

  --vueberg-button-size: 30px;
  --vueberg-button-size-md: 35px;
  --vueberg-button-size-lg: 40px;
  --vueberg-button-size-xl: 45px;
  --vueberg-button-svg-size: 25px;
  --vueberg-button-svg-size-md: 30px;
  --vueberg-button-svg-size-lg: 35px;
  --vueberg-button-svg-size-xl: 40px;

  --vueberg-button-primary-color: #fff;
  --vueberg-button-text-only-padding: 8px 15px 8px 15px;
  --vueberg-button-text-padding: 8px 15px 8px 5px;
  --vueberg-button-text-svg-margin-right: 8px;
  --vueberg-button-text-svg-size: 20px;
  --vueberg-button-secondary-background: #F5F5F5;

  --vueberg-toolbar-max-width: 600px;
  --vueberg-toolbar-background: #fff;
  --vueberg-toolbar-border-color: #595959;
  --vueberg-toolbar-padding: 6px;
  --vueberg-toolbar-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
  --vueberg-toolbar-separator-color: #D9D9D9;
  --vueberg-toolbar-gap: 10px;

  --vueberg-slash-menu-background: #fff;
  --vueberg-slash-menu-border-color: #595959;
  --vueberg-slash-menu-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
  --vueberg-slash-menu-max-width: 280px;
  --vueberg-slash-menu-min-width: 200px;
  --vueberg-slash-menu-padding: 7px 7px 7px 7px;

  --vueberg-modal-z-index: 99999;
  --vueberg-modal-background: #fff;
  --vueberg-modal-border-color: #595959;
  --vueberg-modal-max-width: 420px;
  --vueberg-modal-max-width-md: 600px;
  --vueberg-modal-max-width-lg: 900px;
  --vueberg-modal-body-padding: 10px 15px;
  --vueberg-modal-header-padding: 10px 15px;
  --vueberg-modal-header-border-bottom: #D9D9D9;
  --vueberg-modal-title-font-size: 16px;
  --vueberg-modal-backdrop-background: rgba(62, 62, 62, 0.129);

  --vueberg-input-height: 40px;
  --vueberg-input-border-color: #595959;
  --vueberg-input-padding: 5px 10px;

  --vueberg-hr-gap: 1rem;
  --vueberg-hr-gap-md: 2rem;
  --vueberg-hr-gap-lg: 3rem;

  --vueberg-block-item-icon-size: 30px;
  --vueberg-block-item-icon-background:  #F5F5F5;
  --vueberg-block-item-title-size: 12px;
  --vueberg-block-item-description-size: 10px;
  --vueberg-block-item-padding: 5px;

  --vueberg-sticky-menu-z-index: 10;
  --vueberg-sticky-menu-top: 6px;
```