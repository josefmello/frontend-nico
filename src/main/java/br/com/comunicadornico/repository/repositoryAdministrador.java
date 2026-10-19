package br.com.comunicadornico.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityAdministrador;

public interface repositoryAdministrador extends JpaRepository<entityAdministrador, Long> {

    // cria o SELECT * FROM tb_administrador WHERE nome (ou seja, faz a função de pesquisar pelo nome)
    Optional<entityAdministrador> findByNome(String nome);
}
