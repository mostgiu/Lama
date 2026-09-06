import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return Response.json({ 
        message: existingUser.email === email ? "Email already registered" : "Username already taken" 
      }, { status: 400 });
    }

    // Create new user (password will be hashed automatically by the pre-save hook)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Send a success response (don't send password back)
    return Response.json({ 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    }, { status: 201 });
  } catch (error) {
    console.error("An error occurred during registration:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
