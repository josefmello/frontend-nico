package br.com.comunicadornico.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityAdministrador;

public interface repositoryAdministrador extends JpaRepository<entityAdministrador, Long> {

    // cria o SELECT * FROM tb_administrador WHERE nome (ou seja, faz a função de pesquisar pelo nome)
    Optional<entityAdministrador> findByNome(String nome);

    boolean existsByEmail(String email); // cria a função sql que verifica na tabela se já existe um email cadastrado igual

    boolean existsByTelefone(String telefone); // faz a mesma coisa com telefone

    List<entityAdministrador> findByNomeContainingIgnoreCase(String nome); // faz a mesma coisa com o nome mas ignorando maiuscula e minuscula

}
