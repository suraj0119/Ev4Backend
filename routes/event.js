// backend/routes/events.js
const express = require('express');
const router = express.Router();
const {
  createEvent,
  updateEvent,
  registerForEvent,
  cancelRegistration,
  cancelEvent,
} = require('../controllers/eventController');

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Allows authenticated users to create a new event with specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the event
 *               capacity:
 *                 type: integer
 *                 description: The maximum number of attendees
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The initial ticket price
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created event
 *       400:
 *         description: Bad request
 */
router.post('/', createEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     description: Allows authenticated users to update the details of an existing event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the event
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The updated date of the event
 *               capacity:
 *                 type: integer
 *                 description: The updated maximum number of attendees
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The updated ticket price
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put('/:id', updateEvent);

/**
 * @openapi
 * /events/{id}/register:
 *   post:
 *     summary: Register for an event
 *     description: Allows users to register for an event. Users can only register once per event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to register for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Bad request or already registered
 *       404:
 *         description: Event not found
 */
router.post('/:id/register', registerForEvent);

/**
 * @openapi
 * /events/{id}/cancel-registration:
 *   post:
 *     summary: Cancel event registration
 *     description: Allows users to cancel their registration for an event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to cancel registration for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration cancellation successful
 *       400:
 *         description: Bad request or not registered
 *       404:
 *         description: Event not found
 */
router.post('/:id/cancel-registration', cancelRegistration);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Cancel an event
 *     description: Allows admins to cancel an event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to cancel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event canceled successfully
 *       404:
 *         description: Event not found
 */
router.delete('/:id', cancelEvent);

module.exports = router;
