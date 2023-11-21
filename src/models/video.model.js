import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //url will be store
      required: [true, "video is required"],
    },
    thumbnail: {
      type: String, //url will be store
      required: [true, "thumbnail is required"],
    },
    title: {
      type: String, //url will be store
      required: [true, "title is required"],
    },
    description: {
      type: String, //url will be store
      required: [true, "description  should be under 200 words"],
    },
    duration: {
      type: Number, //url will be store
      required: true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)