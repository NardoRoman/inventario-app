import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { productRouter } from './routes/productRoutes.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint de prueba de salud
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rutas principales
app.use('/api/products', productRouter);

// Manejo de ruta no encontrada
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Ruta de API no encontrada' });
});

// Iniciar servidor tras conectar a MongoDB
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
    console.log(`📡 Endpoints disponibles en http://localhost:${PORT}/api/products`);
  });
}

startServer();
