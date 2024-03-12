<script>
export default {
  props: {
    value: {
      type: [Array, String],
    },
    options: {
      type: Array,
      required: true,
    },
    multi: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    err: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItems: [],
    };
  },
  mounted() {
    document.addEventListener('click', this.closeSelect);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeSelect);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      if (this.multi) {
        const index = this.selectedItems.indexOf(item);
        if (index === -1) {
          this.selectedItems.push(item);
        } else {
          this.selectedItems.splice(index, 1);
        }
      } else {
        this.selectedItems = [item];
        this.isOpen = false;
      }
      this.$emit("update:value", this.multi ? this.selectedItems : item);
    },
    closeSelect(e) {
      if (
        !this.$refs?.dropdown.contains(e.target) &&
        e.target !== this.$refs.dropdown
      ) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<template>
  <div class="dropdown" ref="dropdown">
    <button @click.prevent="toggleDropdown" class="dropdown__button">
      <span
        class="dropdown__name"
        :class="{
          'name-selected': selectedItems.length > 0 || isOpen,
          error: err?.$error,
        }"
        >{{ name }}
        <template v-if="err?.$error">
          - {{ err?.$errors[0]?.$message }}</template
        ></span
      >
      <span
        class="dropdown__value"
        :class="{ 'value-selected': selectedItems.length > 0 || isOpen }"
        >{{ selectedItems.join(",") }}</span
      >
    </button>
    <ul v-if="isOpen" class="dropdown__list">
      <li
        v-for="item in options"
        :class="{
          'dropdown__list-item': true,
          'chosen-item': selectedItems.includes(item),
        }"
        class="dropdown__list-item"
        :key="item"
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown__name {
  position: absolute;
  color: #a6a6a6;
  transition: all 0.1s ease-in-out;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  z-index: 1;
}

.dropdown__value {
  font-size: 14px;
  color: #404040;
  font-weight: 600;
  line-height: 18px;
}
.dropdown__button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  overflow: hidden;
  background-color: #f2f2f2;
  border: 1px solid transparent;
  border-radius: 100px;
  height: 46px;

  padding: 13px 20px;

  cursor: pointer;
}

.value-selected {
  outline: none;
  padding: 15px 0px 6px;
}
.dropdown__button:focus {
  outline: none;
}

.name-selected {
  font-size: 10px;
  transform: translateY(-60%);
}

.dropdown__list {
  position: absolute;
  list-style-type: none;
  left: 0;
  top: 52px;

  background: #ffffff;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 6px;
  width: 100%;

  z-index: 1000;
  font-size: 14px;
  color: #404040;
  font-weight: 600;
  line-height: 18px;
}

.dropdown__list-item {
  border: 1px solid black;
  padding: 10px 20px;
  border-bottom: 0px;
  cursor: pointer;
  background-color: white;
}

.dropdown__list-item:first-child {
  border-radius: 6px 6px 0 0;
}

.dropdown__list-item:last-child {
  border-radius: 0 0 6px 6px;
  border-bottom: 1px solid black;
}

.chosen-item {
  background-color: #f2f2f2;
}

.dropdown__list-item:hover {
  background-color: #f2f2f2;
}

.error {
  color: red;
}
</style>
