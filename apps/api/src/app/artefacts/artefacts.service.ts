import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artefact } from './entities/artefact.entity';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';
import { Version } from '../versions/entities/version.entity';
import axios from "axios";
import {Service} from "../services/entities/service.entity";
import {Credential} from "../credentials/entities/credential.entity";
@Injectable()
export class ArtefactsService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Artefact)
    private readonly artefactsRepository: Repository<Artefact>,
    @InjectRepository(Version)
    private readonly versionsRepository: Repository<Version>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>

  ) {}

  async create(createArtefactDto: CreateArtefactDto): Promise<Artefact> {
    const version = await this.versionsRepository.findOne({
      where: { id: createArtefactDto.versionId },
    });
    if (!version) {
      throw new NotFoundException(`Version with ID ${createArtefactDto.versionId} not found`);
    }

    const artefact = this.artefactsRepository.create({
      type: createArtefactDto.type,
      nexusUrl: createArtefactDto.nexusUrl,
      version: version,
    });
    return await this.artefactsRepository.save(artefact);
  }

  async findAll(): Promise<Artefact[]> {
    return await this.artefactsRepository.find({
      relations: ['version'],
    });
  }

  async findOne(id: number): Promise<Artefact> {
    const artefact = await this.artefactsRepository.findOne({
      where: { id },
      relations: ['version'],
    });
    if (!artefact) {
      throw new NotFoundException(`Artefact with ID ${id} not found`);
    }
    return artefact;
  }

  async update(id: number, updateArtefactDto: UpdateArtefactDto): Promise<Artefact> {
    const artefact = await this.artefactsRepository.preload({
      id: id,
      ...updateArtefactDto,
    });

    if (!artefact) {
      throw new NotFoundException(`Artefact with ID ${id} not found`);
    }

    if (updateArtefactDto.versionId) {
      const version = await this.versionsRepository.findOne({
        where: { id: updateArtefactDto.versionId },
      });
      if (!version) {
        throw new NotFoundException(`Version with ID ${updateArtefactDto.versionId} not found`);
      }
      artefact.version = version;
    }

    return await this.artefactsRepository.save(artefact);
  }

  async remove(id: number): Promise<void> {
    const artefact = await this.findOne(id);
    await this.artefactsRepository.remove(artefact);
  }

  async getNexusArtefact(serviceId: number, artefactId: number): Promise<any> {
    // Récupérer les informations du service
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // Récupérer l'artefact
    const artefact = await this.artefactsRepository.findOne({ where: { id: artefactId, version: service.versions.find(e => e.id === serviceId) } });
    if (!artefact) {
      throw new NotFoundException(`Artefact with ID ${artefactId} not found`);
    }

    // // Récupérer les informations d'identification (credentials)
    // const credentials = await this.credentialRepository.findOne({ where: { environment:  } });
    // if (!credentials) {
    //   throw new NotFoundException(`Credentials for service environment not found`);
    // }

    // Extraire l'URL de base Nexus depuis l'URL de Nexus du service
    const nexusBaseUrl = this.extractNexusBaseUrl(service.gitRepoUrl); // Méthode helper ci-dessous

    // Faire une requête à l'API Nexus pour récupérer l'artefact
    const artefactUrl = `${nexusBaseUrl}/repository/${artefact.type}/${artefact.nexusUrl}`;
    try {
      const response = await axios.get(artefactUrl, {
        // auth: {
        //   username: credentials.username,
        //   password: credentials.encryptedPassword,  // call decrypt function
        // },
        responseType: 'stream',  // Pour télécharger l'artefact sous forme de flux de données
      });

      return response.data; // Retourne les données de l'artefact (ou stream si téléchargement)
    } catch (error) {
      throw new NotFoundException(`Failed to fetch artefact from Nexus: ${error.message}`);
    }
  }

  // Helper pour déduire l'URL de base de Nexus
  private extractNexusBaseUrl(nexusUrl: string): string {
    // Ex: https://nexus.example.com/repository/artefact-id -> https://nexus.example.com
    const urlParts = nexusUrl.split('/repository');
    if (urlParts.length > 0) {
      return urlParts[0];
    }
    throw new Error('Invalid Nexus URL');
  }
}
