import { SportDataType } from "@/lib/types";
import { AddSportDataType, addSportSchema } from "@/validation/addSportSchema";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "node:fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "sportsData.json");

export async function GET() {
  try {
    const allSports: SportDataType[] = JSON.parse(
      readFileSync(filePath, "utf-8")
    );
    return NextResponse.json(allSports);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const sportsData = (await req.json()) as AddSportDataType;

    const validation = addSportSchema.safeParse(sportsData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const fileContent = readFileSync(filePath, "utf-8");

    const allSports: SportDataType[] = JSON.parse(fileContent);

    const newSport: SportDataType = {
      id: allSports.length + 1,
      description: sportsData.description,
      title: sportsData.title,
    };

    writeFileSync(filePath, JSON.stringify([...allSports, newSport]), "utf-8");

    return NextResponse.json(
      { message: "Sport Added Success" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
