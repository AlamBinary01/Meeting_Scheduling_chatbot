class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
      sendButton: document.querySelector('.send__button'),
      textField: document.querySelector('.chatbox__support input'), // Reference text field directly
    };
    this.state = false;
    this.messages = [];
  }

  display() {
    this.args.openButton.addEventListener('click', () => this.toggleState());
    this.args.sendButton.addEventListener('click', () => this.onSendButton());
    this.args.textField.addEventListener("keyup", ({key}) => { 
      if (key === "Enter") this.onSendButton();
    });
  }

  toggleState() {
    this.state = !this.state;
    this.args.chatBox.classList.toggle('chatbox--active', this.state);
  }

  onSendButton() {
    const text = this.args.textField.value.trim(); 
    if (text === "") return;

    this.messages.push({ name: "User", message: text });
    this.updateChatText();
    this.args.textField.value = ''; 

    fetch($SCRIPT_ROOT + '/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then(r => {
      const isSlotsMessage = r.answer.includes('Slot');
      if (isSlotsMessage) {
        this.displaySlots(r.answer);
      } else {
        this.messages.push({ name: "Sam", message: r.answer });
        this.updateChatText();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      this.updateChatText();
    }); 
  }

  updateChatText() {
    const chatMessage = this.args.chatBox.querySelector('.chatbox__messages');
    chatMessage.innerHTML = this.messages.slice().reverse().map(item => `
      <div class="messages__item messages__item--${item.name.toLowerCase()}">${item.message}</div>
    `).join('');
    chatMessage.scrollTop = chatMessage.scrollHeight; 
  }

  displaySlots(slotsMessage) {
    const slots = slotsMessage.split('\n');
    slots.forEach(slot => {
      this.messages.push({ name: "Sam", message: slot });
    });
    this.updateChatText();
  }
}

const chatbox = new Chatbox();
chatbox.display();