module.exports = {
  async getUserData(connection, user) {
    const consulta = () => {
      return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where iduser = '${user.id}'`, (err, result) => {
          if (err) {
            return reject(err);
          }
          connection.query(`select * from score_per_server where userid = '${user.id}'`, (err, resultSPS) => {
            if (err) throw err
            result.push(resultSPS)
            connection.query(`select * from compras_locais where userid = '${user.id}'`, (err, resultCL) => {
              result.push(resultCL)
              
              connection.query(`select * from compras_globais where userid = '${user.id}'`, (err, resultCG) => {
                result.push(resultCG)
                return resolve(result);
              })
            })
          })
        })
      })
    }
    let res = '';
    await consulta().then(result => {
      res = result
    }).catch(err => {
      throw err;
    });
    return res
  },
}