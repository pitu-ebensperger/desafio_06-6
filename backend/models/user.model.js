import { pool } from "../database/connections.js"

const findOneEmail = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

const create = async ({email, password}) => {
    const query =
        "INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [email, password]);
    return rows[0];
};

export const userModel = {
    findOneEmail,
    create,
};
