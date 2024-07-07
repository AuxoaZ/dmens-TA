import Customers from "../models/CustomersModel.js";
import CustomerProfile from "../models/CustomerProfileModel.js";
import argon2 from "argon2";
export const getCustomers = async (req, res) => {
    try {
        const response = await Customers.findAll({
            attributes: ["uuid", "name", "email", "phone_number"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const response = await Customers.findOne({
            where : {
                uuid : req.params.id
            },
            attributes: ["uuid", "name", "email", "phone_number"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }
}


export const updateCustomer = async (req, res) => {

    const {name, email, phone_number, password} = req.body
    
    try {
        const response = await Customers.findOne({
            where : {
                uuid : req.params.id
            }
        })
        if(!response) return res.status(404).json({msg: "Data tidak ditemukan!"})

            let hashPassword;
            if (password) {
                hashPassword = await argon2.hash(password);
            } else {
                hashPassword = staff.password; // Tetap gunakan password lama jika tidak diupdate
            }
    
            // Update data staff
            await Customers.update(
                { name, email, phone_number, password: hashPassword },
                {
                    where: {
                        id: Customers.id
                    }
                }
            )
            res.status(200).json({msg: "Data berhasil diupdate"})
        
    } catch (error) {
        
    }

}

/////////////////////////////////// STAFF PROFILE //////////////////////////////////////////////////////////////

export const getProfile = async (req, res) => {
    try {
        if (!req.customerId) 
            return res.status(400).json({ msg: "Customer ID tidak ditemukan" });

        const response = await Customers.findOne({
            where : {
                uuid : req.params.id
            },
            include : [{
                model :CustomerProfile,
                attributes: ["uuid", "customerId", "birth", "gender", "address"]
            }],
            attributes: ["name", "email", "phone_number"]
        })

        if(!response) return res.status(404).json({msg: "Data tidak ditemukan!"})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }
}

export const createProfile = async (req, res) => {
    const { birth, gender, address } = req.body;

    try {
        // Pastikan req.staffId tersedia
        if (!req.customerId) {
            return res.status(400).json({ msg: "Customer ID tidak ditemukan" });
        }

        const newProfile = await CustomerProfile.create({
            birth : new Date(birth),
            gender,
            address,
            customerId: req.customerId // Asumsikan customerId telah disetel di middleware sebelumnya
        });

        res.status(201).json({ msg: "Register berhasil", profile: newProfile });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export const updateProfile = async (req, res) => {
    const { birth, gender, address } = req.body;
    try {
        if (!req.customerId) {
            return res.status(400).json({ msg: "Customer ID tidak ditemukan" });
        }
        const response = await Customers.findOne({
            where : {
                uuid : req.params.id
            },
            include : [{
                model :CustomerProfile
            }]
        })

        console.log(response);

        if(!response) return res.status(404).json({msg: "Data tidak ditemukan!"})

            await CustomerProfile.update({
                    birth : new Date(birth),
                    gender,
                    address
                },{where : {
                    uuid: response.customer_profile.uuid
                }

            });

            res.status(200).json({msg: "Berhasil diupdate!"})
        
    } catch (error) {
        res.status(500).json({msg: req.message})  
    }

}