// BALANCELIFE/backend/src/Modulo_InicioDeSesion/UsuarioModel.ts
import Database from '../express/Database';
import UsuarioInterface from '../Types/Usuario';
import bcrypt from 'bcrypt';

export default class UsuarioModel {

    public async registrar(usuario: UsuarioInterface): Promise<any> {

        const query = `SELECT fn_registrar_usuario(?, ?, ?, ?) AS id_usuario`;
        const params = [
            usuario.email,
            usuario.birthdate,
            usuario.nombre,
            usuario.password
        ];
        const result = await Database.executeQuery(query, params);
        return result[0].id_usuario;
    }

    public async existeUsuario(email: string): Promise<boolean> {
        const query = `SELECT COUNT(*) AS cantidad FROM Usuario WHERE email = ?`;
        const result = await Database.executeQuery(query, [email]);
        return result[0].cantidad > 0;
    }

    public async iniciarSesion(email: string, password: string): Promise<UsuarioInterface | null> {

        try {

            const query = `CALL GetUserByUserEmail(?)`;
            const result = await Database.executeQuery(query, [email]);

            if (!result || result.length === 0) return null;

            const usuario = result[0][0];
            const passwordValida = await bcrypt.compare(password, usuario.password);

            if (!passwordValida) return null;

            const userResult: UsuarioInterface = {
                id_usuario: usuario.id,
                nombre: usuario.user_name,
                email: usuario.email,
                birthdate: usuario.fecha_nacimiento,
                fcm_token: "POR AHORA NO SE MANEJA" //TODO: CAMBIAR POR EL TOKEN DEL USUARIO
            }

            return userResult;

        } catch (error) {
            console.error('Error al intentar autenticar en la db:', error);
            return null;
        }

    }

    public async obtenerUsuarioByEmail(id_usuario: number): Promise<UsuarioInterface | null> {
        const query = `SELECT id, email, fecha_nacimiento, user_name, fcm_token FROM Usuario WHERE email = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);

        if (!result || result.length === 0) return null;

        const usuario = result[0];
        const userResult: UsuarioInterface = {

            id_usuario: usuario.id,
            nombre: usuario.user_name,
            email: usuario.email,
            birthdate: usuario.fecha_nacimiento,
            fcm_token: "POR AHORA NO SE MANEJA" //TODO: CAMBIAR POR EL TOKEN DEL USUARIO

        }

        return userResult;
    }

    public async actualizarPerfil(_id_usuario: number, usuario: UsuarioInterface): Promise<any> {
        const query = `UPDATE USUARIO 
                       SET nombre = ?, email = ?, peso = ?, altura = ?, edad = ?, genero = ?, 
                           meta_diaria_agua = ?, meta_horas_sueno = ? 
                       WHERE id_usuario = ?`;

        const params = [
            usuario.nombre,
            usuario.email

        ];

        return await Database.executeQuery(query, params);
    }

    public async eliminarUsuario(id_usuario: number): Promise<any> {
        const query = `DELETE FROM USUARIO WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [id_usuario]);
    }


    public async cambiarCorreo(id_usuario: number, nuevoCorreo: string): Promise<any> {
        const query = `UPDATE USUARIO SET email = ? WHERE id_usuario = ?`;
        const params = [nuevoCorreo, id_usuario];

        return await Database.executeQuery(query, params);
    }
    // En UsuarioModel.ts

    public async cambiarContrasena(id_usuario: number, nuevaContrasena: string): Promise<any> {
        const query = `UPDATE USUARIO SET password = ? WHERE id_usuario = ?`;
        const params = [nuevaContrasena, id_usuario];

        return await Database.executeQuery(query, params);
    }

    public async obtenerUsuarios(): Promise<UsuarioInterface[]> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos 
                       FROM USUARIO`;
        return await Database.executeQuery(query);
    }

    public async actualizarMetas(
        id_usuario: number,
        meta_hidratacion?: number,
        meta_deporte?: number,
        meta_sueno?: number,
        meta_alimentacion?: number
    ): Promise<any> {
        const query = `CALL ActualizarMetasUsuario(?, ?, ?, ?, ?)`;
        const params = [id_usuario, meta_hidratacion, meta_deporte, meta_sueno, meta_alimentacion];
        return await Database.executeQuery(query, params);
    }

}

