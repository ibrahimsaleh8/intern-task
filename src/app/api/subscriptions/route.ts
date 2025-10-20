import { SubscriptionsDataType } from "@/lib/types";
import {
  AddSubscriptionrDataType,
  addSubscriptionSchema,
} from "@/validation/addSubscriptionSchema";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "node:fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "subscriptionsData.json");

export async function GET() {
  try {
    const allSubscriptions: SubscriptionsDataType[] = JSON.parse(
      readFileSync(filePath, "utf-8")
    );
    return NextResponse.json(allSubscriptions);
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
    const SubscriptionData = (await req.json()) as AddSubscriptionrDataType;

    const validation = addSubscriptionSchema.safeParse(SubscriptionData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const fileContent = readFileSync(filePath, "utf-8");

    const allSubscriptions: SubscriptionsDataType[] = JSON.parse(fileContent);

    const isExistMemberIndex = allSubscriptions.findIndex(
      (member) => member.email == SubscriptionData.email
    );
    if (isExistMemberIndex != -1) {
      if (
        allSubscriptions[isExistMemberIndex].sport.includes(
          SubscriptionData.sport
        )
      ) {
        return NextResponse.json(
          { message: "Sport is already subsribed" },
          { status: 400 }
        );
      }
      allSubscriptions[isExistMemberIndex] = {
        id: allSubscriptions[isExistMemberIndex].id,
        email: allSubscriptions[isExistMemberIndex].email,
        sport: [
          ...allSubscriptions[isExistMemberIndex].sport,
          SubscriptionData.sport,
        ],
      };
      writeFileSync(filePath, JSON.stringify(allSubscriptions), "utf-8");
    } else {
      const newSub: SubscriptionsDataType = {
        id: allSubscriptions.length + 1,
        email: SubscriptionData.email,
        sport: [SubscriptionData.sport],
      };
      writeFileSync(
        filePath,
        JSON.stringify([...allSubscriptions, newSub]),
        "utf-8"
      );
    }

    return NextResponse.json(
      { message: "Subscription Added Success" },
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
