<template>
  <div class="felhasznalok">
    <button
      v-if="logged"
      type="button"
      class="btn text-white m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="addClick()"
    >
      Felhasználó hozzáadása
    </button>
    <table class="table table-striped justify-content-center">
      <thead>
        <tr class="text-white">
          <th>Felhasználó ID</th>
          <th>Név</th>
          <th v-if="logged">Jelszó</th>
          <th>Email</th>
          <th>Jog</th>
          <th v-if="logged">Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="felhasznalo in felhasznalok" v-bind:key="felhasznalo.id">
          <td class="text-white">{{ felhasznalo.id }}</td>
          <td class="text-white">{{ felhasznalo.bNev }}</td>
          <td class="text-white" v-if="logged">{{ felhasznalo.jelszo }}</td>
          <td class="text-white">{{ felhasznalo.email }}</td>
          <td class="text-white">{{ felhasznalo.jog }}</td>
          <td v-if="logged">
            <button
              type="button"
              title="Módosítás"
              class="btn btn-light mr-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="editClick(felhasznalo)"
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
              class="btn btn-light mr-1"
              @click="deleteClick(felhasznalo.id)"
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
          </td>
        </tr>
      </tbody>
    </table>

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
            <h5 class="modal-title" id="exampleModalLable">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Név:</span>
              <input
                v-if="logged"
                type="text"
                class="form-control"
                v-model="bNev"
              />
              <input
                v-if="!logged"
                type="text"
                class="form-control"
                v-model="bNev"
                disabled
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">email:</span>
              <input
                v-if="logged"
                type="text"
                class="form-control"
                v-model="email"
              />
              <input
                v-if="!logged"
                type="text"
                class="form-control"
                v-model="email"
                disabled
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Jelszó:</span>
              <input type="password" class="form-control" v-model="jelszo" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">jog:</span>
              <select
                v-if="logged"
                type="number"
                class="form-select"
                v-model="jog"
              >
                <option v-for="jog in jogok" v-bind:key="jog">{{ jog }}</option>
              </select>
              <input
                v-if="!logged"
                type="number"
                class="form-control"
                v-model="jog"
                disabled
              />
            </div>
            <button
              type="button"
              @click="createClick()"
              v-if="(id == 0) & logged"
              class="btn text-white"
            >
              Létrehozás
            </button>
            <button
              type="button"
              @click="updateClick()"
              v-if="(id != 0) & logged"
              class="btn text-white"
            >
              Módosít
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FelhasznalokView",
  components: {},

  data() {
    return {
      logged: this.$store.state.logged,
      felhasznalok: [],
      id: 0,
      bNev: "",
      email: "",
      jelszo: "",
      jog: 0,
      jogok: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      modalTitle: "",
    };
  },
  methods: {
    refreshData() {
      axios.get(this.$store.state.API_URL + "felhasznalo").then((response) => {
        this.felhasznalok = response.data;
      });
    },
    addClick() {
      this.modalTitle = "Új felhasználó felvitele";
      this.id = 0;
      this.bNev = "";
      this.email = "";
      this.jelszo = "";
      this.jog = 0;
    },
    editClick(felhasznalo) {
      this.modalTitle = "Felhasználó adatainak módosítása";
      this.id = felhasznalo.id;
      this.bNev = felhasznalo.bNev;
      this.email = felhasznalo.email;
      this.jelszo = felhasznalo.jelszo;
      this.jog = felhasznalo.jog;
    },
    createClick() {
      axios
        .post(this.$store.state.API_URL + "felhasznalo", {
          bNev: this.bNev,
          email: this.email,
          jelszo: this.jelszo.toString(),
          jog: this.jog,
        })
        .then((response) => {
          alert(response.data);
          this.refreshData();
        });
    },
    updateClick() {
      axios
        .put(this.$store.state.API_URL + "felhasznalo", {
          id: this.id,
          bNev: this.bNev,
          email: this.email,
          jelszo: this.jelszo,
          jog: this.jog,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    deleteClick(id) {
      if (!confirm("Biztosan törölni kívánja a kiválasztott rekordot?")) {
        return;
      }
      axios
        .delete(this.$store.state.API_URL + "felhasznalo/" + id, {
          Id: this.id,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
  },

  mounted: function () {
    this.refreshData();
  },
};
</script>
