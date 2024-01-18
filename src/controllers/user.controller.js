import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   // get user details from frontend
  //   // validation
  //   // check user exist or not: email,username
  //   //  check for images,check for avatar
  //   // upload them to cloudinary, avatar
  //   //create user object - create entry in db
  //   // remove password and refresh token field from response
  //   //  check for user creation
  //   // return res
  // });

  const { fullName, email, username, password } = req.body;
  console.log("email", email);
  if ([fullName, email, username, password].some(() => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }
  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User Already Exist!");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!");
  }
  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required!");
  }

  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.lower,
  });
});

export { registerUser };
