import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class WebsocetsGateway {
  
  @WebSocketServer()
  server: Server;
  
  onModuleInit() {
    this.server.on('connection', (socet) => {
      console.log('server on', socet.id);
      console.log('Connected');
    });

    this.server.off('connection', (socet) => {
      console.log('server off', socet.id);
      console.log('DisConnected');
    });
  }
  
  @SubscribeMessage('clientToManager')
  handleMessageToManager(@MessageBody() body: any): any {
    console.log('');
    console.log('clientToManager', body);
    const messageClientName = `serverToClient${body.clientId}`;
    console.log('=============', messageClientName);
    body.func = 'clientToManager';
    console.log('=***====', body);
    this.server.emit(messageClientName, body);
    this.server.emit('serverToManager', body);
    return 'clientToManager';
  }

  @SubscribeMessage('managerToClient')
  handleMessageToClient(@MessageBody() body: any): string {
    console.log('');
    console.log('managerToClient', body);
    const messageClientName = `serverToClient${body.clientId}`;
    console.log('=============', messageClientName);
    body.func = 'managerToClient';
    console.log('=***====', body);
    this.server.emit(messageClientName, body);
    this.server.emit('serverToManager', body);
    return 'managerToClient';
  }

  @SubscribeMessage('clientReadMessage')
  clientReadMessage(@MessageBody() body: any): string {
    console.log('');
    console.log('clientReadMessage', body);
    // const messageClientName = `serverToClient${body.clientId}`;
    console.log('===== Read message ========', body.clientId);
    body.func = 'clientReadMessage';
    console.log('=***====', body);
    this.server.emit('serverToManager', body);
    return 'clientReadMessage';
  }

  
  @SubscribeMessage('managerReadMessage')
  managerReadMessage(@MessageBody() body: any): string {
    console.log('');
    console.log('managerReadMessage', body);
    body.func = 'managerToClient';
    console.log('=***====', body);
    const messageClientName = `serverToClient${body.clientId}`;
    console.log('===== Read message ========', body.clientId);
    this.server.emit(messageClientName, body);
    return 'managerReadMessage';
  }
}

