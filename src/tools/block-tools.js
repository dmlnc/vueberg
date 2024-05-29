import {
  isValidYoutubeUrl,
} from "../extensions/youtube/utils/";

export default function () {
  
  return [
    {
      title: 'Текст',
      name: 'typography',

      blocks: [
        {
          title: "Заголовок",
          name: "heading",
          keywords: ["h1","h2","h3","heading"],
          description: 'Просто заголовок страницы',
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M6.2 5.2v13.4l5.8-4.8 5.8 4.8V5.2z"></path></svg>',
          
          insertCommand: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("heading", { level: 2 })
              .run()
          },
          convertCommand: (editor) => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          },
          isActiveTest: (editor) => editor.isActive("heading"),

          settings: {
            allowedBlocks: true,
            isDefaultCommand: true,
            variants: false,
            blockWidth: true,
            textAlign: true,
          },

          toolbar: {
            inlineTools: true, 
            alignTools: {
              textAlign: true,
              blockWidth: true,
            },
            canBeConverted: {
              paragraph: true,
              bulletList: true,
              // blockquote: true,
            },
          },

          tools: [
            {
              title: "Заголовок 1 ур.",
              name: "heading1",
              icon: '<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false"><path d="M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z"></path></svg>',
              command: (editor) => {
                editor.chain().focus().setHeading({ level: 1 }).run();
              },
              isActiveTest: (editor) => editor.isActive("heading", { level: 1 }),
            },
            {
              title: "Заголовок 2 ур.",
              name: "heading2",
              icon: '<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z"></path></svg>',
              command: (editor) => {
                editor.chain().focus().setHeading({ level: 2 }).run();
              },
              isActiveTest: (editor) => editor.isActive("heading", { level: 2 }),
            },
            {
              title: "Заголовок 3 ур.",
              name: "heading3",
              icon: '<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false"><path d="M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"></path></svg>',
              command: (editor) => {
                editor.chain().focus().setHeading({ level: 3 }).run();
              },
              isActiveTest: (editor) => editor.isActive("heading", { level: 3 }),
            },
          ],
        },
        {
          title: "Текст",
          name: "paragraph",
          keywords: ["paragraph","text"],
          description: 'Описание',
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M18.3 4H9.9v-.1l-.9.2c-2.3.4-4 2.4-4 4.8s1.7 4.4 4 4.8l.7.1V20h1.5V5.5h2.9V20h1.5V5.5h2.7V4z"></path></svg>',
          
          insertCommand: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("paragraph").run();
          },
          convertCommand: (editor) => {
            editor.chain().focus().setParagraph().run();
          },
          isActiveTest: (editor) => editor.isActive("paragraph"),

          settings: {
            allowedBlocks: true,
            isDefaultCommand: true,
            variants: true,
            blockWidth: true,
            textAlign: true,
          },

          toolbar: {
            inlineTools: true, 
            alignTools: {
              textAlign: true,
              blockWidth: true,
            },
            canBeConverted: {
              heading: true,
              bulletList: true,
              // blockquote: true,
            },
          },
          tools: [
            {
              title: "Обычный",
              name: "default",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"  viewBox="0 0 48 48"><path fill="currentColor" d="M33.52 13.16a13.63 13.63 0 0 0-.19 2.24v2.45l-.15.14h-.92l-.16-.13a16 16 0 0 0-.17-2.2A1 1 0 0 0 31 15h-4.76v12.39a32.3 32.3 0 0 0 .19 4.54.65.65 0 0 0 .5.55c.15 0 .72.08 1.71.14l.15.15v1l-.15.15c-1-.06-2.47-.09-4.51-.09s-3.59 0-4.51.09l-.13-.14v-1l.14-.15c1-.06 1.57-.11 1.72-.14a.65.65 0 0 0 .5-.55 34 34 0 0 0 .15-4.62V19c0-2.41 0-3.77-.05-4.07h-2.07a14.74 14.74 0 0 0-3.06.16.66.66 0 0 0-.33.22 3.28 3.28 0 0 0-.22.94c-.06.52-.11 1.05-.13 1.6L16 18h-.93l-.16-.14v-2.51a18.58 18.58 0 0 0-.17-2.18l.13-.15c.58.1 2.67.15 6.3.15h5.93q5 0 6.3-.15Z"/></svg>',
              command: (editor) => {
                editor.chain().focus().setVariant("default").run();
              },
              isActiveTest: (editor) => editor.isActive({ variant: "default" }),
            },
            {
              title: "Большой",
              name: "large",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"  viewBox="0 0 48 48"><path fill="currentColor" d="M41.37 6.12a27.85 27.85 0 0 0-.35 4L41 14.56l-.26.26h-1.69l-.29-.23a31.65 31.65 0 0 0-.29-4 1.83 1.83 0 0 0-1.69-1.24c-.35-.05-2-.08-5-.08h-3.49c0 .62-.05 3.06-.05 7.33v15a59.2 59.2 0 0 0 .34 8.18 1.14 1.14 0 0 0 .89 1 30 30 0 0 0 3.09.27l.26.26v1.77l-.26.26q-2.61-.16-8.12-.16t-8.12.16l-.24-.24v-1.8l.26-.26a29.7 29.7 0 0 0 3.09-.27 1.13 1.13 0 0 0 .89-1 58.62 58.62 0 0 0 .35-8.18v-15q0-6.51-.08-7.33h-3.77a27.11 27.11 0 0 0-5.51.29 1.12 1.12 0 0 0-.58.4 5.32 5.32 0 0 0-.4 1.69c-.12.93-.2 1.89-.24 2.87l-.26.26H8.17l-.29-.26L7.82 10a30.21 30.21 0 0 0-.31-3.93l.24-.26q1.54.25 11.33.26h10.68q9 0 11.34-.26Z"/></svg>',
              command: (editor) => {
                editor.chain().focus().setVariant("large").run();
              },
              isActiveTest: (editor) => editor.isActive({ variant: "large" }),
            },
          ],
        },
        {
          title: "Список",
          name: "bulletList",
          keywords: ["ul","li","ol","list"],
          description: 'Описание',
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="0" stroke="currentColor" fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
          
          insertCommand: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
          },
          convertCommand: (editor) => {
            editor.chain().focus().toggleBulletList().run();
          },
          isActiveTest: (editor) => editor.isActive("bulletList") || editor.isActive("orderedList"),


          settings: {
            allowedBlocks: false,
            isDefaultCommand: true,
            variants: false,
            blockWidth: false,
            textAlign: false,
          },

          toolbar: {
            inlineTools: true, 
            alignTools: false,
            canBeConverted: {
              heading: true,
              paragraph: true,
              // blockquote: true,
            },
          },
          tools: [
            {
              title: "Список",
              name: "bulletList",
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="1"  fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
              command: (editor) => {
                editor.chain().focus().toggleBulletList().run();
              },
              isActiveTest: (editor) => editor.isActive("bulletList"),
            },
            {
              title: "Нумер. список",
              name: "orderedList",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5"  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M11 6h9M11 12h9M12 18h8M4 16a2 2 0 114 0c0 .591-.5 1-1 1.5L4 20h4M6 10V4L4 6"/></svg>',
              command: (editor) => {
                editor.chain().focus().toggleOrderedList().run();
              },
              isActiveTest: (editor) => editor.isActive("orderedList"),
            },
            {
              title: "Сдвинуть вправо",
              name: "sinklistitem",
              icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-8-3.5l3 3-3 3 1 1 4-4-4-4-1 1z"></path></svg>',
              command: (editor) => {
                editor.chain().focus().sinkListItem("listItem").run();
              },
              isDisabledTest: (editor) => !editor.can().sinkListItem("listItem"),
            },
            {
              title: "Сдвинуть влево",
              name: "liftlistitem",
              icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-4-4.6l-4 4 4 4 1-1-3-3 3-3-1-1z"></path></svg>',
              command: (editor) => {
                editor.chain().focus().liftListItem("listItem").run();
              },
              isDisabledTest: (editor) => !editor.can().liftListItem("listItem"),
            },
          ],
        },
        // {
        //   title: "Цитата",
        //   name: "blockquote",
        //   keywords: ["blockquote"],
        //   icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false"><path d="M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H4v6z"></path></svg>',
        //   insertCommand: ({ editor, range }) => {
        //     editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        //   },
        //   inlineTools: true, 
        //   alignTools: true,
        //   variants: false,
        //   canBeConverted: {
        //     heading: true,
        //     paragraph: true,
        //     list: true,
        //   },
        //   convertCommand: (editor) => {
        //     editor.chain().focus().toggleBlockquote().run();
        //   },
        //   isActiveTest: (editor) => editor.isActive("blockquote"),
        // },
      ]
    },
    // Медиа - youtube
    {
      title: 'Медиа',
      name: 'media',
      blocks: [
        {
          title: "YouTube",
          name: "youtube",
          keywords: ["yt"],
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" version="1.1" viewBox="0 0 461.001 461.001"><path fill="currentColor" d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z"/></svg>',

          insertCommand: async ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).run();
            let finished = false;
            let value = null;
            let text = null;
            let youtubeUrl = null;

            while(!finished){
              let form = await editor.commands.promptModal(
                { 
                  title: editor.commands.getTranslation('blockTools.youtube.modal.title'),
                  form: [
                    {
                      label: editor.commands.getTranslation('blockTools.youtube.form.label'),
                      name: 'url',
                      value: value,
                      text: text,
                      placeholder: editor.commands.getTranslation('blockTools.youtube.form.placeholder'),
                    }
                  ],
                  okButton: editor.commands.getTranslation('control.save'),
                  cancelButton: editor.commands.getTranslation('control.cancel'),
                }, 
              );
              if(form == null){
                return;
              }
              youtubeUrl = form[0].value;
              if(youtubeUrl == null){
                return;
              }
              if(isValidYoutubeUrl(youtubeUrl)){
                finished = true;
              } else{
                value = youtubeUrl;
                text = editor.commands.getTranslation('blockTools.youtube.form.error')
              }
            }
            editor.chain().focus().setYoutubeVideo({ src: youtubeUrl}).run();
          },
          isActiveTest: (editor) => editor.isActive("youtube"),

          settings: {
            allowedBlocks: false,
            isDefaultCommand: true,
            variants: false,
            blockWidth: true,
            textAlign: false,
          },

          toolbar: {
            inlineTools: false, 
            alignTools: {
              blockWidth: true,
              textAlign: false,
            },
            canBeConverted: false
          },

          tools: [
            {
              title: "Ссылка youtube",
              name: "youtubeLink",
              icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg>',
              command: async (editor) => {
                let finished = false;
                let value = editor.getAttributes("youtube").src;
                let text = null;
                let youtubeUrl = null;
                while(!finished){
                  let form = await editor.commands.promptModal(
                    {
                      title: editor.commands.getTranslation('blockTools.youtube.modal.title'),
                      form: [
                        {
                          label: editor.commands.getTranslation('blockTools.youtube.form.label'),
                          name: 'url',
                          value: value,
                          text: text,
                          placeholder: editor.commands.getTranslation('blockTools.youtube.form.placeholder'),
                        }
                      ],
                      okButton: editor.commands.getTranslation('control.save'),
                      cancelButton: editor.commands.getTranslation('control.cancel'),
                    },
                  );
                  if(form == null){
                    return;
                  }
                  youtubeUrl = form[0].value;
                  if(youtubeUrl == null){
                    return;
                  }
                  if(isValidYoutubeUrl(youtubeUrl)){
                    finished = true;
                  } else{
                    value = youtubeUrl;
                    text = editor.commands.getTranslation('blockTools.youtube.form.error')
                  }
                }
                editor.chain().focus().setYoutubeVideo({
                  src: youtubeUrl,
                }).run()
              },
              isActiveTest: (editor) => editor.isActive("youtube"),
            },
          ],
        },
      ]
    },
    {
      title: 'Другое',
      name: 'other',
      blocks: [
        {
          title: "Разделитель",
          name: "horizontalRule",
          keywords: ["hr", "horizontal"],
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20.2 7v4H3.8V7H2.2v9h1.6v-3.5h16.4V16h1.6V7z"></path></svg>',
          
          insertCommand: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run();
          },
          isActiveTest: (editor) => editor.isActive("horizontalRule"),

          settings: {
            allowedBlocks: false,
            isDefaultCommand: false,
            variants: true,
            blockWidth: true,
            textAlign: false,
          },

          toolbar: {
            inlineTools: false, 
            alignTools: {
              blockWidth: true,
              textAlign: false,
            },
            canBeConverted: false
          },
          
          tools: [
            {
              title: "Обычный",
              name: "default",
              icon: '<svg width="76" height="76" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve"><path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 31,51L 36.8333,51L 31,45L 36,45L 36,31L 31,31L 36.8334,25L 31,25L 31,22L 45,22L 45,25L 39.1667,25L 45,31L 40,31L 40,45L 45,45L 39.1666,51L 45,51L 45,54L 31,54L 31,51 Z "/></svg>',
              command: (editor) => {
                editor.chain().focus().setVariant("default").run();
              },
              isActiveTest: (editor) => editor.isActive({ variant: "default" }),
            },
            {
              title: "Большой",
              name: "large",
              icon: '<svg width="76" height="76" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve"><path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 31,57L 36.8333,57L 31,51L 36,51L 36,25L 31,25L 36.8334,19L 31.0001,19L 31.0001,16L 45.0001,16L 45.0001,19L 39.1668,19L 45,25L 40,25L 40,51L 45,51L 39.1667,57L 45,57L 45,60L 31,60L 31,57 Z "/></svg>',
              command: (editor) => {
                editor.chain().focus().setVariant("large").run();
              },
              isActiveTest: (editor) => editor.isActive({ variant: "large" }),
            },
          ]
        },
      ]
    },
  ];
}


      // inlineTools: {
      //   link: true,
      //   Bold: true,
      // },
      // alignTools: {
      //   textAlign: true,
      //   blockWidth: true,
      // },


    // {
    //   title: "Code block",
    //   name: "codeBlock",
    //   icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>',
    //   insertCommand: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    //   },
    //   hasInlineTools: true,
    //   convertCommand: (editor) => {
    //     editor.chain().focus().toggleCodeBlock().run();
    //   },
    //   isActiveTest: (editor) => editor.isActive("codeBlock"),
    // },



     // {
    //   title: "Table",
    //   name: "table",
    //   icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v3.5h-15V5c0-.3.2-.5.5-.5zm8 5.5h6.5v3.5H13V10zm-1.5 3.5h-7V10h7v3.5zm-7 5.5v-4h7v4.5H5c-.3 0-.5-.2-.5-.5zm14.5.5h-6V15h6.5v4c0 .3-.2.5-.5.5z"></path></svg>',
    //   insertCommand: ({ editor, range }) => {
    //     editor
    //       .chain()
    //       .focus()
    //       .deleteRange(range)
    //       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    //       .run();
    //   },
    //   hasInlineTools: true,
    //   isActiveTest: (editor) => editor.isActive("table"),
    //   tools: [
    //     {
    //       title: "Toggle header row",
    //       name: "toggleHeaderRow",
    //       icon: '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="16.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 21 16.5"><path stroke-linecap="round" stroke-linejoin="round" d="M1.875 15.75h17.25m-17.25 0A1.125 1.125 0 0 1 .75 14.625m1.125 1.125h3.381c.621 0 1.125-.504 1.125-1.125m-5.631 0V1.875m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V1.875m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75H7.506a1.125 1.125 0 0 1-1.125-1.125M20.25 1.875c0-.621-.504-1.125-1.125-1.125H1.875C1.254.75.75 1.254.75 1.875m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M.75 1.875v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h3.381c.748 0 1.125.504 1.125 1.125M1.875 4.5C1.254 4.5.75 5.004.75 5.625v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75H7.506c-.62 0-1.125.504-1.125 1.125M19.125 4.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h3.381m-3.381 0C1.254 8.25.75 8.754.75 9.375v1.5c0 .621.504 1.125 1.125 1.125m4.506-4.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125m1.125-1.125c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M7.506 8.25h11.619m-11.619 0c-.62 0-1.125.504-1.125 1.125M19.125 8.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h3.381m1.125-1.125v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125m1.125-1.125c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h11.619"/><path fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" d="M.737.877H20.212V4.182H.737z" /></svg>',
    //       command: (editor) => {
    //         editor.commands.toggleHeaderRow();
    //       },
    //     },
    //     {
    //       title: "Toggle header column",
    //       name: "toggleHeaderColumn",
    //       icon: '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="16.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 21 16.5"><path stroke-linecap="round" stroke-linejoin="round" d="M1.875 15.75h17.25m-17.25 0A1.125 1.125 0 0 1 .75 14.625m1.125 1.125h3.381c.621 0 1.125-.504 1.125-1.125m-5.631 0V1.875m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V1.875m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75H7.506a1.125 1.125 0 0 1-1.125-1.125M20.25 1.875c0-.621-.504-1.125-1.125-1.125H1.875C1.254.75.75 1.254.75 1.875m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M.75 1.875v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h3.381c.748 0 1.125.504 1.125 1.125M1.875 4.5C1.254 4.5.75 5.004.75 5.625v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75H7.506c-.62 0-1.125.504-1.125 1.125M19.125 4.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h3.381m-3.381 0C1.254 8.25.75 8.754.75 9.375v1.5c0 .621.504 1.125 1.125 1.125m4.506-4.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125m1.125-1.125c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M7.506 8.25h11.619m-11.619 0c-.62 0-1.125.504-1.125 1.125M19.125 8.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h3.381m1.125-1.125v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125m1.125-1.125c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h11.619"/><path fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" d="M.737.877H7.042V15.369000000000002H.737z" /></svg>',
    //       command: (editor) => {
    //         editor.commands.toggleHeaderColumn();
    //       },
    //     },
    //     {
    //       title: "Merge or split cells",
    //       name: "mergeOrSplit",
    //       icon: '<svg fill="none" height="21" width="21" viewBox="0 0 48 48" stroke="currentColor" width="48" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-width="4"><path d="m20 14v-9c0-.55228-.4477-1-1-1h-14c-.55228 0-1 .44772-1 1v38c0 .5523.44772 1 1 1h14c.5523 0 1-.4477 1-1v-9"/><path d="m28 34v9c0 .5523.4477 1 1 1h14c.5523 0 1-.4477 1-1v-38c0-.55228-.4477-1-1-1h-14c-.5523 0-1 .44772-1 1v9"/><path d="m28 24h16"/><path d="m5 24h15"/><path d="m32.7485 28.8183-1.591-1.5909-3.1819-3.182 3.1819-3.182 1.591-1.591" stroke-linejoin="round"/><path d="m15.375 28.8183 1.591-1.5909 3.182-3.182-3.182-3.182-1.591-1.591" stroke-linejoin="round"/></g></svg>',
    //       command: (editor) => {
    //         editor.commands.mergeOrSplit();
    //       },
    //     },
    //   ],
    // },