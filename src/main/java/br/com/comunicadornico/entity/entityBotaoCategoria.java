package br.com.comunicadornico.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// Tabela associativa entre Botao e Categoria (muitos para muitos).
// Em vez do @ManyToMany automático, a ligação vira uma entidade própria,
// o que permite guardar dados da ligação, como a posição do botão dentro de cada categoria.
@Entity
@Table(name = "tb_botao_categoria")

public class entityBotaoCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBotaoCategoria;

    // posição do botão dentro desta categoria
    @Column(name= "posicao")
    private int posicao;

    // relação botaoCategoria x botão (*..1)
    @ManyToOne
    @JoinColumn(name = "fkBotao", nullable = false)
    private entityBotao botao;

    // relação botaoCategoria x categoria (*..1)
    @ManyToOne
    @JoinColumn(name = "fkCategoria", nullable = false)
    private entityCategoria categoria;

    // construtor padrao (exigido pelo JPA)
    public entityBotaoCategoria() {
    }

    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityBotaoCategoria(int posicao, entityBotao botao, entityCategoria categoria) {
        this.posicao = posicao;
        this.botao = botao;
        this.categoria = categoria;
    }

    public Long getIdBotaoCategoria() {
        return idBotaoCategoria;
    }

    public void setIdBotaoCategoria(Long idBotaoCategoria) {
        this.idBotaoCategoria = idBotaoCategoria;
    }

    public int getPosicao() {
        return posicao;
    }

    public void setPosicao(int posicao) {
        this.posicao = posicao;
    }

    public entityBotao getBotao() {
        return botao;
    }

    public void setBotao(entityBotao botao) {
        this.botao = botao;
    }

    public entityCategoria getCategoria() {
        return categoria;
    }

    public void setCategoria(entityCategoria categoria) {
        this.categoria = categoria;
    }
}