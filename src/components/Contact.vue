<script setup>
import { ref } from 'vue';

// 📢 STATES
const name = ref('');
const email = ref('');
const subject = ref('General Enquiry');
const message = ref('');
const formMessage = ref('');
const isSubmitting = ref(false);

// 📤 SUBMIT CONTACT FORM TO DB.JSON
const handleContactSubmit = async () => {
  if (!name.value || !email.value || !message.value) {
    formMessage.value = "⚠️ Please fill in all required fields.";
    return;
  }

  isSubmitting.value = true;
  formMessage.value = "";

  const newMessage = {
    id: String(Date.now()),
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
    date: new Date().toLocaleDateString()
  };

  try {
    const res = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    });

    if (res.ok) {
      formMessage.value = "🎉 Thank you! Your message has been sent. Our support team will connect with you shortly.";
      // Form reset ചെയ്യാൻ
      name.value = '';
      email.value = '';
      message.value = '';
    }
  } catch (err) {
    formMessage.value = "❌ Failed to send message. Please try again later.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container my-5 text-start min-vh-100">
    
    <!-- 📄 PAGE HEADER -->
    <div class="text-center mb-5">
      <span class="badge bg-danger-subtle text-danger mb-2 px-3 py-2 fw-bold rounded-pill">Get In Touch</span>
      <h1 class="fw-bold text-dark">We'd Love to Hear From You</h1>
      <p class="text-muted max-width-md mx-auto small">
        Have questions about booking an event or want to list your business? Drop us a message!
      </p>
    </div>

    <div class="row g-5">
      
      <!-- 📍 LEFT COLUMN: CONTACT INFO -->
      <div class="col-lg-5">
        <div class="card p-4 border-0 shadow-sm rounded-4 bg-light h-100">
          <h4 class="fw-bold text-dark mb-4">Contact Information</h4>
          
          <div class="d-flex align-items-start gap-3 mb-4">
            <span class="fs-3 bg-white p-2 rounded-3 shadow-sm">📍</span>
            <div>
              <h6 class="fw-bold text-dark m-0 mb-1">Our Office</h6>
              <p class="text-secondary small m-0 lh-base">
                bookmyevent HQ, Cyberpark, Kozhikode,<br>Kerala, India - 673016
              </p>
            </div>
          </div>

          <div class="d-flex align-items-start gap-3 mb-4">
            <span class="fs-3 bg-white p-2 rounded-3 shadow-sm">📞</span>
            <div>
              <h6 class="fw-bold text-dark m-0 mb-1">Call Us</h6>
              <p class="text-secondary small m-0">+91 98765 43210</p>
              <p class="text-muted text-xs m-0">Mon-Sat (9:00 AM - 6:00 PM)</p>
            </div>
          </div>

          <div class="d-flex align-items-start gap-3 mb-4">
            <span class="fs-3 bg-white p-2 rounded-3 shadow-sm">✉️</span>
            <div>
              <h6 class="fw-bold text-dark m-0 mb-1">Email Support</h6>
              <p class="text-secondary small m-0">support@bookmyevent.com</p>
              <p class="text-secondary small m-0">partners@bookmyevent.com</p>
            </div>
          </div>

          <hr class="my-4 opacity-25">

          <!-- Social media placeholder icons -->
          <h6 class="fw-bold text-dark mb-3">Follow Our Socials</h6>
          <div class="d-flex gap-3 fs-4">
            <a href="#" class="text-danger text-decoration-none">📸</a>
            <a href="#" class="text-primary text-decoration-none">🌐</a>
            <a href="#" class="text-dark text-decoration-none">🐦</a>
          </div>
        </div>
      </div>

      <!-- 📝 RIGHT COLUMN: DYNAMIC HELP/SUPPORT FORM -->
      <div class="col-lg-7">
        <div class="card p-4 border-0 shadow rounded-4 bg-white">
          <h4 class="fw-bold text-dark mb-2">Send a Message</h4>
          <p class="text-muted small mb-4">Fill out the form below and our team will get back to you within 24 hours.</p>

          <div v-if="formMessage" class="alert alert-info py-2 small" role="alert">
            {{ formMessage }}
          </div>

          <form @submit.prevent="handleContactSubmit">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label small fw-bold text-secondary">Full Name</label>
                <input type="text" v-model="name" class="form-control py-2" placeholder="Your Name" required>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold text-secondary">Email Address</label>
                <input type="email" v-model="email" class="form-control py-2" placeholder="name@example.com" required>
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label class="form-label small fw-bold text-secondary">Subject</label>
              <select v-model="subject" class="form-select py-2">
                <option value="General Enquiry">General Enquiry</option>
                <option value="Partner Registration">Register as Event Partner</option>
                <option value="Booking Help">Booking / Cancellation Help</option>
                <option value="Technical Issue">Website Technical Issue</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-secondary">Your Message</label>
              <textarea v-model="message" class="form-control" rows="5" placeholder="Type your message or business details here..." required></textarea>
            </div>

            <button type="submit" class="btn btn-danger w-100 py-2 fw-bold" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending Message...' : 'Submit Message ➔' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.text-xs { font-size: 12px; }
.card {
  background-color: #ffffff;
}
</style>