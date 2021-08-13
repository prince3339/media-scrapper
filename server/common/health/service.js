import dns from 'dns';
import sequelizeModel from 'server/models/index';

const { sequelize } = sequelizeModel;

class HealthService {
  async checkHealth() {
    const resData = {
      services: []
    };
    try {
      const [response] = await sequelize.query('SELECT 1 AS one');
      if (response[0].one !== 1) {
        resData.services.push({
          name: 'Database',
          status: 'Down'
        });
      }
      return resData;
    } catch (err) {
      return err;
    }
  }
}

export default new HealthService();
