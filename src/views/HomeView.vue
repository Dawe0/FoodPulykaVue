<template>
  <div class="home">
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          class="active"
          data-bs-slide-to="0"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="5"
          aria-label="Slide 6"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="6"
          aria-label="Slide 1"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/img/gyros-pita.jpg" class="w-100 d-block" />
        </div>
        <div class="carousel-item">
          <img src="../assets/img/csirkeburger.jpg" class="w-100 d-block" />
        </div>
        <div class="carousel-item">
          <img src="../assets/img/4sajtos.jpg" class="w-100 d-block" />
        </div>
        <div class="carousel-item">
          <img src="../assets/img/kukoricas.jpg" class="w-100 d-block" />
        </div>
        <div class="carousel-item">
          <img src="../assets/img/browni.jpg" class="w-100 d-block" />
        </div>
        <div class="carousel-item">
          <img src="../assets/img/margareta.jpg" class="w-100 d-block" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  components: {},
  methods: {
    refreshData() {},
  },
  mounted: function () {
    this.refreshData();
  },
};
</script>
