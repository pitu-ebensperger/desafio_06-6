
import { pool } from "../database/connections.js";

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}


const getUsuarios = async () => {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    return rows;
}


export { getDate, getUsuarios }
