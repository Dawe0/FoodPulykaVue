<template>
  <div id="app" class="container">
    <p></p>
    <label id="userName" class="bal">Bejelentkezve:</label>
    <router-link id="loginButton" class="btn text-white float-end" to="/login">
      <h5>Bejelentkezés</h5></router-link
    >
    <h1 class="d-flex justify-content-center felso">Food Pulyka</h1>

    <nav class="navbar navbar-expand-sm justify-content-center">
      <ul class="navbar-nav">
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/">
            <h4 class="menugombok">Főoldal</h4>
          </router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/pizza">
            <h4 class="menugombok">Pizzák</h4>
          </router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/hamburger"
            ><h4 class="menugombok">Hamburgerek</h4></router-link
          >
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/gyros"
            ><h4 class="menugombok">Gyros</h4></router-link
          >
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/desszert"
            ><h4 class="menugombok">Desszertek</h4></router-link
          >
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/ital"
            ><h4 class="menugombok">Italok</h4></router-link
          >
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/szeszesital"
            ><h4 class="menugombok">Szeszes Italok</h4></router-link
          >
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/kosar"
            ><h4 class="menugombok">Kosár</h4></router-link
          >
        </li>
        <li class="nav-item m-1">
          <router-link class="btn text-white" to="/felhasznalok">
            <h4 class="menugombok">Felhasználók</h4></router-link
          >
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
.keret {
  margin: 3px;
}

.felso {
  margin-top: 15px;
}

.bal {
  text-align: left;
}

#app {
  font-family: myFirstFont;
  font-size: 40px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
.menugombok {
  text-align: center;
  padding-top: 0.5rem;
  font-size: 0.9cm;
}
#body {
  background-image: url("hatter/blackboard.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
@font-face {
  font-family: myFirstFont;
  src: url("Font.ttf");
}
</style>
