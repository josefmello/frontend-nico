package br.com.comunicadornico.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityCategoria;

public interface repositoryCategoria extends JpaRepository<entityCategoria, Long> {

    // cria o SELECT * FROM tb_categoria WHERE nome (ou seja, faz a função de pesquisar pelo nome)
    Optional<entityCategoria> findByNome(String nome);
}
