package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.comunicadornico.entity.entitySintetizadorVoz;

public interface repositorySintetizadorVoz extends JpaRepository<entitySintetizadorVoz, Long> {
}
