package br.com.comunicadornico.entity;

//imports
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

//criando a tabela
@Entity
@Table(name = "tb_categoria")

public class entityCategoria {

    //cria a chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    //criando as variaveis
    @Column(name = "nome", nullable = false) //avisa o banco de dados que essa coluna não pode ficar vazia
    private String nome;

    @Column(name = "fotoCat")
    private String fotoCat;

    @Column(name = "posicaoCat")
    private int posicaoCat;

    // criando as relaçoes
    // relaçao categoria x administrador (*..1)
    @ManyToOne
    @JoinColumn(name = "fkAdministrador")
    @JsonIgnore
    private entityAdministrador administrador;

    // relaçao categoria x usuario (*..1)
    @ManyToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;

    // ADICIONADO: relação categoria x botão pela tabela associativa (entityBotaoCategoria)
    @OneToMany(mappedBy = "categoria")
    private List<entityBotaoCategoria> botaoCategorias;

    // construtor padrao (exigido pelo JPA)
    public entityCategoria() {
    }

    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityCategoria(String nome, String fotoCat, int posicaoCat) {
        this.nome = nome;
        this.fotoCat = fotoCat;
        this.posicaoCat = posicaoCat;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFotoCat() {
        return fotoCat;
    }

    public void setFotoCat(String fotoCat) {
        this.fotoCat = fotoCat;
    }

    public int getPosicaoCat() {
        return posicaoCat;
    }

    public void setPosicaoCat(int posicaoCat) {
        this.posicaoCat = posicaoCat;
    }

    // ADICIONADO: getters e setters dos relacionamentos
    public entityAdministrador getAdministrador() {
        return administrador;
    }

    public void setAdministrador(entityAdministrador administrador) {
        this.administrador = administrador;
    }

    public entityUsuario getUsuario() {
        return usuario;
    }

    public void setUsuario(entityUsuario usuario) {
        this.usuario = usuario;
    }

    public List<entityBotaoCategoria> getBotaoCategorias() {
        return botaoCategorias;
    }

    public void setBotaoCategorias(List<entityBotaoCategoria> botaoCategorias) {
        this.botaoCategorias = botaoCategorias;
    }
}
