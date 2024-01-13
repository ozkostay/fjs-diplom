import { Body, Controller, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ParamIdDto } from './interfaces/ParamIdDto';
import { SendMessageDto } from './interfaces/SendMessageDto';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('client/support-requests') // создать новый чат
  public createChat(@Body() body: any): any {
    return this.chatService.createChat(body);
  }

  @Post('common/support-requests/:id/messages') // добавить сообщение
  public createMessage(@Param() { id }: ParamIdDto, @Body() body: SendMessageDto): Promise<any> {
    console.log('CONTROLLER createMessage ID', id);
    console.log('CONTROLLER createMessage BODY', body);
    return this.chatService.addMessage(body, id);
  }

  // @UseInterceptors(FilesInterceptor('files'))
  // public uploadpics(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() body: any,
  // ): Promise<any> {
  //   return this.hotelsService.create(files, body);
  // }
}
