import { Router } from "express";
import Contact from "../models/ContactSchema.js";

const router = new Router();

// router.get("/aaa", (req, res) => {
//   res.json({ message: "Welcome to aaa" });
// });

router.post("/", async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const newContact = await Contact({ name, address, phone });
    newContact.save();
    res.json({ message: "Contact Created!!!", data: newContact });
  } catch (error) {
    console.log(error.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const updatedRecord = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        phone,
      },
      {
        new: true,
      }
    );
    res.json({ message: "Contact Updated!!!", data: updatedRecord });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.json({ message: "Contact Deleted", deletedContact });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allContacts = await Contact.find();
    res.json({
      message: "Successfully fetched all contacts",
      data: allContacts,
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
