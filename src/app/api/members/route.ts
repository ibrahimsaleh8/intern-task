import { MemberDataType, SportDataType } from "@/lib/types";
import {
  AddMemberDataType,
  addMemberSchema,
} from "@/validation/addMemberSchema";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "node:fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "membersData.json");

export async function GET() {
  try {
    const allMembers: SportDataType[] = JSON.parse(
      readFileSync(filePath, "utf-8")
    );
    return NextResponse.json(allMembers);
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
    const memberData = (await req.json()) as AddMemberDataType;

    const validation = addMemberSchema.safeParse(memberData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const fileContent = readFileSync(filePath, "utf-8");

    const allMembers: MemberDataType[] = JSON.parse(fileContent);

    const isExistEmail = allMembers.find(
      (member) => member.email == memberData.email
    );
    if (isExistEmail) {
      return NextResponse.json(
        { message: "This email is already exist" },
        { status: 400 }
      );
    }

    const newMember: MemberDataType = {
      id: allMembers.length + 1,
      email: memberData.email,
      name: memberData.name,
    };

    writeFileSync(
      filePath,
      JSON.stringify([...allMembers, newMember]),
      "utf-8"
    );

    return NextResponse.json(
      { message: "Member Added Success" },
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
