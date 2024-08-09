import { MiniAdmin } from "../Models/MiniAdmin.js";
import dotenv from "dotenv";
dotenv.config();

const addMiniAdmin = async (req, res) => {
  try {
    const {
      code,
      name,
      admin,
      contact,
      doj,
      pwd,
      subadminMatchShr,
      subadminCasinoShr,
      subadminCommType,
      subadminCommMatch,
      subadminCommSSN,
      chips,
      status,
    } = req.body;
    const user = await MiniAdmin.findOne({ contact });
    if (user) {
      return res
        .status(409)
        .json({ message: "User is already exist.", success: false });
    }
    const newUser = new MiniAdmin({
      code,
      name,
      admin,
      contact,
      doj,
      pwd,
      subadminMatchShr,
      subadminCasinoShr,
      subadminCommType,
      subadminCommMatch,
      subadminCommSSN,
      chips,
      status,
    });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const editMiniAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedAdmin = await MiniAdmin.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({
        message: "MiniAdmin not found",
      });
    }

    res.status(200).json({
      message: "MiniAdmin updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update MiniAdmin",
      error: error.message,
    });
  }
};

const getMiniAdmins = async (req, res) => {
  try {
    const { code, name, admin, contact, status } = req.query;
    let filter = {};

    if (code) filter.code = code;
    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive search
    if (admin) filter.admin = admin;
    if (contact) filter.contact = contact;
    if (status) filter.status = status;

    const miniAdmins = await MiniAdmin.find(filter);
    res.status(200).json({
      message: "MiniAdmin records fetched successfully",
      data: miniAdmins
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch MiniAdmin records",
      error: error.message
    });
  }
};

export { addMiniAdmin as AddMiniAdmin, editMiniAdmin as EditMiniAdmin, getMiniAdmins as GetMiniAdmins };
