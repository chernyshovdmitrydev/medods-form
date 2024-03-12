<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    err: {
      type: Object,
    },
  },
  emits: ["update:value"],
};
</script>

<template>
  <div
    class="input-container"
    :class="{
      'container-with-value': value && (type === 'text' || type === 'number' || type === 'tel'),
    }"
  >
    <label
      :for="name"
      class="label"
      :class="{
        'label-with-value': value && (type === 'text' || type === 'number' || type === 'tel'),
        'label-date': type === 'date',
        'error': err?.$error,
      }"
      >{{ name }}<template v-if='err?.$error'> - {{ err?.$errors[0]?.$message }}</template>
      </label
    >
    <input
      :id="name"
      :type="type"
      class="input"
      :value="value"
      @input="$emit('update:value', $event.target.value.trim())"
      
    />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  padding: 13px 20px;
  background-color: #f2f2f2;
  border: 1px solid transparent;
  border-radius: 100px;
  transition: all 0.1s ease-in-out;
}

.container-with-value {
  padding: 19px 19px 6px;
}

.label {
  position: absolute;
  color: #a6a6a6;
  transition: all 0.1s ease-in-out;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}

.label-with-value {
  margin-bottom: 2px;
  font-size: 10px;
  transform: translateY(-80%);
}
.input {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: #404040;
  text-overflow: ellipsis;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: #41b883;
  font-weight: 600;
  line-height: 18px;
}

.input-container:focus-within {
  border-color: #41b883;
}

.label-date {
  transform: translateY(-85%);
  margin-bottom: 2px;
  font-size: 10px;
}

.error {
  color: red;
}
</style>
