import { Op } from "sequelize";
import Discounts from "../models/DiscountsModel.js";

export const createDiscount = async (req, res) => {
  const { code, description, type, value, start_date, end_date, status } =
    req.body;

  try {
    await Discounts.create({
      staffId: req.staffId,
      code,
      description,
      type,
      value,
      start_date,
      end_date,
      status,
    });
    res.status(201).json({ msg: "Tambah diskon berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// export const getAllBarbershops = async (req, res) => {
//   try {
//     const response = await Barbershop.findAll({
//       attributes: [, "uuid", "name", "link_maps", "address"],
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: req.message });
//   }
// };
