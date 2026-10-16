package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.comunicadornico.entity.entityBotao;

public interface repositoryBotao extends JpaRepository<entityBotao, Long> {
}
