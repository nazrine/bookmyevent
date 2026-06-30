<script setup>

const eventCategories = [
  { name: 'Wedding', icon: 'bi bi-heart-fill text-danger' },
  { name: 'Birthday', icon: 'bi bi-cake2 text-warning' },
  { name: 'Anniversary', icon: 'bi bi-people-fill text-primary' },
  { name: 'Haldi', icon: 'bi bi-brightness-high-fill text-warning' },
  { name: 'Bride/Groom to be', icon: 'bi bi-gem text-info' },
  { name: 'Baby Shower', icon: 'bi bi-balloon-fill text-success' },
  { name: 'Parties', icon: 'bi bi-music-note-beamed text-dark' },
  { name: 'Mehandi Night', icon: 'bi bi-flower1 text-success' },
  { name: 'Music Shows', icon: 'bi bi-mic text-danger' }
];
</script>

<template>
  <div class="container mt-3">
    
    <div id="bmsHomeCarousel" class="carousel slide rounded-3 overflow-hidden" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://png.pngtree.com/thumb_back/fh260/background/20220726/pngtree-a-white-tablecloth-adorned-with-gold-ribbons-and-bows-showcasing-a-wedding-planner-book-photo-image_19262952.jpg" class="d-block w-100 carousel-img" alt="Banner 1">
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=300" class="d-block w-100 carousel-img" alt="Banner 2">
        </div>
        <div class="carousel-item">
          <img src="/images/card3.jpg" class="d-block w-100 carousel-img" alt="Banner 3">
        </div>
      </div>
      
      <button class="carousel-control-prev" type="button" data-bs-target="#bmsHomeCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#bmsHomeCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

  </div>

  <div class="container mt-3">
    </div>

 <!-- 🎪 സർക്കിൾ ഐക്കൺ കാറ്റഗറി സെക്ഷൻ -->
<div class="container mt-4 pt-2">
  <div class="d-flex justify-content-start justify-content-lg-center gap-4 overflow-auto pb-3 custom-scrollbar text-center">
    
    <!-- ഓരോ കാറ്റഗറി ഐറ്റവും -->
    <div v-for="cat in eventCategories" :key="cat.name" class="category-item cursor-pointer">
      <div class="icon-circle shadow-sm mx-auto mb-2 d-flex align-items-center justify-content-center">
        <!-- 👈 ഇവിടെ ഇമോജി മാറ്റി ബൂട്ട്സ്ട്രാപ്പ് ഐക്കൺ ക്ലാസ്സ് കൊടുക്കുന്നു -->
        <i :class="[cat.icon, 'fs-3']"></i>
      </div>
      <span class="small fw-bold text-secondary text-nowrap d-block">{{ cat.name }}</span>
    </div>

  </div>
</div>

