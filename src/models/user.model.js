import { pool } from '../config/db.js';

export class userModel{
    static async createUser(name,username,passwor, id_role){ 
        const [rows] = await pool.query(
            'INSERT INTO tb_user (name, username, password, id_role) VALUES (?, ?, ?, ?)',
            [name, username, passwor, id_role]
        );
        return rows;
    }

    static async login(username, password){
        const [rows] = await pool.query(
            'SELECT * FROM tb_user WHERE username = ? AND password = ?',
            [username, password]
        );
        return rows;
    }

    static async getUserByUserName(username){
        const [rows] = await pool.query(
            'SELECT * FROM tb_user WHERE username = ?',
            [username]
        );
        return rows;
    }

    static async getAllUsers(){
        const [rows] = await pool.query(
            'SELECT * FROM tb_user'
        );
        return rows;
    }
}