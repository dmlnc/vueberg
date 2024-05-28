import { Extension } from '@tiptap/core';
import DefaultFormModal from './DefaultFormModal.vue';
import DefaultContentModal from './DefaultContentModal.vue';
import { openModal, promptModal, popModal, closeModal } from 'jenesius-vue-modal';

export const ModalExtension = Extension.create({
  name: 'modal',

  addOptions() {
    return {
      formModal: DefaultFormModal,
      contentModal: DefaultContentModal,
      defaultProps: {},
    };
  },

  addCommands() {
    return {
      popModal: () => async ({ editor }) => {
        popModal();
      },
      closeModal: () => async ({ editor }) => {
        closeModal();
      },
      openModal: (contentProps = {}, contentModal = this.options.contentModal) => async ({ editor }) => {
        editor.commands.blur()
        const finalProps = { ...this.options.defaultProps, ...contentProps, editor };

        return await openModal(
          contentModal,
          finalProps
        );
      },
      promptModal: (contentProps = {}, formModal = this.options.formModal) => async ({ editor }) => {
        editor.commands.blur()
        const finalProps = { ...this.options.defaultProps, ...contentProps, editor };

        return await promptModal(
          formModal,
          finalProps
        );
      },
    };
  },
});
