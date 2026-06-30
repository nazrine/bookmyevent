<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 📢 STATES
const organizer = ref(null);
const clientName = ref('');
const isLoggedIn = ref(false);

// FORM STATES
const eventType = ref('Wedding');
const eventDate = ref('');
const eventVenue = ref('');
const bookingMessage = ref('');
const isSubmitting = ref(false);

onMounted(() => {
  // 🔐 ലോഗിൻ ചെയ്ത ക്ലയന്റ് ആണോ എന്ന് നോക്കുന്നു
  const userInfo = localStorage.getItem('user-info');
  if (userInfo) {
    isLoggedIn.value = true;
    clientName.value = JSON.parse(userInfo).name;
  }

  // ഹോം പേജിൽ നിന്ന് പാസ്സ് ചെയ്ത ID വെച്ച് ഡാറ്റ എടുക്കുന്നു (Mock Data)
  // റിയൽ ആപ്പിൽ നമ്മൾ: fetch(`http://localhost:3000/organizers/${route.params.id}`) ചെയ്യും
  loadMockOrganizerData();
});

// 🛠️ MOCK DATA LOAD (ഹോം പേജിൽ കൊടുത്ത അതേ ഡാറ്റ)
const loadMockOrganizerData = () => {
  const mockOrganizers = {
    "1": { name: "Royal Wedding", desc: "Premium Pastel Wedding Mandaps and Luxury Decorators in Kerala.", bg: "#ec5e87", loc: "Kozhikode", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600" },
    "2": { name: "Little Stars", desc: "Making birthday parties magical with custom jungle and neon themes.", bg: "#4382f7", loc: "Kochi", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600" },
    "3": { name: "Pulse Beats", desc: "Expert stage setups, sound systems, and artist coordination for live music concerts.", bg: "#3bc491", loc: "Calicut", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600" },
    "4": { name: "Elite Corporate", desc: "Professional business meets, conferences, and award night event managers.", bg: "#fca13b", loc: "TVM", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" }
  };

  organizer.value = mockOrganizers[route.params.id] || mockOrganizers["1"];
};

// 📥 SUBMIT ENQUIRY TO DB.JSON
const handleBooking = async () => {
  if (!isLoggedIn.value) {
    bookingMessage.value = "❌ Please Sign In first using the profile icon to book an event!";
    return;
  }

  if (!eventDate.value || !eventVenue.value) {
    bookingMessage.value = "⚠️ Please fill in all fields.";
    return;
  }

  isSubmitting.value = true;
  bookingMessage.value = "";

  const newEnquiry = {
    id: String(Date.now()),
    client_name: clientName.value,
    organizer_name: organizer.value.name,
    event_type: eventType.value,
    date: eventDate.value,
    venue: eventVenue.value,
    status: "Pending"
  };

  try {
    const res = await fetch('http://localhost:3000/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEnquiry)
    });

    if (res.ok) {
      bookingMessage.value = "🎉 Your booking request sent successfully! Manager will contact you soon.";
      eventDate.value = '';
      eventVenue.value = '';
    }
  } catch (err) {
    bookingMessage.value = "Error sending enquiry.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="organizer" class="container mt-4 text-start min-vh-100">
    
    <button @click="router.push('/')" class="btn btn-sm btn-light border mb-3 fw-bold">⬅ Back to Home</button>

    <div class="row g-4">
      
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <img :src="organizer.img" class="w-100 object-fit-cover" style="height: 350px;">
          <div class="p-4">
            <span class="badge bg-danger mb-2 px-3 py-1">Verified Expert</span>
            <h2 class="fw-bold text-dark mb-2">{{ organizer.name }}</h2>
            <p class="text-muted mb-3">📍 Base Location: <strong>{{ organizer.loc }}, Kerala</strong></p>
            <hr>
            <h5 class="fw-bold text-dark">About Organizers</h5>
            <p class="text-secondary lh-lg">{{ organizer.desc }} We provide complete planning, decoration, lighting, and catering co-ordination to make your event a grand success.</p>
          </div>
        </div>

        <h5 class="fw-bold text-dark mb-3">Featured Work Showcase</h5>
        <div class="row g-2">
          <div class="col-6" v-for="n in 2" :key="n">
            <img :src="`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=300&sig=${n}`" class="w-100 rounded-3" style="height: 150px; object-fit: cover;">
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="card p-4 border-0 shadow rounded-4 sticky-top" style="top: 20px; background-color: #ffffff;">
          <h4 class="fw-bold text-dark mb-1">Check Availability</h4>
          <p class="text-muted small mb-4">Send a direct consultation request to this manager.</p>

          <div v-if="bookingMessage" class="alert alert-info py-2 small" role="alert">
            {{ bookingMessage }}
          </div>

          <form @submit.prevent="handleBooking">
            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Select Event Type</label>
              <select v-model="eventType" class="form-select py-2">
                <option value="Wedding">Wedding Arrangement</option>
                <option value="Birthday">Birthday Party</option>
                <option value="Anniversary">Anniversary Celebration</option>
                <option value="Haldi">Haldi/Mehandi Function</option>
                <option value="Music Show">Musical Night</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Target Event Date</label>
              <input type="date" v-model="eventDate" class="form-control py-2" required>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary">Proposed Venue City / Place</label>
              <input type="text" v-model="eventVenue" class="form-control py-2" placeholder="e.g., Auditorium name or City" required>
            </div>

            <button v-if="isLoggedIn" type="submit" class="btn btn-danger w-100 py-2 fw-bold fs-5" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending Request...' : 'Send Enquiry ➔' }}
            </button>
            
            <div v-else class="text-center">
              <div class="alert alert-light border small text-muted mb-2">You need to sign in to send booking proposals.</div>
              <button type="button" class="btn btn-outline-danger w-100 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#loginModal">
                🔑 Sign In to Request Booking
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  </div>
</template>