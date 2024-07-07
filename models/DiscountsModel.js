import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Staff from './StaffModel.js';

const Discounts = db.define('discounts', {
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
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['percent', 'fixed amount']]
    }
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  requirement: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['available', 'unvailable']]
    }
  }
}, {
  freezeTableName: true
});

// Relasi dengan Staff
Staff.hasMany(Discounts, { foreignKey: 'staffId' });
Discounts.belongsTo(Staff, { foreignKey: 'staffId' });

export default Discounts;
