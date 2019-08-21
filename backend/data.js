import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
export default mongoose.model("Data", DataSchema);
