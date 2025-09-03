# 🏫 School Management Form – Assignment  

## 📌 Features Implemented  
- Built with Next.js (App Router) and React Hook Form  
- Input validation (e.g., email validation)  
- Stores form data in MySQL database  
- Handles image uploads (saved in `public/schoolImages`)  
- Responsive design  

## 🚀 Running Locally  
1. Clone the repository  
   ```bash
   git clone https://github.com/SshibamDebnathh/school-project.git
   cd project-folder
Install dependencies

bash
Copy code
npm install
Setup .env.local with MySQL credentials:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb

Run the development server

bash
Copy code
npm run dev
Visit http://localhost:3000

Submit the form

Data will be stored in MySQL

Images will appear inside public/schoolImages folder