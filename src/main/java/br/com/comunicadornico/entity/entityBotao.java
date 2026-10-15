package br.com.comunicadornico.entity;
//imports

import java.util.List; //import para usar a lista

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    @ManyToMany // indica a relação da tabela, muito para muito
    @JoinTable( // faz o join da tabela, como essa é uma relação da muito para muitos, é necessário criar uma 3 tabela pra armazenamento
            name = "tb_botao_categoria", //nome da tabela que sera criada para juntar as duas
            joinColumns = @JoinColumn(name = "idBotao"), //cria a linha na tabela "intermediaria" de botaoxcategoria que vai armazenar o id do botao
            inverseJoinColumns = @JoinColumn(name = "idCategoria"))
    private List<entityCategoria> categorias;

    //criando a relação da tabela botão com a tabela RegistroDeAtividade (Um para Muitos, pois um botão tem muitos registros)
    @OneToMany // indica a relação da tabela, como não é uma relação de *..* não precisa criar tabela, da pra armazenar direto
    @JoinColumn(name = "idBotao")
    private List<entityRegistroDeAtividade> registroDeAtivade; // aqui ta vermelho porque eu não criei a tabela RegistroDeAtividade
 // Construtor padrão (exigido pelo JPA)
    public entityBotao() {
    }
 
    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityBotao(String legenda, String corFundo, String foto, String audioPersonalizado, String audioFem, String audioMas, int tamanhoBotao, int posicaoBotao, boolean oculto, List<entityCategoria> categorias, List<entityRegistroDeAtividade> registroDeAtivade) {
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
        this.registroDeAtivade = registroDeAtivade;
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
 
    public List<entityRegistroDeAtividade> getRegistroDeAtivade() {
        return registroDeAtivade;
    }
 
    public void setRegistroDeAtivade(List<entityRegistroDeAtividade> registroDeAtivade) {
        this.registroDeAtivade = registroDeAtivade;
    }
}
 
