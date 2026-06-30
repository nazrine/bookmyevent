<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 📢 STATES
const currentTab = ref('enquiries'); // enquiries or add-work
const enquiries = ref([]);
const managerName = ref('');
const managerEmail = ref('');

// 📝 NEW WORK FORM STATES
const workTitle = ref('');
const workLocation = ref('');
const workCategory = ref('Wedding');
const workImage = ref('');
const formMessage = ref('');

onMounted(() => {
  // 🔐 ചെക്കിങ്: മാനേജർ ലോഗിൻ ചെയ്തിട്ടുണ്ടോ എന്ന് നോക്കുന്നു
  const userInfo = localStorage.getItem('user-info');
  if (!userInfo) {
    router.push('/');
    return;
  }
  
  const user = JSON.parse(userInfo);
  if (user.role !== 'manager') {
    router.push('/'); // മാനേജർ അല്ലെങ്കിൽ ഹോം പേജിലേക്ക് തിരിച്ചു വിടുന്നു
    return;
  }

  managerName.value = user.name;
  managerEmail.value = user.email;

  // ഡാറ്റ ഫെച്ച് ചെയ്യുന്നു
  fetchEnquiries();
});

// 📥 FETCH ENQUIRIES FOR THIS MANAGER
const fetchEnquiries = async () => {
  try {
    // റിയൽ ആപ്പിൽ നമ്മൾ manager_email വെച്ച് ഫിൽട്ടർ ചെയ്യും
    const res = await fetch(`http://localhost:3000/enquiries`);
    enquiries.value = await res.json();
  } catch (err) {
    console.error("Error fetching enquiries:", err);
  }
};

// ✅ UPDATE STATUS (ACCEPT / REJECT)
const updateStatus = async (id, newStatus) => {
  try {
    await fetch(`http://localhost:3000/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    // ലിസ്റ്റ് അപ്ഡേറ്റ് ചെയ്യാൻ
    fetchEnquiries();
  } catch (err) {
    console.error(err);
  }
};

// 📤 SUBMIT NEW WORK TO GALLERY
const handleAddWork = async () => {
  if (!workTitle.value || !workImage.value || !workLocation.value) {
    formMessage.value = "Please fill all fields!";
    return;
  }

  const newWork = {
    title: workTitle.value,
    location: workLocation.value,
    category: workCategory.value,
    image: workImage.value,
    managerEmail: managerEmail.value
  };

  try {
    // ഇവിടെ നിങ്ങളുടെ db.json-ലെ 'works' അല്ലെങ്കിൽ 'gallery' ലേക്ക് പോസ്റ്റ് ചെയ്യാം
    const res = await fetch('http://localhost:3000/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWork)
    });

    if (res.ok) {
      formMessage.value = "🎉 Successfully added to Recent Work Gallery!";
      // Form reset ചെയ്യാൻ
      workTitle.value = '';
      workLocation.value = '';
      workImage.value = '';
    }
  } catch (err) {
    formMessage.value = "Error saving data.";
  }
};
</script>

<template>
  <div class="container mt-4 text-start min-vh-100">
    
    <div class="p-4 bg-dark text-white rounded-4 mb-4 shadow-sm d-flex justify-content-between align-items-center">
      <div>
        <span class="badge bg-danger mb-2 px-3 py-1 fw-bold">PRO PARTNER</span>
        <h2 class="fw-bold m-0">{{ managerName }}</h2>
        <small class="opacity-75">📧 {{ managerEmail }}</small>
      </div>
      <div class="text-end d-none d-sm-block">
        <h4 class="fw-bold m-0 text-warning">{{ enquiries.length }}</h4>
        <small class="opacity-75">Total Leads</small>
      </div>
    </div>

    <ul class="nav nav-tabs border-bottom mb-4">
      <li class="nav-item">
        <button class="nav-link fw-bold text-dark px-4 py-2" :class="{'active bg-light border-bottom-0': currentTab === 'enquiries'}" @click="currentTab = 'enquiries'">
          📥 Client Enquiries
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link fw-bold text-dark px-4 py-2" :class="{'active bg-light border-bottom-0': currentTab === 'add-work'}" @click="currentTab = 'add-work'">
          ➕ Add Recent Work
        </button>
      </li>
    </ul>

    <div v-if="currentTab === 'enquiries'">
      <h5 class="fw-bold text-secondary mb-3">Received Booking Proposals</h5>
      
      <div v-if="enquiries.length === 0" class="alert alert-light text-center py-5 border rounded-4">
        <span class="fs-1 d-block mb-2">📥</span>
        <p class="text-muted m-0">No booking enquiries received yet.</p>
      </div>

      <div v-else class="row g-3">
        <div v-for="req in enquiries" :key="req.id" class="col-12">
          <div class="card p-3 border shadow-sm rounded-3">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <span class="badge bg-secondary mb-2">{{ req.event_type }}</span>
                <h5 class="fw-bold m-0 text-dark">{{ req.client_name }}</h5>
                <p class="small text-muted m-0 mt-1">
                  📅 Date: <strong>{{ req.date }}</strong> | 📍 Venue: {{ req.venue || 'Not specified' }}
                </p>
              </div>
              
              <div class="d-flex align-items-center gap-2">
                <span v-if="req.status !== 'Pending'" :class="req.status === 'Accepted' ? 'badge bg-success px-3 py-2':'badge bg-danger px-3 py-2'">
                  {{ req.status }}
                </span>
                
                <div v-else class="d-flex gap-2">
                  <button @click="updateStatus(req.id, 'Accepted')" class="btn btn-sm btn-success fw-bold px-3">Accept 🟢</button>
                  <button @click="updateStatus(req.id, 'Rejected')" class="btn btn-sm btn-outline-danger fw-bold px-3">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentTab === 'add-work'" class="row">
      <div class="col-md-6">
        <div class="card p-4 border shadow-sm rounded-4">
          <h5 class="fw-bold text-dark mb-3">Showcase New Event Work</h5>

          <div v-if="formMessage" class="alert alert-info py-2 small">{{ formMessage }}</div>

          <form @submit.prevent="handleAddWork">
            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Event / Work Title</label>
              <input type="text" v-model="workTitle" class="form-control" placeholder="e.g., Luxury Pastel Stage Decor" required>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Location</label>
              <input type="text" v-model="workLocation" class="form-control" placeholder="e.g., Calicut Beach Hotel" required>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-bold text-secondary">Category</label>
              <select v-model="workCategory" class="form-select">
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Haldi">Haldi</option>
                <option value="Parties">Parties</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary">Image URL</label>
              <input type="url" v-model="workImage" class="form-control" placeholder="https://example.com/image.jpg" required>
            </div>

            <button type="submit" class="btn btn-danger w-100 py-2 fw-bold">Publish to Gallery 🚀</button>
          </form>
        </div>
      </div>
      
      <div class="col-md-5 offset-md-1 d-none d-md-block">
        <h6 class="fw-bold text-muted mb-3">Live Card Preview</h6>
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden" style="max-width: 320px;">
          <img :src="workImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc'" class="w-100" style="height: 180px; object-fit: cover;">
          <div class="card-body p-3">
            <span class="badge bg-danger mb-2">{{ workCategory }}</span>
            <h6 class="fw-bold text-dark mb-1">{{ workTitle || 'Your Work Title Here' }}</h6>
            <p class="text-muted small m-0">📍 {{ workLocation || 'Location Name' }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.nav-tabs .nav-link.active {
  border-top: 3px solid #ff4757;
}
.card {
  background-color: #ffffff;
}
</style>