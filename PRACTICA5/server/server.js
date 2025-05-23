import express from 'express';
import cors from 'cors';
import rutas from './routes/routes.js'

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/autor', rutas);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Corriendo en http://localhost:${PORT}`)
})
