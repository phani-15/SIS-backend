import mongoose from "mongoose";

/**
 * Academic Regulation Model
 * Stores regulation-wide credit requirements and rules
 * Example: BTECH-R23, MTECH-R22, etc.
 */
const academicRegulationSchema = new mongoose.Schema(
    {
        _id: {
            type: String, // "BTECH-R23", "MTECH-R22", etc.
            required: true,
            uppercase: true,
            trim: true,
        },
        regulationCode: {
            type: String,
            required: true,
            trim: true,
        },
        degreeId: {
            type: String,
            ref: "Degree",
            required: true,
        },
        level: {
            type: String,
            enum: ["UG", "PG"],
            required: true,
        },

        // REGULATION-WIDE CREDIT STRUCTURE
        // Total credits required for degree completion
        totalCredits: {
            type: Number,
            required: true,
            min: 0,
        },
        // Minimum credits required for qualification
        minCreditsForQualification: {
            type: Number,
            min: 0,
            default: 0,
        },
        // Category-wise credit requirements (optional guidance)
        categoryCredits: [
            {
                categoryCode: {
                    type: String,
                    ref: "SubjectCategory",
                    uppercase: true,
                },
                requiredCredits: {
                    type: Number,
                    min: 0,
                    default: 0,
                },
            },
        ],

        // TYPE OF SUBJECTS ALLOWED IN THIS REGULATION
        // Defines which subject types can be used and their evaluation rules
        typeOfSubjects: [
            {
                type: String,
                ref: "TypeOfSubject",
                required: true,
            },
        ],

        // ATTENDANCE GUIDELINES
        attendanceGuidelines: {
            minSubAttendance: {
                type: Number,
                default: 40,
                min: 0,
                max: 100,
                // Minimum attendance per subject to be eligible for exam
            },
            minAttendanceToPass: {
                type: Number,
                default: 75,
                min: 0,
                max: 100,
                // Minimum attendance to qualify without condonation
            },
            condonationRangeStart: {
                type: Number,
                default: 65,
                min: 0,
                max: 100,
                // Start of condonation range
            },
            condonationRangeEnd: {
                type: Number,
                default: 74,
                min: 0,
                max: 100,
                // End of condonation range
            },
            detainedBelow: {
                type: Number,
                default: 65,
                min: 0,
                max: 100,
                // Attendance below this = detained
            },
            attendanceAction: {
                type: String,
                enum: ["nothing", "detain", "reregister"],
                default: "detain",
                // What to do when a regular student fails single-subject attendance:
                // 'nothing' = ignore, 'detain' = detain entire semester, 'reregister' = re-register only failed subject(s)
            },
        },
        condonationFees: {
            type: Number,
            default: 0,
            min: 0,
            // Fees for condonation (editable anytime)
        },

        // ACTION CONFIGURATION FOR RE-REGISTRATION SYSTEM
        internalMarksAction: {
            type: String,
            enum: ["nothing", "detain", "reregister"],
            default: "nothing",
            // What to do when a student fails internal marks criteria:
            // 'nothing' = ignore, 'detain' = detain semester, 'reregister' = re-register failed subject(s)
        },
        reRegAttendanceAction: {
            type: String,
            enum: ["nothing", "detain_rereg", "reregister_subject"],
            default: "reregister_subject",
            // What happens when a re-registered subject's attendance is not met:
            // 'nothing' = ignore, 'detain_rereg' = all re-reg subjects re-registered again,
            // 'reregister_subject' = only specific failed subject(s) re-registered again
        },

        // GRADING SYSTEM
        gradingSystem: [
            {
                grade: { type: String, required: true, trim: true },
                minMarks: { type: Number, required: true, min: 0, max: 100 },
                maxMarks: { type: Number, required: true, min: 0, max: 100 },
                gradePoint: { type: Number, required: true, min: 0 },
            },
        ],

        // HONORS & MINORS REQUIREMENTS
        honorsCredits: {
            type: Number,
            default: 15,
            // Additional credits required for Honors degree
        },
        minorCredits: {
            type: Number,
            default: 12,
            // Additional credits required for Minor degree
        },

        // NPTEL CONFIGURATION
        allowNptelOptIn: {
            type: Boolean,
            default: false,
            // If true, students can opt for NPTEL instead of electives
        },
        regularNptelCredits: {
            type: Number,
            default: 0,
            min: 0,
            // Max NPTEL credits a regular student can accumulate
        },
        honorsMinorsNptelCredits: {
            type: Number,
            default: 0,
            min: 0,
            // Max NPTEL credits for honors/minors students
        },
        nptelTypeOfSubjectId: {
            type: String,
            ref: "TypeOfSubject",
            default: null,
            // Which TypeOfSubject represents NPTEL for this regulation
        },

        // METADATA
        effectiveFrom: {
            type: Date,
            required: true,
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

// Index for fast lookups
academicRegulationSchema.index({ degreeId: 1, effectiveFrom: -1 });

/**
 * VIRTUALS
 * Useful for frontend logic without storing redundant data
 */
academicRegulationSchema.virtual("isCondonationAllowed").get(function () {
    return (
        this.attendanceGuidelines.condonationRangeEnd >
        this.attendanceGuidelines.condonationRangeStart
    );
});

export default mongoose.model("AcademicRegulation", academicRegulationSchema);
