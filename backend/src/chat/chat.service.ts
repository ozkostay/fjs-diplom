import { Injectable, Post } from '@nestjs/common';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schemas/SupportRequest.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/Message.schema';
import { SendMessageDto } from './interfaces/SendMessageDto';
import { ParamIdDto } from './interfaces/ParamIdDto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
  ) {}

  @Post()
  public async createMessage(body: SendMessageDto): Promise<any> {
    console.log('CHAT SERVISE createMessage body', body);
    const { author, text } = body;
    const newMessage = {
      author: author,
      sentAt: new Date(),
      text: text,
      readAt: null,
    };
    const returnMessage = await this.MessageModel.create(newMessage);
    console.log('return Message', returnMessage);
    return returnMessage;
  }

  @Post()
  public async addMessage(body: SendMessageDto, id: string): Promise<any> {
    
    console.log('CHAT SERVISE addMessage body', body, id);
    // const { author, text } = body;
    // ищем чат
    const currentChat = await this.SupportRequestModel.findById(id);
    // добавляем сообщение
    const newMessage = await this.createMessage(body);

    console.log('ISARRAY ',Array.isArray(currentChat.messages));
    // console.log('currentChat', currentChat.messages[0]);
    console.log('newMessage', newMessage);
    console.log('currentChat2', currentChat);
    currentChat.messages.push(newMessage);
    // const { author, text } = body;
    // const newMessage = {
    //   author: author,
    //   sentAt: new Date(),
    //   text: text,
    //   readAt: null,
    // };
    // const returnMessage = await this.MessageModel.create(newMessage);
    // console.log('return Message', returnMessage);
    return currentChat;
  }

  @Post()
  public async createChat(body: any): Promise<any> {
    console.log('CHAT SERVISE createChat body', body);
    const newMessage = await this.createMessage(body);
    console.log('DDD', newMessage);
    const newChat = {
      user: body.author,
      createdAt: new Date(),
      messages: [],
      isActive: true,
    };
    // console.log('ISARRAY ',Array.isArray(newChat.messages));
    newChat.messages.push(newMessage);
    // newChat.messages.push(temp);
    const returnChat = await this.SupportRequestModel.create(newChat);
    console.log('return CHAT', returnChat);
    return returnChat;
  }
}
