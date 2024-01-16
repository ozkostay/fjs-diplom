import { Injectable, Post } from '@nestjs/common';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schemas/SupportRequest.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/Message.schema';
import { SendMessageDto } from './interfaces/SendMessageDto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
  ) {}

  //============================
  public async createMessage(body: SendMessageDto): Promise<MessageDocument> {
    const { author, text } = body;
    const newMessage = {
      author: author,
      sentAt: new Date(),
      text: text,
      readAt: null,
    };
    const returnMessage = await this.MessageModel.create(newMessage);
    return returnMessage;
  }

  //============================
  public async getChat(params: {
    id: string;
    author: string;
  }): Promise<SupportRequestDocument> {
    const { id, author } = params;
    console.log('id', id, 'aut', author);
    // Если ID === "newchat" создаем новый, иначе берем по ID
    let returnChat: any;
    if (id === 'newchat') {
      const newChat = {
        user: author,
        createdAt: new Date(),
        messages: [],
        isActive: true,
      };
      returnChat = await this.SupportRequestModel.create(newChat);
    } else {
      returnChat = await this.SupportRequestModel.findById(id);
    }
    return returnChat;
  }

  //============================
  public async addMessage(
    body: SendMessageDto,
    id: string,
  ): Promise<SupportRequestDocument> {
    console.log('CHAT SERVISE addMessage body', body, id);
    const paramsForChat = { id, author: body.author };
    const newMessage = await this.createMessage(body);
    const currentChat = await this.getChat(paramsForChat);
    const newMessages = [...currentChat.messages, newMessage];
    const newCurrentChat = await this.SupportRequestModel.findByIdAndUpdate(
      currentChat._id,
      { messages: newMessages },
      {
        returnDocument: 'after',
      },
    );
    return newCurrentChat;
  }

  //============================
  public async findUserRequest(params): Promise<any> {
    const { id } = params;
    console.log('id', params);
    const response = await this.SupportRequestModel.find({ user: id });
    // console.log('response', response);
    return response;
  }

  //============================
  public async findRequestById(params): Promise<any> {
    const { id } = params;
    console.log('id', id);
    const response = await this.SupportRequestModel.findById(id);
    // console.log('response', response);
    return response;
  }

  //============================ 
      
  public async getUsersFromRequests(): Promise<any> {
    console.log('555');
    const response = await this.SupportRequestModel.find()
      .select(['-__v', '-isActive', '-createdAt', '-messages'])
      .populate('user', ['name'])
      .exec();
    // console.log('response', response);
    return response;
  }
}
