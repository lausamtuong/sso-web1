import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongoClient';
import { MongoClient } from 'mongodb';

type ResponseData = {
  status: number;
  message: string;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const client = (await clientPromise) as MongoClient;
    const db = client.db('sso-saml');

    switch (req.method) {
      case 'GET':
        console.log(req.query.email);
        const result = await db
          .collection('user')
          .findOne({ email: req.query.email });
        res.status(200).json({ status: 200, message: 'Success', result });
        break;
      default:
        res.status(405).json({ status: 405, message: 'Method not allowed' });
        break;
    }
  } catch (err) {
    console.log(err);
  }
}
