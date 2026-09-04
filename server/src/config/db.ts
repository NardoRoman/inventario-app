import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ ERROR: La variable MONGO_URI no está definida en el archivo .env');
    console.error('👉 Por favor copia server/.env.example a server/.env y añade tu cadena de conexión de MongoDB Atlas.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Atlas conectado exitosamente: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ Error al conectar con MongoDB Atlas: ${error.message}`);
    console.error('💡 Pista común: Verifica que tu IP actual tenga acceso en MongoDB Atlas (Network Access -> 0.0.0.0/0).');
    process.exit(1);
  }
}
