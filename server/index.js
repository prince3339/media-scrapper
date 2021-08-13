import './common/env';
import Server from './server';

export default new Server().listen(process.env.PORT);
