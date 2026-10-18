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
import br.com.comunicadornico.entity.entityBotao;

@RestController 
@RequestMapping("/api/botoes")

public class controllerBotao {
    // 1- Criar Botao (po-st)
    @PostMapping 
    public ResponseEntity<entityBotao> criarBotao(@RequestBody entityBotao novoBotao) {
       
        // entityBotao botaoCriado = serviceBotao.salvarBotao(novoBotao);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoBotao);
    }

    // 2. Read Consultar todas os botoes
    @GetMapping
    public ResponseEntity<List<entityBotao>> listarTodos() {
       // List<entityBotao> lista = serviceBotao.buscarTodos();

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // READ - Consultar Botao pelo nome
    @GetMapping("/buscar")
    public ResponseEntity<List<entityBotao>> buscarPorNome(@RequestParam String nome) {
        // List<entityBotao> botoes = serviceBotao.buscarPorNome(nome);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    //4. UPTADE - Atualizar um registro existente (PUT)
    @PutMapping("/{idBotao}")
    public ResponseEntity<entityBotao> atualizarBotao (@PathVariable Long idBotao, @RequestBody entityBotao botaoAtualizado) {
        //entityBotao botao = serviceBotao.atualizarBotao(idBotao, botaoAtualizado);
        
      return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // 5. DELETE - Excluir um registro (DELETE)
    @DeleteMapping("/{idBotao}")
    public ResponseEntity<Void> excluirBotao(@PathVariable Long idBotao) {
            // serviceBotao.excluirBotao(idBotao);
        
       
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); 
    }
}
