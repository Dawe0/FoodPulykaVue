<template>
  <div class="container-fluid">
    <button
      v-if="logged"
      type="button"
      class="btn text-white m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="addClick()"
    >
      Desszert hozzáadása
    </button>
    <div class="joob">
      <div class="d-flex d-row">
        <input
          class="form-control m-2"
          v-model="DesszertNevFilter"
          v-on:keyup="FilterFn()"
          placeholder="Név részlet"
        />
      </div>
    </div>
    <div class="justify-content-center d-flex">
      <div class="row pb-5">
        <div
          v-for="termek in termekek"
          v-bind:key="termek.id"
          class="col-xs-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 pt-5"
        >
          <div class="card bg-transparent border-white">
            <div class="card-body">
              <div class="kozep">
                <img class="card-img-top" :src="PhotoPath + termek.linkkep" />
              </div>
              <div class="text-white">{{ termek.nev }}</div>
              <div class="text-white">{{ termek.ar }} Ft</div>
              <div v-if="logged">
                <button
                  type="button"
                  title="Módosítás"
                  class="btn btn-light mr-1 keret"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="editClick(termek)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  title="Törlés"
                  class="btn btn-light mr-1 keret"
                  @click="deleteClick(termek.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  title="Kosárba"
                  class="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="KosarClick(termek)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Név</span>
              <input type="text" class="form-control" v-model="DesszertNev" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Ár</span>
              <input type="number" class="form-control" v-model="DesszertAr" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Darab</span>
              <input type="number" class="form-control" v-model="aktDarab" />
            </div>
            <!--div class="input-group mb-3">
              <span class="input-group-text">Linkkép</span>
              <input type="text" class="form-control" v-model="DesszertLinkkep" />
            </div-->
            <div class="p2 w50 bd-highlight">
              <img
                class="foto"
                width="460px"
                height="290px"
                :src="PhotoPath + DesszertLinkkep"
              />
              <input
                v-if="logged"
                class="m2"
                type="file"
                @change="imageUpload"
              />
            </div>
            <br />
            <button
              type="button"
              @click="adatbazisbaTeszClick(DesszertId, Kategoria, aktDarab)"
              class="btn text-white float-end"
            >
              Kosárba tesz
            </button>
            <div v-if="logged">
              <button
                type="button"
                @click="createClick()"
                v-if="DesszertId == 0"
                class="btn text-white"
              >
                Létrehoz
              </button>
              <button
                type="button"
                @click="updateClick()"
                v-if="DesszertId != 0"
                class="btn text-white"
              >
                Módosítás
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DesszertView",

  data() {
    return {
      aktDarab: 0,
      logged: this.$store.state.logged,
      termekek: [],
      DesszertId: 0,
      DesszertNev: "",
      DesszertAr: 0,
      DesszertLinkkep: "",
      Kategoria: 0,
      PhotoPath: this.$store.state.PHOTO_URL,
      modalTitle: "",
      DesszertNevFilter: "",
      TermekekSzuroNelkul: [],
    };
  },

  components: {},

  methods: {
    refreshData() {
      axios.get(this.$store.state.API_URL + "termek/1").then((response) => {
        this.termekek = response.data;
        this.TermekekSzuroNelkul = response.data;
      });
    },
    KosarClick(termek) {
      this.DesszertId = termek.id;
      this.DesszertNev = termek.nev;
      this.DesszertAr = termek.ar;
      this.DesszertLinkkep = termek.linkkep;
      this.Kategoria = termek.kategoria;
      this.aktDarab = 1;
      this.modalTitle = "Megrendelés";
    },
    adatbazisbaTeszClick(termek, termekkategoria, darab) {
      console.log(this.$store.state.LoggedUser.Id);
      console.log(darab);
      console.log(termek);
      console.log(termekkategoria);
    },
    addClick() {
      this.modalTitle = "Desszert hozzáadása";
      this.DesszertId = 0;
      this.DesszertNev = "";
      this.DesszertAr = "";
      this.DesszertLinkkep = "";
      this.Kategoria = 5;
    },
    editClick(termek) {
      this.modalTitle = "Desszert módosítása";
      this.DesszertId = termek.id;
      this.DesszertNev = termek.nev;
      this.DesszertAr = termek.ar;
      this.DesszertLinkkep = termek.linkkep;
      this.Kategoria = 5;
    },
    imageUpload(event) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      axios
        .post(this.$store.state.API_URL + "termek/ImgUpload", formData)
        .then((response) => {
          this.DesszertLinkkep = "/img/" + response.data;
        });
    },
    createClick() {
      axios
        .post(
          this.$store.state.API_URL + "termek?uid=" + this.$store.state.Uid,
          {
            Nev: this.DesszertNev,
            Ar: this.DesszertAr,
            Linkkep: this.DesszertLinkkep,
            Kategoria: 5,
          }
        )
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
      document.getElementById("exampleModal").click();
    },
    updateClick() {
      axios
        .put(this.$store.state.API_URL + "termek", {
          Id: this.DesszertId,
          Nev: this.DesszertNev,
          Ar: this.DesszertAr,
          Linkkep: this.DesszertLinkkep,
          Kategoria: 5,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
      document.getElementById("exampleModal").click();
    },
    deleteClick(id) {
      if (!confirm("Biztosan töröljem?")) {
        return;
      }
      axios
        .delete(this.$store.state.API_URL + "termek/" + id)
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    FilterFn() {
      var DesszertNevFilter = this.DesszertNevFilter;
      this.termekek = this.TermekekSzuroNelkul.filter(function (el) {
        console.log(el);
        return el.nev
          .toString()
          .toLowerCase()
          .includes(DesszertNevFilter.toString().trim().toLowerCase());
      });
    },
  },
  mounted: function () {
    this.refreshData();
  },
};
</script>

<style scope>
.card-img-top {
  width: 7cm;
  height: 5cm;
}
/*.card {
 background-image: url("/src/hatter/blackboard.jpg");
}*/
.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.jobb {
  text-align: right;
}

.kozep {
  text-align: center;
}

.modal-body {
  background-image: url("/src/hatter/blackboard.jpg");
}

.modal-content {
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
}

.modal-footer {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  -webkit-border-bottom-left-radius: 6px;
  -webkit-border-bottom-right-radius: 6px;
  -moz-border-radius-bottomleft: 6px;
  -moz-border-radius-bottomright: 6px;
}

.modal-header {
  background-image: url("/src/hatter/blackboard.jpg");
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  -webkit-border-top-left-radius: 6px;
  -webkit-border-top-right-radius: 6px;
  -moz-border-radius-topleft: 6px;
  -moz-border-radius-topright: 6px;
}
</style>
