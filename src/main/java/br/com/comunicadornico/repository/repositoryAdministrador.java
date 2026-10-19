package br.com.comunicadornico.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.comunicadornico.entity.entityAdministrador;
 
public interface repositoryAdministrador extends JpaRepository<entityAdministrador, Long> {
 
    List<entityAdministrador> findByNomeContainingIgnoreCase(String nome);
 
    boolean existsByEmail(String email);
 
    boolean existsByTelefone(String telefone);
}
 