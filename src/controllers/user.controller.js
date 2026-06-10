import { userModel } from '../models/user.model.js';
import { hashPassword, comparePassword, generateToken, verifyToken } from "myauthsystem";

export class userController {
    static async createUser(req, res) {
        const data = req.body

        const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

        try {
            const hashedPassword = await hashPassword(data.password, SALT_ROUNDS);
            const newUser = await userModel.createUser(data.name, data.username, hashedPassword, data.id_role);

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async login(req, res) {
        const data = req.body

        try {
            const user = await userModel.getUserByUserName(data.username);
            const isValid = await comparePassword(data.password, user[0].password);
            if (!isValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const payload = {
                id: user[0].id,
                username: user[0].username,
                id_role: user[0].id_role
            }
            const token = generateToken(payload, process.env.SECRET_KEY, process.env.EXPIRATION_TIME);
            res.status(200).json({ message: 'Login successful', payload, token });
            console.log(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            res.status(200).json({ message: 'Users retrieved successfully', users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }   
    }
}