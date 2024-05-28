import { Extension } from "@tiptap/core";

export interface VariantsOptions {
  types: string[];
  defaultVariant: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Variants: {
      /**
       * Set the text align attribute
       */
      toggleVariant: (variant: string) => ReturnType;
    };
  }
}

export const Variants = Extension.create<VariantsOptions>({
  name: "Variants",

  addOptions() {
    return {
      types: [],
      defaultVariant: "default",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          variant: {
            default: this.options.defaultVariant,

            parseHTML: (element) => element.dataset.variant,
            renderHTML: (attributes) => {
              if (attributes.variant === this.options.defaultVariant) {
                return {};
              }
              return {
                "data-variant": attributes.variant,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setVariant:
        (variant: string) =>
        ({ commands, view, }) => {
          commands.updateAttributes(commands.getCurrentNodeName(), {
            variant: variant,
          });
          return true;
        },

      unsetVariant:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, "variant")
          );
        },
    };
  },
});
