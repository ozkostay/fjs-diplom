import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './schemas/Message.schema';
import { SupportRequest, SupportRequestSchema } from './schemas/SupportRequest.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Message.name, schema: MessageSchema},
      {name: SupportRequest.name, schema: SupportRequestSchema},
    ])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
