package br.com.comunicadornico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.comunicadornico.entity.entityBackUpManager;

public interface repositoryBackUpManager extends JpaRepository<entityBackUpManager, Long> {
}
