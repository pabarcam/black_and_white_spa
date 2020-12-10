const yargs = require('yargs')
const child_process = require('child_process')

const key = '123'

const argv = yargs.command(
  'key',
  'Comando para entrar a la pagina',
  {
    name:{
      describe:'Argumento para entrar a la pagina',
      demand: true,
      alias: 'k'
    }
  },
  (args) => {
    if (args.key == key){
      child_process.exec('node index.js', (err, resp) => {
        err ? console.log(err) : console.log(resp)
      })
    } else {
      console.log('Credenciales incorrectas')
    }
}).help().argv