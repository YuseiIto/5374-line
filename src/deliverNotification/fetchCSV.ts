import axios from 'axios';

export default async (): Promise<string> => {
  if (!process.env.AREA_DAYS_CSV_URL) {
    throw new Error('Environment variable AREA_DAYS_CSV_URL is not set.');
  }

  const url: string = process.env.AREA_DAYS_CSV_URL;

  const res = await axios.get(url);

  return res.data;
};
