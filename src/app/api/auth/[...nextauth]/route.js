import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        // Implement your own logic to verify the credentials
        await connectMongoDB();

        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordValid) {
              return { id: user._id, email: user.email, name: user.username };
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("No user found with the provided email");
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }


      },
    }),   
   
  ],
  pages: {
    error: "/dashboard/login", // Redirect to the login page on error
  },
     
});

export { handler as GET, handler as POST }; 