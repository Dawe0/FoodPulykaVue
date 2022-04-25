<template>
  <div class="login">
    <div
      class=""
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h5 v-if="!logged" class="modal-title" id="exampleModalLabel">
              Bejelentkezés
            </h5>
            <h5 v-if="logged" class="modal-title" id="exampleModalLabel">
              Kijelentkezés
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeClick()"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="!logged" class="input-group mb-3">
              <span class="input-group-text">Név :</span>
              <input type="text" class="form-control" v-model="BNev" />
            </div>
            <div v-if="!logged" class="input-group mb-3">
              <span class="input-group-text">Jelszó :</span>
              <input type="password" class="form-control" v-model="Jelszo" />
            </div>
            <button
              type="button"
              @click="loginClick(BNev, Jelszo)"
              v-if="!logged"
              class="btn text-white m-2 float-end"
            >
              Bejelentkezés
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#regModal"
              v-if="!logged"
              class="btn text-white"
            >
              Regisztráció
            </button>
            <button
              type="button"
              @click="logoutClick()"
              v-if="logged"
              class="btn text-white m-2 float-end"
            >
              Kijelentkezés
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="regModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="exampleModalLabel">Regisztráció</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Név :</span>
              <input type="text" class="form-control" v-model="BNev" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Jelszó :</span>
              <input type="password" class="form-control" v-model="Jelszo" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">E-mail :</span>
              <input type="text" class="form-control" v-model="Email" />
            </div>
            <button
              type="button"
              @click="registryClick(BNev, Jelszo, Email)"
              class="btn btn-primary m-2 float-end"
            >
              Regisztrálok
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal"
      id="chpModal"
      tabindex="-1"
      aria-labelledby="chpModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="chpModalLabel">
              Jelszó megváltoztatása
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Régi jelszó :</span>
              <input
                type="password"
                class="form-control"
                v-model="RegiJelszo"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Új jelszó :</span>
              <input type="password" class="form-control" v-model="UjJelszo" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Új jelszó ismét :</span>
              <input
                type="password"
                class="form-control"
                v-model="UjJelszoIsmet"
              />
            </div>
            <button
              type="button"
              @click="chpClick(RegiJelszo, UjJelszo)"
              class="btn btn-primary m-2 float-end"
            >
              Jelszó módosítás
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
  name: "LoginView",
  components: {},

  data() {
    return {
      BNev: "",
      Jelszo: "",
      Email: "",
      logged: this.$store.state.logged,
      RegiJelszo: "",
      UjJelszo: "",
      UjJelszoIsmet: "",
      JelszoValtoztatasTortent: false,
    };
  },

  methods: {
    closeClick() {
      this.$router.push("/");
    },
    registryClick(bNev, jelszo, email) {
      axios
        .post(this.$store.state.API_URL + "felhasznalo", {
          BNev: bNev,
          Jelszo: jelszo.toString(),
          Email: email,
          Jog: 0,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    refreshData() {
      if (this.$store.state.logged) {
        document.getElementById("loginButton").innerHTML = "Kijelentkezés";
      } else {
        document.getElementById("loginButton").innerHTML = "Bejelentkezés";
      }
    },
    loginClick(bNev, jelszo) {
      axios
        .post(
          this.$store.state.API_URL +
            "Login?bNev=" +
            bNev +
            "&jelszo=" +
            jelszo.toString(),
          {}
        )
        .then((response) => {
          this.$store.state.Uid = response.data.Uid;
          if (this.$store.state.Uid != undefined) {
            this.$store.state.LoggedUser = response.data.Felhasznalo;
            const mezok = this.$store.state.Uid.split("-");
            if (mezok.length == 5) {
              this.$store.commit("setLogged", true);
              console.log(this.$store.state.logged);
              alert(
                "Sikeresen bejelentkezve: " + this.$store.state.LoggedUser.Email
              );
              document.getElementById("userName").innerHTML =
                "Bejelentkezve: " + this.$store.state.LoggedUser.Email;
              if (this.$store.state.LoggedUser.Jog == 9) {
                var elem = document.getElementById("BackupRestore");
                elem.disabled = false;
                elem.textContent = "Mentés/Visszatöltés";
              }
            } else {
              this.$store.state.logged = false;
              alert(this.$store.state.Uid);
            }
          } else {
            alert(response.data);
          }
          this.refreshData();
        })
        .catch((error) => {
          alert("Hiba történt:\n" + error.message);
        });
      this.$router.push("/");
    },
    logoutClick() {
      axios
        .post(this.$store.state.API_URL + "Logout/" + this.$store.state.Uid)
        .then((response) => {
          console.log(response);
        });
      document.getElementById("userName").innerHTML = "Bejelentkezve: ";
      this.$store.state.logged = false;
      this.$store.state.Uid = "";
      this.refreshData();
      if (!this.JelszoValtoztatasTortent) {
        alert(
          "Sikeresen kijelentkezett: " + this.$store.state.LoggedUser.Email
        );
      }
      this.$store.state.LoggedUser.Email = 0;
      this.$store.state.LoggedUser.Jog = 0;
      var elem = document.getElementById("BackupRestore");
      elem.disabled = true;
      elem.textContent = "";
      this.$router.push("/");
    },
    chpClick() {
      if (
        this.UjJelszo == this.UjJelszoIsmet &&
        this.UjJelszo != "" &&
        this.UjJelszo != this.RegiJelszo
      ) {
        let opw = this.RegiJelszo.toString();
        let npw = this.RegiJelszo.toString();
        if (opw == this.$store.state.LoggedUser.Jelszo) {
          axios
            .put(this.$store.state.API_URL + "ChangePassword", {
              Uid: this.$store.state.Uid,
              RegiJelszo: opw,
              UjJelszo: npw,
            })
            .then((response) => {
              alert(
                response.data + " A módosítás után újra be kell jelentkezni!"
              );
              this.JelszoValtoztatasTortent = true;
              this.logoutClick();
              document.getElementById("chpModal").click();
            });
        } else {
          alert("Hibás régi jelszó!");
        }
      } else {
        alert(
          "Nem egyezik meg az új jelszó az ismételt megadáskor vagy üres jelszó került megadásra vagy a régi jelszó megegyezik az új jelszóval!"
        );
      }
    },
  },
};
</script>
