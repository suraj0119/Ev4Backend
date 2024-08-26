const Event = require('../models/event');
const User = require('../models/user');
const transporter = require('../config/mail');

exports.createEvent = async (req, res) => {
  const { title, description, date, capacity, price } = req.body;
  try {
    const event = new Event({ title, description, date, capacity, price, creator: req.user.id });
    await event.save();
    res.status(201).send('Event created');
  } catch (error) {
    res.status(400).send('Error creating event');
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, capacity, price } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.creator.toString() !== req.user.id) return res.status(404).send('Event not found or not authorized');

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.capacity = capacity || event.capacity;
    event.price = price || event.price;

    await event.save();
    res.send('Event updated');
  } catch (error) {
    res.status(400).send('Error updating event');
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.isCanceled) return res.status(404).send('Event not found or canceled');

    if (event.attendees.includes(req.user.id)) return res.status(400).send('Already registered for this event');

    if (event.attendees.length >= event.capacity) return res.status(400).send('Event is sold out');

    event.attendees.push(req.user.id);
    await event.save();

    res.send('Registered for event');
  } catch (error) {
    res.status(400).send('Error registering for event');
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.isCanceled) return res.status(404).send('Event not found or canceled');

    if (!event.attendees.includes(req.user.id)) return res.status(400).send('Not registered for this event');

    event.attendees = event.attendees.filter((attendee) => attendee.toString() !== req.user.id);
    await event.save();

    res.send('Registration canceled');
  } catch (error) {
    res.status(400).send('Error canceling registration');
  }
};

exports.cancelEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.creator.toString() !== req.user.id) return res.status(404).send('Event not found or not authorized');

    event.isCanceled = true;
    await event.save();

    // Notify all registered users
    const users = await User.find({ _id: { $in: event.attendees } });
    users.forEach((user) => {
      transporter.sendMail({
        to: user.email,
        subject: 'Event Canceled',
        text: `The event "${event.title}" has been canceled.`,
      });
    });

    res.send('Event canceled');
  } catch (error) {
    res.status(400).send('Error canceling event');
  }
};
