import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Service } from '../services/entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const execPromise = promisify(exec);

@Injectable()
export class ServiceMonitor {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // Méthode pour vérifier le statut du conteneur
  async getServiceStatus(serviceId: number): Promise<string> {
    // Récupérer le service
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // Définir le nom du conteneur
    const containerName = `${service.name}-${serviceId}`;

    // Commande pour vérifier l'état du conteneur
    const podmanStatusCommand = `podman inspect -f '{{.State.Status}}' ${containerName}`;
    try {
      // Exécuter la commande Podman pour récupérer le statut
      const { stdout, stderr } = await execPromise(podmanStatusCommand);
      if (stderr) {
        throw new InternalServerErrorException(`Error getting service status: ${stderr}`);
      }

      return `Service ${service.name} is currently ${stdout.trim()}`;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get service status: ${error.message}`);
    }
  }

  // Méthode pour récupérer les logs du service
  async getServiceLogs(serviceId: number): Promise<string> {
    // Récupérer le service
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // Définir le nom du conteneur
    const containerName = `${service.name}-${serviceId}`;

    // Commande pour récupérer les logs du conteneur
    const podmanLogsCommand = `podman logs ${containerName}`;
    try {
      // Exécuter la commande Podman pour récupérer les logs
      const { stdout, stderr } = await execPromise(podmanLogsCommand);
      if (stderr) {
        throw new InternalServerErrorException(`Error getting service logs: ${stderr}`);
      }

      return stdout;  // Retourne les logs du service
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get service logs: ${error.message}`);
    }
  }

  // Méthode pour obtenir le chemin du fichier de logs
  async getServiceLogFilePath(serviceId: number): Promise<string> {
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // Supposons que le chemin du fichier de logs est déterminé dynamiquement
    return `/var/log/my-services/${service.name}.log`;  // Chemin exemple
  }
}
