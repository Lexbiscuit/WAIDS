import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from 'bcrypt';

export async function GET(request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
  // const userRole = request.session.userRole; // Fetch the role from the session or token

  // if (userRole !== "Network Administrator" && restrictedEndpoint) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  await connectMongoDB();
  const data = await User.find();
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
  const { _id, password, ...details } = await request.json();
  let status = {};
  await connectMongoDB();
  // Check if the request is for creating a new user
  if (!_id) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...details, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User created successfully." });
  }

  // If the request is for updating an existing user
  // Check if newPassword exists in the request
  if (_id) {
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await User.findByIdAndUpdate(_id, { password: hashedPassword })
        .then(() => {
          status.message = "Update successful.";
        })
        .catch(() => (status.message = "Update unsuccessful."));
      const response = NextResponse.json(status);
      response.headers.append("Access-Control-Allow-Origin", "*");
      return response;
    }

    if (!password) {
      await User.findByIdAndUpdate(_id, details)
        .then(() => {
          status.message = "Update successful.";
        })
        .catch(() => (status.message = "Update unsuccessful."));
      const response = NextResponse.json(status);
      response.headers.append("Access-Control-Allow-Origin", "*");
      return response;
    }
  }
}

export async function DELETE(request) {
  await connectMongoDB();
  const { _id } = await request.json();
  let status = {};

  const user = await User.findById(_id);
  if (user.role === 'System Administrator') {
    // If the user is a System Administrator, do not delete and return a message
    return NextResponse.json({ message: "Cannot delete System Administrator account." });
  }

  await User.findByIdAndDelete(_id)
    .then(() => {
      status.message = "Delete successful.";
    })
    .catch(() => (status.message = "Delete unsuccessful."));

  const response = NextResponse.json(status);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}

export async function PUT(request) {
  const { _id, status } = await request.json();

  if (!_id || !status) {
    return new NextResponse(400, "User ID and status are required");
  }

  await connectMongoDB();
  const user = await User.findById(_id);
  if (user.role === 'System Administrator' && status === 'suspended') {
    // If the user is a System Administrator, do not suspend and return a message
    return NextResponse.json({ message: "Cannot suspend System Administrator account." });
  }
  await User.findByIdAndUpdate(_id, { status });
 
  return NextResponse.json({ message: "User status updated successfully." });
}