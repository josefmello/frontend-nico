package br.com.comunicadornico.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
//criando tabela
//anotacoes

@Entity
@Table(name = "tb_tiradesentenca")


public class entityTiraDeSentenca {

    // criar chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTiraDeSentenca;

    // variaveis
    @Column(name= "sequenciaBotoes")
    private List<Integer> sequenciaBotoes = new ArrayList<>();

    @Column(name= "textoFormatado")
    private String textoFormatado;

    @Column(name= "sugestao")
    private List<Integer> sugestao = new ArrayList<>();


    //criando relacionamento das tabelas
    //relação tira x usuario (1..1)
    @OneToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;

    //relação tira x botão
    @OneToMany(mappedBy = "tiraDeSentenca")
    private List<entityBotao> botoes;

     // construtor padrão (exigido pelo JPA)
    public entityTiraDeSentenca() {
        this.sequenciaBotoes = new ArrayList<>();
        this.sugestao = new ArrayList<>();
    }
 
    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityTiraDeSentenca(List<Integer> sequenciaBotoes, String textoFormatado, List<Integer> sugestao) {
        this.sequenciaBotoes = sequenciaBotoes;
        this.textoFormatado = textoFormatado;
        this.sugestao = sugestao;
    }
 
    public Long getIdTiraDeSentenca() {
        return idTiraDeSentenca;
    }
 
    public void setIdTiraDeSentenca(Long idTiraDeSentenca) {
        this.idTiraDeSentenca = idTiraDeSentenca;
    }
 
    public List<Integer> getSequenciaBotoes() {
        return sequenciaBotoes;
    }
 
    public void setSequenciaBotoes(List<Integer> sequenciaBotoes) {
        this.sequenciaBotoes = sequenciaBotoes;
    }
 
    public String getTextoFormatado() {
        return textoFormatado;
    }
 
    public void setTextoFormatado(String textoFormatado) {
        this.textoFormatado = textoFormatado;
    }
 
    public List<Integer> getSugestao() {
        return sugestao;
    }
 
    public void setSugestao(List<Integer> sugestao) {
        this.sugestao = sugestao;
    }
}
