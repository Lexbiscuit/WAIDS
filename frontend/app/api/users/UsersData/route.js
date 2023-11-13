import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from 'bcrypt';

// Password validation function
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasSymbol;
}

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
  const { _id, status, newPassword } = await request.json();

  if (!_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  await connectMongoDB();

  // Handle password change
  if (newPassword) {
    if (!validatePassword(newPassword)) {
      return NextResponse.json({ error: "Password does not meet the policy requirements." }, { status: 400 });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.findByIdAndUpdate(_id, { password: hashedPassword });

    return NextResponse.json({ message: "Password updated successfully." });
  }

  // Handle status update
  if (status) {
    const user = await User.findById(_id);
    if (user.role === 'System Administrator' && status === 'suspended') {
      // If the user is a System Administrator, do not suspend and return a message
      return NextResponse.json({ message: "Cannot suspend System Administrator account." });
    }
    await User.findByIdAndUpdate(_id, { status });

    return NextResponse.json({ message: "User status updated successfully." });
  }

  return NextResponse.json({ error: "No action performed" }, { status: 400 });
}

