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

import br.com.comunicadornico.entity.entityAdministrador;
import br.com.comunicadornico.service.serviceAdministrador;

@RestController
@RequestMapping("/api/administradores")

public class controllerAdministrador {

    @Autowired
    private serviceAdministrador meuService;

    // 1- Criar Administrador (po-st)
    @PostMapping
    public ResponseEntity<entityAdministrador> criarAdministrador(@RequestBody entityAdministrador novoAdministrador) {

        entityAdministrador administradorCriado = meuService.criarAdministrador(novoAdministrador);

        return ResponseEntity.status(HttpStatus.CREATED).body(administradorCriado);
    }

    // 2. Read Consultar todas os administradores
    @GetMapping
    public ResponseEntity<List<entityAdministrador>> listarTodosAdministradores() {
        List<entityAdministrador> lista = meuService.listarAdministradores();

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    // READ - Consultar administrador pelo nome
    @GetMapping("/buscaradmnome")
    public ResponseEntity<List<entityAdministrador>> buscarPorNome(@RequestParam String nome) {
        List<entityAdministrador> administradores = meuService.pesquisarAdministrador(nome);
        return ResponseEntity.status(HttpStatus.OK).body(administradores);
    }

    // READ - Buscar por ID
    @GetMapping("/{idAdministrador}")
    public ResponseEntity<entityAdministrador> buscarAdministradorPorId(@RequestParam Long idAdministrador) {
        entityAdministrador administradorEncontrado = meuService.pesquisarAdministradorPorId(idAdministrador);

        return ResponseEntity.ok(administradorEncontrado);
    }

    //4. UPTADE - Atualizar um registro existente (PUT)
    @PutMapping("/{idAdministrador}")
    public ResponseEntity<entityAdministrador> atualizarAdministrador(@PathVariable Long idAdministrador, @RequestBody entityAdministrador administradorAtualizado) {
        entityAdministrador administrador = meuService.atualizarAdministrador(idAdministrador, administradorAtualizado);

        return ResponseEntity.status(HttpStatus.OK).body(administrador);
    }

    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idAdministrador}")
    public ResponseEntity<Void> excluirAdministrador(@PathVariable Long idAdministrador) {
        meuService.excluirAdministrador(idAdministrador);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
