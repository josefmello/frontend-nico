package br.com.comunicadornico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.comunicadornico.entity.entityUsuario;
import br.com.comunicadornico.repository.repositoryUsuario;

@Service
public class serviceUsuario {

    private final repositoryUsuario repositoryUsuario;

    @Autowired
    public serviceUsuario(repositoryUsuario repositoryUsuario) {
        this.repositoryUsuario = repositoryUsuario;
    }

    // CREATE
    public entityUsuario criarUsuario(entityUsuario novoUsuario) {
        if (novoUsuario.getNome() == null || novoUsuario.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome do usuário é obrigatório.");
        }
        if (novoUsuario.getDataNascAut() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de nascimento é obrigatória.");
        }
        return repositoryUsuario.save(novoUsuario);
    }

    // READ - todos
    public List<entityUsuario> listarUsuarios() {
        return repositoryUsuario.findAll();
    }

    // READ - por id
    public entityUsuario pesquisarUsuarioPorId(Long idUsuario) {
        return repositoryUsuario.findById(idUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Usuário não encontrado: " + idUsuario));
    }

    // READ - por nome
    public List<entityUsuario> pesquisarUsuario(String nome) {
        return repositoryUsuario.findByNomeContainingIgnoreCase(nome);
    }

    // UPDATE
    public entityUsuario atualizarUsuario(Long idUsuario, entityUsuario usuarioAtualizado) {
        entityUsuario usuario = pesquisarUsuarioPorId(idUsuario);

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setSexo(usuarioAtualizado.getSexo());
        usuario.setNivelAutismo(usuarioAtualizado.getNivelAutismo());
        usuario.setDataNascAut(usuarioAtualizado.getDataNascAut());
        usuario.setVoz(usuarioAtualizado.isVoz());

        return repositoryUsuario.save(usuario);
    }

    // DELETE
    public void excluirUsuario(Long idUsuario) {
        entityUsuario usuario = pesquisarUsuarioPorId(idUsuario);
        repositoryUsuario.delete(usuario);
    }
}
