import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

// export type UserInterface = InferSchemaType<typeof UserSchema>;

export interface UserInterface {
  _id: any;
  name: string;
  email: string;
  password: string;
}

// export class User {
//   constructor(
//     public id: string,
//     public name: string,
//     public email: string,
//     public password: string,
//   ) {}
// }
