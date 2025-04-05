// BALANCELIFE/backend/src/Modulo_InicioDeSesion/UsuarioModel.ts
import Database from '../express/Database';
import Usuario from '../Types/Usuario';
import bcrypt from 'bcrypt';

export default class UsuarioModel {
   
    public async registrar(usuario: Usuario): Promise<any> {
        // Encriptar contraseña si existe
        let hashedPassword = null;
        if (usuario.password) {
            hashedPassword = await bcrypt.hash(usuario.password, 10);
        }

        const query = `INSERT INTO USUARIO (nombre, email, password, fecha_registro, peso, altura, edad, genero, meta_diaria_agua, meta_horas_sueno, nivel, puntos) 
                       VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            usuario.nombre, 
            usuario.email, 
            hashedPassword,
            usuario.peso || null, 
            usuario.altura || null, 
            usuario.edad || null, 
            usuario.genero || null, 
            usuario.meta_diaria_agua ?? 2, // Valor por defecto: 2 litros
            usuario.meta_horas_sueno ?? 8, // Valor por defecto: 8 horas
            usuario.nivel ?? 1, // Nivel inicial por defecto
            usuario.puntos ?? 0 // Puntos iniciales por defecto
        ];
        return await Database.executeQuery(query, params);
    }

    public async existeUsuario(email: string): Promise<boolean> {
        const query = `SELECT COUNT(*) AS cantidad FROM USUARIO WHERE email = ?`;
        const result = await Database.executeQuery(query, [email]);
        return result[0].cantidad > 0;
    }

    public async iniciarSesion(email: string, password: string): Promise<any> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos, password 
                       FROM USUARIO WHERE email = ?`;
        const result = await Database.executeQuery(query, [email]);
        
        if (!Array.isArray(result) || result.length === 0) return null;

        const usuario = result[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) return null;

        delete usuario.password; // Eliminamos la contraseña antes de retornarla
        return usuario;
    }

    public async actualizarPerfil(id_usuario: number, usuario: Usuario): Promise<any> {
        const query = `UPDATE USUARIO 
                       SET nombre = ?, email = ?, peso = ?, altura = ?, edad = ?, genero = ?, 
                           meta_diaria_agua = ?, meta_horas_sueno = ? 
                       WHERE id_usuario = ?`;
        const params = [
            usuario.nombre, 
            usuario.email, 
            usuario.peso || null, 
            usuario.altura || null, 
            usuario.edad || null, 
            usuario.genero || null, 
            usuario.meta_diaria_agua ?? 2, 
            usuario.meta_horas_sueno ?? 8, 
            id_usuario
        ];
        return await Database.executeQuery(query, params);
    }

    public async actualizarNivel(id_usuario: number, nivel: number): Promise<any> {
        const query = `UPDATE USUARIO SET nivel = ? WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [nivel, id_usuario]);
    }

    public async actualizarPuntos(id_usuario: number, puntos: number): Promise<any> {
        const query = `UPDATE USUARIO SET puntos = ? WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [puntos, id_usuario]);
    }

    public async obtenerUsuarios(): Promise<Usuario[]> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos 
                       FROM USUARIO`;
        return await Database.executeQuery(query);
    }

    public async obtenerUsuario(id_usuario: number): Promise<Usuario | null> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos 
                       FROM USUARIO WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return Array.isArray(result) && result.length > 0 ? result[0] : null;
    }

    public async eliminarUsuario(id_usuario: number): Promise<any> {
        const query = `DELETE FROM USUARIO WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async obtenerPuntos(id_usuario: number): Promise<number | null> {
        const query = `SELECT puntos FROM USUARIO WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return Array.isArray(result) && result.length > 0 ? result[0].puntos : null;
    }
}