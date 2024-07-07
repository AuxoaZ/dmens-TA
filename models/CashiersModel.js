import { DataTypes } from "sequelize";
import db from "../config/db.js";
import BarberShop from "./BarbershopModel.js";
import Staff from "./StaffModel.js";

const Cashiers = db.define('cashiers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    staffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Staff,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    barberShopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BarberShop,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

// Relasi dengan Staff
Staff.hasOne(Cashiers, { foreignKey: 'staffId' });
Cashiers.belongsTo(Staff, { foreignKey: 'staffId' });

// Relasi dengan Cashiershop
BarberShop.hasOne(Cashiers, { foreignKey: 'barberShopId' });
Cashiers.belongsTo(BarberShop, { foreignKey: 'barberShopId' });

export default Cashiers;
