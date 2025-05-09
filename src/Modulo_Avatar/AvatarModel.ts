// BALANCELIFE/backend/src/Modulo_Avatar/AvatarModel.ts
import Database from '../express/Database';
import Avatar from '../Types/Avatar';

export default class AvatarModel {
    public async crearAvatar(avatar: Avatar): Promise<any> {
        const query = `INSERT INTO AVATAR (id_usuario, color_piel, genero, color_ojos, color_cabello) 
                       VALUES (?, ?, ?, ?, ?)`;
        const params = [
            avatar.color_piel,
            avatar.genero,
            avatar.color_ojos,
            avatar.color_cabello
        ];
        return await Database.executeQuery(query, params);
    }

    public async obtenerAvatar(id_usuario: number): Promise<Avatar | null> {
        const query = `SELECT * FROM AVATAR WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return Array.isArray(result) && result.length > 0 ? result[0] : null;
    }

    public async actualizarAvatar(avatar: Avatar): Promise<any> {
        const query = `UPDATE AVATAR 
                       SET color_piel = ?, genero = ?, color_ojos = ?, color_cabello = ? 
                       WHERE id_usuario = ?`;
        const params = [
            avatar.color_piel,
            avatar.genero,
            avatar.color_ojos,
            avatar.color_cabello
        ];
        return await Database.executeQuery(query, params);
    }

    public async existeAvatar(id_usuario: number): Promise<boolean> {
        const query = `SELECT COUNT(*) as count FROM AVATAR WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return result[0].count > 0;
    }
}