import dotenv from 'dotenv';
import path from 'path';
import Server from './express/Server';
import Avatar from './Modulo_Avatar/Avatar';
import Configuraciones from './Modulo_Configuraciones/Configuraciones';
import Estadistica from './Modulo_Estadistica/Estadistica';
import Usuario from './Modulo_InicioDeSesion/Usuario';
//import Cartas from './Modulo_Minijuegos/Cartas/Cartas';
//import Frutas from './Modulo_Minijuegos/Frutas/Frutas';
import Informacion from './Modulo_Informacion/Informacion';
import Anadir from './Modulo_Habito/Anadir_Habito/Anadir';
import Actividad_Fisica from './Modulo_Habito/Habito_Actividad_Fisica/Actividad_Fisica';
import Habito_Alimentacion from './Modulo_Habito/Habito_Alimentacion/Habito_Alimentacion';
import Habito_Hidratacion from './Modulo_Habito/Habito_Hidratacion/Habito_Hidratacion';
import Habito_Sueno from './Modulo_Habito/Habito_Sueno/Habito_Sueno';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../env/.env') });

// Crear instancias de vistas
const avatarView = Avatar.createView();
const configuracionesView = Configuraciones.createView();
const estadisticaView = Estadistica.createView();
const usuarioView = Usuario.createView();
//const cartasView = Cartas.createView();
//const frutasView = Frutas.createView();
const informacionView = Informacion.createView();
const anadirHabitoView = Anadir.createView();
const actividadFisicaView = Actividad_Fisica.createView();
const alimentacionView = Habito_Alimentacion.createView();
const hidratacionView = Habito_Hidratacion.createView();
const suenoView = Habito_Sueno.createView();

// Crear servidor
const server = new Server(
  estadisticaView,
  avatarView,
  configuracionesView,
  usuarioView,
  //cartasView,
  //frutasView,
  informacionView,
  anadirHabitoView,
  actividadFisicaView,
  alimentacionView,
  suenoView,
  hidratacionView
);

// Iniciar servidor
server.start();
