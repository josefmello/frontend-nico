package br.com.comunicadornico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import br.com.comunicadornico.service.serviceCategoria;

@RestController
@RequestMapping("/api/categorias")

public class controllerCategoria {

    // 1- Cria Categoria (po-st)
    @Autowired
    private serviceCategoria meuService;

    @PostMapping
    public ResponseEntity<entityCategoria> criarCategoria(@RequestBody entityCategoria novaCategoria) {

        entityCategoria categoriaCriada = meuService.criarCategoria(novaCategoria);

        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaCriada);
    }

    // 2. Read Consultar todas as categorias
    @GetMapping
    public ResponseEntity<List<entityCategoria>> listarTodos() {

        List<entityCategoria> lista = meuService.listarCategorias();

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    // READ - Consultar categoria pelo nome
    @GetMapping("/buscar")
    public ResponseEntity<List<entityCategoria>> buscarPorNome(@RequestParam String nome) {
        List<entityCategoria> categorias = meuService.pesquisarCategoria(nome);
        return ResponseEntity.status(HttpStatus.OK).body(categorias);
    }

    // READ - Consultar por ID
    @GetMapping("/{idCategoria}")
    public ResponseEntity<entityCategoria> buscarCategoriaPorId(@RequestParam Long idCategoria) {

        entityCategoria categoriaEncontrada = meuService.pesquisarCategoriaPorId(idCategoria);

        return ResponseEntity.ok(categoriaEncontrada);

    }

    @PutMapping("/{idCategoria}")
    public ResponseEntity<entityCategoria> atualizarCategoria(@PathVariable Long idCategoria, @RequestBody entityCategoria categoriaAtualizada) {
        entityCategoria categoria = meuService.atualizarCategoria(idCategoria, categoriaAtualizada);
        return ResponseEntity.status(HttpStatus.OK).body(categoria);
    }


    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idCategoria}")
    public ResponseEntity<Void> excluirCategoria(@PathVariable Long idCategoria) {
        meuService.excluirCategoria(idCategoria);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
