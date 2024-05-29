import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
// import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
// import Blockquote from "@tiptap/extension-blockquote";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import Typography from '@tiptap/extension-typography'
import { Youtube } from "../extensions/youtube";
import { TrailingNode } from "../extensions/trailing-node";
import Localize from "../extensions/localize";

import SlashMenu from "@/components/SlashMenu/slash-menu.js";
import slashMenuSuggestion from "@/components/SlashMenu/suggestion.js";


export default function () {
  
    return [
        { name: 'Bold', extension: Bold },
        { name: 'BulletList', extension: BulletList },
        { name: 'Code', extension: Code },
        { name: 'CodeBlock', extension: CodeBlock },
        { name: 'Document', extension: Document },
        // { name: 'Dropcursor', extension: Dropcursor },
        { name: 'Gapcursor', extension: Gapcursor },
        { name: 'HardBreak', extension: HardBreak },
        { name: 'Heading', extension: Heading },
        { name: 'History', extension: History },
        { name: 'HorizontalRule', extension: HorizontalRule },
        { name: 'Italic', extension: Italic },
        { name: 'ListItem', extension: ListItem },
        { name: 'OrderedList', extension: OrderedList },
        { name: 'Paragraph', extension: Paragraph },
        { name: 'Strike', extension: Strike },
        { name: 'Text', extension: Text },
        // {
        //   name: 'Blockquote',
        //   extension: Blockquote.extend({ content: "paragraph" }),
        // },
        { name: 'TrailingNode', extension: TrailingNode },
        { name: 'Subscript', extension: Subscript },
        { name: 'Superscript', extension: Superscript },
        { name: 'Highlight', extension: Highlight },
        {
          name: 'Link',
          extension: Link.configure({ openOnClick: false })
        },
        {
          name: 'slashMenu',
          extension: SlashMenu.configure({
            suggestion: slashMenuSuggestion(5),
          })
        },
        
        { name: 'Typography', extension: Typography },
        {
          name: 'Youtube',
          extension: Youtube.configure({
              inline: false,
            },
          ),
        },
        {
          name: 'Localize',
          extension: Localize.configure({
            translations: {
              control: {
                'save': 'Сохранить',
                'cancel': 'Отменить', 
                'delete': 'Удалить'
              },
              inlineTools: {
                link:{
                  modal:{
                    title: 'Введите ссылку',
                  },
                  form:{
                    label: 'Ссылка:',
                    placeholder: 'https://google.com'
                  }
                }
              },
              blockTools: {
                youtube:{
                  modal:{
                    title: 'Введите ссылку на видео в Youtube',
                  },
                  form:{
                    label: 'Ссылка',
                    placeholder: 'https://www.youtube.com/watch?v=...',
                    error: 'Невалидный адрес Youtube',
                  },
                }
              },
              extensions:{
                SlashMenu: {
                  nothingFound: 'Ничего не найдено',
                  showAll: 'Все блоки'
                },
                Modal: {
                  BlocksModal: {
                    title: 'Все блоки'
                  }
                }
              },
              toolbar: {
                more: 'Еще',
                up: 'Вверх',
                down: 'Ввниз',
                transformTo: 'Заменить:'

              }
            }
          })
        },
    ]
}