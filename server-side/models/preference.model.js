import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
    emailFrequency:{type:String,default:'never',enum:['never','daily', 'weekly','monthly','yearly']},
    sendNotificationTime:{type:Number,default:30,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'},
    timeZone: { type: String,enum:['America/New_York','Europe/London','Asia/Tokyo','Asia/Jerusalem','Europe/Paris','Europe/Madrid'], default: 'Asia/Jerusalem' },
    language: { type: String, enum: ['en', 'fr', 'es', 'he', 'ja'], default: 'en' }
})
export default mongoose.model('Preference',PreferenceSchema);
