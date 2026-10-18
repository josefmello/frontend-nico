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

import br.com.comunicadornico.entity.entityCategoria;




@RestController
@RequestMapping("/api/categorias")

public class controllerCategoria {
    // 1- Criar Categoria (po-st)
    @PostMapping 
    public ResponseEntity<entityCategoria> criarCategoria(@RequestBody entityCategoria novaCategoria) {
       
        // entityCategoria categoriaCriada = serviceCategoria.salvarCategoria(novaCategoria);

        return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
    }

    // 2. Read Consultar todas as categorias
    @GetMapping
    public ResponseEntity<List<entityCategoria>> listarTodos() {
       // List<entityCategoria> lista = serviceCategoria.buscarTodos();

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // READ - Consultar categoria pelo nome
    @GetMapping("/buscar")
    public ResponseEntity<List<entityCategoria>> buscarPorNome(@RequestParam String nome) {
        // List<entityCategoria> categorias = serviceCategoria.buscarPorNome(nome);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    //4. UPTADE - Atualizar um registro existente (PUT)
    @PutMapping("/{idCategoria}")
    public ResponseEntity<entityCategoria> atualizarCategoria (@PathVariable Long idCategoria, @RequestBody entityCategoria categoriaAtualizada) {
        //entityCategoria categoria = serviceCategoria.atualizarCategoria(idCategoria, categoriaAtualizada);
        
      return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idCategoria}")
    public ResponseEntity<Void> excluirCategoria(@PathVariable Long idCategoria) {
            // serviceCategoria.excluirCategoria(idCategoria);
        
       
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); 
    }


}
