import express, { Request, Response } from 'express'
import Multer from 'multer'

const app = express()
const port = 3004

app.use(express.json())

//set up storage engine with multer
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})

//Initialize multer with the storage configuration
const upload = Multer({ storage: storage })

app.get('/upload/health', (req: Request, res: Response) => {
  res.send('ok')
})

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No files were uploaded')
    return
  }
  res.status(201).send(` File upoaded successfully ${req.file?.filename}`)
  return
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
