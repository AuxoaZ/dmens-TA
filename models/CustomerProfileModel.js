import { DataTypes } from "sequelize";
import db from "../config/db.js"
import Customers from "./CustomersModel.js";

const CustomerProfile = db.define('customer_profile', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    birth: {
        type: DataTypes.DATE,
    },
    gender: {
        type: DataTypes.STRING,
    },

    address: {
        type: DataTypes.STRING,
    },
    customerId : {
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

Customers.hasOne(CustomerProfile);
CustomerProfile.belongsTo(Customers, {foreignKey: "customerId"})

export default CustomerProfile;