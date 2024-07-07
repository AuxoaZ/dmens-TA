
import Customers from "../models/CustomersModel.js";
import Staff from "../models/StaffModel.js";

export const verify = async (req, res, next) => {
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
            where: {
                uuid : whereClause[0]
            }
        })
        if(!customer) {
            return res.status(494).json({msg: "Akun tidak ditemukan!"})
        }
        req.customerId = customer.id
        next()

    }else if(staffId){
        const staff = await Staff.findOne({
            where: {
                uuid : whereClause[0]
            }
        })
        if(!staff) {
            return res.status(494).json({msg: "Akun tidak ditemukan!"})
        }
        req.staffId = staff.id
        req.role = staff.role
        next()
    }
}

export const managerOnly = async (req, res, next) => {
    const staff = await Staff.findOne({
        where: {
            uuid : req.session.staffId
        }
    })
    if(!staff) {
        return res.status(494).json({msg: "Akun tidak ditemukan!"})
    }
    if(staff.role !== "manager") return res.status(403).json({msg: "Akses dilarang "})
    next()

}
export const admin = async (req, res, next) => {
    const staff = await Staff.findOne({
        where: {
            uuid : req.session.staffId
        }
    })
    if(!staff) {
        return res.status(494).json({msg: "Akun tidak ditemukan!"})
    }
    if(staff.role !== "manager" && staff.role !== "admin" ) return res.status(403).json({msg: "Akses dilarang "})
    next()

}
