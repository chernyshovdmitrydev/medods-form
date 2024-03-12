<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["update:value"],
};
</script>

<template>
  <div class="checkbox-container">
    <label class="label" :for="name">{{ name }}</label>
    <input
      :id="name"
      type="checkbox"
      class="checkbox"
      :value="value"
      @change="$emit('update:value', $event.target.checked)"
    />
  </div>
</template>

<style scoped>
.checkbox-container {
	display: flex;
  gap: 30px;
  
}
.label {
  color: #a6a6a6;
  transition: all 0.1s ease-in-out;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}
.checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  background-color: #41b883;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
}

.checkbox:checked:before {
  content: '';
  display: flex;
  width: 50%;
  height: 50%;
  position: absolute;
  top: 25%;
  left: 25%;
  border-radius: 50%;
  background-color: black;
}
</style>
