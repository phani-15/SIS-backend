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
  skills:{type:Array,default:[]},
  certifications:{
    type: [{
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
    },
  }],default:[]},
  projects:{ 
    type:[{
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
  }],default:[]}
}, {
  timestamps: true
});

export default mongoose.model('Excess', excessSchema);
