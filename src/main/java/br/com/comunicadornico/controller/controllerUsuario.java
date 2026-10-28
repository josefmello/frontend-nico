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

import br.com.comunicadornico.entity.entityUsuario;
import br.com.comunicadornico.service.serviceUsuario;

@RestController //avisa o spring que a classe vai responder a requisitos da web
@RequestMapping("/api/usuarios") //define o endereço base Url
public class controllerUsuario {

    @Autowired
    private serviceUsuario meuService;

    // 1 - Metodo para criar um novo usuario (POST)
    @PostMapping //informa que o post dessa classe deve passar por aqui, é uma etiqueta de anotação
    public ResponseEntity<entityUsuario> criarUsuario(@RequestBody entityUsuario novoUsuario) {
        entityUsuario usuarioCriado = meuService.criarUsuario(novoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCriado);
    }

    // 2. Read Consultar todos os registros
    @GetMapping
    public ResponseEntity<List<entityUsuario>> listarTodos() {
        List<entityUsuario> lista = meuService.listarUsuarios();

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    // READ - Consultar registros pelo nome
    @GetMapping("/buscar")
    public ResponseEntity<List<entityUsuario>> buscarPorNome(@RequestParam String nome) {
        List<entityUsuario> usuarios = meuService.pesquisarUsuario(nome);
        return ResponseEntity.status(HttpStatus.OK).body(usuarios);
    }

    // READ - Consultar por ID
    @GetMapping("/{idUsuario}")
    public ResponseEntity<entityUsuario> buscarUsuarioPorId(@RequestParam Long idUsuario) {

        entityUsuario usuarioEncontrado = meuService.pesquisarUsuarioPorId(idUsuario);

        return ResponseEntity.ok(usuarioEncontrado);

    }

    //4. UPTADE - Atualizar um registro existente (PUT)
    @PutMapping("/{idUsuario}")
    public ResponseEntity<entityUsuario> atualizarUsuario(@PathVariable Long idUsuario, @RequestBody entityUsuario usuarioAtualizado) {
        entityUsuario usuario = meuService.atualizarUsuario(idUsuario, usuarioAtualizado);

        return ResponseEntity.status(HttpStatus.OK).body(usuario);
    }

    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long idUsuario) {

        meuService.excluirUsuario(idUsuario);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
