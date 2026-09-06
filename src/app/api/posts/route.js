import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export const GET = async (request) => {
  
  
  try {
    await connectDB();
    const posts = await Post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const { title, description, image, content, username } = body;

  if (!title || !description || !image || !content || !username) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  try {
    await connectDB();
    const newPost = await Post.create({ title, description, image, content, username });
    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
 