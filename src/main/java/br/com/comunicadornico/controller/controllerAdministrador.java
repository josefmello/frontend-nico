package br.com.comunicadornico.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.comunicadornico.entity.entityAdministrador;




@RestController
@RequestMapping("/api/administradores")

public class controllerAdministrador {
    
    // 1- Criar Administrador (po-st)
    @PostMapping 
    public ResponseEntity<entityAdministrador> criarAdministrador(@RequestBody entityAdministrador novoAdministrador) {
       
        // entityAdministrador administradorCriado = serviceAdministrador.salvarAdministrador(novoAdministrador);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoAdministrador);
    }

    // 2. Read Consultar todas os administradores
    @GetMapping
    public ResponseEntity<List<entityAdministrador>> listarTodos() {
       // List<entityAdministrador> lista = serviceAdministrador.buscarTodos();

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // READ - Consultar administrador pelo nome
    @GetMapping("/buscar")
    public ResponseEntity<List<entityAdministrador>> buscarPorNome(@RequestParam String nome) {
        // List<entityAdministrador> administradores = serviceAdministrador.buscarPorNome(nome);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    //4. UPTADE - Atualizar um registro existente (PUT)
    @PutMapping("/{idAdministrador}")
    public ResponseEntity<entityAdministrador> atualizarAdministrador (@PathVariable Long idAdministrador, @RequestBody entityAdministrador administradorAtualizado) {
        //entityAdministrador administrador = serviceAdministrador.atualizarAdministrador(idAdministrador, administradorAtualizado);
        
      return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idAdministrador}")
    public ResponseEntity<Void> excluirAdministrador(@PathVariable Long idAdministrador) {
            // serviceAdministrador.excluirAdministrador(idAdministrador);
        
       
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); 
    }


}