<!-- 👑 3. POPULAR ORGANIZERS SECTION (Updated as per 78617.jpg) -->
  <div class="container mt-5 text-start">
    <h4 class="fw-bold text-dark mb-4">Popular Organizers</h4>
    
    <!-- മൊബൈലിൽ സൈഡ് സ്ക്രോളിങ്ങും ഡെസ്ക്ടോപ്പിൽ നോർമൽ ഗ്രിഡും ആകുന്ന ലേഔട്ട് -->
    <div class="d-flex justify-content-start gap-3 overflow-auto pb-3 custom-scrollbar row flex-nowrap mx-0">
      
      <!-- Organizer Card 1 -->
      <div class="col-9 col-sm-6 col-md-4 col-lg-2-5 px-0">
        <div class="organizer-card text-white rounded-4 overflow-hidden position-relative p-3 d-flex flex-column justify-content-between" style="background-color: #ec5e87;">
          <div>
            <h5 class="fw-bold mb-1 card-title-text">Royal Wedding</h5>
            <p class="small opacity-80 m-0">15+ Annual Events</p>
          </div>
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300" alt="Wedding" class="card-bg-image">
        </div>
      </div>

      <!-- Organizer Card 2 -->
      <div class="col-9 col-sm-6 col-md-4 col-lg-2-5 px-0">
        <div class="organizer-card text-white rounded-4 overflow-hidden position-relative p-3 d-flex flex-column justify-content-between" style="background-color: #4382f7;">
          <div>
            <h5 class="fw-bold mb-1 card-title-text">Little Stars</h5>
            <p class="small opacity-80 m-0">Birthday Experts</p>
          </div>
          <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=300" alt="Birthday" class="card-bg-image">
        </div>
      </div>

      <!-- Organizer Card 3 -->
      <div class="col-9 col-sm-6 col-md-4 col-lg-2-5 px-0">
        <div class="organizer-card text-white rounded-4 overflow-hidden position-relative p-3 d-flex flex-column justify-content-between" style="background-color: #3bc491;">
          <div>
            <h5 class="fw-bold mb-1 card-title-text">Pulse Beats</h5>
            <p class="small opacity-80 m-0">Music & Concerts</p>
          </div>
          <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=300" alt="Music" class="card-bg-image">
        </div>
      </div>

      <!-- Organizer Card 4 -->
      <div class="col-9 col-sm-6 col-md-4 col-lg-2-5 px-0">
        <div class="organizer-card text-white rounded-4 overflow-hidden position-relative p-3 d-flex flex-column justify-content-between" style="background-color: #fca13b;">
          <div>
            <h5 class="fw-bold mb-1 card-title-text">Elite Corporate</h5>
            <p class="small opacity-80 m-0">Business Meets</p>
          </div>
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" alt="Corporate" class="card-bg-image">
        </div>
      </div>

    </div>
  </div>

 <!-- 📸 4. FEATURED GALLERY SECTION (New) -->
  <div class="container mt-5 text-start mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold text-dark m-0">Recent Event Gallery</h4>
      <a href="#" class="text-danger fw-bold small text-decoration-none">View All Works ➔</a>
    </div>

    <!-- 🖼️ Gallery Grid Cards -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      
      <!-- Work 1: Wedding -->
      <div class="col">
        <div class="card h-100 gallery-card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="position-relative overflow-hidden img-hover-container">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=500" class="card-img-top gallery-img" alt="Royal Wedding Decor">
            <span class="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-1">Wedding</span>
          </div>
          <div class="card-body p-3">
            <h6 class="fw-bold text-dark mb-1 text-truncate">Premium Pastel Mandap</h6>
            <p class="text-muted small m-0">📍 Raviz Kadavu, Calicut</p>
          </div>
        </div>
      </div>

      <!-- Work 2: Birthday -->
      <div class="col">
        <div class="card h-100 gallery-card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="position-relative overflow-hidden img-hover-container">
            <img src="https://images.unsplash.com/photo-1464349172961-10442a8a2596?auto=format&fit=crop&q=80&w=500" class="card-img-top gallery-img" alt="Birthday setup">
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-1">Birthday</span>
          </div>
          <div class="card-body p-3">
            <h6 class="fw-bold text-dark mb-1 text-truncate">Jungle Theme Kids Party</h6>
            <p class="text-muted small m-0">📍 Gokulam Park, Kochi</p>
          </div>
        </div>
      </div>

      <!-- Work 3: Haldi -->
      <div class="col">
        <div class="card h-100 gallery-card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="position-relative overflow-hidden img-hover-container">
            <img src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=500" class="card-img-top gallery-img" alt="Haldi Decor">
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-1">Haldi</span>
          </div>
          <div class="card-body p-3">
            <h6 class="fw-bold text-dark mb-1 text-truncate">Traditional Marigold Decor</h6>
            <p class="text-muted small m-0">📍 Town Hall, Palakkad</p>
          </div>
        </div>
      </div>

      <!-- Work 4: Music Show -->
      <div class="col">
        <div class="card h-100 gallery-card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="position-relative overflow-hidden img-hover-container">
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=500" class="card-img-top gallery-img" alt="Music Stage">
            <span class="badge bg-primary position-absolute top-0 start-0 m-3 px-3 py-1">Music Concert</span>
          </div>
          <div class="card-body p-3">
            <h6 class="fw-bold text-dark mb-1 text-truncate">Live Neon Stage & Sound</h6>
            <p class="text-muted small m-0">📍 Calicut Beach</p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
