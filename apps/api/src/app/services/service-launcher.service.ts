import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const execPromise = promisify(exec);

@Injectable()
export class ServiceLauncher {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // Méthode pour lancer un service en tant que conteneur via Podman
  async launchService(serviceId: number): Promise<string> {
    // Récupérer le service
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // Déduire le nom de l'image à partir du service (ou utiliser des informations spécifiques à ton système)
    const imageName = `${service.name}:${service.versions[0].versionNumber}`; // Utilise la dernière version

    // Commande pour lancer le conteneur via Podman
    const podmanCommand = `podman run -d --name ${service.name}-${serviceId} ${imageName}`;

    try {
      // Exécution de la commande Podman
      const { stdout, stderr } = await execPromise(podmanCommand);
      if (stderr) {
        throw new InternalServerErrorException(`Error launching service: ${stderr}`);
      }

      return `Service ${service.name} launched successfully with container ID: ${stdout.trim()}`;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to launch service: ${error.message}`);
    }
  }
}
