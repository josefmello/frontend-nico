package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityUsuario;

public interface repositoryUsuario extends JpaRepository<entityUsuario, Long> {
}
