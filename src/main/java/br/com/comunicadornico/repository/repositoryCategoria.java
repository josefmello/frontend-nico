package br.com.comunicadornico.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityCategoria;
import br.com.comunicadornico.entity.entityUsuario;

public interface repositoryCategoria extends JpaRepository<entityCategoria, Long> {

    // cria o SELECT * FROM tb_categoria WHERE nome (ou seja, faz a função de pesquisar pelo nome)
    Optional<entityCategoria> findByNome(String nome);

    List<entityCategoria> findByNomeContainingIgnoreCase(String nome);
}
