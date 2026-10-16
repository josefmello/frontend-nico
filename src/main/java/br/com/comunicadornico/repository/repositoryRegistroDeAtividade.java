package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.comunicadornico.entity.entityRegistroDeAtividade;

public interface repositoryRegistroDeAtividade extends JpaRepository<entityRegistroDeAtividade, Long> {
}
