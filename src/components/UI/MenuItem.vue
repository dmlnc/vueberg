<template>
  <div class="gutentap-menu-item" @click="toggleDropdown">
    <slot></slot>
    <div
      v-if="hasDropdown"
      :class="{
        'gutentap-menu-item-dropdown--left': align === 'left',
        'gutentap-menu-item-dropdown--right': align === 'right',
        'gutentap-menu-item-dropdown--open': showDropdown
      }"
      class="gutentap-menu-item-dropdown"
      ref="dropdown"
    >
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    hasDropdown() {
      return !!this.$slots.dropdown;
    },
  },
  methods: {
    toggleDropdown() {
      if (this.hasDropdown) {
        this.showDropdown = !this.showDropdown;
        setTimeout(() => {
          if(this.showDropdown){
            document.addEventListener('click', this.handleClickOutside);
          } else{
            document.removeEventListener('click', this.handleClickOutside);
          }
        }, 0);
        
      }
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.showDropdown = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
  },
  mounted() {
    
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  props: {
    align: {
      type: String,
      default: 'left',
    },
    iconName: {
      type: String,
      required: false,
    },
    iconSvg: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    activeClass: {
      type: String,
      required: false,
      default: 'gutentap-menu-item--active',
    },
    active: {
      type: Boolean,
    },
  },
};
</script>

