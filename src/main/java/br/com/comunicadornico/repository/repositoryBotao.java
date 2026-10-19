package br.com.comunicadornico.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityBotao;

public interface repositoryBotao extends JpaRepository<entityBotao, Long> {

    // cria o SELECT * FROM tb_botao WHERE nome (ou seja, faz a função de pesquisar pelo nome)
    Optional<entityBotao> findByNome(String legenda);
}
