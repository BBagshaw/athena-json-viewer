### `README.md`


# Athena JSON Viewer

Athena JSON Viewer is a modern web application designed to securely display patient data in a visually appealing and user-friendly manner. Utilizing Azure AD for authentication, this application ensures that only authorized users can access the sensitive information. The app features a sleek design with glassmorphism effects and a responsive layout.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Authentication**: Uses Azure AD (Microsoft Entra ID) for secure user authentication.
- **Modern UI**: Glassmorphism design for a clean and modern look.
- **Data Viewer**: Displays patient data in a tree view using `react-json-view`.
- **Responsive Design**: Ensures usability across various devices and screen sizes.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - `react-json-view` for displaying JSON data
  - CSS for styling with glassmorphism effects

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- **Authentication**:
  - Azure AD (Microsoft Entra ID)
  - `@azure/msal-react`
  - `@azure/msal-browser`

## Setup and Installation

### Prerequisites

- Node.js and npm
- MongoDB
- Azure AD account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/athena-json-viewer.git
   cd athena-json-viewer
   ```

2. **Install dependencies**:

   **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

   **Backend**:
   ```bash
   cd ../backend
   npm install
   ```

3. **Configure Azure AD**:

   - Register your application in Azure AD.
   - Set the redirect URI to `http://localhost:3000`.
   - Update the `authConfig.ts` file in the `frontend/src` directory with your Azure AD credentials:
     ```typescript
     export const msalConfig = {
       auth: {
         clientId: 'YOUR_CLIENT_ID',
         authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
         redirectUri: 'http://localhost:3000',
       },
     };
     ```

4. **Import Dummy Data**:
   - Ensure MongoDB is running.
   - Run the script to import dummy data:
     ```bash
     cd backend
     node importData.js
     ```

5. **Run the application**:

   **Backend**:
   ```bash
   cd backend
   npm start
   ```

   **Frontend**:
   ```bash
   cd frontend
   npm start
   ```

6. **Open the application**:
   - Navigate to `http://localhost:3000` in your browser.

## Usage

1. **Sign In**:
   - Click the "Sign In" button to authenticate using Azure AD.

2. **View Data**:
   - Once authenticated, view the patient data displayed in a tree view format.

3. **Logout**:
   - Click the "Logout" button to sign out.

## Project Structure

```
athena-json-viewer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DataViewer.tsx
│   │   │   ├── DataViewer.css
│   │   │   ├── Login.tsx
│   │   │   └── Login.css
│   │   ├── App.tsx
│   │   ├── authConfig.ts
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── patient.ts
│   │   ├── routes/
│   │   │   └── patient.ts
│   │   └── server.ts
│   ├── data/
│   │   └── demographics.json
│   ├── importData.js
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.