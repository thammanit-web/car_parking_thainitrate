import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXSb8ffiweiHMhXxGul_sMdurytF17x6TygZB8FA1OZTPVeOgOcewT4OTw-xzo5838Sg/exec'; 

export async function GET() {
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?type=parking`);
    const data = await res.json();
    const headers = data.data[0]; 
    const Parking = data.data.slice(1); 

    const formattedData = Parking.map((row: any) => {
      const booking: { [key: string]: any } = {};
      headers.forEach((header: string, index: number) => {
        booking[header] = row[index];
      });
      return booking;
    });
    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

