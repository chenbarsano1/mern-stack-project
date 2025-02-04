// define how our workout documents should look
import mongoose from "mongoose";

const Schema = mongoose.Schema

// enforce this schema. {how the object looks}, {when the document was created}
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Workout', workoutSchema)