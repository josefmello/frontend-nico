package br.com.comunicadornico.entity;

//imports
import java.util.ArrayList; //tradutor do sql
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Column(nullable = false) //avisa o banco de dados que essa coluna não pode ficar vazia
    private String nome;
    private List<String> ordemBotao = new ArrayList<>();
    private String fotoCat;
    private int posicaoCat;
    // construtor padrao (exigido pelo JPA)
    public entityCategoria() {
        this.ordemBotao = new ArrayList<>();
    }
 
    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityCategoria(String nome, List<String> ordemBotao, String fotoCat, int posicaoCat) {
        this.nome = nome;
        this.ordemBotao = ordemBotao;
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
 
    public List<String> getOrdemBotao() {
        return ordemBotao;
    }
 
    public void setOrdemBotao(List<String> ordemBotao) {
        this.ordemBotao = ordemBotao;
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
}
 