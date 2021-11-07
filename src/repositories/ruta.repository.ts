import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Ruta, RutaRelations, Aeropuerto} from '../models';
import {AeropuertoRepository} from './aeropuerto.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly origen_aeropuerto: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly origenFK: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly destinoFK: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource, @repository.getter('AeropuertoRepository') protected aeropuertoRepositoryGetter: Getter<AeropuertoRepository>,
  ) {
    super(Ruta, dataSource);
    this.destinoFK = this.createBelongsToAccessorFor('destinoFK', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('destinoFK', this.destinoFK.inclusionResolver);
    this.origenFK = this.createBelongsToAccessorFor('origenFK', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('origenFK', this.origenFK.inclusionResolver);
    this.origen_aeropuerto = this.createBelongsToAccessorFor('origen_aeropuerto', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('origen_aeropuerto', this.origen_aeropuerto.inclusionResolver);
  }
}
