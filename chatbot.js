// Chatbot JavaScript - Premium AI Assistant with Note Collection
class STSAIChatbot {
  constructor() {
    this.isOpen = false;
    this.notes = {};
    this.conversation = [];
    this.stage = 'initial';
    this.needsBusiness = false;
    this.needsService = false;
    this.needsBudget = false;
    this.needsTime = false;
    this.init();
  }

  init() {
    this.resetConversation();
    this.bindEvents();
  }

  bindEvents() {
    const toggle = document.getElementById('chatbot-toggle');
    const minimize = document.getElementById('chatbot-minimize');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const suggestions = document.getElementById('chatbot-suggestions');
    const whatsappClose = document.getElementById('whatsapp-close');
    const bookWhatsapp = document.getElementById('book-whatsapp');
    const chatBookWhatsapp = document.getElementById('chatbook-whatsapp');
    const closeBooking = document.getElementById('close-booking');

    toggle.addEventListener('click', () => this.toggleChat());
    minimize.addEventListener('click', () => this.minimizeChat());
    close.addEventListener('click', () => this.closeChat());
    send.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    whatsappClose?.addEventListener('click', () => this.closeWhatsapp());
    bookWhatsapp?.addEventListener('click', () => this.bookOnWhatsapp());
    chatBookWhatsapp?.addEventListener('click', () => this.bookOnWhatsapp());
    closeBooking?.addEventListener('click', () => this.closeBookingPanel());

    suggestions.addEventListener('click', (event) => {
      const chip = event.target.closest('.chatbot-suggestion');
      if (!chip) return;
      const value = chip.dataset.value;
      if (!value) return;

      this.addMessage('user', value);
      this.clearSuggestions();
      if (this.needsBusiness) {
        this.notes.business = value;
        this.needsBusiness = false;
      } else if (this.needsService) {
        this.notes.service = value;
        this.needsService = false;
      } else if (this.needsBudget) {
        this.notes.budget = value;
        this.needsBudget = false;
      } else if (this.needsTime) {
        this.notes.time = value;
        this.needsTime = false;
      }
      this.saveNotes();
      this.updateNotesPanel();
      this.showTyping();
      setTimeout(() => {
        this.hideTyping();
        if (this.isBookingReady()) {
          this.addMessage('bot', 'Awesome! Your booking summary is ready below.');
          this.addMessage('bot', this.formatChatSummary());
          this.showBookingCta();
        } else {
          const response = this.generateResponse(value);
          this.addMessage('bot', response);
        }
      }, 800);
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    if (this.isOpen) {
      window.classList.add('open');
      if (this.conversation.length === 0) {
        this.showWelcomeMessage();
      }
    } else {
      window.classList.remove('open');
    }
  }

  minimizeChat() {
    this.isOpen = false;
    document.getElementById('chatbot-window').classList.remove('open');
    this.resetConversation();
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('chatbot-window').classList.remove('open');
    this.resetConversation();
  }

  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    this.addMessage('user', message);
    input.value = '';
    this.clearSuggestions();

    // Extract information from user message
    this.extractNotes(message);

    if (this.needsBusiness) {
      this.notes.business = message;
      this.needsBusiness = false;
      this.saveNotes();
      this.updateNotesPanel();
    }
    if (this.needsService) {
      this.notes.service = message;
      this.needsService = false;
      this.saveNotes();
      this.updateNotesPanel();
    }
    if (this.needsBudget) {
      this.notes.budget = message;
      this.needsBudget = false;
      this.saveNotes();
      this.updateNotesPanel();
    }
    if (this.needsTime) {
      this.notes.time = message;
      this.needsTime = false;
      this.saveNotes();
      this.updateNotesPanel();
    }

    // Show typing indicator
    this.showTyping();

    // Simulate AI response
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(message);
      this.addMessage('bot', response);
      if (this.isBookingReady()) {
        const summary = this.formatChatSummary();
        this.addMessage('bot', summary);
        this.showBookingCta();
      }
    }, 1000 + Math.random() * 2000);
  }

  addMessage(type, content) {
    const messages = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const avatar = type === 'user' ? '<i class="bi bi-person-circle"></i>' : '<i class="fas fa-robot"></i>';
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const safeContent = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        ${safeContent}
        <div class="message-time">${time}</div>
      </div>
    `;

    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;

    this.conversation.push({type, content, time});
  }

  showTyping() {
    const messages = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar"><i class="fas fa-robot"></i></div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }

  extractNotes(message) {
    const lowerMessage = message.toLowerCase();

    // Extract name
    //if (lowerMessage.includes('my name is') || lowerMessage.includes('i am') || lowerMessage.includes(" ")) {
    //  const nameMatch = message.match(/(?:my name is|i am)\s+([^\s,]+)/i);
    //  if (nameMatch) this.notes.name = nameMatch[1];
    //}
    const nameMatch = message.match(/([a-zA-Z]+)/);

if (nameMatch) {
    this.notes.name = nameMatch[0];
}

    // Extract phone
    const phoneMatch = message.match(/(\+91[\s-]?)?[6-9]\d{9}/);
    if (phoneMatch) this.notes.phone = phoneMatch[0];

    // Extract email
    const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      this.notes.email = emailMatch[0];
      if (this.notes.name && !this.notes.business) {
        this.stage = 'business';
      }
    }

    // Extract requirements
    if (lowerMessage.includes('need') || lowerMessage.includes('want') || lowerMessage.includes('looking for')) {
      this.notes.requirements = (this.notes.requirements || '') + ' ' + message;
    }

    // Extract budget
    const budgetMatch = message.match(/(\d+(?:,\d+)?(?:\.\d+)?)\s*(?:rs|rupees|dollars|\$)/i);
    if (budgetMatch) this.notes.budget = budgetMatch[1];

    this.saveNotes();
    this.updateNotesPanel();
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Follow-up questions based on missing info - check these first
    if (!this.notes.name) {
      return "I'd love to help you better. May I know your name?";
    }
    if (!this.notes.phone) {
      return "To provide you with the best assistance, could you please share your valid Mobile Number?";
    }
    if (!this.notes.email) {
      return "May I know your valid Email Address, so that I can send you detailed information?";
    }
    if (this.notes.name && this.notes.phone && this.notes.email && !this.notes.business) {
      this.showBusinessSuggestions();
      this.needsBusiness = true;
      return `Great to meet you, ${this.notes.name}! 🚀 What's your Business or Project about?`;
    }
    if (this.notes.business && !this.notes.service) {
      this.showServiceSuggestions();
      this.needsService = true;
      return `Awesome! Which service are you most interested in?`;
    }
    if (this.notes.service && !this.notes.budget) {
      this.showBudgetSuggestions();
      this.needsBudget = true;
      return `What's your approximate budget for this project?`;
    }
    if (this.notes.budget && !this.notes.time) {
      this.showTimeSuggestions();
      this.needsTime = true;
      return `Perfect! When would you prefer your free strategy call?`;
    }

    if (this.isBookingReady()) {
      return 'Awesome! Your booking summary is ready below.';
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm STS AI Assistant. How can I help you today? Feel free to ask about our services, pricing, or anything related to Samudhra Tech Solutions.";
    }

    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "We offer comprehensive IT solutions including:\n• Web Development\n• Custom Software Development\n• Mobile App Development\n• Digital Marketing\n• ERP & Billing Software\n• Technology Consulting\n\nWhich service interests you most?";
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "You can reach us at:\n📞 +91 73394 70191\n📧 samudhratechsolutions@gmail.com\n🏢 4/133X, Muthammal Colony, 3rd Street, Tuticorin-628002, Tamilnadu\n\nWould you like me to collect your contact details for a callback?";
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return "Our pricing depends on the project scope and requirements. We offer competitive rates starting from ₹25,000 for basic websites. For detailed quotes, could you tell me more about your project? What's your budget range?";
    }

    // Demo/Consultation
    if (lowerMessage.includes('demo') || lowerMessage.includes('consultation')) {
      return "Great! We'd love to show you a demo or provide a free consultation. Our team will contact you shortly. Could you please share your name, phone number, and email?";
    }

    // Default response
    return "Thank you for your message. Our team specializes in delivering high-quality IT solutions. Could you provide more details about what you're looking for? Or would you like me to prepare a summary of our conversation for WhatsApp sharing?";
  }

  saveNotes() {
    // Persistence disabled to reset conversation on refresh and close.
  }

  loadNotes() {
    // Disabled to ensure chat starts fresh.
  }

  resetConversation() {
    const messages = document.getElementById('chatbot-messages');
    if (messages) {
      messages.innerHTML = '';
    }
    this.conversation = [];
    this.notes = {};
    this.needsBusiness = false;
    this.needsService = false;
    this.needsBudget = false;
    this.needsTime = false;
    this.hideBookingCta();
    this.updateNotesPanel();
  }

  updateNotesPanel() {
    const notesList = document.getElementById('notes-list');
    if (!notesList) return;
    notesList.innerHTML = '';

    const entries = Object.entries(this.notes);
    if (entries.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.className = 'note-item';
      placeholder.textContent = 'No notes collected yet.';
      notesList.appendChild(placeholder);
    } else {
      entries.forEach(([key, value]) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}`;
        notesList.appendChild(noteItem);
      });
    }

    // Only update WhatsApp message if booking is ready
    if (this.isBookingReady()) {
      this.updateWhatsappMessage();
    }
  }

  updateWhatsappMessage() {
    // Always use the final summary format
    const message = this.formatBookingSummary();
    document.getElementById('whatsapp-message').textContent = message;
  }

  showBookingCta() {
    const inputArea = document.getElementById('chatbot-input-area');
    const bookCta = document.getElementById('chatbot-book-cta');
    if (inputArea) inputArea.style.display = 'none';
    if (bookCta) bookCta.style.display = 'flex';
    this.clearSuggestions();
  }

  hideBookingCta() {
    const inputArea = document.getElementById('chatbot-input-area');
    const bookCta = document.getElementById('chatbot-book-cta');
    if (inputArea) inputArea.style.display = 'block';
    if (bookCta) bookCta.style.display = 'none';
  }

  formatBookingSummary() {
    return `Here's your booking summary:\n\n Customer Details:\n\n👤 Name: ${this.notes.name || 'Not provided'}\n 📱 Phone: ${this.notes.phone || 'Not provided'}\n 📧 Email: ${this.notes.email || 'Not provided'}\n 💼 Business: ${this.notes.business || 'Not provided'}\n 🛠 Service: ${this.notes.service || 'Not provided'}\n 💰 Budget: ${this.notes.budget || 'Not provided'}\n 🕒 Preferred Time: ${this.notes.time || 'Not provided'}\n\nPlease confirm my free strategy call. Thank you!`;
  }

  formatChatSummary() {
    return `Here's your booking summary:\n\n👤 Name: ${this.notes.name || 'Not provided'}\n 📱 Phone: ${this.notes.phone || 'Not provided'}\n 📧 Email: ${this.notes.email || 'Not provided'}\n 💼 Business: ${this.notes.business || 'Not provided'}\n 🛠 Service: ${this.notes.service || 'Not provided'}\n 💰 Budget: ${this.notes.budget || 'Not provided'}\n 🕒 Preferred Time: ${this.notes.time || 'Not provided'}\n\nTap "Book on WhatsApp" below to confirm your free strategy call! 👇`;
  }

  showNotes() {
    document.getElementById('notes-panel').classList.add('open');
  }

  closeNotes() {
    document.getElementById('notes-panel').classList.remove('open');
  }

  showWhatsapp() {
    this.updateWhatsappMessage();
    this.showBookingCta();
  }

  closeWhatsapp() {
    document.getElementById('whatsapp-panel').classList.remove('open');
  }

  bookOnWhatsapp() {
    this.updateWhatsappMessage();
    const message = encodeURIComponent(document.getElementById('whatsapp-message').textContent);
    const url = `https://wa.me/917339470191?text=${message}`;
    window.open(url, '_blank');
    this.addMessage('bot', 'Thank you for your message! Our team will contact you shortly.');
    this.hideBookingCta();
    setTimeout(() => {
      document.getElementById('chatbot-window').classList.remove('open');
      this.isOpen = false;
    }, 800);
  }

  closeBookingPanel() {
    this.closeWhatsapp();
    this.addMessage('bot', 'Thank you for your message! Our team will contact you shortly.');
    setTimeout(() => {
      document.getElementById('chatbot-window').classList.remove('open');
      this.isOpen = false;
    }, 800);
  }

  isBookingReady() {
    return !!(this.notes.name && this.notes.phone && this.notes.email && this.notes.business && this.notes.service && this.notes.budget && this.notes.time);
  }

  showBusinessSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    if (!container) return;
    container.innerHTML = '';
    ['Business', 'Project'].forEach((text) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chatbot-suggestion';
      button.dataset.value = text;
      button.textContent = text;
      container.appendChild(button);
    });
  }

  showServiceSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    if (!container) return;
    container.innerHTML = '';
    ['Website Development', 'Custom Application', 'Mobile App', 'Desktop Applications', 'Billing Software'].forEach((text) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chatbot-suggestion';
      button.dataset.value = text;
      button.textContent = text;
      container.appendChild(button);
    });
  }

  showBudgetSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    if (!container) return;
    container.innerHTML = '';
    ['₹5-25k', '₹25-50k', '₹50-75k', '₹75-1L'].forEach((text) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chatbot-suggestion';
      button.dataset.value = text;
      button.textContent = text;
      container.appendChild(button);
    });
  }

  showTimeSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    if (!container) return;
    container.innerHTML = '';
    ['Morning (9–12)', 'Afternoon (12–4)', 'Evening (4–7)'].forEach((text) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chatbot-suggestion';
      button.dataset.value = text;
      button.textContent = text;
      container.appendChild(button);
    });
  }

  clearSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    if (!container) return;
    container.innerHTML = '';
  }

  copyMessage() {
    const message = document.getElementById('whatsapp-message').textContent;
    navigator.clipboard.writeText(message).then(() => {
      alert('Message copied to clipboard!');
    });
  }

  sendToWhatsapp() {
    const message = encodeURIComponent(document.getElementById('whatsapp-message').textContent);
    const url = `https://wa.me/917339470191?text=${message}`;
    window.open(url, '_blank');
  }

  downloadTxt() {
    const message = document.getElementById('whatsapp-message').textContent;
    const blob = new Blob([message], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sts_customer_details.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadPdf() {
    // Simple PDF generation using browser print
    const content = document.getElementById('whatsapp-message').textContent;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>STS Customer Details</title></head>
        <body><pre>${content}</pre></body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.addMessage('bot', "👋 Welcome to Samudhra Tech Solutions! I'm your AI assistant. How can I help you today?");
    }, 1000);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Chatbot initializing...');
  new STSAIChatbot();
  console.log('Chatbot initialized');
});
