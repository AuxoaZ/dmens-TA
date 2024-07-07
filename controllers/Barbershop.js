import { Op } from "sequelize";
import Barbershop from "../models/BarbershopModel.js";

export const createBarbershop = async (req, res) => {
    const {name, link_maps, address} = req.body

    try {
            await Barbershop.create ({
                name, link_maps, address
            })
            res.status(201).json({msg : "Tambah barbershop berhasil"})
        } catch (error) {
        res.status(400).json({msg : error.message})
        
    }

}

export const getAllBarbershops= async (req, res) => {
    try {
        const response = await Barbershop.findAll({

            attributes: [,"uuid", "name","link_maps", "address"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }
}
export const getBarbershopByName= async (req, res) => {
    const { name } = req.query;
    try {
        const response = await Barbershop.findAll({
            where : {
                name: {
                    [Op.like]: `%${name}%`
                  }
            },
            attributes: ["id","uuid", "name"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }
}