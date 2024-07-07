import { DataTypes } from "sequelize";
import db from "../config/db.js"
import Staff from "./StaffModel.js";

const StaffProfile = db.define('staff_profile', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    
    staffId : {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

}, {

freezeTableName : true
});

Staff.hasOne(StaffProfile);
StaffProfile.belongsTo(Staff, {foreignKey: "staffId"})

export default StaffProfile;