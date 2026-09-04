import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    nombre: 'Laptop Pro 15 pulgadas',
    categoria: 'Computación',
    precio: 1299.99,
    stock: 15,
  },
  {
    nombre: 'Mouse Inalámbrico Ergonómico',
    categoria: 'Accesorios',
    precio: 29.5,
    stock: 45,
  },
  {
    nombre: 'Teclado Mecánico RGB',
    categoria: 'Accesorios',
    precio: 85.0,
    stock: 22,
  },
  {
    nombre: 'Monitor Gamer 27" QHD 144Hz',
    categoria: 'Monitores',
    precio: 349.0,
    stock: 8,
  },
  {
    nombre: 'Auriculares Bluetooth con Cancelación de Ruido',
    categoria: 'Audio',
    precio: 149.99,
    stock: 18,
  },
];

async function seedData() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ Error: Variable MONGO_URI no encontrada en .env');
    process.exit(1);
  }

  try {
    console.log('⏳ Conectando a MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('🧹 Limpiando colección de productos antigua...');
    await Product.deleteMany({});

    console.log('📦 Insertando productos de prueba...');
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ ¡Éxito! Se insertaron ${inserted.length} productos en la base de datos.`);

    await mongoose.disconnect();
    console.log('🔌 Conexión cerrada.');
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Error durante el sembrado de datos: ${error.message}`);
    process.exit(1);
  }
}

seedData();
