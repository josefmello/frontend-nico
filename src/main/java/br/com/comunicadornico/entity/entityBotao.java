package br.com.comunicadornico.entity;
//imports

import java.util.ArrayList;
import java.util.List; //import para usar a lista

import org.hibernate.internal.build.AllowNonPortable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity  //informa o SpringBot que essa classe deve virar uma tabela real
@Table(name = "tb_botao") // Etiqueta de identificação

public class entityBotao {

    @Id //criação da chave primaria id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ativa o autoincremento 
    private Long idBotao;

    //    variaveis:  
    private String legenda;
    private String corFundo;
    private String foto;
    private String audioPersonalizado;
    private String audioFem;
    private String audioMas;
    private int tamanhoBotao;
    private int posicaoBotao;
    private boolean oculto;

    // criando a relação da tabela botão com a categoria (Muitos para Muitos, pois uma categoria contém 1 ou muitos botões,
    // e um botão pode estar em um 1 ou muitas categorias)
    //anotacoes que gera automaticamente os construtores, getters e setters a partir do lombok

    @ManyToMany // indica a relação da tabela, muito para muito
    @JoinTable( // faz o join da tabela, como essa é uma relação da muito para muitos, é necessário criar uma 3 tabela pra armazenamento
            name = "tb_botao_categoria", //nome da tabela que sera criada para juntar as duas
            joinColumns = @JoinColumn(name = "fkBotao"), //cria a linha na tabela "intermediaria" de botaoxcategoria que vai armazenar o id do botao
            inverseJoinColumns = @JoinColumn(name = "fkCategoria"))
    private List<entityCategoria> categorias;

    // criando relação da tabela botão com registro de atividade
    // isso é uma relação biderecional, ou seja, registro sabe a qual botão ela está associada
    @OneToMany(mappedBy = "botao") // botão é o nome da variavel criada na classe registro
    private List<entityRegistroDeAtividade> registroDeAtividades;

    // relação de botão x administrador (*..1)
    @ManyToOne
    @JoinColumn(name = "fkAdministrador")
    private entityAdministrador administrador;

    // relação de botão x usuario (*..1)
    @ManyToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;
   

    //relação de botão x tiradesetença (*..1)
    @ManyToOne
    @JoinColumn(name="fkTiraDeSentenca")
    private entityTiraDeSentenca tiraDeSentenca;

}
