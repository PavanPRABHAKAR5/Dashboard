import dbConfig from "@/utils/dbConfig";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";


export async function POST(req, res){
    try{
        const body = await req.json();
        console.log("Request Body:", body); 
        await dbConfig();

        await Invoice.create(body);


        return NextResponse.json({message: 'Invoice created successfully'}, {status: 200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message: 'Failed to create invoice'}, {status: 500});
    }
}

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