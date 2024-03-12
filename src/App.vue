<script>
import PersonalForm from "./components/PersonalForm.vue";
import AddressForm from "./components/AddressForm.vue";
import PassportForm from "./components/PassportForm.vue";
import Congratulations from "./components/Congratulations.vue";
export default {
  components: {
    PersonalForm,
    AddressForm,
    PassportForm,
    Congratulations,
  },
  data() {
    return {
      step: 1,
      dataForm: [],
    };
  },
  methods: {
    submitData(data) {
      this.dataForm = [...this.dataForm, data];
      this.step = this.step + 1;
      if (this.step == 4) {
        console.log(this.dataForm);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <template v-if="step <= 3">
      <header class="header">
        <h2 class="header-title">Заполните форму</h2>
      </header>
      <PersonalForm @submit-data="submitData" v-if="step === 1" />
      <AddressForm @submit-data="submitData" v-else-if="step === 2" />
      <PassportForm @submit-data="submitData" v-else-if="step === 3" />
      <span>*поле обязательное для заполнения</span>
    </template>
    <template v-else-if="step === 4">
      <Congratulations />
    </template>
  </div>
</template>

<style scoped>
.container {
  width: 35vw;
  height: calc(100vh - 64px);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  padding: 2%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  display: flex;
  padding: 40px 0;
  justify-content: center;
}

.submit-button {
  background: #41b883;
}

@media (max-width: 1366px) {
  .container {
    width: 60vw;
  }
}
@media (max-width: 797px) {
  .container {
    width: 95vw;
    
  }
}
</style>
