package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.comunicadornico.entity.entityAdministrador;

public interface repositoryAdministrador extends JpaRepository<entityAdministrador, Long> {
}
