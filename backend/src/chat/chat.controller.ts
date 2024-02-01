import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ParamIdDto } from './interfaces/ParamIdDto';
import { SendMessageDto } from './interfaces/SendMessageDto';
import { SupportRequestDocument } from './schemas/SupportRequest.schema';
import { ReadMessageDto } from './interfaces/ReadMessageDTO';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('admin/deletemessage') // Для разработки
  public delallMessage(): any {
    console.log('============ Удаляем все сообщения');
    return this.chatService.delallMessage();
  }

  @Post('common/support-requests/:id/messages') // добавить сообщение
  public addMessage(
    @Param() { id }: ParamIdDto,
    @Body() body: SendMessageDto,
  ): Promise<SupportRequestDocument> {
    return this.chatService.addMessage(body, id);
  }

  @Post('common/support-requests/:id/messages/read') // Прочитать сообщение
  public readMessage(
    @Param() { id }: ParamIdDto,
    @Body() body: ReadMessageDto,
  ): any {
    return this.chatService.readMessage(body, id);
  }

  @Get('client/support-requests')
  public findUserRequest(@Query() params: any): any {
    return this.chatService.findUserRequest(params);
  }

  @Get('manager/support-request')
  public findRequestById(@Query() params: any): any {
    return this.chatService.findRequestById(params);
  }

  @Get('manager/support-requests-users')
  public getUsersFromRequests(): Promise<any> {
    return this.chatService.getUsersFromRequests();
  }
}
