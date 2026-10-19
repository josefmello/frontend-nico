package br.com.comunicadornico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.comunicadornico.entity.entityAdministrador;
import br.com.comunicadornico.repository.repositoryAdministrador;

@Service
public class serviceAdministrador {

    private final repositoryAdministrador repositoryAdministrador;

    @Autowired
    public serviceAdministrador(repositoryAdministrador repositoryAdministrador) {
        this.repositoryAdministrador = repositoryAdministrador;
    }

    // CREATE (cadastro do administrador)
    public entityAdministrador criarAdministrador(entityAdministrador novoAdministrador) {
        if (novoAdministrador.getNome() == null || novoAdministrador.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome é obrigatório.");
        }
        if (novoAdministrador.getEmail() == null || novoAdministrador.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O e-mail é obrigatório.");
        }
        // RNF011 - PIN numérico de 4 dígitos
        if (novoAdministrador.getPin() < 1000 || novoAdministrador.getPin() > 9999) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O PIN deve ter 4 dígitos.");
        }
        // email e telefone são unique no banco: avisamos antes de estourar erro do banco
        if (repositoryAdministrador.existsByEmail(novoAdministrador.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado.");
        }
        if (repositoryAdministrador.existsByTelefone(novoAdministrador.getTelefone())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Telefone já cadastrado.");
        }
        return repositoryAdministrador.save(novoAdministrador);
    }

    // READ - todos
    public List<entityAdministrador> listarAdministradores() {
        return repositoryAdministrador.findAll();
    }

    // READ - por id
    public entityAdministrador pesquisarAdministradorPorId(Long idAdministrador) {
        return repositoryAdministrador.findById(idAdministrador)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Administrador não encontrado: " + idAdministrador));
    }

    // READ - por nome
    public List<entityAdministrador> pesquisarAdministrador(String nome) {
        return repositoryAdministrador.findByNomeContainingIgnoreCase(nome);
    }

    // UPDATE
    public entityAdministrador atualizarAdministrador(Long idAdministrador, entityAdministrador administradorAtualizado) {
        entityAdministrador administrador = pesquisarAdministradorPorId(idAdministrador);

        administrador.setNome(administradorAtualizado.getNome());
        administrador.setEmail(administradorAtualizado.getEmail());
        administrador.setPin(administradorAtualizado.getPin());
        administrador.setTelefone(administradorAtualizado.getTelefone());
        administrador.setDataNasc(administradorAtualizado.getDataNasc());
        administrador.setSexo(administradorAtualizado.getSexo());
        administrador.setSenha(administradorAtualizado.getSenha());
        administrador.setPremium(administradorAtualizado.isPremium());
        administrador.setValorMensalidade(administradorAtualizado.getValorMensalidade());
        administrador.setDataAssinatura(administradorAtualizado.getDataAssinatura());

        return repositoryAdministrador.save(administrador);
    }

    // DELETE
    public void excluirAdministrador(Long idAdministrador) {
        entityAdministrador administrador = pesquisarAdministradorPorId(idAdministrador);
        repositoryAdministrador.delete(administrador);
    }
}
