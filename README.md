# Scheduler

## About the Project

The Interview Scheduler is an intuitive tool designed to streamline the process of booking and managing interviews. With its user-friendly interface, the application enhances the scheduling experience for both candidates and interviewers. Key features include:

- **Calendar Integration**: Sync your interviews with popular calendar platforms to keep track of your schedule effortlessly.
- **Customizable Availability**: Set your availability preferences to ensure that you only receive interview requests during suitable times.

## Features

- User-friendly interface for easy navigation
- Support for multiple time zones
- Ability to reschedule or cancel interviews with ease
- Validate for conflicts (e.g., overlapping interviews for the same interviewer or candidate)
- Enable filtering by date, interviewer, or candidate.
- Library Integration : used react-big-calender
- Display success or error messages (e.g., on scheduling, updating, or deleting interviews) through Toastify Library

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for React applications.
- **Zustand**: A small, fast state-management solution.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **react-big-calendar**: A library for displaying and managing calendars in React.

## Data Storage

The Scheduler application uses **localStorage** to persist data, allowing users to maintain their interview schedules even after refreshing the page. This ensures that all scheduled interviews, preferences, and settings are retained across sessions.


## Deployment

The Scheduler application is deployed on [Vercel](https://vercel.com/). You can access the live application at the following link: [Scheduler](https://scheduler-hazel.vercel.app/).

## UI Snapshot
**Dashboard**
![image](https://github.com/user-attachments/assets/ca16e7a4-a3cd-469c-afcb-26b1018c0b28)

**Schedule Interview**
![image](https://github.com/user-attachments/assets/ab188a35-7fc8-462a-a738-1274e0d897cb)

**Update Scheduled Interview**
![image](https://github.com/user-attachments/assets/cdceec49-dece-43ba-96bd-275917b6c2dc)

**Responsive**
![Untitled design](https://github.com/user-attachments/assets/5f4a4396-14a0-4a9e-8df9-e691524045c8)

## Setup Instructions

To set up the Interview Scheduler project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   https://github.com/soumya-rayast/Scheduler.git

2. **Navigate to the Project Directory**:
   ```bash
   cd Scheduler

3. **Install Dependencies: Make sure you have Node.js and npm installed. Then run:**:
   ```bash
   npm install

4. **Run the Application: Start the development server by running:**:
   ```bash
   npm start

5. **Access the Application: Open your web browser and navigate to http://localhost:5173 to access the Scheduler.**

