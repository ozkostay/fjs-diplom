import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ParamIdDto } from './interfaces/ParamIdDto';
import { SendMessageDto } from './interfaces/SendMessageDto';
import { SupportRequestDocument } from './schemas/SupportRequest.schema';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('common/support-requests/:id/messages') // добавить сообщение
  public addMessage(
    @Param() { id }: ParamIdDto,
    @Body() body: SendMessageDto,
  ): Promise<SupportRequestDocument> {
    console.log('============ id', id, 'body', body);
    return this.chatService.addMessage(body, id);
  }

  @Get('client/support-requests')
  public findUserRequest(@Query() params: any): any {
    return this.chatService.findUserRequest(params);
  }

  @Get('manager/support-request')
  public findRequestById(@Query() params: any): any {
    console.log('999', params);
    return this.chatService.findRequestById(params);
  }
  
  @Get('manager/support-requests-users')
  public getUsersFromRequests(): Promise<any> {
    console.log(555);
    return this.chatService.getUsersFromRequests();
  }
}
