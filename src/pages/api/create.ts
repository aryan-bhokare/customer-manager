import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const collection = db.collection('your-collection-name');

  if (req.method === 'GET') {
    const customers = await collection.find().toArray();
    res.status(200).json(customers);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
