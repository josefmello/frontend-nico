package br.com.comunicadornico.entity;
//imports

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity  //informa o SpringBot que essa classe deve virar uma tabela real
@Table(name = "tb_botao") // Etiqueta de identificação
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class entityBotao {

    @Id //criação da chave primaria id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ativa o autoincremento 
    private Long idBotao;

    // Colunas
    @Column(name= "Legenda")
    private String legenda;

    @Column(name= "corFundo")
    private String corFundo;

    @Column(name= "Foto")
    private String foto;

    @Column(name= "audioPersonalizado")
    private String audioPersonalizado;

    @Column(name= "audioFem")
    private String audioFem;

    @Column(name= "audioMas")
    private String audioMas;

    @Column(name= "tamanhoBotao")
    private int tamanhoBotao;

    @Column(name= "posicaoBotao")
    private int posicaoBotao;

    @Column(name= "oculto")
    private boolean oculto;

    // criando a relação da tabela botão com a categoria (Muitos para Muitos, pois uma categoria contém 1 ou muitos botões,
    // e um botão pode estar em um 1 ou muitas categorias)
    
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
