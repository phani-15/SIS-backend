import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        _id: {
            type: String, // e.g., "BTECH-05"
            required: true,
            unique: true,
        },
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        courseCode: {
            type: String,
            required: true,
            trim: true,
        },
        courseAbbreviation: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },
        degreeId: {
            type: String,
            ref: "Degree",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VicePrincipal",
            required: true,
        },
        regularCapacity: {
            type: Number,
            default: 66,
            min: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

// Composite unique index for courseCode and degreeId
courseSchema.index({ courseCode: 1, degreeId: 1 }, { unique: true });
courseSchema.index({ degreeId: 1 });
courseSchema.index({ isActive: 1 });

export default mongoose.model("Course", courseSchema);
