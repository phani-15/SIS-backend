import mongoose from 'mongoose';

const excessSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  department: {
    type: String,
    trim: true
  },
  profiles: {
    Linkedin: {
      type: String,
      trim: true
    },
    Github: {
      type: String,
      trim: true
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  certifications: [{
    name: {
      type: String,
      trim: true
    },
    issuer: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    }
  }],
  projects: [{
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    year: {
      type: Number
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Excess', excessSchema);
