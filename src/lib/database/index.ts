import mongoose from "mongoose";
import { DB_CONNECT } from "../core/config";
import { Log } from "../core/utils/Log";

export function connectDatabase() {
    mongoose.connect(DB_CONNECT).then(() => {
        Log.d("Database connect successfully 🤖💥");
    })
}