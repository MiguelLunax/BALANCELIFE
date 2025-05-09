// BALANCELIFE/backend/src/express/Server.ts
import cors from 'cors';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../.env/Database.env') });

// Importar vistas
import EstadisticaView from '../Modulo_Estadistica/EstadisticaView';
import AvatarView from '../Modulo_Avatar/AvatarView';
import ConfiguracionesView from '../Modulo_Configuraciones/ConfiguracionesView';
import UsuarioView from '../Modulo_InicioDeSesion/UsuarioView';
// import CartasView from '../Modulo_Minijuegos/Cartas/CartasView';
// import FrutasView from '../Modulo_Minijuegos/Frutas/FrutasView';
import InformacionView from '../Modulo_Informacion/InformacionView';
import Anadir_HabitoView from '../Modulo_Habito/Anadir_Habito/Anadir_HabitoView';
import Habito_Actividad_FisicaView from '../Modulo_Habito/Habito_Actividad_Fisica/Habito_Actividad_FisicaView';
import Habito_AlimentacionView from '../Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionView';
import Habito_SuenoView from '../Modulo_Habito/Habito_Sueno/Habito_SuenoView';
import Habito_HidratacionView from '../Modulo_Habito/Habito_Hidratacion/Habito_HidratacionView';

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly estadisticaView: EstadisticaView,
    private readonly avatarView: AvatarView,
    private readonly configuracionesView: ConfiguracionesView,
    private readonly usuarioView: UsuarioView,
    // private readonly cartasView: CartasView,
    // private readonly frutasView: FrutasView,
    private readonly informacionView: InformacionView,
    private readonly anadirHabitoView: Anadir_HabitoView,
    private readonly habitoActividadFisicaView: Habito_Actividad_FisicaView,
    private readonly habitoAlimentacionView: Habito_AlimentacionView,
    private readonly habitoSuenoView: Habito_SuenoView,
    private readonly habitoHidratacionView: Habito_HidratacionView
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  private config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  private routes = (): void => {
    this.app.use('/api/ModuloAvatar', this.avatarView.router);
    this.app.use('/api/ModuloConfiguraciones', this.configuracionesView.router);
    this.app.use('/api/ModuloEstadisticas', this.estadisticaView.router);
    this.app.use('/api/ModuloUsuario', this.usuarioView.router);
    // this.app.use('/api/ModuloCartas', this.cartasView.router);
    // this.app.use('/api/ModuloFrutas', this.frutasView.router);
    this.app.use('/api/ModuloInformacion', this.informacionView.router);
    this.app.use('/api/ModuloAnadirHabitos', this.anadirHabitoView.router);
    this.app.use('/api/ModuloHabitoActividadFisica', this.habitoActividadFisicaView.router);
    this.app.use('/api/ModuloHabitoAlimentacion', this.habitoAlimentacionView.router);
    this.app.use('/api/ModuloHabitoSueno', this.habitoSuenoView.router);
    this.app.use('/api/ModuloHabitoHidratacion', this.habitoHidratacionView.router);
  };

  public start = (): void => {
    const PORT = Number(process.env["PORT"] || 3000);
    const HOST = process.env["HOST"] || "localhost";
  
    this.app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
    });
  };
}
