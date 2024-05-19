# Sports Union

Sports Union is a web application designed to help university students stay connected with sports activities on campus. The platform provides a centralized hub where students can explore and participate in upcoming sports events, fostering a community of inclusivity, accessibility, and enthusiasm for sports.

## Table of Contents
- [Sports Union](#sports-union)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Deployed Application](#deployed-application)
  - [Installation Guide](#installation-guide)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features
- User Registration and Login
- Create, Edit, and Delete Events
- View and Register for Events
- Admin Dashboard for Managing Users and Events
- Notifications for Upcoming Events
- Responsive Design Compatible with Various Devices

## Tech Stack
- **Frontend**: React.js, Material UI, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Version Control**: Git and GitHub
- **Communication**: Discord
- **Design**: Figma, Lucidchart
- **Authentication**: JWT (JSON Web Tokens)

## Deployed Application
You can access the deployed application at [Sports Union](https://sports-union.onrender.com/).

## Installation Guide
Follow these steps to set up the project locally.

1. **Clone the repository**
    ```bash
    git clone https://github.com/Abshir112/Sports-Union.git
    ```

2. **Change to the project directory**
    ```bash
    cd Sports-Union
    ```

3. **Install Backend Dependencies**
    ```bash
    cd Backend
    npm install
    ```

4. **Create a `.env` file in the backend directory and add the following**
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. **Go back to the root directory**
    ```bash
    cd ../
    ```

6. **Install Frontend Dependencies**
    ```bash
    cd Frontend
    npm install
    ```

7. **Go back to the root directory**
    ```bash
    cd ../
    ```

8. **Install concurrently to run both server and client**
    ```bash
    npm install concurrently
    ```

9. **Run the application**
    ```bash
    npm start
    ```

10. **Open your browser**
    - Navigate to `http://localhost:3000` to see the server running
    - Navigate to `http://localhost:8080` to see the client running

## Usage
Once the application is running, you can register as a new user or log in with existing credentials. Depending on your role (admin or user), you will have different functionalities available:
- **Users**: View and register for sports events.
- **Admins**: Manage users, create and manage events, view registered participants.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
Feel free to reach out to any of the contributors for more information or if you have any questions.

Contributors:
- [Abshir Muhumed Abdi](https://github.com/Abshir112)
- [Ahmed Saber Elsayed Radwan](https://github.com/ahmedradwancs)
- [Jwan Mardini](https://github.com/JwanMardini)
- [Lakshmi Vishal Hayagriven](https://github.com/lakshmivishal9496)
- [Mohamad Alloush](https://github.com/Alloush95)

---

Made with ❤️ by the Sports Union Development Team at Kristianstad University.
