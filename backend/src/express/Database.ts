// BALANCELIFE/backend/src/express/Database.ts
import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env/Database.env') });

export default class Database {
    private static connection: Connection | null = null;

    public static async getConnection(): Promise<Connection> {
        if (!Database.connection) {
            const {
                HOST_DATABASE,
                PORT_DATABASE,
                USER_DATABASE,
                PASSWORD_DATABASE,
                DATABASE
            } = process.env;

            if (!HOST_DATABASE || !PORT_DATABASE || !USER_DATABASE || !PASSWORD_DATABASE || !DATABASE) {
                console.error('❌ Faltan datos de conexión a la base de datos');
                throw new Error('Faltan datos de conexión a la base de datos');
            }

            try {
                Database.connection = await mysql.createConnection({
                    host: HOST_DATABASE,
                    port: Number(PORT_DATABASE),
                    user: USER_DATABASE,
                    password: PASSWORD_DATABASE,
                    database: DATABASE,
                    ssl: {
                        rejectUnauthorized: false // Evita problemas de certificado en conexiones remotas
                    }
                });
                console.log('✅ Conexión a la base de datos establecida');
            } catch (error) {
                console.error('❌ Error al conectar a la base de datos:', error);
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
            console.error('❌ Error en la consulta:', error);
            throw error;
        }
    }
}
