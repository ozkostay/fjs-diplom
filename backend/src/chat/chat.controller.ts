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

  @Get('client/support-requests/')
  public findUserRequest(@Query() params: any): any {
    return this.chatService.findUserRequest(params);
  }
}
