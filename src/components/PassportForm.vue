<script>
import { useVuelidate } from "@vuelidate/core";
import { required} from "@vuelidate/validators";
import Input from "./UI/Input.vue";
import Select from './UI/Select.vue'
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    Input,
    Select,
  },
  data() {
    return {
      documentType: "",
      documentSeries: "",
      documentNumber: "",
      documentWhoIssued: "",
      documentDate: "",
    };
  },
  validations() {
    return {
      documentType: {
        required,
      },
      documentDate: {
        required,
      },
    };
  },
  methods: {
    submitForm() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const formData = {
          documentType: this.documentType,
          documentSeries: this.documentSeries,
          documentNumber: this.documentNumber,
          documentDate: this.documentDate,
        };
        this.$emit("submit-data", formData);
      }
    },
  },
};
</script>

<template v-else-if="step === 3">
  <form @submit.prevent="submitForm()" class="form">
    <Select
    :err="v$.documentType"
      v-model:value="documentType"
      name="Тип документа*"
      :options="['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение']"
    />
    <Input v-model:value="documentSeries" name="Серия" type="number"/>
    <Input v-model:value="documentNumber" name="Номер" type="number"/>
    <Input v-model:value="documentWhoIssued" name="Кем выдан" />
    <Input v-model:value="documentDate" type="date" name="Дата выдачи*" :err="v$.documentDate"/>
    <button type="submit" class="nav-button submit-button">Продолжить</button>
  </form>
</template>
