package br.com.comunicadornico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.comunicadornico.entity.entityCategoria;
import br.com.comunicadornico.repository.repositoryCategoria;

@Service
public class serviceCategoria {

    private final repositoryCategoria repositoryCategoria;

    @Autowired
    public serviceCategoria(repositoryCategoria repositoryCategoria) {
        this.repositoryCategoria = repositoryCategoria;
    }

    // CREATE
    public entityCategoria criarCategoria(entityCategoria novaCategoria) {
        if (novaCategoria.getNome() == null || novaCategoria.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da categoria é obrigatório.");
        }
        return repositoryCategoria.save(novaCategoria);
    }

    // READ - todas
    public List<entityCategoria> listarCategorias() {
        return repositoryCategoria.findAll();
    }

    // READ - por id
    public entityCategoria pesquisarCategoriaPorId(Long idCategoria) {
        return repositoryCategoria.findById(idCategoria)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Categoria não encontrada: " + idCategoria));
    }

    // READ - por nome
    public List<entityCategoria> pesquisarCategoria(String nome) {
        return repositoryCategoria.findByNomeContainingIgnoreCase(nome);
    }

    // UPDATE
    public entityCategoria atualizarCategoria(Long idCategoria, entityCategoria categoriaAtualizada) {
        entityCategoria categoria = pesquisarCategoriaPorId(idCategoria);

        categoria.setNome(categoriaAtualizada.getNome());
        categoria.setFotoCat(categoriaAtualizada.getFotoCat());
        categoria.setPosicaoCat(categoriaAtualizada.getPosicaoCat());

        return repositoryCategoria.save(categoria);
    }

    // DELETE
    public void excluirCategoria(Long idCategoria) {
        entityCategoria categoria = pesquisarCategoriaPorId(idCategoria);
        repositoryCategoria.delete(categoria);
    }
}
