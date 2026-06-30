<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();

// 📢 GLOBAL & AUTH STATES
const isLoggedIn = ref(false);
const userName = ref('Guest');
const selectedCity = ref('Kochi');

const email = ref('');
const name = ref('');
const role = ref('client'); // Default Role

const isNewUser = ref(false); // പുതിയ യൂസർ ആണോ എന്ന് നോക്കാൻ
const authMessage = ref('');
const authLoading = ref(false);

// 🔄 ലോഗിൻ സ്റ്റാറ്റസ് ചെക്ക് ചെയ്യുന്നു
onMounted(() => {
  const userInfo = localStorage.getItem('user-info');
  if (userInfo) {
    isLoggedIn.value = true;
    userName.value = JSON.parse(userInfo).name || 'User';
  }
});

// 🔍 EMAIL CHECK (LOGIN OR REGISTER POPUP LOGIC)
const handleAuth = async () => {
  if (!email.value) {
    authMessage.value = "Please enter a valid email.";
    return;
  }

  authLoading.value = true;
  authMessage.value = "";

  try {
    const res = await fetch(`http://localhost:3000/users?email=${email.value.toLowerCase()}`);
    const users = await res.json();

    if (users.length > 0) {
      // ✅ യൂസർ ഉണ്ട്! നേരിട്ട് ലോഗിൻ ചെയ്യിക്കുന്നു
      saveUserAndRefresh(users[0]);
    } else {
      // 🆕 പുതിയ യൂസർ ആണ്! പേരും റോളും ചോദിക്കുന്ന സെക്ഷൻ കാണിക്കുന്നു
      isNewUser.value = true;
      authMessage.value = "Email not found. Please register to continue!";
    }
  } catch (err) {
    authMessage.value = "Database connection error.";
  } finally {
    authLoading.value = false;
  }
};

// 📝 REGISTER NEW USER FROM POPUP
const handleRegister = async () => {
  if (!name.value) {
    authMessage.value = "Please enter your name.";
    return;
  }

  authLoading.value = true;

  const newUser = {
    email: email.value.toLowerCase(),
    name: name.value,
    role: role.value
  };

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (res.ok) {
      const savedUser = await res.json();
      saveUserAndRefresh(savedUser);
    }
  } catch (err) {
    authMessage.value = "Registration failed.";
  } finally {
    authLoading.value = false;
  }
};

// 💾 SAVE DATA & REFRESH/REDIRECT
const saveUserAndRefresh = (user) => {
  localStorage.setItem('user-info', JSON.stringify(user));
  isLoggedIn.value = true;
  userName.value = user.name;
  
  // മുകളിൽ പോപ്പ്അപ്പ് ക്ലോസ് ആകാനും ഡാഷ്ബോർഡ് മാറാനും വിൻഡോ റീഫ്രഷ് ചെയ്യുന്നു
  if (user.role === 'manager') {
    window.location.href = '/manager-dashboard';
  } else {
    window.location.reload();
  }
};

// 🚪 LOGOUT
const handleLogout = () => {
  localStorage.removeItem('user-info');
  isLoggedIn.value = false;
  userName.value = 'Guest';
  window.location.href = '/';
};

