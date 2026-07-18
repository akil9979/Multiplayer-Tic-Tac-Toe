import pool from "../config/db";
import type { Request, Response } from "express";


// export const getUser=async (req: Request, res: Response) => {
//     try {
//         let result = await pool.query("SELECT * FROM users");
//         res.status(200).json(result.rows);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// export const createUser=async (req: Request, res: Response) => {
//     let { name, email,password } = req.body;
//     try {
//         let result = await pool.query("INSERT INTO users (name, email,password) VALUES ($1, $2, $3) RETURNING *", [name, email,password]);
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

