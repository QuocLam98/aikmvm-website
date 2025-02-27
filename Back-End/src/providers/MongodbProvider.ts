import { connect } from "mongoose";

const connectDb = await connect('mongodb://localhost:27017');

export default connectDb