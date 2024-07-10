import mongoose from 'mongoose';

const preferenecSchema= new mongoose.Schema({
    EmailFrequency:{type:String,default:'never',enum:['never', 'weekly','monthly','daily','yearly']},
    sendNotificationTime:{type:Number,require:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'}
})
export const Preferenec= mongoose.model('preferenecSchema',preferenecSchema)