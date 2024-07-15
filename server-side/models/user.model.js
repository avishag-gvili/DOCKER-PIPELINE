<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";

=======

import mongoose, { Schema } from "mongoose";

>>>>>>> mongoDB-team
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
<<<<<<< HEAD
  profileImage: { type: String },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }]

=======
  profileImage: { type: String,default:"profile.jpg" },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }]
>>>>>>> mongoDB-team
});

export default mongoose.model('Users', userSchema);
