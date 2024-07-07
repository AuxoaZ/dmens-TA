import Barbers from "../models/BarberModel.js";
import Barbershop from "../models/BarbershopModel.js";
import Staff from "../models/StaffModel.js";

export const getBarbers = async (req, res) => {
    try {

        const response = await Barbers.findAll({
            include : [
                {
                model :Barbershop,
                attributes: ["id", "name" ]
                },
                {
                model :Staff,
                attributes: ["id", "name", "email", "role", "status", ]
                },

        ],
            attributes: ["status"]
        })

        if(!response) return res.status(404).json({msg: "Data tidak ditemukan!"})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }
}

export const createBarber = async (req, res) => {
    const { barberShopId, staffId, status } = req.body;

    try {
        const newBarber = await Barbers.create({
            barberShopId,
            staffId,
            status
        });

        res.status(201).json({ msg: "Register berhasil", data: newBarber });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};