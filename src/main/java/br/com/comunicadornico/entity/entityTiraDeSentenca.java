package br.com.comunicadornico.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

//anotacoes

@Entity
@Table(name = "tb_tiradesentenca")


public class entityTiraDeSentenca {

    // criar chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTiraDeSentenca;

    // variaveis
    private List<Integer> sequenciaBotoes = new ArrayList<>();
    private String textoFormatado;
    private List<Integer> sugestao = new ArrayList<>();

    //criando relacionamento das tabelas
    //relação tira x usuario (1..1)
    @OneToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;

    //relação tira x botão
    @OneToMany(mappedBy = "tiraDeSentenca")
    private List<entityBotao> botoes;

}
