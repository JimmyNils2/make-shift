// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}));
