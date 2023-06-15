

//Utilizando Mysql
import { Sequelize } from 'sequelize';
import User from '../models/User';
import Travel from '../models/Travel';

const sequelize = new Sequelize('funny travel', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

User.initialize(sequelize);
Travel.initialize(sequelize);

// Sincronize os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida e modelos sincronizados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
  });

export { sequelize };
