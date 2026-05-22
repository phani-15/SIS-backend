import mongoose from 'mongoose';

/**
 * Program Model
 * Maps courses to specific batches - defines which courses are available for which batch
 * Created automatically during batch creation when user selects courses
 * Solves the problem of batch-specific course availability (e.g., MTECH courses changing per batch)
 */
const programSchema = new mongoose.Schema({
  _id: {
    type: String, // Format: "BATCHCODE-COURSECODE" e.g., "A22-CSE", "M23-AI"
    required: true
  },
  programCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
    // Format: degreeCode + courseCode (e.g., "A05")
    // NOT unique - same course can be in multiple batches
  },
  programName: {
    type: String,
    required: true,
    trim: true
    // e.g., "B.Tech CSE 2022 Batch", "M.Tech AI 2023 Batch"
  },
  
  // CORE REFERENCES - Defines Batch-Course-Regulation relationship
  batchId: {
    type: String,
    ref: 'Batch',
    required: true
  },
  courseId: {
    type: String,
    ref: 'Course',
    required: true
  },
  regulationId: {
    type: String,
    ref: 'AcademicRegulation',
    required: true
    // Inherited from Batch during creation
  },
  degreeId: {
    type: String,
    ref: 'Degree',
    required: true
    // For quick filtering without populating batch
  },
  
  // CAPACITY
  regularCapacity: {
    type: Number,
    default: 66,
    min: 0
  },

  // METADATA
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VicePrincipal',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
programSchema.index({ programCode: 1 });
programSchema.index({ batchId: 1, courseId: 1 }, { unique: true }); // Unique: One course per batch only once
programSchema.index({ batchId: 1 }); // Query: "What courses are in this batch?"
programSchema.index({ courseId: 1 }); // Query: "Which batches have this course?"
programSchema.index({ regulationId: 1, courseId: 1 }); // Query: "Which courses are in this regulation?"
programSchema.index({ degreeId: 1 });
programSchema.index({ isActive: 1 });
programSchema.index({ createdBy: 1 });

// Static method: Get all courses for a specific batch
programSchema.statics.getCoursesForBatch = async function(batchId) {
  return this.find({ batchId, isActive: true })
    .populate('courseId')
    .populate('regulationId')
    .sort({ programCode: 1 });
};

// Static method: Get all batches offering a specific course
programSchema.statics.getBatchesForCourse = async function(courseId) {
  return this.find({ courseId, isActive: true })
    .populate('batchId')
    .sort({ 'batchId.startYear': -1 });
};

// Static method: Check if a course is available for a batch
programSchema.statics.isCourseAvailableForBatch = async function(batchId, courseId) {
  const program = await this.findOne({ batchId, courseId, isActive: true });
  return !!program;
};

export default mongoose.model('Program', programSchema);
