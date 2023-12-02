# MapMemoir App

The MapMemoir App is a web application developed using React.js for the frontend and Node.js for the backend, enabling users to explore and review different locations on an interactive map. Authenticated users can add reviews to specific places, while unauthenticated users can view existing reviews.

## Key Features

1. **Map Integration:**
   - Utilizes MapTiler for an interactive map interface.
   - Users can navigate and explore various locations on the map.

2. **User Authentication:**
   - Implements user authentication using Custom Auth for a secure experience.
   - Allows users to sign up or log in, ensuring a personalized interaction.

3. **Database Storage:**
   - Uses MongoDB as the backend database to store reviews and map-related data.
   - Defines a structured schema for reviews, capturing details such as location, user, and review text.

4. **Adding Reviews:**
   - Authenticated users can add reviews to specific locations via a user-friendly form.
   - Review data is submitted to the backend, stored in the database for future retrieval.

5. **Displaying Reviews:**
   - Retrieves reviews from the database based on the selected location and displays them on the map.
   - Utilizes markers or pointers to visually indicate locations with existing reviews.

6. **Conditional Access:**
   - Only authenticated users can add reviews and markers.
   - Unauthenticated users can view existing reviews and map markers.

7. **User Interaction:**
   - Users can click on map markers to view detailed reviews for a specific location.
   - Provides an intuitive interface for adding reviews and interacting with the map.

8. **Styling and UI/UX:**
   - Prioritizes a clean and visually appealing user interface for easy navigation.
   - Styles markers, reviews, and other elements for a cohesive and pleasant look.

9. **Security Considerations:**
   - Implements security measures, including input validation and protection against injection attacks.
   - Ensures secure handling of user authentication data.

10. **Testing and Deployment:**
    - Thoroughly tests the application to validate functionality and identify potential issues.
    - Deploys the React.js frontend to Netlify and Node.js backend to Render for public access.

## Getting Started

1. Clone the repository: `git clone https://github.com/ArinPrajapati/Frontend-MapMemoir.git`(frontend)
2. Clone the repository: `git clone https://github.com/ArinPrajapati/backend-MapMemoir.git`(backend)
3. Install dependencies: `npm install`(backend and Frontend both)
4. Start the development server: `npm start`(backend)
5. Start the development server:`npm run dev`(fortend)
6. Open the app in your browser: [https://master--visionary-pavlova-ebf379.netlify.app/]

## Technologies Used

- React.js
- Node.js
- Maptiler
- MongoDB
- Render
- Netlify

## License

This project is licensed under the [MIT License](LICENSE).
