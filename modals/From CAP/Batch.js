import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        batchTitle: {
            type: String,
            required: true,
            trim: true,
        },
        batchCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        regulationId: {
            type: String,
            ref: "AcademicRegulation",
            required: true,
        },
        degreeId: {
            type: String,
            ref: "Degree",
            required: true,
        },
        startYear: {
            type: Number,
            required: true,
            min: 2000,
        },
        endYear: {
            type: Number,
            required: true,
            min: 2000,
        },
        duration: {
            type: Number,
            required: true,
            min: 1,
        },
        isReadmitted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        entryTypes: [
            {
                type: String,
                ref: "EntryType",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VicePrincipal",
        },
    },
    {
        timestamps: true,
    },
);

// Indexes for better query performance
batchSchema.index({ batchCode: 1 });
batchSchema.index({ startYear: 1 });
batchSchema.index({ degreeId: 1 });
batchSchema.index({ regulationId: 1 });
batchSchema.index({ isActive: 1 });
batchSchema.index({ startYear: 1, degreeId: 1 }, { unique: true });

// Virtual populate for programs (batch-course mappings)
batchSchema.virtual("programs", {
    ref: "Program",
    localField: "_id",
    foreignField: "batchId",
});

// Virtual for program count
batchSchema.virtual("programCount", {
    ref: "Program",
    localField: "_id",
    foreignField: "batchId",
    count: true,
});

// Enable virtuals in JSON output
batchSchema.set("toJSON", { virtuals: true });
batchSchema.set("toObject", { virtuals: true });

export default mongoose.model("Batch", batchSchema);

// Change course to degree

// Batch (degreecode+startyear)  A22
