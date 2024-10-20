import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Esto permite conexiones desde cualquier origen, puedes ajustar según tu necesidad.
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
  }

  // Este decorador escucha eventos llamados 'message'
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    console.log('Mensaje recibido del cliente:', data);
    // Puedes usar `this.server.emit` para enviar un mensaje a todos los clientes conectados
    this.server.emit('response', `Mensaje recibido: ${data}`);
    return 'Mensaje procesado en el servidor';
  }
}
