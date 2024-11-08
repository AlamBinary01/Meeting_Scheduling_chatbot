# Meeting_Scheduling_chatbot

## Booking Chatbot

This project is a booking chatbot web application built with Python, Flask, OpenAI, and Google Calendar API. The chatbot allows users to book appointments by finding available time slots, confirming their name and email, and scheduling the meeting in Google Calendar. The application also provides interactive chatbot responses.

## Features

- **Google Calendar Integration**: Fetches existing bookings, finds available time slots, and creates new events.
- **Interactive Chatbot**: Uses OpenAI's GPT models to simulate a conversational booking assistant.
- **Time Slot Generation**: Generates booking time slots for the next three days, between specified hours.
- **Automated Reminders**: Sends email and popup reminders to attendees.
- **Dynamic Slot Selection**: Presents users with available slots to choose from in real-time.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AlamBinary01/Meeting_Scheduling_chatbot
   cd booking-chatbot

## Set Up Virtual Environment: Create and activate a virtual environment:
  ```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate
```
## Install Dependencies:
```bash
pip install -r requirements.txt
```
## Run the Application:
```bash
python app.py
```
