import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
    @Prop({ required: true })
    public title: string;

    @Prop()
    public description: string;

    @Prop({ required: true })
    public createdAt: Date;

    @Prop({ required: true })
    public updatedAt: Date;
 }

export const HotetlSchema = SchemaFactory.createForClass(Hotel);


