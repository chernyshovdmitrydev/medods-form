<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Input from "./UI/Input.vue";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    Input,
  },
  data() {
    return {
      addressIndex: "",
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",
    };
  },
  validations() {
    return {
      city: {
        required,
      }
    };
  },
  methods: {
    submitForm() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const formData = {
          addressIndex: this.addressIndex,
          country: this.country,
          region: this.region,
          city: this.city,
          street: this.street,
          house: this.house
        };
        this.$emit("submit-data", formData);
      }
    },
  },
};
</script>

<template v-else-if="step === 2">
  <form @submit.prevent="submitForm()" class="form">
    <Input v-model:value="addressIndex" name="Индекс" type="number"/>
    <Input v-model:value="country" name="Страна" />
    <Input v-model:value="region" name="Область" />
    <Input v-model:value="city" name="Город*" :err="v$.city"/>
    <Input v-model:value="street" name="Улица" />
    <Input v-model:value="house" name="Дом" />
    <button type="submit" class="nav-button submit-button">Продолжить</button>
  </form>
</template>
