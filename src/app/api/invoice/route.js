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

export async function GET(req, res){
    try{
        await dbConfig();
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        return NextResponse.json(invoices, {status: 200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message: 'Failed to fetch invoices'}, {status: 500});
    }
}