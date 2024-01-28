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

  public async delallMessage(): Promise<any> {
    const returnA = await this.SupportRequestModel.deleteMany({});
    const returnB = await this.MessageModel.deleteMany({});
    return returnB;
  }

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
    console.log('=== Сообщение создано', returnMessage);
    return returnMessage;
  }

  //============================
  public async getChat(
    params: {
      id: string;
      author: string;
    },
    newMessage: MessageDocument,
  ): Promise<SupportRequestDocument> {
    const { id, author } = params;
    console.log('=== CHAT либо новый либо нет === ', 'id', id, 'aut', author);
    // Если ID === "newchat" создаем новый, иначе берем по ID
    let returnChat: any;
    let msgs: any; 
    if (id === 'newchat') {
      console.log('11111', id);
      msgs = [];
      msgs.push(newMessage._id);
      const newChat = {
        user: author,
        createdAt: new Date(),
        messages: msgs,
        isActive: true,
      };
      console.log('=+== newChat= ', newChat);

      returnChat = await this.SupportRequestModel.create(newChat);
    } else {
      console.log('22222', id);
      const chat = await this.SupportRequestModel.findById(id);
      console.log('22222-1 chat', chat);
      msgs = chat.messages;
      console.log('22222-2 msgs', msgs);
      msgs.push(newMessage._id);
        returnChat = await this.SupportRequestModel.findByIdAndUpdate(
        chat._id,
      { messages: msgs },
      {
        returnDocument: 'after',
      },
    );

    }
    console.log('=== Чат Чат Чат ', returnChat);

    return returnChat;
  }

  //============================
  public async addMessage(
    body: SendMessageDto,
    id: string,
  ): Promise<SupportRequestDocument> {
    console.log('CHAT SERVISE addMessage body', body, id);
    const paramsForChat = { id, author: body.author };
    // Созаем сообщение
    const newMessage = await this.createMessage(body);
    console.log('CHAT SERVISE addMessage message=', newMessage);
    // Получаем либо создаем Чат
    const currentChat = await this.getChat(paramsForChat, newMessage);
    console.log('CHAT SERVISE GET_CHAT chat=', currentChat);

    // const newCurrentChat = await this.SupportRequestModel.findByIdAndUpdate(
    //   currentChat._id,
    //   { messages: msgArr },
    //   {
    //     returnDocument: 'after',
    //   },
    // );

    const newCurrentChat = currentChat;
    return newCurrentChat;
  }

  public async readMessage(body: any, id: any): Promise<any> {
    console.log('CHAT SERVISE addMessage body', body, id);
    const paramsForChat = { id, body };
    const currentChat = await this.SupportRequestModel.findById(id);
    if (!currentChat) {
      return 'null';
    }
    // const aaa = [...currentChat.messages];
    // const oldMessages = currentChat.messages.map((i) => i).filter((i) => i.author !== body.whoRead);
    // const messNotRead = oldMessages.map(i);
    // console.log(messNotRead);
    // const currentChat = await this.getChat(paramsForChat);
    // const newMessages = [...currentChat.messages, newMessage];
    // const newCurrentChat = await this.SupportRequestModel.findByIdAndUpdate(
    //   currentChat._id,
    //   { messages: newMessages },
    //   {
    //     returnDocument: 'after',
    //   },
    // );
    // return newCurrentChat;
    return { aaa: 'Read servise' };
  }

  //============================
  public async findUserRequest(params): Promise<any> {
    const { id } = params;
    console.log('id', params);
    const response = await this.SupportRequestModel.find({ user: id })
    .populate('messages')
    .exec();
    // console.log('response', response);
    return response;
  }

  //============================
  public async findRequestById(params): Promise<any> {
    const { id } = params;
    console.log('id', id);
    const response = await this.SupportRequestModel.findById(id)
    .populate('messages')
    .exec();
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
