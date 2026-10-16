package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.comunicadornico.entity.entityCategoria;

public interface repositoryCategoria extends JpaRepository<entityCategoria, Long> {
}
