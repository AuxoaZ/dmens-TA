import { DataTypes } from "sequelize";
import db from "../config/db.js";
import BarberShop from "./BarbershopModel.js";
import Staff from "./StaffModel.js";

const Barbers = db.define('barbers', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
Staff.hasOne(Barbers, { foreignKey: 'staffId' });
Barbers.belongsTo(Staff, { foreignKey: 'staffId' });

// Relasi dengan Barbershop
BarberShop.hasMany(Barbers, { foreignKey: 'barberShopId' });
Barbers.belongsTo(BarberShop, { foreignKey: 'barberShopId' });

export default Barbers;
