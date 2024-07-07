import Staff from "../models/StaffModel.js";
import Customers from "../models/CustomersModel.js";
import argon2 from "argon2";
import {Op} from "sequelize"

export const login = async (req, res) => {

        const { email, phone_number } = req.body;
        const whereClause = [];

        if (email) {
            whereClause.push({ email: email });
        }
        if (phone_number) {
            whereClause.push({ phone_number: phone_number });
        }


        const customer = await Customers.findOne({
            where: {
                [Op.or]: whereClause
            }
        });
        const staff = await Staff.findOne({
            where: {
                [Op.or]: whereClause
            }
        });

        if (!customer && !staff) return res.status(404).json({ msg: "Email atau no hp tidak ditemukan" });

        if (customer) {
            const matchCustomer = await argon2.verify(customer.password, req.body.password);
            if (!matchCustomer) return res.status(400).json({ msg: "Password salah!" });

            req.session.customerId = customer.uuid;
            const { uuid, name, email, phone_number } = customer;
            return res.status(200).json({ uuid, name, email, phone_number });
        } 

        if (staff) {
            const matchStaff = await argon2.verify(staff.password, req.body.password);
            if (!matchStaff) return res.status(400).json({ msg: "Password salah!" });

            req.session.staffId = staff.uuid;
            const { uuid, name, email, phone_number, role } = staff;
            return res.status(200).json({ uuid, name, email, phone_number, role });
        }        
}

export const registerCustomer = async (req, res) => {
    const {name, email, phone_number, password} = req.body

    const hashPassword = await argon2.hash(password)

    try {   
        const response = await Customers.findOne({
            where : {
                [Op.or] : [{email: email}, {phone_number : phone_number}]
            }
        })

        if (response) {
            if (response.email === email || response.phone_number === phone_number) {
                return res.status(400).json({ msg: "Akun telah terdaftar" });
            }
        } else {

            // Buat pengguna baru
            await Customers.create({
                name,
                email,
                phone_number,
                password: hashPassword
            });

            return res.status(201).json({ msg: "Register berhasil" });
        }


        } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

export const me = async (req, res) =>{

    const { customerId, staffId } = req.session;
    const whereClause = [];

    if (customerId) {
        whereClause.push( customerId);
    }
    if (staffId) {
        whereClause.push( staffId);
    }
 

    if(!whereClause[0]) {
        return res.status(401).json({msg: "Mohon login ke akun Anda!"})
    }
 
    if(customerId){
        const customer = await Customers.findOne({
            attributes: ["name", "email", "phone_number"],
            where: {
                uuid : whereClause[0]
            }
        })
        if(!customer) {
            return res.status(494).json({msg: "Akun tidak ditemukan!"})
        }
        res.status(200).json(customer)

    }else if(staffId){
        const staff = await Staff.findOne({
            attributes: ["name", "email", "phone_number", "role"],
            where: {
                uuid : whereClause[0]
            }
        })
        if(!staff) {
            return res.status(494).json({msg: "Akun tidak ditemukan!"})
        }
        res.status(200).json(staff)
    }


}


export const logout =  (req, res) => {
        req.session.destroy((err) =>{
            if(err) return res.status(400).json({msg : "Gagal logout!"})
                res.status(200).json({msg : "Berhasil logout"})
        })
}
