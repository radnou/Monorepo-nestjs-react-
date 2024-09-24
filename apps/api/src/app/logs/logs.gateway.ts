import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServiceMonitor } from '../monitor/service-monitor.service';
import { readFileSync, watch } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway(3001, { cors: true })  // WebSocket port
export class LogsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly serviceMonitor: ServiceMonitor) {}

  // Connexion WebSocket établie
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Déconnexion WebSocket
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Écoute des messages WebSocket envoyés par le client pour démarrer la surveillance des logs
  @SubscribeMessage('startLogs')
  async handleLogStream(client: Socket, payload: { serviceId: number }) {
    const { serviceId } = payload;

    try {
      // Obtenir le chemin vers le fichier de logs du service
      const logFilePath = await this.serviceMonitor.getServiceLogFilePath(serviceId);

      // Lire et envoyer le contenu initial du fichier
      const initialLogs = readFileSync(logFilePath, 'utf8');
      client.emit('logs', initialLogs);

      // Surveiller les modifications du fichier en temps réel
      const watcher = watch(logFilePath, (eventType, filename) => {
        if (eventType === 'change') {
          const updatedLogs = readFileSync(logFilePath, 'utf8');
          client.emit('logs', updatedLogs);  // Envoyer les nouvelles données
        }
      });

      // Arrêter la surveillance à la déconnexion
      client.on('disconnect', () => {
        watcher.close();
      });

    } catch (error) {
      client.emit('error', `Failed to stream logs: ${error.message}`);
    }
  }
}
