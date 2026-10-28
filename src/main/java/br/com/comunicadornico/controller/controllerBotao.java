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

import br.com.comunicadornico.entity.entityBotao;
import br.com.comunicadornico.service.serviceBotao;

@RestController
@RequestMapping("/api/botoes")

public class controllerBotao {

    @Autowired
    private serviceBotao meuService;
    // 1- Criar Botao (po-st)

    @PostMapping
    public ResponseEntity<entityBotao> criarBotao(@RequestBody entityBotao novoBotao) {

        entityBotao botaoCriado = meuService.criarBotao(novoBotao);

        return ResponseEntity.status(HttpStatus.CREATED).body(botaoCriado);
    }

    // 2. Read Consultar todas os botoes
    @GetMapping
    public ResponseEntity<List<entityBotao>> listarTodos() {

        List<entityBotao> lista = meuService.listarBotoes();

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    // READ - Consultar por ID
    @GetMapping("/{idBotao}")
    public ResponseEntity<entityBotao> buscarBotaoPorId(@RequestParam Long idBotao) {
        entityBotao botaoEncontrado = meuService.pesquisarBotaoPorId(idBotao);
        return ResponseEntity.ok(botaoEncontrado);
    }

    // READ - Consultar Botao pelo nome
    @GetMapping("/buscar")
    public ResponseEntity<List<entityBotao>> buscarPorNome(@RequestParam String legenda) {
        List<entityBotao> botoes = meuService.pesquisarBotao(legenda);

        return ResponseEntity.status(HttpStatus.OK).body(botoes);
    }

    //4. UPTADE - Atualizar um registro existente (PUT)
    @PutMapping("/{idBotao}")
    public ResponseEntity<entityBotao> atualizarBotao(@PathVariable Long idBotao, @RequestBody entityBotao botaoAtualizado) {
        entityBotao botao = meuService.atualizarBotao(idBotao, botaoAtualizado);

        return ResponseEntity.status(HttpStatus.OK).body(botao);
    }

    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idBotao}")
    public ResponseEntity<Void> excluirBotao(@PathVariable Long idBotao) {
        meuService.excluirBotao(idBotao);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
