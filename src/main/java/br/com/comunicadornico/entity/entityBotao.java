package br.com.comunicadornico.entity;
//imports

import java.util.ArrayList;
import java.util.List; //import para usar a lista

import org.hibernate.internal.build.AllowNonPortable;

import jakarta.persistence.Column;
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
    private List<entityRegistroDeAtividade> registroDeAtividade;

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

    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityBotao(String legenda, String corFundo, String foto, String audioPersonalizado, String audioFem, String audioMas, int tamanhoBotao, int posicaoBotao, boolean oculto, List<entityCategoria> categorias, List<entityRegistroDeAtividade> registroDeAtividade) {
        this.legenda = legenda;
        this.corFundo = corFundo;
        this.foto = foto;
        this.audioPersonalizado = audioPersonalizado;
        this.audioFem = audioFem;
        this.audioMas = audioMas;
        this.tamanhoBotao = tamanhoBotao;
        this.posicaoBotao = posicaoBotao;
        this.oculto = oculto;
        this.categorias = categorias;
        this.registroDeAtividade = registroDeAtividade;
    }
 
    public Long getIdBotao() {
        return idBotao;
    }
 
    public void setIdBotao(Long idBotao) {
        this.idBotao = idBotao;
    }
 
    public String getLegenda() {
        return legenda;
    }
 
    public void setLegenda(String legenda) {
        this.legenda = legenda;
    }
 
    public String getCorFundo() {
        return corFundo;
    }
 
    public void setCorFundo(String corFundo) {
        this.corFundo = corFundo;
    }
 
    public String getFoto() {
        return foto;
    }
 
    public void setFoto(String foto) {
        this.foto = foto;
    }
 
    public String getAudioPersonalizado() {
        return audioPersonalizado;
    }
 
    public void setAudioPersonalizado(String audioPersonalizado) {
        this.audioPersonalizado = audioPersonalizado;
    }
 
    public String getAudioFem() {
        return audioFem;
    }
 
    public void setAudioFem(String audioFem) {
        this.audioFem = audioFem;
    }
 
    public String getAudioMas() {
        return audioMas;
    }
 
    public void setAudioMas(String audioMas) {
        this.audioMas = audioMas;
    }
 
    public int getTamanhoBotao() {
        return tamanhoBotao;
    }
 
    public void setTamanhoBotao(int tamanhoBotao) {
        this.tamanhoBotao = tamanhoBotao;
    }
 
    public int getPosicaoBotao() {
        return posicaoBotao;
    }
 
    public void setPosicaoBotao(int posicaoBotao) {
        this.posicaoBotao = posicaoBotao;
    }
 
    public boolean isOculto() {
        return oculto;
    }
 
    public void setOculto(boolean oculto) {
        this.oculto = oculto;
    }
 
    public List<entityCategoria> getCategorias() {
        return categorias;
    }
 
    public void setCategorias(List<entityCategoria> categorias) {
        this.categorias = categorias;
    }
 
    public List<entityRegistroDeAtividade> getRegistroDeAtividade() {
        return registroDeAtividade;
    }
 
    public void setRegistroDeAtividade(List<entityRegistroDeAtividade> registroDeAtividade) {
        this.registroDeAtividade = registroDeAtividade;
    }
}


