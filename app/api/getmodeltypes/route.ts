import { NextRequest,NextResponse } from "next/server";
import { getAvailableModelsTypes } from "@/helpers/aiModel/aiModel.helper"; 
export async function GET(request: NextRequest) {
    return NextResponse.json({ modelTypes: getAvailableModelsTypes() });
}