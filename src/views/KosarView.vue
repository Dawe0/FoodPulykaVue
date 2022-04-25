<template>
  <div class="kosar">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Kosár</h3>
      </div>
    </div>
    <div
      v-for="rendelesadatok in rendelesadatoks"
      :key="rendelesadatok.termekid"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <router-link
          :to="{ name: 'reszletek', params: { id: rendelesadatok.termekid } }"
        >
          <!--  <img
            v-bind:src="kosarItem.product.imageURL"
            class="w-100 card-img-top embed-responsive-item"
          /> -->
        </router-link>
      </div>
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link
              :to="{
                name: 'reszletek',
                params: { id: rendelesadatok.termekid },
              }"
              >{{ rendelesadatok.termekid }}
            </router-link>
          </h6>
          <p id="termekAr" class="mb-0 font-weight-bold">
            Ft {{ rendelesadatok.termekid }} per unit
          </p>
          <p id="darabSzam" class="mb-0">
            Mennyiség :
            <input
              size="1"
              class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
              v-model="rendelesadatok.mennyiseg"
            />
          </p>
          <p id="osszAr" class="mb-0">
            Összesen:
            <span class="font-weight-bold">
              Ft {{ rendelesadatok.termekid * rendelesadatok.mennyiseg }}</span
            >
          </p>
          <br /><a
            href="#"
            class="text-right"
            @click="ElemTorlese(rendelesadatok.id)"
            >Törlés a kosárból</a
          >
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>
    <div class="total-cost pt-2 text-right">
      <h5 class="text-white">Összesen : Ft {{ osszAr.toFixed(2) }}</h5>
      <button
        :disabled="isDisabled()"
        type="button"
        class="btn btn-dark confirm"
        @click="checkout"
      >
        Rendelés leadása
      </button>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      rendelesadatoks: [],
      token: null,
      osszAr: 0,
    };
  },
  props: ["baseURL"],
  methods: {
    isDisabled() {
      if (this.rendelesadatoks.length === 0) {
        return true;
      }
      return false;
    },
    UjRendeles() {},
    KosarElemei() {
      axios.get(`${this.baseURL}kosar/?token=${this.token}`).then(
        (response) => {
          if (response.status == 200) {
            const result = response.data;
            this.rendelesadatoks = result.rendelesadatoks;
            this.osszAr = result.osszAr;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    checkout() {
      this.$router.push({ name: "Checkout" });
    },
    ElemTorlese(Termekid) {
      axios
        .delete(`${this.baseURL}kosar/delete/${Termekid}/?token=${this.token} `)
        .then(
          (response) => {
            if (response.status == 200) {
              this.$router.go(0);
            }
            this.$emit("fetchData");
          },
          (error) => {
            console.log(error);
          }
        );
    },
    reszletek(termekId) {
      this.$router.push({
        name: "reszletek",
        params: { id: termekId },
      });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.KosarElemei();
  },
};
</script>

<style scoped>
h4,
h5 {
  font-family: "Roboto", sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}

#termekAr {
  color: #232f3e;
}

#darabSzam {
  float: left;
}

#OsszAr {
  float: right;
}

.confirm {
  font-weight: bold;
  font-size: larger;
}
</style>