/* 🎨 CAROUSEL HEIGHT CONTROL */
.carousel-img {
  height: 320px; /* 👈 ഇവിടെ നിങ്ങൾക്ക് ഹൈറ്റ് അഡ്ജസ്റ്റ് ചെയ്യാം (BookMyShow സ്റ്റാൻഡേർഡ് സൈസ്) */
  object-fit: cover; /* 🖼️ ഇമേജ് സ്ട്രെച്ച് ആകാതെ കറക്റ്റ് ആയി ക്രോപ്പ് ചെയ്ത് നിൽക്കാൻ ഇത് സഹായിക്കും */
  object-position: center; /* ഇമേജിന്റെ നടുഭാഗം കൃത്യമായി കാണിക്കാൻ */
}

/* മൊബൈൽ ഫോണുകളിൽ വരുമ്പോൾ ഹൈറ്റ് ഇനിയും അല്പം കുറയ്ക്കാം (Responsive) */
@media (max-width: 768px) {
  .carousel-img {
    height: 180px;
  }
}

.icon-circle {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease-in-out;
}

/* ഐക്കണുകൾക്ക് ആ ഇമേജിൽ കാണുന്നതുപോലെ ഒരു ഗ്രേ/ഡാർക്ക് സ്റ്റാൻഡേർഡ് ലുക്ക് നൽകാൻ */
.icon-circle i {
  color: #4a5568; 
  transition: color 0.2s;
}

.category-item:hover .icon-circle {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08) !important;
  border-color: #ff4757;
}

/* ഹോവർ ചെയ്യുമ്പോൾ ഐക്കണിന്റെയും ടെക്സ്റ്റിന്റെയും കളർ ബ്രാൻഡ് കളർ (Red) ആകാൻ */
.category-item:hover .icon-circle i,
.category-item:hover span {
  color: #ff4757 !important;
}

/* 👑 Popular Organizers Custom Styling */
.organizer-card {
  height: 240px; /* കാർഡുകളുടെ കൃത്യമായ വലിപ്പം */
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: none;
}

.organizer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
}

/* കാർഡിന്റെ താഴെ കൃത്യമായി ഇമേജ് ഫിറ്റ് ചെയ്യാൻ */
.card-bg-image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 90%;
  height: 60%;
  object-fit: cover;
  border-top-left-radius: 20px; /* ഇമേജിന്റെ അറ്റം മാത്രം വളഞ്ഞിരിക്കാൻ */
}

.card-title-text {
  font-size: 1.1rem;
  letter-spacing: -0.5px;
}

/* Bootstrap-ൽ ഇല്ലാത്ത 5-കോളം ഗ്രിഡ് സിസ്റ്റം ഡെസ്ക്ടോപ്പിനായി ഉണ്ടാക്കിയത് */
@media (min-width: 992px) {
  .col-lg-2-5 {
    width: 25%; /* 4 കാർഡുകൾ കമ്പ്യൂട്ടറിൽ ഒരേ ലൈനിൽ വരാൻ */
  }
}

/* സ്ക്രോൾ ബാർ ഒളിപ്പിക്കാൻ */
.custom-scrollbar {
  scrollbar-width: none;
}
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 📸 Gallery Custom Styling */
.gallery-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
}

/* കാർഡ് മൊത്തത്തിൽ ഹോവർ ചെയ്യുമ്പോൾ */
.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.gallery-img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease; /* ഇമേജ് സൂം സ്മൂത്ത് ആക്കാൻ */
}

/* മൗസ് വെക്കുമ്പോൾ ഇമേജ് മാത്രം ഉള്ളിലേക്ക് ചെറുതായി സൂം ആകാൻ */
.img-hover-container {
  height: 200px;
}
.gallery-card:hover .gallery-img {
  transform: scale(1.08);
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>