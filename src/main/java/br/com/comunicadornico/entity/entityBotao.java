package br.com.comunicadornico.entity;
//imports

import java.util.ArrayList;
import java.util.List; //import para usar a lista

// REMOVIDO: import org.hibernate.internal.build.AllowNonPortable (import automático errado)

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @Column(name= "oculto")
    private boolean oculto;

    // CORRIGIDO: a relação botão x categoria agora usa a tabela associativa (entityBotaoCategoria)
    // em vez do @ManyToMany automático. O botão conhece suas ligações com as categorias.
    @OneToMany(mappedBy = "botao")
    private List<entityBotaoCategoria> botaoCategorias;

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

    // ADICIONADO: construtor padrao (exigido pelo JPA)
    public entityBotao() {
    }

    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityBotao(String legenda, String corFundo, String foto, String audioPersonalizado, String audioFem, String audioMas, int tamanhoBotao, boolean oculto, List<entityRegistroDeAtividade> registroDeAtividade) {
        this.legenda = legenda;
        this.corFundo = corFundo;
        this.foto = foto;
        this.audioPersonalizado = audioPersonalizado;
        this.audioFem = audioFem;
        this.audioMas = audioMas;
        this.tamanhoBotao = tamanhoBotao;
        this.oculto = oculto;
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
 
public boolean isOculto() {
        return oculto;
    }
 
    public void setOculto(boolean oculto) {
        this.oculto = oculto;
    }
 
    public List<entityBotaoCategoria> getBotaoCategorias() {
        return botaoCategorias;
    }
 
    public void setBotaoCategorias(List<entityBotaoCategoria> botaoCategorias) {
        this.botaoCategorias = botaoCategorias;
    }
 
    public List<entityRegistroDeAtividade> getRegistroDeAtividade() {
        return registroDeAtividade;
    }
 
    public void setRegistroDeAtividade(List<entityRegistroDeAtividade> registroDeAtividade) {
        this.registroDeAtividade = registroDeAtividade;
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

    public entityTiraDeSentenca getTiraDeSentenca() {
        return tiraDeSentenca;
    }

    public void setTiraDeSentenca(entityTiraDeSentenca tiraDeSentenca) {
        this.tiraDeSentenca = tiraDeSentenca;
    }
}