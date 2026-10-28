package br.com.comunicadornico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.comunicadornico.entity.entityBotao;
import br.com.comunicadornico.repository.repositoryBotao;

@Service // avisa o Spring que esta classe guarda regras de negócio
public class serviceBotao {

    private final repositoryBotao repositoryBotao;

    @Autowired // injeção de dependência: o Spring entrega o repository pronto
    public serviceBotao(repositoryBotao repositoryBotao) {
        this.repositoryBotao = repositoryBotao;
    }

    // CREATE
    public entityBotao criarBotao(entityBotao novoBotao) {
        if (novoBotao.getLegenda() == null || novoBotao.getLegenda().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A legenda do botão é obrigatória.");
        }
        return repositoryBotao.save(novoBotao);
    }

    // READ - todos
    public List<entityBotao> listarBotoes() {
        return repositoryBotao.findAll();
    }

    // READ - por id
    public entityBotao pesquisarBotaoPorId(Long idBotao) {
        return repositoryBotao.findById(idBotao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Botão não encontrado: " + idBotao));
    }

    // READ - por nome (legenda)
    public List<entityBotao> pesquisarBotao(String legenda) {
        return repositoryBotao.findByLegendaContainingIgnoreCase(legenda);
    }

    // UPDATE
    public entityBotao atualizarBotao(Long idBotao, entityBotao botaoAtualizado) {
        entityBotao botao = pesquisarBotaoPorId(idBotao); // já lança 404 se não existir

        botao.setLegenda(botaoAtualizado.getLegenda());
        botao.setCorFundo(botaoAtualizado.getCorFundo());
        botao.setFoto(botaoAtualizado.getFoto());
        botao.setAudioPersonalizado(botaoAtualizado.getAudioPersonalizado());
        botao.setAudioFem(botaoAtualizado.getAudioFem());
        botao.setAudioMas(botaoAtualizado.getAudioMas());
        botao.setTamanhoBotao(botaoAtualizado.getTamanhoBotao());
        botao.setOculto(botaoAtualizado.isOculto());

        return repositoryBotao.save(botao);
    }

    // RF006 - ocultar/mostrar botão (alterna o valor de "oculto")
    public entityBotao ocultarBotao(Long idBotao) {
        entityBotao botao = pesquisarBotaoPorId(idBotao);
        botao.setOculto(!botao.isOculto());
        return repositoryBotao.save(botao);
    }

    // DELETE
    public void excluirBotao(Long idBotao) {
        entityBotao botao = pesquisarBotaoPorId(idBotao);
        repositoryBotao.delete(botao);
    }
}
