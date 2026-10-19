package br.com.comunicadornico.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityBotao;
 
public interface repositoryBotao extends JpaRepository<entityBotao, Long> {
 
    // o Spring monta a consulta SQL sozinho a partir do nome do método
    List<entityBotao> findByLegendaContainingIgnoreCase(String legenda);
}
 