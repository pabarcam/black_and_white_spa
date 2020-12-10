const fs = require('fs')
const http = require('http')
const url = require('url')
const jimp = require('jimp')

http
.createServer((req,res)=>{

  if(req.url == '/'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('index.html', 'utf8', (err, file)=>{
      res.end(file)
    })
  }else if(req.url == '/style.css'){
    res.writeHead(200, {'Content-Type': 'text/css'})
    fs.readFile('style.css',(err,file)=>{
      res.end(file)
    })
  }else if(req.url =='/submit'){
    const params = url.parse(req.url, true).query
    jimp.read(params.image, (err, pic) => {
      if(err) throw err
      pic.resize(350, jimp.AUTO)
        .quality(60)
        .grayscale()
        .writeAsync('new_img.jpg')
        .then(() => {
          fs.readFile('new_img.jpg', (err, img) => {
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.removeHeader(img)
          })
        })
    })
  }
  }).listen(3000, ()=>{
  console.log('Conectado al 3000')
})
