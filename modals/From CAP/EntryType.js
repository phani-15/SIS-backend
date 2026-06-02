import mongoose from "mongoose";

const entryTypeSchema = new mongoose.Schema(
    {
        _id: {
            type: String, // Normalized name e.g. "REGULAR", "LATERAL"
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
        },
        entryTypeName: {
            type: String, // e.g. "Regular Entry", "Lateral Entry"
            required: true,
            trim: true,
        },
        entryTypeCode: {
            type: Number, // e.g. 1, 2, 3, 4
            required: true,
            unique: true,
            min: 1,
            max: 99,
        },
        description: {
            type: String, // e.g. "Students admitted through EAMCET/JEE"
            trim: true,
        },
        applicableToLevels: [
            {
                type: String, // ["UG", "PG"] - Can restrict by education level
                enum: ["UG", "PG"],
                uppercase: true,
            },
        ],
        eligibilityCriteria: {
            type: String, // e.g. "Completed 12th standard" or "Diploma holders"
            trim: true,
        },
        startingYear: {
            type: Number, // For lateral entry, they start from year 2
            default: 1,
            min: 1,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        sortOrder: {
            type: Number, // For UI display ordering
            default: 0,
        },
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
entryTypeSchema.index({ entryTypeCode: 1 });
entryTypeSchema.index({ isActive: 1 });
entryTypeSchema.index({ sortOrder: 1 });
entryTypeSchema.index({ applicableToLevels: 1 });

export default mongoose.model("EntryType", entryTypeSchema);
