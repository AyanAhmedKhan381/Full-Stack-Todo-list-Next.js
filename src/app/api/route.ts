import Todo from "@/Components/Todo";
import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";



const LoadDB = async()=> {
    await ConnectDB()
}

LoadDB();

                    //   Get Api Request

export async function GET(request:any) {

    const todos = await TodoModel.find({})
    return NextResponse.json({todos:todos})
}



            //   POST Api Request
export async function POST(request:any) {

    const {title, description} = await request.json()

    await TodoModel.create({
        title,
        description,
    })

    return NextResponse.json({msg: 'Todo Created'})
}




export async function DELETE(request:any) {

    const mongoid = await request.nextUrl.searchParams.get("mongoId")

    await TodoModel.findByIdAndDelete(mongoid)

    return NextResponse.json({msg: 'Todo Deleted'})
}



export async function PUT(request:any) {

    const mongoid = await request.nextUrl.searchParams.get("mongoId")

    await TodoModel.findByIdAndUpdate(mongoid,{
        $set:{
            isCompleted: true
        }
    })

    return NextResponse.json({msg: 'Todo Completed'})
}