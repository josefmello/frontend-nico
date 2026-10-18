package br.com.comunicadornico.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "tb_registrodeatividade")

public class entityRegistroDeAtividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRegistro;

     // variaveis
    @Column(name= "dataHora")
    private LocalDate dataHora;

    @Column(name= "quantidadeCliques")
    private int quantidadeCliques;

    //criando as relações das tabelas:
    // realação RegistroXBotão, essa é uma relacão bidirecional, ou seja, a classe registro sabe qual botão ela pertence
    @ManyToOne // Muitos para um
    @JoinColumn(name = "fkBotao") // Cria a coluna na tabela de registros para guardar quem foi o botão clicado
    private entityBotao botao;

    // relação registroxusuario (*..1)
    // CORRIGIDO: antes era List<entityUsuario>. Como o relacionamento é muitos-para-um,
    // cada registro pertence a UM usuário, então o atributo é um objeto único.
    @ManyToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;

    // construtor padrao (exigido pelo JPA)
    public entityRegistroDeAtividade() {
    }
 
    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityRegistroDeAtividade(LocalDate dataHora, int quantidadeCliques, entityUsuario usuario) {
        this.dataHora = dataHora;
        this.quantidadeCliques = quantidadeCliques;
        this.usuario = usuario;
    }
 
    public Long getIdRegistro() {
        return idRegistro;
    }
 
    public void setIdRegistro(Long idRegistro) {
        this.idRegistro = idRegistro;
    }
 
    public LocalDate getDataHora() {
        return dataHora;
    }
 
    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }
 
    public int getQuantidadeCliques() {
        return quantidadeCliques;
    }
 
    public void setQuantidadeCliques(int quantidadeCliques) {
        this.quantidadeCliques = quantidadeCliques;
    }
 
    public entityUsuario getUsuario() {
        return usuario;
    }
 
    public void setUsuario(entityUsuario usuario) {
        this.usuario = usuario;
    }

    // ADICIONADO: getter e setter do botão
    public entityBotao getBotao() {
        return botao;
    }

    public void setBotao(entityBotao botao) {
        this.botao = botao;
    }

}