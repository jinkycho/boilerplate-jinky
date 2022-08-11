// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: string;
};

export default async function writeSheet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as Data;

  try {
    //prepare auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:C1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.name, body.phone_number, body.email]],
      },
    });

    console.log("res", res);
    // return res.status(200).json({ data: res.data });
  } catch (e: any) {
    console.log("e", e);
    return res.status(500).send({ message: "에러 발생" });
  }
}
