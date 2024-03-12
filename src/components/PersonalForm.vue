<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { validateNumber} from "../customVuelidate.js"
import Input from "./UI/Input.vue";
import Select from "./UI/Select.vue";
import Checkbox from "./UI/Checkbox.vue";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    Input,
    Select,
    Checkbox,
  },
  data() {
    return {
      lastName: "",
      firstName: "",
      middleName: "",
      birthdate: "",
      phoneNumber: "",
      gender: "",
      customerGroup: "",
      doctor: "",
      isSendSMS: false,
    };
  },
  validations() {
    return {
      lastName: {
        required,
      },
      firstName: {
        required,
      },
      birthdate: {
        required,
      },
      phoneNumber: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        validateNumber: helpers.withMessage('Start with 7', validateNumber)
      },
      customerGroup: {
        required,
      }
    };
  },
  methods: {
    submitForm() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const formData = {
          lastName: this.lastName,
          firstName: this.firstName,
          middleName: this.middleName,
          birthdate: this.birthdate,
          phoneNumber: this.phoneNumber,
          gender: this.gender,
          customerGroup: this.customerGroup,
          doctor: this.doctor,
          isSendSMS: this.isSendSMS,
        };
        this.$emit("submit-data", formData);
      }
    },
  },
};
</script>

<template>
  <form class="form" @submit.prevent="submitForm()">
    <Input v-model:value="lastName" name="Фамилия*" :err="v$.lastName" />
    <Input v-model:value="firstName" name="Имя*" :err="v$.firstName"/>
    <Input v-model:value="middleName" name="Отчество" />
    <Input v-model:value="birthdate" type="date" name="Дата рождения*" :err="v$.birthdate" />
    <Input v-model:value="phoneNumber" type="tel" name="Номер телефона*" :err="v$.phoneNumber"/>
    <Input v-model:value="gender" name="Пол" />
    <Select
      v-model:value="customerGroup"
      name="Группа клиентов*"
      :options="['VIP', 'Проблемные', 'ОМС']"
      multi
      :err="v$.customerGroup"
    />
    <Select
      v-model:value="doctor"
      name="Лечащий врач"
      :options="['Иванов', 'Захаров', 'Чернышева']"
    />
    <Checkbox v-model:value="isSendSMS" name="Не отправлять СМС" />
    <button type="submit" class="nav-button submit-button">Продолжить</button>
  </form>
</template>

