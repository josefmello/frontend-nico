package br.com.comunicadornico.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityUsuario;

public interface repositoryUsuario extends JpaRepository<entityUsuario, Long> {

    Optional<entityUsuario> findByNome(String nome);

    List<entityUsuario> findByNomeContainingIgnoreCase(String nome);
}
