import { Body, Controller, Param, Post } from '@nestjs/common';
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
    return this.chatService.addMessage(body, id);
  }
}
