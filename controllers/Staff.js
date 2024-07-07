import { Op } from "sequelize";
import Staff from "../models/StaffModel.js";
import StaffProfile from "../models/StaffProfileModel.js";
import argon2 from "argon2";

export const createStaff = async (req, res) => {
    const {name, email, phone_number, employed, status, password, role} = req.body
    const hashPassword = await argon2.hash(password)

    try {
            await Staff.create ({
                name,
                email,
                phone_number,
                employed,
                status,
                password : hashPassword,
                role
            })
            res.status(201).json({msg : "Register berhasil"})
        } catch (error) {
        res.status(400).json({msg : error.message})
        
    }

}

export const getStaff = async (req, res) => {
    try {
        const response = await Staff.findAll({
            attributes: ["uuid", "name", "email", "phone_number", "employed", "status", "role"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})
    }
}

export const getStaffById = async (req, res) => {
    try {
        const response = await Staff.findOne({
            where : {
                uuid : req.params.id
            },
            attributes: ["uuid", "name", "email", "phone_number", "employed", "status", "role"]
        })
        if(!response) return res.status(404).json({msg: req.message})  

        res.status(200).json(response)
    } catch (error) {
        res.status(403).json({msg: req.message})  
    }
}
export const getAdmins = async (req, res) => {
    try {
        const response = await Staff.findAll({
            where : {
                role : "admin"
            },
            attributes: ["uuid", "name", "email", "phone_number","employed", "status"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})  
    }
}
export const getBarber = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        const response = await Staff.findAll({
            where : {
                role : "barber",
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
export const getCashier = async (req, res) => {
    const {name} = req.query
    try {
        const response = await Staff.findAll({
            where : {
                role : "cashier",
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


export const updateStaff = async (req, res) => {
    try {
        // Cari staff berdasarkan UUID
        const staff = await Staff.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ["id", "uuid", "name", "email", "phone_number", "employed", "status", "role", "password"]
        });

        if (!staff) return res.status(404).json({ msg: "Data tidak ditemukan!" });

        const { name, email, phone_number, employed, status, password, role } = req.body;

        let hashPassword;
        if (password) {
            hashPassword = await argon2.hash(password);
        } else {
            hashPassword = staff.password; // Tetap gunakan password lama jika tidak diupdate
        }

        // Update data staff
        await Staff.update(
            { name, email, phone_number, employed, status, password: hashPassword, role },
            {
                where: {
                    id: staff.id
                }
            }
        );

        // Ambil data yang telah diupdate
        const updatedStaff = await Staff.findOne({
            where: {
                id: staff.id
            },
            attributes: ["uuid", "name", "email", "phone_number", "employed", "status", "role"]
        });

        res.status(200).json(updatedStaff);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const deleteStaff = async (req, res) => {
    try {
        // Cari staff berdasarkan UUID
        const staff = await Staff.findOne({
            where: {
                uuid: req.params.id
            },
        });

        if (!staff) return res.status(404).json({ msg: "Data tidak ditemukan!" });

        await Staff.destroy(
            {
                where: {
                    id: staff.id
                }
            }
        );


        res.status(200).json({msg: "telah dihapus"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


/////////////////////////////////// STAFF PROFILE //////////////////////////////////////////////////////////////

export const getStaffProfile = async (req, res) => {
    try {
        if (!req.staffId) {
            return res.status(400).json({ msg: "Staff ID tidak ditemukan" });
        }
        const response = await Staff.findOne({
            where : {
                uuid : req.params.id
            },
            include : [{
                model :StaffProfile,
                attributes: ["uuid", "staffid", "birth", "gender", "address", ]
            }],
            attributes: ["name", "email", "phone_number", "role"]
        })

        if(!response) return res.status(404).json({msg: "Data tidak ditemukan!"})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }
}

export const createStaffProfile = async (req, res) => {
    const { birth, gender, address } = req.body;

    try {
        // Pastikan req.staffId tersedia
        if (!req.staffId) {
            return res.status(400).json({ msg: "Staff ID tidak ditemukan" });
        }

        const newProfile = await StaffProfile.create({
            birth : new Date(birth),
            gender,
            address,
            staffId: req.staffId // Asumsikan staffId telah disetel di middleware sebelumnya
        });

        res.status(201).json({ msg: "Register berhasil", profile: newProfile });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export const updateStaffProfile = async (req, res) => {
    const { birth, gender, address } = req.body;
    try {
        if (!req.staffId) {
            return res.status(400).json({ msg: "Staff ID tidak ditemukan" });
        }
        const response = await Staff.findOne({
            where : {
                uuid : req.params.id
            },
            include : [{
                model :StaffProfile,
                attributes: ["uuid", "staffid", "birth", "gender", "address", ]
            }],
            attributes: ["name", "email", "phone_number", "employed", "status", "role"]
        })

        if(!response) return res.status(404).json({msg: "Data tidak ditemukan!"})

            await StaffProfile.update({
                birth : new Date(birth),
                gender,
                address
                // staffId: req.staffId // Asumsikan staffId telah disetel di middleware sebelumnya
            
            },{where : {
                uuid: response.staff_profile.uuid
            }

            });

            res.status(200).json({msg: "Berhasil diupdate!"})
        
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }

}