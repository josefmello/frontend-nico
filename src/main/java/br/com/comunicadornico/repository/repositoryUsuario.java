package br.com.comunicadornico.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityUsuario;
 
public interface repositoryUsuario extends JpaRepository<entityUsuario, Long> {
 
    // o Spring monta a consulta SQL sozinho a partir do nome do método
    List<entityUsuario> findByNomeContainingIgnoreCase(String nome);
}
 