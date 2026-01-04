import Contact from "../model/ContactModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Message not sent",
    });
  }
};

export const getAllMessages = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    contacts,
  });
};

export const deleteMessage = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
};
