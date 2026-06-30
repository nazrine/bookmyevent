<script setup>

</script>
<template>
  <div class="container my-5 text-start min-vh-100">
    
    <!-- 🌟 HERO SECTION -->
    <div class="row align-items-center g-5 mb-5">
      <div class="col-lg-6">
        <span class="badge bg-danger-subtle text-danger mb-2 px-3 py-2 fw-bold rounded-pill">Who We Are</span>
        <h1 class="display-5 fw-bold text-dark mb-4">
          Making Your Celebrations <span class="text-danger">Stress-Free</span> & Grand
        </h1>
        <p class="text-secondary lh-lg mb-4">
          Welcome to <strong>bookmyevent</strong>, Kerala's premier network designed to connect you with verified Event Management teams. Whether you are planning a dream wedding, a themed birthday party, an intimate engagement, or a high-profile corporate event, we bring top-tier professionals right to your fingertips.
        </p>
        <p class="text-secondary lh-lg">
          We understand that behind every celebration, there are emotions, dreams, and countless hours of planning. Our platform simplifies this entire journey, ensuring you find the right managers and decorators who can turn your vision into reality.
        </p>
      </div>
      <div class="col-lg-6">
        <div class="position-relative">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600" class="img-fluid rounded-4 shadow" alt="About Event Planning">
          <div class="bg-danger text-white position-absolute bottom-0 start-0 m-4 p-3 rounded-3 d-none d-sm-block shadow">
            <h5 class="fw-bold m-0">100% Verified</h5>
            <small class="opacity-75">Partners across Kerala</small>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-5 opacity-25">

    <!-- 🎯 OUR FEATURES / WHY CHOOSE US -->
    <div class="text-center mb-5">
      <span class="badge bg-secondary-subtle text-secondary mb-2 px-3 py-2 fw-bold rounded-pill">Our Core Pillars</span>
      <h2 class="fw-bold text-dark">Why People Choose bookmyevent</h2>
    </div>

    <div class="row g-4 mb-5">
      <!-- Feature 1 -->
      <div class="col-md-4">
        <div class="card p-4 border-0 shadow-sm rounded-4 h-100 text-center text-md-start">
          <div class="feature-icon mb-3">🤝</div>
          <h5 class="fw-bold text-dark">Verified Professionals</h5>
          <p class="text-muted small lh-base m-0">
            Every vendor, decorator, and manager on our platform goes through a strict screening process to maintain premium quality.
          </p>
        </div>
      </div>
      <!-- Feature 2 -->
      <div class="col-md-4">
        <div class="card p-4 border-0 shadow-sm rounded-4 h-100 text-center text-md-start">
          <div class="feature-icon mb-3">⚡</div>
          <h5 class="fw-bold text-dark">Instant Enquiries</h5>
          <p class="text-muted small lh-base m-0">
            No endless phone calls! Directly check the availability and send booking proposals straight to the manager's dashboard.
          </p>
        </div>
      </div>
      <!-- Feature 3 -->
      <div class="col-md-4">
        <div class="card p-4 border-0 shadow-sm rounded-4 h-100 text-center text-md-start">
          <div class="feature-icon mb-3">🎨</div>
          <h5 class="fw-bold text-dark">Diverse Categories</h5>
          <p class="text-muted small lh-base m-0">
            From traditional Haldi & Wedding setups to modern Neon Birthday themes and Corporate stages, find everything in one place.
          </p>
        </div>
      </div>
    </div>

    <!-- 🎪 CALL TO ACTION -->
    <div class="p-5 bg-dark text-white rounded-4 shadow text-center my-5">
      <h3 class="fw-bold mb-3">Are You an Event Planner or Decorator?</h3>
      <p class="opacity-75 max-width-md mx-auto mb-4 small">
        Grow your business with bookmyevent. Showcase your past work gallery, receive direct leads from clients, and manage your bookings effortlessly.
      </p>
      <router-link to="/contact" class="btn btn-danger fw-bold px-4 py-2 rounded-3">Register As Partner ➔</router-link>
    </div>

  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
}
.feature-icon {
  font-size: 2.5rem;
}
</style>