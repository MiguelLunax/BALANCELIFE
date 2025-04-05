// BALANCELIFE/backend/src/express/Database.ts
import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Cargar las variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../../env/.env') });

export default class Database {
    private static connection: Connection | null = null;

    public static async getConnection(): Promise<Connection> {
        if (!Database.connection) {
            const host = process.env.HOST_DATABASE;
            const port = process.env.PORT_DATABASE;
            const user = process.env.USER_DATABASE;
            const password = process.env.PASSWORD_DATABASE;
            const database = process.env.DATABASE;

            if (!host || !port || !user || !password || !database) {
                console.error('Faltan datos de conexión a la base de datos');
                throw new Error('Faltan datos de conexión a la base de datos');
            }
            
            try {
                Database.connection = await mysql.createConnection({
                    host: host,  
                    port: Number(port),  
                    user: user,  
                    password: password,  
                    database: database,  
                    ssl: {
                        rejectUnauthorized: false // Desactivar la validación del certificado
                    }
                });
                console.log('Conexión a la base de datos establecida');
            } catch (error) {
                console.error('Error al conectar a la base de datos:', error);
                throw error;
            }
        }
        return Database.connection;
    }

    public static async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const connection = await Database.getConnection();
            const [rows] = await connection.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Error en la consulta:', error);
            throw error;
        }
    }
}