export class Controller {
  spec(req, res) {
    res.sendFile('api.v1.yml', { root: './server/common' });
  }
}
export default new Controller();
