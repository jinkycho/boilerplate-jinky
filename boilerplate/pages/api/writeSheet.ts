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
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
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

    sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: "A1:C1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.이름, body.번호, body.이메일]],
      },
    }).then(() => res.status(200).json({ data: '입력 성공 :)' }));

  } catch (e: any) {
    console.log("e", e);
    return res.status(e.code).send({ message: "에러 발생 :(" });
  }
}
