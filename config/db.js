import { Sequelize } from "sequelize";

// Buat instance Sequelize
const db = new Sequelize('dmens', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    logging: console.log, // Untuk melihat log SQL yang dihasilkan oleh Sequelize
});

// Uji koneksi ke database
db.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.error('Tidak dapat terhubung ke database:', err);
    });

export default db;
