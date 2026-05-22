import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema(
    {
        _id: {
            type: String, // Normalized Abbreviation e.g. "BTECH"
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
        },
        degreeName: {
            type: String, // e.g. "Bachelor of Technology"
            required: true,
            trim: true,
        },
        aliases: [
            {
                // "B.Tech", "btech" (For CSV mapping)
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        degreeCode: {
            type: String, // e.g. "A" or "01"
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        level: {
            type: String, // e.g. "UG" or "PG"
            required: true,
            uppercase: true,
            trim: true,
        },
        duration: {
            type: Number, // e.g. 4
            required: true,
            min: 1,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VicePrincipal",
            // required: true,
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

// Indexes for better query performance
degreeSchema.index({ degreeCode: 1 });
degreeSchema.index({ isActive: 1 });
degreeSchema.index({ createdBy: 1 });

export default mongoose.model("Degree", degreeSchema);