// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { signUp, login, updateProfile, deleteProfile } = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Allows a new user to sign up by providing their personal information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request
 */
router.post('/signup', signUp);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a JWT token for further requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Unauthorized
 */
router.post('/login', login);

/**
 * @openapi
 * /profile:
 *   put:
 *     summary: Update user profile
 *     description: Allows the authenticated user to update their profile information, including uploading a profile picture.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The new email of the user
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture of the user
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', upload.single('profilePicture'), updateProfile);

/**
 * @openapi
 * /profile:
 *   delete:
 *     summary: Delete user profile
 *     description: Allows the authenticated user to delete their profile.
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/profile', deleteProfile);

module.exports = router;
