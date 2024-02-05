import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: String,
  email: String,
});

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);

export default UserModel;
