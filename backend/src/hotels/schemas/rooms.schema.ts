import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({ required: true })
    public hotel: string;

    @Prop({ required: true })
    public title: string;

    @Prop()
    public description: string;

    @Prop()
    public images: string;

    @Prop({ required: true })
    public createdAt: Date;

    @Prop({ required: true })
    public updatedAt: Date;

    @Prop({ required: true })
    public isAnable: boolean;
 }

export const RoomSchema = SchemaFactory.createForClass(Room);
//                       обяз  уник умолч
// _id 	ObjectId 	      да 	  да 	
// hotel 	ObjectId 	    да  	нет 	
// description 	string 	нет 	нет 	
// images 	string[]      нет 	нет 	[]
// createdAt 	Date 	    да  	нет 	
// updatedAt 	Date 	    да 	  нет 	
// isEnabled 	boolean 	да  	нет 	true