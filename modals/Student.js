import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  _id: {
    type: String, // Roll Number
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  password: {
    type: String,
    required: true
  },
  documents: [{
    documentType: String,
    documentUrl: String,
    uploadedDate: Date
  }],
  degreeId: {
    type: String,
    ref: 'Degree',
    required: true
  },
  degreeCode: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
  },
  programId: {
    type: String,
    ref: 'Program',
    required: true
    // References the batch-specific course program
  },
  courseId: {
    type: String,
    ref: 'Course',
    required: true
    // Denormalized for quick access without populating programId
  },
  courseCode: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
  },
  entryTypeId: {
    type: String,
    ref: 'EntryType',
    required: true
  },
  entryTypeCode: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  exam: {
    type: String,
    trim: true
  },
  entranceRank: {
    type: Number
  },
  hallTicketNumber: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  fatherName: {
    type: String,
    trim: true,
    uppercase: true
  },
  motherName: {
    type: String,
    trim: true,
    uppercase: true
  },
  caste: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  subCategory: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true,
    default: 'Indian'
  },
  bloodGroup: {
    type: String,
    trim: true
  },
  religion: {
    type: String,
    trim: true
  },
  ugcAntiRaggingId: {
    type: String,
    trim: true
  },
  hasDisability: {
    type: Boolean,
    default: false
  },
  disabilityType: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  emails: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  // --- Address Information ---
  address: {
    current: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String
    },
    permanent: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  // --- Emergency Contact ---
  emergencyContact: {
    name: String,
    phoneNumber: String,
    relation: String
  },
  // --- Parent Details ---
  parentPhoneNumber: { // Legacy field, keeping for compatibility
    type: String,
    trim: true
  },
  parentDetails: {
    fatherOccupation: String,
    motherOccupation: String,
    fatherAadharNumber: String,
    motherAadharNumber: String,
    fatherPhone: String,
    motherPhone: String,
    annualIncome: Number
  },
  // --- Academic History (Previous Education) ---
  academicHistory: {
    tenth: {
      board: String,
      school: String,
      passingYear: Number,
      percentage: Number
    },
    twelfth: {
      board: String,
      college: String,
      passingYear: Number,
      percentage: Number
    },
    diplomaDegree: { // For lateral entry
      institution: String,
      university: String,
      passingYear: Number,
      percentage: Number
    }
  },
  hostelRequired: {
    type: Boolean,
    default: false
  },
  apaarId: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String,
    trim: true
  },
  aadharNumber: {
    type: String,
    required: true,
    trim: true
  },
  regulationId: {
    type: String,
    ref: 'AcademicRegulation',
    required: true
  },
  regulationCode: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
  },
  batchId: {
    type: String,
    ref: 'Batch',
    required: true
  },
  batchYear: {
    type: Number,
    required: true,
    min: 2000
  },
  joiningDate: {
    type: Date,
    required: true
  },
  currentYear: {
    type: Number,
    required: true,
    min: 1
  },
  currentSem: {
    type: Number,
    required: true,
    min: 1
  },
  registeredSubjects: {
    type: Map,
    of: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    }],
    default: {}
  },
  semesterData: [{
    sem: String, // "1-1", "1-2", "2-1", etc.
    registeredSubjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    }],
    attendanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendance'
    },
    resultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result'
    }
  }],
  isHonors: {
    type: Boolean,
    default: false
  },
  isMinors: {
    type: Boolean,
    default: false
  },
  isDetained: {
    type: Boolean,
    default: false
  },
  isCondonation: {
    type: Boolean,
    default: false
  },
  detentionHistory: [{
    sem: String,
    detainedDate: Date,
    reason: String,
    movedToBatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch'
    }
  }],
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  graduationDate: {
    type: Date
  },
  graduationStatus: {
    type: String,
    enum: ['studying', 'graduated', 'dropout'],
    default: 'studying'
  },
  onboardingStatus: {
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    profileCompleted: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
  },
  emailOtp: {
    code: { type: String, default: null },
    expiresAt: { type: Date, default: null }
  }
}, {
  timestamps: true
});

export default mongoose.model('Student', studentSchema);
