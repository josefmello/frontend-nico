package br.com.comunicadornico.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityCategoria;
 
public interface repositoryCategoria extends JpaRepository<entityCategoria, Long> {
 
    // o Spring monta a consulta SQL sozinho a partir do nome do método
    List<entityCategoria> findByNomeContainingIgnoreCase(String nome);
}
 