// 📍 CHANGE CITY
const changeCity = (city) => {
  selectedCity.value = city;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bms-navbar py-2 text-start shadow-sm">
    <div class="container">
      
      <div class="d-flex align-items-center flex-grow-1 me-3">
        <a class="navbar-brand me-4" href="/">
          <h3 class="fw-bold m-0 italic-logo text-dark">book<span class="text-danger">my</span>event</h3>
        </a>
        
        <div class="input-group search-box d-none d-md-flex">
          <span class="input-group-text bg-white border-0 text-muted">🔍</span>
          <input type="text" class="form-control border-0 ps-0" placeholder="Search for Wedding Planners, Birthday Decorators, or Event Managers">
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        
        <button class="btn fw-bold bg-transparent border-0 px-2 d-flex align-items-center gap-1 text-dark" data-bs-toggle="modal" data-bs-target="#locationModal">
          {{ selectedCity }} <span class="fs-8">▼</span>
        </button>

        <div class="d-flex align-items-center gap-2">
          <div v-if="isLoggedIn" class="d-flex align-items-center gap-2">
            <span class="text-dark small fw-bold me-1">Hi, {{ userName }}</span>
            <button @click="handleLogout" class="btn btn-sm btn-outline-danger fw-bold px-3">Logout</button>
          </div>
          
          <button v-else class="btn profile-btn p-0" data-bs-toggle="modal" data-bs-target="#loginModal">
            <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="Profile" class="profile-img">
          </button>
        </div>

        <button class="navbar-toggler btn-outline-dark border-0" type="button" data-bs-toggle="collapse" data-bs-target="#bmsMobileNav">
          <span>☰</span>
        </button>
      </div>

    </div>
  </nav>

  <div class="sub-navbar py-2 border-bottom text-start d-none d-lg-block">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex gap-4 small fw-bold text-secondary">
        <a href="/" class="text-dark text-decoration-none">Home</a>
        <router-link to="/about" class="text-secondary text-decoration-none">About</router-link>
        <router-link to="/contact" class="text-secondary text-decoration-none">Contact</router-link>
        <router-link v-if="isLoggedIn" to="/mybookings" class="text-secondary text-decoration-none">📑 My Bookings</router-link>
      </div>
      <div class="d-flex gap-3 small text-muted">
        <span class="cursor-pointer">Offers</span>
        <span class="cursor-pointer">Gift Cards</span>
      </div>
    </div>
  </div>

  <router-view></router-view>

  <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
      <div class="modal-content p-3 border-0 rounded-4 shadow">
        
        <div class="modal-header border-0 pb-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body text-start">
          <div class="text-center mb-4">
            <h4 class="fw-bold text-dark">book<span class="text-danger">my</span>event</h4>
            <p class="text-muted small">Enter email to Login or Signup</p>
          </div>

          <div v-if="authMessage" class="alert alert-warning py-2 small" role="alert">
            {{ authMessage }}
          </div>

          <form v-if="!isNewUser" @submit.prevent="handleAuth">
            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Email Address</label>
              <input type="email" v-model="email" class="form-control py-2" placeholder="name@example.com" required>
            </div>
            <button type="submit" class="btn btn-danger w-100 py-2 fw-bold" :disabled="authLoading">
              {{ authLoading ? 'Checking...' : 'Continue' }}
            </button>
          </form>

          <form v-else @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Your Name</label>
              <input type="text" v-model="name" class="form-control py-2" placeholder="Enter your full name" required>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary d-block">Account Type</label>
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-sm flex-fill py-2 border fw-bold" :class="role === 'client' ? 'btn-danger text-white':'btn-light text-dark'" @click="role = 'client'">
                  🙋‍♂️ Client
                </button>
                <button type="button" class="btn btn-sm flex-fill py-2 border fw-bold" :class="role === 'manager' ? 'btn-danger text-white':'btn-light text-dark'" @click="role = 'manager'">
                  💼 Event Manager
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn-success w-100 py-2 fw-bold" :disabled="authLoading">
              {{ authLoading ? 'Creating Account...' : 'Complete Signup' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>

  <div class="modal fade" id="locationModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-4 border-0">
        <div class="modal-body p-4 text-center">
          
          <div class="input-group mb-4 shadow-sm border rounded-3 overflow-hidden">
            <span class="input-group-text bg-white border-0">🔍</span>
            <input type="text" class="form-control border-0" placeholder="Search for your city">
          </div>

          <p class="text-muted fw-bold small text-start border-bottom pb-2 mb-3">Popular Cities</p>
          
          <div class="row row-cols-3 row-cols-sm-5 g-3 justify-content-center">
            <div class="col" v-for="city in ['Kozhikode','Kochi', 'TVM']" :key="city" data-bs-dismiss="modal" @click="changeCity(city)">
              <div class="city-card p-3 rounded-3 cursor-pointer text-center" :class="{'active': selectedCity === city}">
                <div class="city-icon mb-2">🏙️</div>
                <span class="small fw-bold d-block text-dark">{{ city }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <footer class="bms-footer text-white mt-5">
    <div class="footer-top-bar py-4 border-bottom border-secondary text-start">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div class="d-flex align-items-center gap-3">
          <span class="fs-3">🤝</span>
          <div>
            <h6 class="fw-bold m-0">List Your Business With Us!</h6>
            <small class="text-white-50">Are you an Event Manager, Decorator or Caterer? Grow your business today.</small>
          </div>
        </div>
        <router-link to="/contact" class="btn btn-danger fw-bold px-4 py-2 rounded-3">Register As Partner</router-link>
      </div>
    </div>

    <div class="container py-5 text-start">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <h4 class="fw-bold text-white mb-3 italic-logo">book<span class="text-danger">my</span>event</h4>
          <p class="text-white-50 small lh-lg">
            Kerala's premier network to find verified Event Management teams for Weddings, Birthday Parties, Engagements, and Corporate Events. We make your celebrations stress-free.
          </p>
        </div>
        <div class="col-lg-2 col-md-6 ms-lg-auto">
          <h6 class="fw-bold text-white border-bottom border-secondary pb-2 mb-3">Popular Services</h6>
          <ul class="list-unstyled footer-links small d-flex flex-column gap-2">
            <li><a href="#" class="text-white-50 text-decoration-none">Wedding Planners</a></li>
            <li><a href="#" class="text-white-50 text-decoration-none">Birthday Decorators</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6">
          <h6 class="fw-bold text-white border-bottom border-secondary pb-2 mb-3">Quick Links</h6>
          <ul class="list-unstyled footer-links small d-flex flex-column gap-2">
            <li><a href="/" class="text-white-50 text-decoration-none">Home</a></li>
            <li><router-link to="/about" class="text-white-50 text-decoration-none">About Us</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6">
          <h6 class="fw-bold text-white border-bottom border-secondary pb-2 mb-3">Contact Us</h6>
          <p class="text-white-50 small mb-2">📍 Cyberpark, Kozhikode, Kerala, India</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom-bar py-3 bg-dark text-center small text-white-50">
      <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <p class="m-0">© 2026 bookmyevent. Built with Vue 3 & Bootstrap.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Main BMS Navbar - White Theme */
.bms-navbar {
  background-color: white;
}
.italic-logo {
  font-family: 'Arial Black', sans-serif;
  letter-spacing: -1px;
}
.search-box {
  width: 100%;
  max-width: 500px;
}
.search-box input {
  font-size: 14px;
}
.search-box input:focus {
  box-shadow: none;
}
.sub-navbar {
  background-color: #f5f5f5;
}
.cursor-pointer { cursor: pointer; }

/* Profile Image */
.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  /* filter: invert(1); 👈 Navbar വൈറ്റ് ആയതുകൊണ്ട് ഈ ഫിൽട്ടർ മാറ്റിയെടുത്തു */
}

/* City Cards Inside Modal */
.city-card {
  border: 1px solid #eee;
  transition: all 0.2s;
}
.city-card:hover, .city-card.active {
  border-color: #ff4757;
  background-color: #ffeef0;
}
.city-icon {
  font-size: 24px;
}

/* BMS Style Footer Styling */
.bms-footer {
  background-color: #333545;
}
.footer-top-bar {
  background-color: #2b2d3d;
}
.footer-links a:hover {
  color: #ff4757 !important;
  text-decoration: underline !important;
  transition: color 0.2s ease;
}
.footer-bottom-bar {
  background-color: #1a1c24 !important;
}
.fs-8 { font-size: 11px; }
</style>