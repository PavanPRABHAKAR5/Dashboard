import dbConfig from "@/utils/dbConfig";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";



const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
    try {
        await dbConfig();
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        return NextResponse.json(invoices, { headers, status: 200 });
    } catch (err) {
        console.error("Full error details:", err);
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { headers, status: 500 });
    }
}