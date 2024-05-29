import { mergeAttributes, Node, nodePasteRule } from "@tiptap/core";
import { getEmbedUrlFromYoutubeUrl, isValidYoutubeUrl, YOUTUBE_REGEX_GLOBAL } from "./utils";

export interface YoutubeOptions {
  addPasteHandler: boolean;
  allowFullscreen: boolean;
  autoplay: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls: boolean;
  disableKBcontrols: boolean;
  enableIFrameApi: boolean;
  endTime: number;
  height: number;
  interfaceLanguage?: string;
  ivLoadPolicy: number;
  loop: boolean;
  modestBranding: boolean;
  HTMLAttributes: Record<string, any>;
  inline: boolean;
  nocookie: boolean;
  origin: string;
  playlist: string;
  progressBarColor?: string;
  width: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    youtube: {
      /**
       * Insert a youtube video
       */
      setYoutubeVideo: (options: {
        src: string;
        width?: number;
        height?: number;
        start?: number;
      }) => ReturnType;
    };
  }
}

export const Youtube = Node.create<YoutubeOptions>({
  name: "youtube",

  addOptions() {
    return {
      addPasteHandler: true,
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: true,
      HTMLAttributes: {},
      inline: false,
      nocookie: false,
      origin: "",
      playlist: "",
      progressBarColor: undefined,
      width: 560,
      height: 315,
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  content: "inline*",

  draggable: true,

  isolating: false,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-youtube-video]",
        contentElement: "figcaption",
      },
    ];
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options) =>
        ({ commands }) => {
          if (!isValidYoutubeUrl(options.src)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        find: YOUTUBE_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
    });

    const blockWidth = HTMLAttributes["data-block-width"];
    HTMLAttributes["data-block-width"] = null;
    HTMLAttributes.src = embedUrl;

    return [
      "figure",
      {
        "data-youtube-video": "",
        "data-block-width": blockWidth,
        class: "vueberg-youtube-figure",
      },
      [
        "div",
        { class: "vueberg-youtube-figure-container" },
        [
          "iframe",
          mergeAttributes(
            this.options.HTMLAttributes,
            {
              contenteditable: false,
              draggable: false,
              allowfullscreen: this.options.allowFullscreen,
              autoplay: this.options.autoplay,
              ccLanguage: this.options.ccLanguage,
              ccLoadPolicy: this.options.ccLoadPolicy,
              disableKBcontrols: this.options.disableKBcontrols,
              enableIFrameApi: this.options.enableIFrameApi,
              endTime: this.options.endTime,
              interfaceLanguage: this.options.interfaceLanguage,
              ivLoadPolicy: this.options.ivLoadPolicy,
              loop: this.options.loop,
              modestBranding: this.options.modestBranding,
              origin: this.options.origin,
              playlist: this.options.playlist,
              progressBarColor: this.options.progressBarColor,
              src: HTMLAttributes.src,
            },
            HTMLAttributes
          ),
        ],
      ],
    ];
  },

  // addKeyboardShortcuts() {
  //   return {
  //     Enter: ({ editor }) => {
  //       const { state, dispatch } = editor.view;
  //       const { $head } = state.selection;

  //       if ($head.parent.type.name === 'youtube') {
  //         const endPos = $head.after();
  //         const tr = state.tr.insert(endPos, state.schema.nodes.paragraph.create());
  //         dispatch(tr.setSelection(state.selection.constructor.near(tr.doc.resolve(endPos))));
  //         editor.view.focus();
  //         return true;
  //       }

  //       return false;
  //     },
  //   };
  // },
});
