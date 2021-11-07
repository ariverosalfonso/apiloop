import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Aeropuerto, AeropuertoRelations, Ruta} from '../models';
import {RutaRepository} from './ruta.repository';

export class AeropuertoRepository extends DefaultCrudRepository<
  Aeropuerto,
  typeof Aeropuerto.prototype.id,
  AeropuertoRelations
> {

  public readonly origen_aeropuerto: BelongsToAccessor<Ruta, typeof Aeropuerto.prototype.id>;

  public readonly destino_aeropuerto: BelongsToAccessor<Ruta, typeof Aeropuerto.prototype.id>;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource, @repository.getter('RutaRepository') protected rutaRepositoryGetter: Getter<RutaRepository>,
  ) {
    super(Aeropuerto, dataSource);

  }
}
