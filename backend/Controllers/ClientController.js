import { Client } from "../Models/Client.js";
import dotenv from "dotenv";
dotenv.config();

const addClient = async (req, res) => {
  try {
    const {
      code,
      name,
      agent,
      contact,
      doj,
      pwd,
      expo,
      clientCommType,
      clientCommMatch,
      clientCommSSN,
      chips,
      status,
    } = req.body;
    const user = await Client.findOne({ contact });
    if (user) {
      return res
        .status(409)
        .json({ message: "Client is already exist.", success: false });
    }
    const newUser = new Client({
      code,
      name,
      agent,
      contact,
      doj,
      pwd,
      expo,
      clientCommType,
      clientCommMatch,
      clientCommSSN,
      chips,
      status,
    });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", success: true });
  } catch (err) {
    console.error("Error adding client:", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const editClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedClient = await Client.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedClient) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json({
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Client",
      error: error.message,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const { code, name, agent, contact, status } = req.query;
    let filter = {};

    if (code) filter.code = code;
    if (name) filter.name = new RegExp(name, "i"); // Case-insensitive search
    if (agent) filter.agent = agent;
    if (contact) filter.contact = contact;
    if (status) filter.status = status;

    const clients = await Client.find(filter);
    res.status(200).json({
      message: "Client records fetched successfully",
      data: clients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Client records",
      error: error.message,
    });
  }
};

const withdrawExpo = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res
        .status(404)
        .json({ message: "Client not found", success: false });
    }

    if (amount > client.expo) {
      return res
        .status(400)
        .json({ message: "Insufficient balance", success: false });
    }

    client.expo -= amount;
    await client.save();

    res.status(200).json({
      message: "Withdrawal successful",
      newExpoValue: client.expo,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export {
  addClient as AddClient,
  editClient as EditClient,
  getClients as GetClients,
  withdrawExpo as WithdrawExpo
};
