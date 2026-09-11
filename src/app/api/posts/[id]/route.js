import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export const DELETE = async (request, { params }) => {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await connectDB();

    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (post.username !== session.user.name) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await post.deleteOne();
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
